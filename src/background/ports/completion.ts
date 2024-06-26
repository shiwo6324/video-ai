import { OpenAI } from "openai"

import type { PlasmoMessaging } from "@plasmohq/messaging"

const llm = new OpenAI({
  apiKey: process.env.PLASMO_PUBLIC_OPEN_AI_KEY,
  baseURL: process.env.PLASMO_PUBLIC_OPEN_AI_BASE_URL
})
export async function createCompletion(
  model: string,
  prompt: string,
  context: any
) {
  // 解析转录文本，从 context 中提取并拼接所有的 segs 字段内容
  const parsed = context.transcript.events
    .filter((x: { segs: any }) => x.segs) // 过滤出包含 segs 字段的事件
    .map((x: { segs: any[] }) =>
      // 提取 segs 中的 utf8 字段，并用空格连接
      x.segs.map((y: { utf8: any }) => y.utf8).join(" ")
    )
    .join(" ") // 将所有提取出的文本用空格连接成一个字符串
    .replace(/[\u200B-\u200D\uFEFF]/g, "") // 去除零宽字符
    .replace(/\s+/g, " ") // 将连续的空白字符替换为一个空格

  // 构建用户消息内容，包括提示、视频标题和解析后的转录文本
  const USER = `${prompt}\n\nVideo Title: ${context.metadata.title}\nVideo Transcript: ${parsed}`

  return llm.beta.chat.completions.stream({
    messages: [{ role: "user", content: USER }],
    model: model || "gpt-3.5-turbo",
    stream: true
  })
}

// 处理来自浏览器扩展的请求
const handler: PlasmoMessaging.PortHandler = async (req, res) => {
  // 累积从模型生成的响应数据
  let cumulativeData = ""

  const prompt = req.body.prompt
  const model = req.body.model
  const context = req.body.context

  try {
    const completion = await createCompletion(model, prompt, context)

    // 监听生成内容事件 content，每当有新的内容生成时，将其累加到 cumulativeData 并发送部分响应
    completion.on("content", (delta, snapshot) => {
      cumulativeData += delta
      res.send({ message: cumulativeData, error: "", isEnd: false })
    })

    completion.on("end", () => {
      res.send({ message: "END", error: "", isEnd: true })
    })
  } catch (error) {
    res.send({ error: "something went wrong" })
  }
}

export default handler

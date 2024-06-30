import { BarChartIcon } from "@radix-ui/react-icons"

export type Model = {
  value: string
  label: string
  content?: string
  icon?: any
}

export type Prompt = {
  value: string
  label: string
  content: string
}

export const models: Model[] = [
  {
    value: "default",
    label: "GPT-3.5",
    content: "gpt-3.5-turbo",
    icon: <BarChartIcon className="w-4 h-4" />
  },
  {
    value: "GPT-4",
    label: "GPT-4",
    content: "gpt-4-turbo",
    icon: <BarChartIcon className="w-4 h-4" />
  }
]

export const prompts: Prompt[] = [
  {
    value: "default",
    label: "Default (Prompt)",
    content: `这里是提示（你可以在扩展选项卡中替换默认内容）：

    "你的输出应使用以下模板：
    
    ## 摘要
    
    ## 类比
    
    ## 笔记
    
    - [Emoji] 要点
    
    ### 关键词
    
    - 解释
    
    你的任务是使用YouTube视频的转录内容，为大学生创建一个简洁的笔记总结。你需要像一个该转录内容所涉及主题的专家一样行事。
    
    根据转录内容制作一个摘要。使用转录内容中的关键词，不要解释它们。关键词将在后面解释。
    
    另外，为了提供背景和/或日常生活的类比，请制作一个简短而复杂的类比。
    
    创建10个要点（每个要点配上合适的emoji），总结视频转录内容中的关键点或重要时刻。
    
    除了要点之外，提取最重要的关键词以及任何不为普通读者所知的复杂词汇和提到的任何缩略词。对于每个关键词和复杂词汇，基于其在转录内容中的出现，提供解释和定义。
    
    你也是一个转录AI，你会收到一份可能包含赞助或品牌名称的文本。你的任务是按照指示撰写内容，同时避免提及任何赞助或品牌名称。
    
    请确保摘要、要点和解释都在330字以内，同时仍能提供对视频内容的全面而清晰的理解。使用以上文本："`
  },
  {
    value: "prompt-one",
    label: "Prompt Two",
    content: "Give me a summary of this video"
  }
]

export type Transcript = {
  text: string
  startTime: number
  endTime: number
}

export type Message = {
  role: string
  content: string
}

// 正则表达式，用于匹配 YouTube 页面中的初始播放器响应对象
const YT_INITIAL_PLAYER_RESPONSE_RE =
  /ytInitialPlayerResponse\s*=\s*({.+?})\s*;\s*(?:var\s+(?:meta|head)|<\/script|\n)/

// 比较两个字幕轨道的顺序
function compareTracks(track1, track2) {
  console.log(track1, track2)

  const langCode1 = track1.languageCode
  const langCode2 = track2.languageCode

  // 如果有多个字幕轨道，优先选择英语字幕
  // 优先选择非自动语音识别 (ASR) 的字幕
  if (langCode1 === "en" && langCode2 !== "en") {
    return -1 // 如果第一个轨道是英语，而第二个不是，英语轨道排在前
  } else if (langCode1 !== "en" && langCode2 === "en") {
    return 1 // 如果第二个轨道是英语，而第一个不是，英语轨道排在前
  } else if (track1.kind !== "asr" && track2.kind === "asr") {
    return -1 // 如果第一个轨道不是自动语音识别，而第二个是，非自动语音识别轨道排在前
  } else if (track1.kind === "asr" && track2.kind !== "asr") {
    return 1 // 如果第二个轨道不是自动语音识别，而第一个是，非自动语音识别轨道排在前
  }

  return 0 // 否则保持原有顺序
}

// 获取视频数据函数，传入视频ID
export async function getVideoData(id: string) {
  // 尝试从全局对象中获取初始播放器响应
  // @ts-ignore
  let player = window.ytInitialPlayerResponse

  // 如果没有找到或ID不匹配，则通过网络请求获取页面数据
  if (!player || id !== player.videoDetails.videoId) {
    const pageData = await fetch(`https://www.youtube.com/watch?v=${id}`)

    // 将 fetch 请求返回的响应体转换为文本格式,方便后续提取嵌入的 ytInitialPlayerResponse 对象
    const body = await pageData.text()
    // 使用正则表达式匹配初始播放器响应对象
    const playerResponseMatch = body.match(YT_INITIAL_PLAYER_RESPONSE_RE)
    if (!playerResponseMatch) {
      console.warn("Unable to parse playerResponse")
      return
    }
    // 解析匹配到的 JSON 字符串
    player = JSON.parse(playerResponseMatch[1])
  }

  // 提取视频的元数据
  const metadata = {
    title: player.videoDetails.title,
    duration: player.videoDetails.lengthSeconds,
    author: player.videoDetails.author,
    views: player.videoDetails.viewCount
  }

  // 检查是否有字幕信息
  if (player.captions && player.captions.playerCaptionsTracklistRenderer) {
    const tracks = player.captions.playerCaptionsTracklistRenderer.captionTracks
    console.log(tracks)

    if (tracks && tracks.length > 0) {
      // 对字幕轨道进行排序
      tracks.sort(compareTracks)
      // 获取第一个字幕轨道的内容
      const transcriptResponse = await fetch(tracks[0].baseUrl + "&fmt=json3")
      const transcript = await transcriptResponse.json()
      return { metadata, transcript }
    }
  }

  return { metadata, transcript: null } // 如果没有字幕轨道，则返回元数据和 null 的转录信息
}

// 清理 JSON 格式的字幕转录，将其分割成较小的块
export function cleanJsonTranscipt(transcript) {
  const chunks = []

  let currentChunk = ""
  let currentStartTime = transcript.events[0].tStartMs
  let currentEndTime = currentStartTime

  transcript.events.forEach((event) => {
    event.segs?.forEach((seg) => {
      const segmentText = seg.utf8.replace(/\n/g, " ")
      currentEndTime = event.tStartMs + (seg.tOffsetMs || 0)
      // 如果当前块的长度超过 300 字符，则将其分割
      if ((currentChunk + segmentText).length > 300) {
        chunks.push({
          text: currentChunk.trim(),
          startTime: currentStartTime,
          endTime: currentEndTime
        })
        currentChunk = segmentText
        currentStartTime = currentEndTime
      } else {
        currentChunk += segmentText
      }
    })
  })

  // 处理剩余的文本块
  if (currentChunk) {
    chunks.push({
      text: currentChunk.trim(),
      startTime: currentStartTime,
      endTime: currentEndTime
    })
  }

  return chunks
}

// 清理文本格式的字幕转录，将其分割成较小的块并添加时间戳
export function cleanTextTranscript(transcript) {
  let textLines = []
  let tempText = ""
  let lastTime = 0

  transcript.events.forEach((event) => {
    if (event.segs) {
      event.segs.forEach((seg) => {
        const segmentStartTimeMs = event.startMs + (seg.tOffsetMs || 0)

        // 如果文本块之间的间隔超过 1 秒或遇到换行符，则添加时间戳并保存当前文本块
        if (
          tempText &&
          (segmentStartTimeMs - lastTime > 1000 || seg.utf8 === "\n")
        ) {
          const timeFormatted = new Date(lastTime).toISOString().substr(11, 12)
          textLines.push(`${timeFormatted}: ${tempText.trim()}`)
          tempText = ""
        }

        lastTime = segmentStartTimeMs
        tempText += seg.utf8
      })
    }
  })

  // 处理剩余的文本块
  if (tempText) {
    const timeFormatted = new Date(lastTime).toISOString().substr(11, 12)
    textLines.push(`${timeFormatted}: ${tempText.trim()}`)
  }

  return textLines.join("\n")
}

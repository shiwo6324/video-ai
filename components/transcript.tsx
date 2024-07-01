import React from "react"

import TranscriptAction from "./transcript-action"

const Transcript = () => {
  const player = document.querySelector("video")
  const transcriptListRef = React.useRef(null)

  const jumpCurrentTime = () => {
    if (!player || !transcriptListRef.current) return
    // 获取当前视频播放时间，并转换为毫秒
    const time = Math.round(player.currentTime * 1000)

    // 获取字幕列表的第一个子元素
    const itemsContainer = transcriptListRef.current
      .firstElementChild as HTMLElement

    if (itemsContainer) {
      const children = Array.from(itemsContainer.children) as HTMLElement[]
      const targetElement = children.find((child: HTMLElement) => {
        // 获取字幕项的开始时间
        const startTime = parseInt(
          child.getAttribute("data-start-time") || "0",
          10
        )
        // 获取字幕项的结束时间
        const endTime = parseInt(child.getAttribute("data-end-time") || "0", 10)
        // 判断当前时间是否在该字幕项的时间范围内
        return startTime <= time && endTime >= time
      })

      // 平滑滚动到目标字幕项
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "center"
        })

        targetElement.classList.add("bg-zinc-100")
        targetElement.classList.add("dark:bg-[#141414]")
        targetElement.classList.add("transition-all") // 为目标字幕项添加高亮样式

        setTimeout(() => {
          targetElement.classList.add("bg-zinc-100")
          targetElement.classList.add("dark:bg-[#141414]")
          targetElement.classList.add("transition-all") // 3秒后移除高亮样式
        }, 3000)
      }
    }
  }
  return (
    <>
      <TranscriptAction jumpCurrentTime={jumpCurrentTime} />
    </>
  )
}

export default Transcript

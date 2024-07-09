import { CheckIcon, ClipboardCopyIcon, ClockIcon } from "@radix-ui/react-icons"
import { useCopyToClipboard } from "hooks/use-copy-clipboard"
import React from "react"

import HighlightText from "./highlight-text"
import TooltipWrapper from "./tooltip-wrapper"
import { Button } from "./ui/button"

interface Transcript {
  text: string
  startTime: number
  endTime: number
}

const TranscriptItem = ({
  item,
  searchInput
}: {
  item: Transcript
  searchInput: string
}) => {
  const player = document.querySelector("video")

  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })

  const jumpToTime = () => {
    player.currentTime = item.startTime / 1000
  }

  const copySection = () => {
    if (isCopied) return
    copyToClipboard(item.text)
  }
  const startTime = new Date(item.startTime).toISOString().substr(14, 5)
  const endTime = new Date(item.endTime).toISOString().substr(14, 5)
  return (
    <div className="">
      <div className="">
        <Button variant="outline" className="" onClick={jumpToTime}>
          <ClockIcon className="w-4 h-4 opacity-60" />
          <span className="text-blue-500 text-[11px] hover:cursor-pointer hover:underline">
            {startTime}: {endTime}
          </span>
        </Button>
        <div className="">
          <TooltipWrapper text={"复制当前段落"}>
            <Button variant="outline" size="icon" onClick={copySection}>
              {isCopied ? (
                <CheckIcon className="h-4 w-4 opacity-60" />
              ) : (
                <ClipboardCopyIcon className="h-4 w-4 opacity-60" />
              )}
            </Button>
          </TooltipWrapper>
        </div>
      </div>

      <p className="text-[10.5px] capitalize leading-7">
        <HighlightText text={item.text} search={searchInput} />
      </p>
    </div>
  )
}

export default React.memo(TranscriptItem)

import {
  CheckIcon,
  ClipboardCopyIcon,
  Crosshair1Icon,
  MagnifyingGlassIcon
} from "@radix-ui/react-icons"
import { useExtionContext } from "context/extension-context"
import { useTranscript } from "context/transcript-context"
import { useCopyToClipboard } from "hooks/use-copy-clipboard"
import React from "react"
import { cleanTextTranscript } from "utils/functions"

import TooltipWrapper from "./tooltip-wrapper"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

const TranscriptAction = ({
  jumpCurrentTime
}: {
  jumpCurrentTime: () => void
}) => {
  const { transcriptSearch, setTranscriptSearch, transcriptJson } =
    useTranscript()

  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })
  const { extensionLoading, extensionData } = useExtionContext()

  const copyTranscript = () => {
    if (isCopied || !extensionData.transcript) return
    const processed = cleanTextTranscript(extensionData.transcript)
    copyToClipboard(processed)
  }

  return (
    <div className="flex flex-row w-full  justify-between items-center sticky top-0 z-10 bg-white pt-3.5 pb-3 px-3 space-x-4 dark:bg-[#0f0f0f]">
      <div className="relative w-full">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-60" />
        <Input
          disabled={extensionLoading || transcriptJson.length === 0}
          type="text"
          placeholder="搜索文本"
          className="pl-8"
          onChange={(e) => {
            e.preventDefault()
            setTranscriptSearch(e.currentTarget.value)
          }}
        />
      </div>
      <div className="flex flex-row space-x-2">
        <TooltipWrapper text={"跳转到当前时间"}>
          <Button
            variant="outline"
            size="icon"
            onClick={jumpCurrentTime}
            disabled={extensionLoading || transcriptJson.length === 0}>
            <Crosshair1Icon className="h-4 w-4 opacity-60" />
          </Button>
        </TooltipWrapper>

        <TooltipWrapper text={"复制文本"}>
          <Button
            variant="outline"
            size="icon"
            onClick={copyTranscript}
            disabled={extensionLoading || transcriptJson.length === 0}>
            {isCopied ? (
              <CheckIcon className="h-4.5 w-4.5 opacity-60" />
            ) : (
              <ClipboardCopyIcon className="h-4.5 w-4.5 opacity-60" />
            )}
          </Button>
        </TooltipWrapper>
      </div>
    </div>
  )
}

export default TranscriptAction

import { CheckIcon, ClipboardCopyIcon, ReloadIcon } from "@radix-ui/react-icons"
import { useSummary } from "context/summary-context"
import { useCopyToClipboard } from "hooks/use-copy-clipboard"
import React from "react"

import { models, type Model } from "../constants"
import TooltipWrapper from "./tooltip-wrapper"
import { Button } from "./ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select"

const SummaryActions = () => {
  const {
    summaryPrompt,
    summaryIsGenerating,
    summaryModel,
    summaryContent,
    setSummaryPrompt,
    setSummaryModel,
    generateSummary
  } = useSummary()

  const { isCopied, copyToClipboard } = useCopyToClipboard({
    timeout: 2000
  })

  const copySummary = async () => {
    if (isCopied || !summaryContent || summaryIsGenerating) return
    await copyToClipboard(summaryContent)
  }
  return (
    <div
      className="flex w-full justify-between items-center sticky top-0 z-10 bg-white
    pt-3.5 pb-2 px-3">
      <Select
        value={summaryModel.value}
        onValueChange={(value) =>
          setSummaryModel(models.find((model) => model.value === value))
        }>
        <SelectTrigger className="space-x-2 ">
          <SelectValue placeholder="模型" />
        </SelectTrigger>
        <SelectContent>
          {models.map((model: Model) => (
            <SelectItem key={model.value} value={model.value}>
              <div className="flex  items-center">
                <div className="mr-2">{model.icon}</div>
                {model.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex space-x-2">
        <TooltipWrapper text="重新生成总结">
          <Button
            variant="outline"
            size="icon"
            onClick={generateSummary}
            disabled={summaryIsGenerating}>
            <ReloadIcon className="w-4 h-4 opacity-60" />
          </Button>
        </TooltipWrapper>

        <TooltipWrapper text="复制总结">
          <Button
            variant="outline"
            size="icon"
            onClick={copySummary}
            disabled={summaryIsGenerating}>
            {isCopied ? (
              <CheckIcon className="w-4 h-4 opacity-60" />
            ) : (
              <ClipboardCopyIcon className="w-4 h-4 opacity-60" />
            )}
          </Button>
        </TooltipWrapper>
      </div>
    </div>
  )
}

export default SummaryActions

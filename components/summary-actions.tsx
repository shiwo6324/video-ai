import { models } from "constants"
import type { Model } from "constants"
import { useSummary } from "context/summary-context"
import { useCopyToClipboard } from "hooks/use-copy-clipboard"
import React from "react"

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
  return (
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
  )
}

export default SummaryActions

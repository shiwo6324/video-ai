import { useSummary } from "context/summary-context"
import React from "react"

import Md from "./md"
import SummarySkeleton from "./summary-skeleton"
import { Button } from "./ui/button"

const SummaryContent = () => {
  const { summaryIsGenerating, summaryContent, generateSummary } = useSummary()
  if (!summaryContent && summaryIsGenerating) {
    return (
      <div>
        <SummarySkeleton />
      </div>
    )
  }

  if (!summaryContent && !summaryIsGenerating) {
    return (
      <div>
        <Button onClick={generateSummary}>
          <span>生成总结</span>
        </Button>
      </div>
    )
  }
  return (
    <div className="">
      <div>
        <Md markdown={summaryContent} className="pb-6" />
      </div>
    </div>
  )
}

export default SummaryContent

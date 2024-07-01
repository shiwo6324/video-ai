import { useSummary } from "context/summary-context"
import React from "react"

import Md from "./md"
import SummarySkeleton from "./summary-skeleton"
import { Button } from "./ui/button"

const SummaryContent = () => {
  const { summaryIsGenerating, summaryContent, generateSummary } = useSummary()
  if (!summaryContent && summaryIsGenerating) {
    return (
      <div className="flex justify-center items-center w-full p-3 bg-white dark:bg-[#0f0f0f]">
        <SummarySkeleton />
      </div>
    )
  }

  if (!summaryContent && !summaryIsGenerating) {
    return (
      <div className="flex justify-center items-center w-full p-3 bg-white dark:bg-[#0f0f0f] ">
        <Button
          variant="outline"
          className="w-full h-12"
          onClick={generateSummary}>
          <span className="text-sm">生成总结</span>
        </Button>
      </div>
    )
  }
  return (
    <div className="flex justify-center items-center w-full p-3 bg-white dark:bg-[#0f0f0f]">
      <div className="h-[600px] w-full px-3 opacity-80">
        <Md markdown={summaryContent} className="pb-6" />
      </div>
    </div>
  )
}

export default SummaryContent

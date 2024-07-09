import { useExtionContext } from "context/extension-context"
import { useTranscript } from "context/transcript-context"
import React from "react"

import TranscriptSkeleton from "./transcript-skeleton"

const TranscriptContext = React.forwardRef<
  HTMLDivElement,
  { ref: React.RefObject<HTMLDivElement> }
>((props, ref) => {
  const { transcriptJson, transcriptSearch } = useTranscript()
  const { extensionLoading, extensionData } = useExtionContext()

  if (extensionLoading || !extensionData) {
    return (
      <div className="flex justify-center items-center w-full p-3 bg-white">
        <TranscriptSkeleton />
      </div>
    )
  }
  return <div ref={ref}>TranscriptContext</div>
})

export default TranscriptContext

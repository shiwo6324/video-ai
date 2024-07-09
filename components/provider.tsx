import { ExtensionProvier } from "context/extension-context"
import { SummaryProvider } from "context/summary-context"
import { TranscriptProvider } from "context/transcript-context"
import React from "react"

const Provider = ({ children }) => {
  return (
    <ExtensionProvier>
      <SummaryProvider>
        <TranscriptProvider>{children}</TranscriptProvider>
      </SummaryProvider>
    </ExtensionProvier>
  )
}

export default Provider

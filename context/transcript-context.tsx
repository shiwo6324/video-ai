import React from "react"
import { cleanJsonTranscript } from "utils/functions"

import type { Transcript } from "../constants"
import { useExtionContext } from "./extension-context"

interface TranscriptContext {
  transcriptSearch: string
  setTranscriptSearch: (search: string) => void
  transcriptJson: Transcript[]
}

const TranscriptContext = React.createContext<TranscriptContext | undefined>(
  undefined
)

export function TranscriptProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [transcriptSearch, setTranscriptSearch] = React.useState("")

  const { extensionLoading, extensionData } = useExtionContext()

  const transcriptJson = React.useMemo(() => {
    if (!extensionLoading && extensionData && extensionData.transcript) {
      return cleanJsonTranscript(extensionData.transcript)
    }
    return []
  }, [extensionData, extensionLoading])

  const value = {
    transcriptSearch,
    setTranscriptSearch,
    transcriptJson
  }

  return (
    <TranscriptContext.Provider value={value}>
      {children}
    </TranscriptContext.Provider>
  )
}

export function useTranscript() {
  const context = React.useContext(TranscriptContext)
  if (!context) {
    throw new Error("useTranscript must be used within a TranscriptProvider")
  }
  return context
}

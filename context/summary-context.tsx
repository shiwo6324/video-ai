import React from "react"

import { usePort } from "@plasmohq/messaging/hook"

import { models, prompts, type Model, type Prompt } from "../constants"
import { useExtionContext } from "./extension-context"

interface SummaryContext {
  summaryModel: Model
  setSummaryModel: (model: Model) => void
  summaryPrompt: Prompt
  setSummaryPrompt: (prompt: Prompt) => void
  summaryContent: string | null
  setSummaryContent: (content: string | null) => void
  summaryIsError: boolean
  setSummaryIsError: (error: boolean) => void
  summaryIsGenerating: boolean
  setSummaryIsGenerating: (generating: boolean) => void
  generateSummary: (e: any) => void
}

const SummaryContext = React.createContext<SummaryContext | undefined>(
  undefined
)

export function SummaryProvider({ children }: { children: React.ReactNode }) {
  const port = usePort("completion")
  const { Provider } = SummaryContext
  const { extensionData, extensionLoading } = useExtionContext()
  const [summaryModel, setSummaryModel] = React.useState<Model>(models[0])
  const [summaryPrompt, setSummaryPrompt] = React.useState<Prompt>(prompts[0])
  const [summaryContent, setSummaryContent] = React.useState<string | null>(
    null
  )
  const [summaryIsError, setSummaryIsError] = React.useState<boolean>(false)
  const [summaryIsGenerating, setSummaryIsGenerating] =
    React.useState<boolean>(false)

  async function generateSummary(e: any) {
    e.preventDefault()
    if (summaryContent !== null) {
      setSummaryContent(null)
    }
    setSummaryIsGenerating(true)
    setSummaryIsError(false)

    port.send({
      prompt: summaryPrompt.content,
      model: setSummaryModel,
      context: extensionData
    })
  }

  React.useEffect(() => {
    setSummaryContent(null)
    setSummaryIsGenerating(false)
    setSummaryIsError(false)
  }, [extensionLoading])

  React.useEffect(() => {
    console.log("data", port.data)

    if (port.data?.message !== undefined && port.data?.isEnd === false) {
      setSummaryContent(port.data?.message)
    } else {
      setSummaryIsGenerating(false)
    }
    setSummaryIsError(false)
  }, [port.data?.message])
  const value = {
    summaryModel,
    setSummaryContent,
    setSummaryModel,
    summaryContent,
    summaryPrompt,
    setSummaryPrompt,
    summaryIsError,
    setSummaryIsError,
    summaryIsGenerating,
    setSummaryIsGenerating,
    generateSummary
  }
  return <Provider value={value}>{children}</Provider>
}

export function useSummary() {
  const context = React.useContext(SummaryContext)
  if (!context) throw new Error("必须在 SummaryContextProvider 内调用")

  return context
}

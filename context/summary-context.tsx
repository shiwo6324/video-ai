import React from "react"

import { models, prompts, type Model, type Prompt } from "../constants"

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
  const { Provider } = SummaryContext

  const [summaryModel, setSummaryModel] = React.useState<Model>(models[0])
  const [summaryPrompt, setSummaryPrompt] = React.useState<Prompt>(prompts[0])
  const [summaryContent, setSummaryContent] = React.useState<string | null>(
    null
  )
  const [summaryIsError, setSummaryIsError] = React.useState<boolean>(false)
  const [summaryIsGenerating, setSummaryIsGenerating] =
    React.useState<boolean>(false)
  const generateSummary = async (e: any) => {}
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
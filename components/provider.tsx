import { ExtensionProvier } from "context/extension-context"
import { SummaryProvider } from "context/summary-context"
import React from "react"

const Provider = ({ children }) => {
  return (
    <ExtensionProvier>
      <SummaryProvider>{children}</SummaryProvider>
    </ExtensionProvier>
  )
}

export default Provider

import React from "react"

interface ExtensionProps {
  extensionContainer: any
  extensionIsOpen: boolean
  extensionTheme: string | null
  extensionLoading: boolean
  extensionPanel: string
  extensionVideoId: string
  extensionData: any
}

const initialState: ExtensionProps = {
  extensionContainer: null,
  extensionIsOpen: false,
  extensionTheme: null,
  extensionLoading: false,
  extensionPanel: "Summary",
  extensionVideoId: null,
  extensionData: null
}

interface ExtensionActions {
  setExtensionContainer: (container: any) => void
  setExtensionIsOpen: (isOpen: boolean) => void
  setExtensionTheme: (theme: string | null) => void
  setExtensionLoading: (loading: boolean) => void
  setExtensionPanel: (panel: string) => void
  setExtensionVideoId: (videoId: string) => void
  setExtensionData: (data: any) => void
  resetExtension: () => void
}

interface ExtensionContext extends ExtensionActions, ExtensionProps {}

const ExtensionContext = React.createContext<ExtensionContext | undefined>(
  undefined
)

export function ExtensionProvier({ children }: { children: React.ReactNode }) {
  const [extensionContainer, setExtensionContainer] = React.useState(
    initialState.extensionContainer
  )
  const [extensionIsOpen, setExtensionIsOpen] = React.useState(
    initialState.extensionIsOpen
  )
  const [extensionTheme, setExtensionTheme] = React.useState(
    initialState.extensionTheme
  )
  const [extensionLoading, setExtensionLoading] = React.useState(
    initialState.extensionLoading
  )
  const [extensionPanel, setExtensionPanel] = React.useState(
    initialState.extensionPanel
  )
  const [extensionVideoId, setExtensionVideoId] = React.useState(
    initialState.extensionVideoId
  )
  const [extensionData, setExtensionData] = React.useState(
    initialState.extensionData
  )

  const resetExtension = () => {
    setExtensionContainer(initialState.extensionContainer)
    setExtensionIsOpen(initialState.extensionIsOpen)
    setExtensionTheme(initialState.extensionTheme)
    setExtensionLoading(initialState.extensionLoading)
    setExtensionPanel(initialState.extensionPanel)
    setExtensionVideoId(initialState.extensionVideoId)
    setExtensionData(initialState.extensionData)
  }

  const value = {
    extensionContainer,
    extensionIsOpen,
    extensionTheme,
    extensionLoading,
    extensionPanel,
    extensionVideoId,
    extensionData,
    setExtensionContainer,
    setExtensionIsOpen,
    setExtensionTheme,
    setExtensionLoading,
    setExtensionPanel,
    setExtensionVideoId,
    setExtensionData,
    resetExtension
  }

  return (
    <ExtensionContext.Provider value={value}>
      {children}
    </ExtensionContext.Provider>
  )
}

export function useExtionContext() {
  const context = React.useContext(ExtensionContext)

  if (!context) throw new Error("必须在 ExtionContextProvider 内调用")

  return context
}

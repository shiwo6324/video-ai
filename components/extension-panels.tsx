import { useExtionContext } from "context/extension-context"
import React from "react"

import Summary from "./summary"
import Transcript from "./transcript"

const ExtensionPanels = () => {
  const { extensionPanel } = useExtionContext()
  return (
    <div>
      {extensionPanel === "总结" && <Summary />}
      {extensionPanel === "文本" && <Transcript />}
      {extensionPanel === "聊天" && <h1>聊天</h1>}
    </div>
  )
}

export default ExtensionPanels

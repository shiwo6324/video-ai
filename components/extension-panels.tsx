import { useExtionContext } from "context/extension-context"
import React from "react"

const ExtensionPanels = () => {
  const { extensionPanel } = useExtionContext()
  return (
    <div>
      {extensionPanel === "总结" && <h1>总结</h1>}
      {extensionPanel === "文本" && <h1>文本</h1>}
      {extensionPanel === "聊天" && <h1>聊天</h1>}
    </div>
  )
}

export default ExtensionPanels

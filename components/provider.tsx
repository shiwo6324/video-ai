import { ExtensionProvier } from "context/extension-context"
import React from "react"

const Provider = ({ children }) => {
  return <ExtensionProvier>{children}</ExtensionProvier>
}

export default Provider

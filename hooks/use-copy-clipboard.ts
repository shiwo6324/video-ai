import React from "react"

export interface CopyToClipboardProps {
  timeout?: number
}

export function useCopyToClipboard({ timeout = 2000 }: CopyToClipboardProps) {
  const [isCopied, setIsCopied] = React.useState(false)

  const copyToClipboard = async (value: string) => {
    console.log("value:", value)

    if (typeof window === "undefined" || !navigator.clipboard.writeText) return
    if (!value) return
    await navigator.clipboard.writeText(value)
    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, timeout)
  }

  return {
    isCopied,
    copyToClipboard
  }
}

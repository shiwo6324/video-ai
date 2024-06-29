import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "components/ui/collapsible"
import { useExtionContext } from "context/extension-context"
import { cn } from "lib/utils"
import React from "react"
import { getVideoData } from "utils/functions"

import ExtensionActions from "./extension-actions"
import ExtensionPanels from "./extension-panels"

const Extension = () => {
  const {
    setExtensionContainer,
    setExtensionData,
    setExtensionPanel,
    setExtensionIsOpen,
    setExtensionLoading,
    setExtensionTheme,
    setExtensionVideoId,
    extensionContainer,
    extensionData,
    extensionIsOpen,
    extensionLoading,
    extensionPanel,
    extensionTheme,
    extensionVideoId
  } = useExtionContext()

  React.useEffect(() => {
    const getVideoId = () => {
      const videoId = new URLSearchParams(window.location.search).get("v")
      return videoId
    }

    const fetchVideoData = async () => {
      const id = getVideoId()
      if (id && id !== extensionVideoId) {
        setExtensionVideoId(id)
        setExtensionLoading(true)
        const data = await getVideoData(id)
        setExtensionData(data)
        setExtensionLoading(false)
      }
    }
    fetchVideoData()

    const intervalId = setInterval(fetchVideoData, 2000)
    return () => clearInterval(intervalId)
  }, [extensionVideoId])

  React.useEffect(() => {
    // 获取网页背景颜色
    const getCssVariables = (name: string) => {
      const rootStyle = getComputedStyle(document.documentElement)

      return rootStyle.getPropertyValue(name).trim()
    }
    const backgroundColor = getCssVariables("--yt-spec-base-background")

    if (backgroundColor === "#fff") {
      setExtensionTheme("light")
      return
    }
    setExtensionTheme("dark")
  }, [])

  if (!extensionTheme) return null
  return (
    <main
      ref={extensionContainer}
      className={cn("antialiased w-full mb-3 z-10", extensionTheme)}>
      <div className="w-full">
        <Collapsible
          className="space-y-3"
          open={extensionIsOpen}
          onOpenChange={setExtensionIsOpen}>
          <ExtensionActions />

          <CollapsibleContent
            className=" h-fit max-h-[500px]
           border border-zinc-200 rounded-md overflow-auto ">
            <ExtensionPanels />
          </CollapsibleContent>
        </Collapsible>
      </div>
    </main>
  )
}

export default Extension

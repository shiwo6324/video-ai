import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible"
import { useExtionContext } from "context/extension-context"
import React from "react"
import { getVideoData } from "utils/functions"

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
    <div className={`antialiased w-full mb-3 z-10`}>
      <div className="w-full">
        <Collapsible className="space-y-3">
          <h1>Extension Actions</h1>
          <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
          <CollapsibleContent>
            Yes. Free to use for personal and commercial projects. No
            attribution required.
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
}

export default Extension

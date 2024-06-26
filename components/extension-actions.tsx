import {
  ActivityLogIcon,
  CardStackPlusIcon,
  CaretSortIcon,
  ChatBubbleIcon,
  CheckIcon,
  Link2Icon,
  Pencil1Icon
} from "@radix-ui/react-icons"
import { Button } from "components/ui/button"
import { useExtionContext } from "context/extension-context"
import { useCopyToClipboard } from "hooks/use-copy-clipboard"
import React from "react"

import TooltipWrapper from "./tooltip-wrapper"
import { CollapsibleTrigger } from "./ui/collapsible"

const ExtensionActions = () => {
  const { setExtensionPanel, extensionIsOpen, setExtensionIsOpen } =
    useExtionContext()

  const { isCopied, copyToClipboard } = useCopyToClipboard({})

  const copyVideoURL = async () => {
    if (isCopied) return
    await copyToClipboard(window.location.href)
  }
  return (
    <div
      className="border border-zinc-200 rounded-md flex
     items-center justify-between py-2.5 px-3
      dark:bg-[#0f0f0f] dark:text-white dark:border-zinc-800">
      <CardStackPlusIcon className="w-6 h-6 opacity-50 ml-2" />

      <div className="flex justify-center items-center  flex-1 ">
        <div className="flex ">
          <Button
            onClick={() => {
              setExtensionPanel("总结")
              if (!extensionIsOpen) setExtensionIsOpen(true)
            }}
            variant="outline"
            className="rounded-r-none focus:z-10 bg-transparent space-x-2 text-center">
            <Pencil1Icon className="h-4 w-4 opacity-60" />
            <span className="opacity-90">总结</span>
          </Button>
          <Button
            onClick={() => {
              setExtensionPanel("文本")
              if (!extensionIsOpen) setExtensionIsOpen(true)
            }}
            variant="outline"
            className="rounded-r-none focus:z-10 bg-transparent space-x-2 text-center">
            <ActivityLogIcon className="h-4 w-4 opacity-60" />
            <span className="opacity-90">文本</span>
          </Button>

          <Button
            onClick={() => {
              setExtensionPanel("聊天")
              if (!extensionIsOpen) setExtensionIsOpen(true)
            }}
            variant="outline"
            className="rounded-r-none focus:z-10 bg-transparent space-x-2 text-center">
            <ChatBubbleIcon className="h-4 w-4 opacity-60" />
            <span className="opacity-90">聊天</span>
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <TooltipWrapper text="复制当前视频链接地址">
          <Button variant="outline" size="icon" onClick={copyVideoURL}>
            {isCopied ? (
              <CheckIcon className="w-4 h-4 opacity-60" />
            ) : (
              <Link2Icon className="w-4 h-4 opacity-60" />
            )}
          </Button>
        </TooltipWrapper>

        <CollapsibleTrigger asChild>
          <Button variant="outline" size="icon">
            <CaretSortIcon className="w-4 h-4 opacity-60" />
          </Button>
        </CollapsibleTrigger>
      </div>
    </div>
  )
}

export default ExtensionActions

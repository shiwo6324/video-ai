import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible"
import React from "react"

const Extension = () => {
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

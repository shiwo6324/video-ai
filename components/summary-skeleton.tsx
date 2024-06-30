import React from "react"

import { Skeleton } from "./ui/skeleton"

const SummarySkeleton = () => {
  return (
    <div className="w-full h-[600px] px-3 ">
      <div className="w-full rounded-md space-y-4">
        <div className="flex flex-col space-y-5">
          {Array.from({ length: 16 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-4 " />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SummarySkeleton

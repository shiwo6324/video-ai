import React from "react"

const HighlightText = ({ text, search }: { text: string; search: string }) => {
  if (!search) return <>{text}</>
  const parts = text.split(new RegExp(`(${search})`, "gi"))
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === search.toLowerCase() ? (
          <mark key={index} style={{ backgroundColor: "yellow" }}>
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  )
}

export default HighlightText

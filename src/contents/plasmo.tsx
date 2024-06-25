import Extension from "components/extension"
import styleText from "data-text:../style.css"
import type {
  PlasmoCSConfig,
  PlasmoGetInlineAnchor,
  PlasmoGetShadowHostId,
  PlasmoGetStyle
} from "plasmo"

// 指定将扩展内容注入到 #secondary.style-scope.ytd-watch-flexy 元素的开头
const INJECTED_ELEMENT_ID = "#secondary.style-scope.ytd-watch-flexy"

// 自定义扩展的样式，将 rem 单位转换为 px
export const getStyle: PlasmoGetStyle = () => {
  const baseFontSize = 12
  let updatedCssText = styleText.replaceAll(":root", ":host(plasmo-csui)")
  const remRegex = /([\d.]+)rem/g
  updatedCssText = updatedCssText.replace(remRegex, (match, remValue) => {
    const pixels = parseFloat(remValue) * baseFontSize
    return `${pixels}px`
  })
  const style = document.createElement("style")
  style.textContent = styleText
  return style
}

export const config: PlasmoCSConfig = {
  matches: ["https://www.youtube.com/*"]
}

// 注入位置钩子，用于定义扩展内容的注入位置
export const getInlineAnchor: PlasmoGetInlineAnchor = async () => ({
  element: document.querySelector(INJECTED_ELEMENT_ID),
  insertPosition: "afterbegin"
})

// 返回 adonais 作为 Shadow DOM 宿主元素的 ID
export const getShadowHostId: PlasmoGetShadowHostId = () => `adonais`

function PlasmoMainUi() {
  return <Extension />
}

export default PlasmoMainUi

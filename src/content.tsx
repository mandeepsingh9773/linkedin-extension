import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"

import { PromptEx } from "~features/PromptEx"

import Icon from "./image/message_icon.png"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  return (
    <>
      <div className="prompt-field">
        <PromptEx />
      </div>
    </>
  )
}

export default PlasmoOverlay;

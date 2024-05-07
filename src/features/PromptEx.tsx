import React, { useEffect, useState } from "react"

import Input from "../image/input.png"
import Icon from "../image/message_icon.png"
import Reload from "../image/reload.png"
import Icon2 from "../image/Vector.png"

export const PromptEx = () => {
  const [inputValue, setInputValue] = useState("")
  const [generated, setGenerated] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [promptModalVisible, setPromptModalVisible] = useState(false)
  const [prompt, setPrompt] = useState("")

  useEffect(() => {
    const handleClickOutsideModal = (event: MouseEvent) => {
      const modal = document.querySelector(".prompt-modal")
      if (modal && !modal.contains(event.target as Node)) {
        setModalVisible(false)
      }
    }

    if (modalVisible) {
      document.addEventListener("click", handleClickOutsideModal)
    } else {
      document.removeEventListener("click", handleClickOutsideModal)
    }

    return () => {
      document.removeEventListener("click", handleClickOutsideModal)
    }
  }, [modalVisible])

  const handleGenerateClick = () => {
    setGenerated(true)
    setPromptModalVisible(true)
    setPrompt(inputValue)
    setInputValue("")
  }

  const handleRegenerateClick = () => {
    setInputValue("")
    setPromptModalVisible(false)
    setGenerated(false)
  }

  const handleIconClick = () => {
    setModalVisible(true)
  }
  const handleCloseModal = () => {
    setModalVisible(false)
  }

  const handleInsertClick = () => {
    setModalVisible(false)
    const replyText: string =
      "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."

    // Find the LinkedIn message box element
    const messageElement: HTMLElement | null = document.querySelector(
      ".msg-form__contenteditable"
    )

    if (messageElement) {
      // if Linkedin Message box element is there than insert the para to it.
      const paragraph: HTMLParagraphElement = document.createElement("p")
      paragraph.textContent = replyText
      messageElement.textContent = ""
      messageElement.appendChild(paragraph)

      // Remove the label from the message area
      const label: HTMLElement | null = document.querySelector(
        ".msg-form__placeholder"
      )
      if (label) {
        label.removeAttribute("data-placeholder")
      }
      const sendButton: HTMLElement | null = document.querySelector(
        ".msg-form__send-button"
      )
      sendButton?.removeAttribute("disabled")
    }
  }

  function displayImageInMessageTextArea() {
    // creating element to add the image and show it only when the input field is focused
    var img = document.createElement("img")
    img.addEventListener("click", handleIconClick)
    img.src = Icon

    // styles for the icon
    img.style.width = "25px"
    img.style.cursor = "pointer"
    img.className = "AI-Icon"
    img.style.position = "absolute"
    img.style.bottom = "0"
    img.style.right = "50px"

    var messageTextArea = document.querySelector(".msg-form__contenteditable")

    if (messageTextArea) {
      // append the image to the message textarea
      messageTextArea.appendChild(img)
    }
  }

  document.addEventListener("focusin", function (event) {
    var focusedElement = event.target as Element
    if (focusedElement.matches(".msg-form__contenteditable")) {
      displayImageInMessageTextArea()
    }
  })

  function removeImageFromMessageTextArea() {
    // find the image element and then remove it
    var img = document.querySelector(".AI-Icon")
    if (img) {
      img.remove()
    }
  }

  document.addEventListener("focusout", function (event) {
    var focusedElement = event.relatedTarget as Element
    if (!focusedElement || !focusedElement.matches(".AI-Icon")) {
      removeImageFromMessageTextArea()
    }
  })

  return (
    <>
      <div
        className="prompt-modal flex flex-col bg-white p-4 rounded-lg shadow-2xl font-custom1 fixed top-1/2 left-[48%] transform -translate-x-1/2 -translate-y-1/2 z-50"
        style={{ display: modalVisible ? "flex" : "none" }}>
        {promptModalVisible ? (
          <div className="chat-area flex flex-col w-[450px] py-4 gap-y-4">
            <div className="message bg-[#DFE1E7] p-2 rounded-lg self-end">
              <p className="text-[#666D80] text-[15px]">{prompt}</p>
            </div>
            <div className="reply flex bg-[#DBEAFE] rounded-lg p-2 w-[300px]">
              <p className="reply-msg text-[#666D80] text-[15px]">
                Thank you for the opportunity! If you have any more questions or
                if there's anything else I can help you with, feel free to ask.
              </p>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <div className="first-input mb-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="text-[#666D80] text-[15px] p-2 w-[450px] border border-[#C1C7D0] rounded-lg"
            placeholder="Your prompt"
          />
        </div>

        <div className="second-button flex justify-end items-center">
          {!generated ? (
            <button
              onClick={handleGenerateClick}
              className="px-4 py-2 text-[15px] bg-[#3B82F6] flex flex-row text-white rounded-lg gap-2">
              <img src={Icon2} className="h-[18px] w-[14px] pt-1" />
              <p>Generate</p>
            </button>
          ) : (
            <div className="flex flex-row gap-x-2">
              <button
                onClick={handleInsertClick}
                className="px-4 py-2 text-[15px] bg-white flex flex-row text-[#666D80] border border-[#666D80] rounded-lg gap-2">
                <img src={Input} className="w-[11px] pt-2" />
                <p>Insert</p>
              </button>
              <button
                onClick={handleRegenerateClick}
                className="px-4 py-2 text-[15px] bg-[#3B82F6] flex flex-row text-white rounded-lg gap-2">
                <img src={Reload} className="h-[19px] w-[13px] pt-1" />
                <p>Regenerate</p>
              </button>
            </div>
          )}
        </div>
      </div>
      {modalVisible ? (
        <div
          onClick={handleCloseModal}
          className="backdrop fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-20 flex justify-center items-center z-10"></div>
      ) : (
        <div></div>
      )}
    </>
  )
}

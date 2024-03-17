import React, {useRef, useState} from 'react'
import JoditEditor from 'jodit-react'
import './content.css'

const config = {
  buttons: ['bold', 'italic', 'link', 'unlink', 'underline'],
}

const Content = ({initialValue, getValue}) => {
  const editor = useRef(null)
  const [content, setContent] = useState('')
  console.log(content)

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1}
      onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
      onChange={(newContent) => {}}
    />
  )
}

export default Content

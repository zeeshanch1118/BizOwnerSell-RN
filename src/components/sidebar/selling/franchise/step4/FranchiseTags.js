import {useState} from 'react'
import './tags.css'

export default function FranchiseTags() {
  const [tags, setTags] = useState([])
  const addTag = (e) => {
    if (e.key === 'Enter') {
      console.log('key'.e.key)
      e.preventDefault()

      if (e.target.value.length > 0) {
        setTags([...tags, e.target.value])
        e.target.value = ''
      }
    }
  }
  const removeTag = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag)
    setTags(newTags)
  }
  return (
    <div>
      <div className='tag-container'>
        {tags.map((tag, index) => {
          return (
            <div key={index} className='tag'>
              {tag} <span onClick={() => removeTag(tag)}>X</span>
            </div>
          )
        })}

        <input placeholder='Enter tags with , separator or press enter' onKeyDown={addTag} />
      </div>
    </div>
  )
}

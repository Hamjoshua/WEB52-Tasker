import React, { useState, useEffect, MouseEvent } from 'react'

import '../styles/reset.css'
import '../styles/fonts.css'
import '../styles/base.css'
import '../styles/components.css'
import '../styles/icons.css'
import '../styles/layouts.css'
import '../styles/adapt.css'
import { observer } from 'mobx-react-lite'
import { taskHolderStore } from '../store/taskHolder'


export const FormAdd = observer(() => {
  const [title, setTitle] = useState('')
  const [about, setAbout] = useState('')

  const handleSubmit = (e : MouseEvent) => {
    e.preventDefault()
    if (!title.trim() || !about.trim()) return
    taskHolderStore.addTask(title, about)
    setTitle('')
    setAbout('')
  }

  return (
    <div className="tool-panel">
      <div className="tool-panel-inputs">
        <input
          type="text"
          placeholder="Title..."
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="About"
          value={about}
          onChange={e => setAbout(e.target.value)}
          required
        />
      </div>
      <button className="btn-add icon-add" onClick={handleSubmit}></button>
    </div>
  )
})
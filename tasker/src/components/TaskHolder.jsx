import React, { useState, useEffect } from 'react'
import '../styles/adapt.css'
import '../styles/base.css'
import '../styles/components.css'
import '../styles/fonts.css'
import '../styles/icons.css'
import '../styles/layouts.css'
import '../styles/reset.css'

function FormAdd({ onAdd }) {
  const [title, setTitle] = useState('')
  const [about, setAbout] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !about.trim()) return
    onAdd({ title, about })
    setTitle('')
    setAbout('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Название"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Описание"
        value={about}
        onChange={e => setAbout(e.target.value)}
        required
      />
      <button type="submit">Добавить задачу</button>
    </form>
  )
}
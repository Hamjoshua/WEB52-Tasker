import React, { useState, useEffect } from 'react'
import '../styles/adapt.css'
import '../styles/base.css'
import '../styles/components.css'
import '../styles/fonts.css'
import '../styles/icons.css'
import '../styles/layouts.css'
import '../styles/reset.css'


function Task({ task, index, onDelete, onEdit, onView }) {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.about}</p>
      <div>
        <button onClick={() => onView(index)}>Просмотр</button>
        <button onClick={() => onEdit(index)}>Редактировать</button>
        <button onClick={() => onDelete(index)}>Удалить</button>
      </div>
    </div>
  )
}
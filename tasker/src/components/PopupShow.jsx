import React, { useState, useEffect } from 'react'


export default function PopupShow({ task, isEditing, onClose, onSave }) {
    const [editTitle, setEditTitle] = useState(task?.title || '')
    const [editAbout, setEditAbout] = useState(task?.about || '')

    useEffect(() => {
        if (task) {
            setEditTitle(task.title)
            setEditAbout(task.about)
        }
    }, [task])

    const handleSave = () => {
        onSave({ title: editTitle, about: editAbout })
    }

    if (!task) return null

    return (
        <div className="alert" onClick={onClose}>
            <div className="bottomed task-info popup" onClick={e => e.stopPropagation()}>
                <input
                    type="text"
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    readOnly={!isEditing}
                />
                <textarea
                    value={editAbout}
                    onChange={e => setEditAbout(e.target.value)}
                    readOnly={!isEditing}
                />
                <div className="task-info-buttons">
                    {isEditing ? <button className="btn-text save"
                        onClick={handleSave}>Save</button> : ''}

                    <button className="btn-text cancel"
                        onClick={onClose}> {isEditing ? "Cancel" : "Close"} </button>
                </div>


            </div>
        </div>
    )
}
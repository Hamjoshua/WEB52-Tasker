import React, { useState, useEffect } from 'react'


export default function Task({ task, index, onShare, onDelete, onEdit, onView }) {
    const [isShowedTask, setIsShowed] = useState(false)

    const handleCardClicked = () => {
        setIsShowed(!isShowedTask)
    }
    
    return (
        <div className="card-with-actions">
            <div className="card" onClick={handleCardClicked}>
                <span className="task-title">{task.title}</span>
                <span className="task-about">{task.about}</span>
            </div>

            <button className="btn-delete icon-delete" onClick={() => onDelete(index)}></button>

            <div className={isShowedTask ? "actions showed" : "actions hidden" }>
                <button className="btn-icon icon-share" onClick={() => onShare(index)}></button>
                <button className="btn-icon icon-info" onClick={() => onView(index)}></button>
                <button className="btn-icon icon-edit" onClick={() => onEdit(index)}></button>
            </div>
        </div>
    )
}
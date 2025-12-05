import React, { useState, useEffect } from 'react'

import FormAdd from './FormAdd.jsx'
import PopupConfirm from './PopupConfirm.jsx'
import PopupShow from './PopupShow.jsx'
import PopupShare from './PopupShare.jsx'
import Task from './Task.jsx'
import NoTasks from './NoTasks.jsx'


export default function TasksHolder() {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('tasks')
        return saved ? JSON.parse(saved) : []
    })

    const [popupData, setPopupData] = useState({ visible: false, index: null, mode: 'view' })
    const [confirmData, setConfirmData] = useState({ visible: false, index: null })

    // в будущем можно будет куда-то отправлять задачу, но пока он просто копирует
    // стейты у других попапов и ничего с этим не делает
    const [shareData, setShareData] = useState({ visible: false, index: null })

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    const addTask = (task) => {
        setTasks(prev => [...prev, task])
    }

    const viewTask = (index) => {
        setPopupData({ visible: true, index, mode: 'view' })
    }

    const editTask = (index) => {
        setPopupData({ visible: true, index, mode: 'edit' })
    }

    const shareTask = (index) => {
        setShareData({ visible: true, index })
    }

    const saveTask = (editedTask) => {
        setTasks(prev => {
            const copy = [...prev]
            copy[popupData.index] = editedTask
            return copy
        })
        closePopup()
    }

    const askDeleteTask = (index) => {
        setConfirmData({ visible: true, index })
    }

    const confirmDelete = () => {
        setTasks(prev => {
            const copy = [...prev]
            copy.splice(confirmData.index, 1)
            return copy
        })
        setConfirmData({ visible: false, index: null })
    }

    const closePopup = () => {
        setPopupData({ visible: false, index: null, mode: 'view' })
        setShareData({ visible: false, index: null })
    }

    const cancelDelete = () => {
        setConfirmData({ visible: false, index: null })
    }

    return (
        <div>
            <FormAdd onAdd={addTask} />
            {tasks && tasks.length === 0 && <NoTasks />}
            <div className="task-container">
                {tasks.map((task, idx) => ( // idx в мапе антихайп, это плохо
                    <Task
                        key={idx}
                        task={task}
                        index={idx}
                        onShare={shareTask}
                        onDelete={askDeleteTask}
                        onEdit={editTask}
                        onView={viewTask}
                    />
                ))}
            </div>

            {popupData.visible && (
                <PopupShow
                    task={tasks[popupData.index]}
                    isEditing={popupData.mode === 'edit'}
                    onClose={closePopup}
                    onSave={saveTask}
                />
            )}

            {confirmData.visible && (
                <PopupConfirm
                    message="Delete this task?"
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            )}

            {shareData.visible && (
                <PopupShare
                    onClose={closePopup}
                />
            )}
        </div>
    )
}

// ух какой большой
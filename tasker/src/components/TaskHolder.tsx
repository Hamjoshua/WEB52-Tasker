import React, { useState, useEffect } from 'react'

import FormAdd from './FormAdd.jsx'
import { PopupConfirm } from './PopupConfirm.tsx'
import { PopupShow } from './PopupShow.tsx'
import { PopupShare } from './PopupShare.tsx'
import { Task } from './Task.tsx'
import NoTasks from './NoTasks.jsx'
import { observer } from 'mobx-react-lite'
import { taskHolderStore } from '../store/taskHolder.ts'

export const Tasksholder = observer(() => {
    const { showPopup, sharePopup, confirmPopup } = taskHolderStore;

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
                    />
                ))}
            </div>

            {showPopup.visible && (
                <PopupShow
                    task={tasks[popupData.index]}
                    isEditing={popupData.mode === 'edit'}
                    onClose={closePopup}
                    onSave={saveTask}
                />
            )}

            {confirmPopup.visible && (
                <PopupConfirm
                    message="Delete this task?"
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            )}

            {sharePopup.visible && (
                <PopupShare
                    onClose={closePopup}
                />
            )}
        </div>
    )
})

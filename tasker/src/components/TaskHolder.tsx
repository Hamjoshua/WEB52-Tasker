import { FormAdd } from './FormAdd.tsx'
import { PopupConfirm } from './PopupConfirm.tsx'
import { PopupShow } from './PopupShow.tsx'
import { PopupShare } from './PopupShare.tsx'
import { Task } from './Task.tsx'
import NoTasks from './NoTasks.jsx'

import { observer } from 'mobx-react-lite'
import { taskHolderStore } from '../store/taskHolder.ts'

export const TasksHolder = observer(() => {
    const { showPopup, sharePopup, confirmPopup } = taskHolderStore;

    return (
        <div>
            <FormAdd />
            {taskHolderStore.tasks && taskHolderStore.tasks.length === 0 && <NoTasks />}
            <div className="task-container">
                {taskHolderStore.tasks.map((task, id) => ( // idx в мапе антихайп, это плохо
                    <Task task={task} />
                ))}
            </div>

            {showPopup.visible && (
                <PopupShow/>
            )}

            {confirmPopup.visible && (
                <PopupConfirm/>
            )}

            {sharePopup.visible && (
                <PopupShare/>
            )}
        </div>
    )
})

import { FormAdd } from './FormAdd.tsx'
import { PopupConfirm } from './PopupConfirm.tsx'
import { PopupShow } from './PopupShow.tsx'
import { PopupShare } from './PopupShare.tsx'
import { Task } from './Task.tsx'
import NoTasks from './NoTasks.jsx'

import {SortableContext} from '@dnd-kit/sortable';

import { observer } from 'mobx-react-lite'
import { taskHolderStore } from '../store/taskHolder.ts'
import { popupStore } from '../store/popupStore.ts'

export const TasksHolder = observer(() => {
    const { sharePopup, showPopup, confirmPopup } = popupStore;    

    return (
        <div>
            <FormAdd />

            {taskHolderStore.tasks.filter(task => task.pinned).length > 0 && (
                <div className="pinned-task-container">
                    {taskHolderStore.tasks
                        .filter(task => task.pinned)
                        .map((task, id) => { // idx в мапе антихайп, это плохо                    
                            return <Task task={task} />
                        }
                        )}
                </div>
            )
            }

            {taskHolderStore.tasks && taskHolderStore.tasks.length === 0 && <NoTasks />}

            <SortableContext items={taskHolderStore.tasks}>
                <div className="task-container">
                    {taskHolderStore.tasks
                        .filter(task => !task.pinned)
                        .map((task, id) => { // idx в мапе антихайп, это плохо                    
                            return <Task task={task} />
                        }
                        )}
                </div>
            </SortableContext>
            

            {showPopup.visible && (
                <PopupShow />
            )}

            {confirmPopup.visible && (
                <PopupConfirm />
            )}

            {sharePopup.visible && (
                <PopupShare />
            )}
        </div>
    )
})

import { FormAdd } from './FormAdd.tsx'
import { PopupConfirm } from './PopupConfirm.tsx'
import { PopupShow } from './PopupShow.tsx'
import { PopupShare } from './PopupShare.tsx'
import { Task } from './Task.tsx'
import NoTasks from './NoTasks.jsx'

import { observer } from 'mobx-react-lite'
import { taskHolderStore } from '../store/taskHolder.ts'
import { popupStore } from '../store/popupStore.ts'

import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

function handleDragEnd(event) {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
        const oldIndex = taskHolderStore.tasks.findIndex(
            (task) => task.id === active.id
        );
        const newIndex = taskHolderStore.tasks.findIndex(
            (task) => task.id === over.id
        );
        taskHolderStore.reorderTasks(oldIndex, newIndex);
    }
}

export const TasksHolder = observer(() => {
    const { sharePopup, showPopup, confirmPopup } = popupStore;

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                delay: 200, // чтобы он долго долго держал прежде чем драгнуть
                tolerance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <FormAdd />

            {taskHolderStore.tasks.filter(task => task.pinned).length > 0 && (
                <div className="pinned-task-container">
                    {taskHolderStore.tasks
                        .filter(task => task.pinned)
                        .map((task) => { // idx в мапе антихайп, это плохо                    
                            return <Task task={task} key={task.id} />
                        }
                        )}
                </div>
            )
            }

            {taskHolderStore.tasks && taskHolderStore.tasks.length === 0 && <NoTasks />}

            <SortableContext
                strategy={verticalListSortingStrategy}
                items={taskHolderStore.tasks.map(task => task.id)}>
                <div className="task-container">
                    {taskHolderStore.tasks
                        .filter(task => !task.pinned)
                        .map((task) => { // idx в мапе антихайп, это плохо                    
                            return <Task task={task} key={task.id}/>
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
        </DndContext>
    )
})

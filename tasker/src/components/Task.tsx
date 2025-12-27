import { observer } from "mobx-react-lite"
import { TaskObservable } from "../store/task";
import { useState } from "react";
import { popupStore } from "../store/popupStore";
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';


export const Task = observer(({ task }: { task: TaskObservable }) => {
    // здесь юзстейт остался. будет странно хранить информацию о сокрытии карточки внутри сущности
    const [isShowedTask, setIsShowed] = useState(false)

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: task.id});
  
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const handleCardClicked = () => {
        setIsShowed(!isShowedTask)
    }

    const { title, about } = task

    return (
        <div className="card-with-actions" ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <div className="card" onClick={handleCardClicked}>
                <span className="task-title">{title}</span>
                <span className="task-about">{about}</span>
            </div>

            <button className="btn-delete icon-delete" onClick={() =>
                popupStore.openConfirmDelete(task.id)}></button>

            <div className={isShowedTask ? "actions showed" : "actions hidden"}>
                <button className="btn-icon icon-share"
                    onClick={() => popupStore.openSharePopup(task.id)}></button>
                <button className="btn-icon icon-info"
                    onClick={() => popupStore.openShowPopup(task.id, false)}></button>
                <button className="btn-icon icon-edit"
                    onClick={() => popupStore.openShowPopup(task.id, true)}></button>
                {!task.pinned && (
                    <button className="btn-icon icon-pin"
                        onClick={() => task.pin()}></button>
                )}
                {task.pinned && (
                    <button className="btn-icon icon-pined"
                        onClick={() => task.unpin()}></button>
                )}

            </div>
        </div>
    )
})
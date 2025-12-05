import { observer } from "mobx-react-lite"
import { taskHolderStore } from "../store/taskHolder";
import { TaskObservable } from "../store/task";
import { useState } from "react";


export const Task = observer((task: TaskObservable) => {
    // здесь юзстейт остался. будет странно хранить информацию о сокрытии карточки внутри сущности
    const [isShowedTask, setIsShowed] = useState(false)

    const handleCardClicked = () => {
        setIsShowed(!isShowedTask)
    }

    const { title, about } = task

    return (
        <div className="card-with-actions">
            <div className="card" onClick={handleCardClicked}>
                <span className="task-title">{title}</span>
                <span className="task-about">{about}</span>
            </div>

            <button className="btn-delete icon-delete" onClick={() =>
                taskHolderStore.openConfirmDelete(task.id)}></button>

            <div className={isShowedTask ? "actions showed" : "actions hidden"}>
                <button className="btn-icon icon-share"
                    onClick={() => taskHolderStore.openSharePopup(task.id)}></button>
                <button className="btn-icon icon-info"
                    onClick={() => taskHolderStore.openShowPopup(task.id, false)}></button>
                <button className="btn-icon icon-edit" 
                    onClick={() => taskHolderStore.openShowPopup(task.id, true)}></button>
            </div>
        </div>
    )
})
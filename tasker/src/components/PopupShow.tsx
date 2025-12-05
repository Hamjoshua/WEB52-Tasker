import { observer } from "mobx-react-lite"
import { taskHolderStore } from "../store/taskHolder";


export const PopupShow = observer(() => {
    const { showPopup, closeCurrentPopup } = taskHolderStore

    return (
        <div className="alert" onClick={closeCurrentPopup}>
            <div className="bottomed task-info popup" onClick={e => e.stopPropagation()}>
                <input
                    type="text"
                    value={showPopup.draftTitle}
                    onChange={e => showPopup.draftTitle = e.target.value}
                    readOnly={ !showPopup.isEdit}
                />
                <textarea
                    value={showPopup.draftAbout}
                    onChange={e => showPopup.draftAbout = e.target.value}
                    readOnly={ !showPopup.isEdit }
                />
                <div className="task-info-buttons">
                    {showPopup.isEdit ? <button className="btn-text save"
                        onClick={taskHolderStore.saveEditedTask}>Save</button> : ''}

                    <button className="btn-text cancel"
                        onClick={closeCurrentPopup}> {showPopup.isEdit ? "Cancel" : "Close"} </button>
                </div>
            </div>
        </div>
    )
})
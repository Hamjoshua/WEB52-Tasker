import { observer } from "mobx-react-lite"
import { taskHolderStore } from "../store/taskHolder";
import { popupStore } from "../store/popupStore";

export const PopupConfirm = observer(() => {
    const { confirmPopup, closeCurrentPopup, confirmDelete } = popupStore;

    return (
        <div className="alert" onClick={closeCurrentPopup}>
            <div className="task-delete popup">
                <span className="title">{confirmPopup.message}</span>
                <div className="task-info-buttons">
                    <button onClick={confirmDelete} className="btn-text yes">Yes</button>
                    <button onClick={closeCurrentPopup} className="btn-text no">No</button>
                </div>
            </div>
        </div>
    )
})

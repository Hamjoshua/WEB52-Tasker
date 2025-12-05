import { observer } from "mobx-react-lite"
import { taskHolderStore } from "../store/taskHolder";

const PopupShare = observer(() => {
    const { closeCurrentPopup } = taskHolderStore;

    return (
        <div className="alert" onClick={closeCurrentPopup}>
            <div className="share-popup">
                <img className="share-icon" src={'../assets/icons/copy.png'} />
                <img className="share-icon" src={'../assets/icons/vk.png'} />
                <img className="share-icon" src={'../assets/icons/telegram.png'} />
                <img className="share-icon" src={'../assets/icons/whatsapp.png'} />
                <img className="share-icon" src={'../assets/icons/facebook.png'} />
            </div>
        </div>
    )
})
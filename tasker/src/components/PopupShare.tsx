import { observer } from "mobx-react-lite"
import { PopupStore, popupStore } from "../store/popupStore";

export const PopupShare = observer(() => {
    const { closeCurrentPopup } = popupStore; 

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
import { makeAutoObservable } from "mobx";
import { taskHolderStore } from "./taskHolder";

export class PopupStore {
    constructor() {
        makeAutoObservable(this)

        this.closeCurrentPopup = this.closeCurrentPopup.bind(this)
        this.confirmSave = this.confirmSave.bind(this)
        this.confirmDelete = this.confirmDelete.bind(this)
    }

    // попапы 

    showPopup = {
        visible: false,
        taskId: null as string | null,
        isEdit: false,
        // временные поля редактирования (чтобы не мутировать оригинал до Save)
        draftTitle: '',
        draftAbout: ''
    };

    confirmPopup = {
        visible: false,
        taskId: null as string | null,
        message: ''
    };

    sharePopup = {
        visible: false,
        taskId: null as string | null
    };

    public closeCurrentPopup() {
        if (this.showPopup) {
            this.showPopup.visible = false;
            this.showPopup.taskId = null;
        }

        if (this.confirmPopup) {
            this.confirmPopup.visible = false;
            this.confirmPopup.taskId = null;

        }

        if (this.sharePopup) {
            this.sharePopup.visible = false;
            this.sharePopup.taskId = null;
        }
    }

    public openShowPopup(taskId: string, editMode: boolean) {
        const task = taskHolderStore.getTaskById(taskId);
        if (!task) return;
        this.showPopup = {
            visible: true,
            taskId: taskId,
            isEdit: editMode,
            draftTitle: task.title,
            draftAbout: task.about
        };
    }

    openSharePopup(taskId: string) {
        this.sharePopup = { visible: true, taskId };
    }

    openConfirmDelete(taskId: string) {
        this.confirmPopup = {
            visible: true,
            taskId: taskId,
            message: "Delete this task?"
        };
    }

    confirmDelete() {
        if (this.confirmPopup.taskId) {
            taskHolderStore.deleteTaskById(this.confirmPopup.taskId);
        }
        
        this.closeCurrentPopup()
    }

    confirmSave() {
        if (!this.showPopup.taskId) return;

        taskHolderStore.saveEditedTask(this.showPopup.taskId,
             this.showPopup.draftTitle, this.showPopup.draftAbout)

        this.closeCurrentPopup()
    }
}

export const popupStore = new PopupStore()
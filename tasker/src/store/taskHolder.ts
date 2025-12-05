import { makeAutoObservable, reaction } from "mobx";
import { TaskObservable } from "../store/task.ts";

// todo этот класс может использовать const popup с enum параметрами

class TasksHolderStore {
    tasks: TaskObservable[] = []

    // попапы
    // todo подумать, можно ли сделать общий абстрактный класс
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

    // --- методы ---
    openShowPopup(taskId: string, editMode: boolean) {
        const task = this.getTaskById(taskId);
        if (!task) return;
        this.showPopup = {
            visible: true,
            taskId: taskId,
            isEdit: editMode,
            draftTitle: task.title,
            draftAbout: task.about
        };
    }

    closeCurrentPopup() {
        debugger
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

    saveEditedTask() {
        if (!this.showPopup.taskId) return;
        const task = this.getTaskById(this.showPopup.taskId);
        if (task) {
            task.update(this.showPopup.draftTitle, this.showPopup.draftAbout);
        }
        this.closeCurrentPopup();
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
            this.deleteTaskById(this.confirmPopup.taskId);
        }
        this.confirmPopup.visible = false;
        this.confirmPopup.taskId = null;
    }

    openSharePopup(taskId: string) {
        this.sharePopup = { visible: true, taskId };
    }

    constructor() {
        this.loadFromLocalStorage()
        makeAutoObservable(this)
    }

    loadFromLocalStorage() {
        const saved = localStorage.getItem('tasks');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                this.tasks = parsed.map((t: any) => new TaskObservable(t.title, t.about));
            } catch (e) {
                console.error("Failed to load tasks", e);
            }
        }
    }

    addTask(title: string, about: string) {
        this.tasks.push(new TaskObservable(title, about));
    }

    getTaskById(taskId: string) {
        let task: TaskObservable = this.tasks.find(d => d.id == taskId)!!
        return task
    }

    deleteTaskById(taskId: string) {
        let task: TaskObservable = this.tasks.find(d => d.id == taskId)!!
        let taskPos = this.tasks.indexOf(task)
        this.tasks.splice(taskPos, 1)
    }
}

export const taskHolderStore: TasksHolderStore = new TasksHolderStore()

reaction(
    () => taskHolderStore.tasks.map(t => ({ title: t.title, about: t.about })),
    (serializableTasks) => {
        localStorage.setItem('tasks', JSON.stringify(serializableTasks));
    },
    { fireImmediately: true } // чтобы сохранить при запуске, если есть данные
);
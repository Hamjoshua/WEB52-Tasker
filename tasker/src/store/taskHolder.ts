import { makeAutoObservable, reaction } from "mobx";
import { TaskObservable } from "../store/task.ts";

// todo этот класс может использовать const popup с enum параметрами

class TasksHolderStore {
    tasks: TaskObservable[] = []
    
    constructor() { 
        console.log("taskHolderStore inited!!")
        this.loadFromLocalStorage()
        makeAutoObservable(this)
    }

    saveEditedTask(taskId : string, draftTitle: string, draftAbout: string) {
        let task = this.getTaskById(taskId);
        if (task) {
            task.update(draftTitle, draftAbout);
        }
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
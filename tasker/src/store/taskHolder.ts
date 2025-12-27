import { makeAutoObservable, reaction } from "mobx";
import { TaskObservable } from "../store/task.ts";
import { Task } from "../components/Task.tsx";
import { arrayMove } from "@dnd-kit/sortable";

// todo этот класс может использовать const popup с enum параметрами

class TasksHolderStore {    
    tasks: TaskObservable[] = []

    constructor() {
        console.log("taskHolderStore inited!!")
        this.loadFromLocalStorage()
        makeAutoObservable(this)
    }

    reorderTasks(oldIndex: number, newIndex: number) {
        this.tasks = arrayMove(this.tasks, oldIndex, newIndex);
    }

    saveEditedTask(taskId: number, draftTitle: string, draftAbout: string) {
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
                parsed.forEach((t: any) => {
                    let task = new TaskObservable(this.tasks.length, t.title, t.about, t.pinned)
                    this.tasks.push(task)
                });
            } catch (e) {
                console.error("Failed to load tasks", e);
            }
        }
    }

    addTask(title: string, about: string) {
        this.tasks.push(new TaskObservable(this.tasks.length, title, about));
    }

    getTaskById(taskId: number) {
        let task: TaskObservable = this.tasks.find(d => d.id == taskId)!!
        return task
    }

    deleteTaskById(taskId: number) {
        let task: TaskObservable = this.tasks.find(d => d.id == taskId)!!
        let taskPos = this.tasks.indexOf(task)
        this.tasks.splice(taskPos, 1)
    }
}

export const taskHolderStore: TasksHolderStore = new TasksHolderStore()

reaction(
    () => taskHolderStore.tasks.map(t => ({ title: t.title, about: t.about, pinned: t.pinned })),
    (serializableTasks) => {
        localStorage.setItem('tasks', JSON.stringify(serializableTasks));
    },
    { fireImmediately: true } // чтобы сохранить при запуске, если есть данные
);
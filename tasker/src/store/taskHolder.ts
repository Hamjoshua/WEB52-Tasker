import { makeAutoObservable, reaction } from "mobx";
import { TaskObservable } from "../store/task.ts";
import Task from "../components/Task.jsx";

// todo этот класс может использовать const popup с enum параметрами

class TasksHolderStore {   
    tasks : TaskObservable[] = []

    constructor(){
        makeAutoObservable(this)
    }

    addTask(title: string, about: string) {
        this.tasks.push(new TaskObservable(title, about));
    }

    deleteTaskByIndex(index : number){
        this.tasks.splice(index, 1)
    }
}

export const taskHolderStore : TasksHolderStore = new TasksHolderStore()

reaction(
    () => taskHolderStore.tasks,
    (tasks, prevTasks) => {
        if(tasks != prevTasks){
            localStorage.setItem('tasks', JSON.stringify(tasks))
        }
    }
)
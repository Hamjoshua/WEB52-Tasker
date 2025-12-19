import { makeAutoObservable } from "mobx";
import { taskHolderStore } from "./taskHolder";

export class TaskObservable {
    id: string = ""
    title : string = ""
    about : string = ""    
    pinned : boolean = false

    constructor(currentTasksLength: number, title: string, about: string){
        makeAutoObservable(this)
        this.id = (currentTasksLength + 1).toString() // todo хехе весельчяк
        this.title = title
        this.about = about
    }

    update(title: string, about: string){
        this.title = title
        this.about = about
    }

    pin(){
        this.pinned = true
    }

    unpin(){
        this.pinned = false
    }
}
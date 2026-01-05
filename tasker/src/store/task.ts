import { makeAutoObservable } from "mobx";
import { taskHolderStore } from "./taskHolder";

export class TaskObservable {
    id: number = 0
    title : string = ""
    about : string = ""    
    pinned : boolean = false

    constructor(currentTasksLength: number, title: string, about: string, pinned: boolean = false){
        makeAutoObservable(this)
        this.id = currentTasksLength + 1 // todo хехе весельчяк
        this.title = title
        this.about = about
        this.pinned = pinned
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
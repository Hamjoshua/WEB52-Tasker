import { makeAutoObservable } from "mobx";

export class TaskObservable {
    id = Date.now().toString()
    title : string = ""
    about : string = ""    

    constructor(title: string, about: string){
        makeAutoObservable(this)
        this.title = title
        this.about = about
    }

    update(title: string, about: string){
        this.title = title
        this.about = about
    }
}
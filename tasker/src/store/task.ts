import { makeAutoObservable } from "mobx";

export class TaskObservable {
    id: string = ""
    title : string = ""
    about : string = ""    

    constructor(title: string, about: string){
        makeAutoObservable(this)
        this.id = Date.now().toString()
        this.title = title
        this.about = about
    }

    update(title: string, about: string){
        this.title = title
        this.about = about
    }
}
import { makeAutoObservable } from "mobx";

export class TaskObservable {
    title : string = ""
    about : string = ""    

    constructor(title: string, about: string){
        makeAutoObservable(this)
        this.title = title
        this.about = about
    }
}
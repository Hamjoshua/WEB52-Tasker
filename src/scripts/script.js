class Task {
    constructor(title, about) {
        this.title = title;
        this.about = about
    }

    edit(title, about) {
        this.title = title;
        this.about = about
    }
}

class TaskControl {
    constructor() {
        this.tasks = []
        this.task_container = document.getElementsByClassName("task-container")[0]
    }

    add(title, about) {
        let newTask = new Task(title, about)
        this.task_container.innerHTML += `<div class="card-with-actions" id="task${this.tasks.length}">
            <div class="card">
                <span class="task-title">${title}</span>
                <span class="task-about">${about}</span>
                <button class="btn-delete icon-delete"></button>
            </div>
            <div class="actions hidden">
                <button class="btn-icon icon-share"></button>
                <button class="btn-icon icon-info"></button>
                <button class="btn-icon icon-edit"></button>
            </div>
        </div>`
        this.tasks.push(newTask)
        checkIfNoTasks(this.tasks.length)
    }


}

var taskControl = new TaskControl()

document.querySelector(".btn-add").addEventListener('click', function (event) {
    let titleField = document.getElementById("titleField")
    let aboutField = document.getElementById("aboutField")

    let isOkey = titleField.checkValidity() && aboutField.checkValidity()
    titleField.reportValidity()
    aboutField.reportValidity()
    
    if (!isOkey) {
        return
    }
    taskControl.add(titleField.value, aboutField.value)
})

function checkIfNoTasks(len) {
    const no_tasks = document.getElementsByClassName("no-tasks")[0]
    no_tasks.classList.toggle("fully-hidden", len > 0);
}
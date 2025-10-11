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
        this.task_container.innerHTML += `
        <div class="card-with-actions">
            <div class="card" onclick="changeVisibilityOfActions(event)">
                <span class="task-title">${title}</span>
                <span class="task-about">${about}</span>                
            </div>
            <button class="btn-delete icon-delete" onclick="deleteTask(event)"></button>
            <div class="actions hidden">
                <button class="btn-icon icon-share"></button>
                <button class="btn-icon icon-info" onclick="showTaskPopup(event, false, ${title}, ${about})"></button>
                <button class="btn-icon icon-edit" onclick="showTaskPopup(event, true, ${title}, ${about})"></button>
            </div>
        </div>`
        this.tasks.push(newTask)
        checkIfNoTasks(this.tasks.length)
    }

    show() {
        console.log("yes sir")
    }

    delete(element) {
        let index = 0
        Array.from(this.task_container.children).forEach(child => {
            if (child == element) {
                return
            }
            ++index
        });

        this.task_container.removeChild(element)
        console.log(index)
        this.tasks.splice(index - 1, 1)

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

function deleteTask(event) {
    console.log(event.target.parentElement)
    taskControl.delete(event.target.parentElement)
}

function checkIfNoTasks(len) {
    const no_tasks = document.getElementsByClassName("no-tasks")[0]
    no_tasks.classList.toggle("fully-hidden", len > 0);
}

function changeVisibilityOfActions(event) {
    console.log("toggle req")
    let card_actions = event.target.parentElement // мы знаем, что вызов идет с title
    let actions = card_actions.querySelector(".actions")
    actions.classList.toggle("hidden")
    actions.classList.toggle("showed")
}

function showTaskPopup(event, isEdit, title, about) {
    let readonly = isEdit ? "" : "readonly"
    let editButtons = `
        <button class="btn-text" onclick="closePopup()">Cancel</button>
        <button class="btn-text">Save</button>
    `
    let viewButtons = `
        <button class="btn-text" onclick="closePopup()">Close</button>
    `

    document.body.innerHTML += `
        <div class="alert">
            <div class="bottomed task-info">
                <input type="text" value=${title} placeholder="Title..." id="popupTitleField" ${readonly}>
                <textarea class="text-area-maxed" placeholder="About..." id="popupAboutField" ${readonly}>${about}</textarea>
                <div class="task-info-buttons">
                    ${isEdit ? editButtons : viewButtons}
                </div>
            </div>
        </div>
    `
}

function closePopup(){
    let alertPopup = document.body.querySelector('.alert')
    console.log(alertPopup)
    document.body.removeChild(alertPopup)
}
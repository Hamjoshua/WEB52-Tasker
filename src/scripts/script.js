class Task {
    constructor(title, about) {
        this.title = title
        this.about = about
    }

    edit(title, about) {
        this.title = title
        this.about = about
    }
}

class PopupRenderer {
    static renderTaskInfoPopup(isEdit, task, index, onSave) {
        const popup = document.createElement('div')
        popup.className = 'alert'
        popup.innerHTML = `
            <div class="bottomed task-info popup">
                <input type="text" value="${task.title}" placeholder="Title..." id="popupTitleField" ${isEdit ? '' : 'readonly'}>
                <textarea class="text-area-maxed" placeholder="About..." id="popupAboutField" ${isEdit ? '' : 'readonly'}>${task.about}</textarea>
                <div class="task-info-buttons">
                    <button class="btn-text cancel">${isEdit ? 'Cancel' : 'Close'}</button>
                    ${isEdit ? '<button class="btn-text save">Save</button>' : ''}
                </div>
            </div>
        `

        popup.querySelector('.cancel').addEventListener('click', PopupRenderer.closePopup)

        let saveTask = popup.querySelector('.save')
        if (saveTask != null) {
            saveTask.addEventListener('click', function () {
                const titleInput = popup.querySelector('#popupTitleField')
                const aboutInput = popup.querySelector('#popupAboutField')
                onSave(index, titleInput.value, aboutInput.value)
                PopupRenderer.closePopup()
            })
        }

        document.body.appendChild(popup)
    }

    static renderShare() {
        const popup = document.createElement('div')
        popup.className = 'alert'
        popup.innerHTML = `
        <div class="share-popup">            
            <img class="share-icon" src="../assets/icons/copy.png">           
            <img class="share-icon" src="../assets/icons/vk.png">
            <img class="share-icon" src="../assets/icons/telegram.png">
            <img class="share-icon" src="../assets/icons/whatsapp.png">
            <img class="share-icon" src="../assets/icons/facebook.png">
        </div>
        `
        let imgs = popup.querySelectorAll(".share-icon")        
        imgs.forEach(elem => {            
            elem.addEventListener('click', PopupRenderer.closePopup)
        })

        document.body.appendChild(popup)
    }

    static renderDeletePopup(index, onDelete) {
        const popup = document.createElement('div')
        popup.className = 'alert'
        popup.innerHTML = `            
        <div class="task-delete popup">
            <span class="title">Delete this task?</span>
            <div class="task-info-buttons">
                <button class="btn-text yes">Yes</button>
                <button class="btn-text no">No</button>
            </div>
        </div>
        `

        popup.querySelector('.yes').addEventListener('click', function () {
            onDelete(index);
            PopupRenderer.closePopup();
        })
        popup.querySelector('.no').addEventListener('click', PopupRenderer.closePopup)

        document.body.appendChild(popup)
    }

    static closePopup() {
        let popup = document.body.querySelector('.alert')        
        document.body.removeChild(popup)
    }
}

class TaskRenderer {
    constructor(task_cont_selector, no_task_selector) {
        this.container = document.querySelector(task_cont_selector)
        this.no_task_selector = no_task_selector
    }

    checkIfNoTasks(len) {
        const no_tasks = document.querySelector(this.no_task_selector)
        no_tasks.classList.toggle("fully-hidden", len > 0)
    }

    render(tasks, onDelete, onView, onEdit) {
        this.container.innerHTML = ""

        this.checkIfNoTasks(tasks.length)

        tasks.forEach((task, index) => {
            const taskEl = this.createTaskElement(task, index)
            this.container.appendChild(taskEl)

            // Навешиваем действия
            const card = taskEl.querySelector('.card')
            const deleteBtn = taskEl.querySelector('.btn-delete')
            const shareBtn = taskEl.querySelector('.icon-share')
            const editBtn = taskEl.querySelector('.icon-edit')
            const infoBtn = taskEl.querySelector('.icon-info')

            card.addEventListener('click', () => this.onToggleActions(taskEl))
            deleteBtn.addEventListener('click', () => onDelete(index))
            shareBtn.addEventListener('click', PopupRenderer.renderShare)
            editBtn.addEventListener('click', () => onEdit(task, index, taskEl))
            infoBtn.addEventListener('click', () => onView(task))
        })
    }

    onToggleActions(taskEl) {
        let actions = taskEl.querySelector(".actions")
        actions.classList.toggle("hidden")
        actions.classList.toggle("showed")
    }

    createTaskElement(task, index) {
        const div = document.createElement('div')
        div.classList.add("card-with-actions")
        div.innerHTML = `
            <div class="card">
                <span class="task-title">${task.title}</span>
                <span class="task-about">${task.about}</span>                
            </div>
            <button class="btn-delete icon-delete"></button>
            <div class="actions hidden">
                <button class="btn-icon icon-share"></button>
                <button class="btn-icon icon-info"></button>
                <button class="btn-icon icon-edit"></button>
            </div>
        `
        return div
    }
}

class TaskControl {
    constructor(task_renderer) {
        this.tasks = []
        this.task_renderer = task_renderer
        this.bindAdd()
    }

    render() {
        this.task_renderer.render(
            this.tasks,
            (index) => this.delete(index),
            (task) => this.view(task),
            (task, index) => this.edit(task, index)
        )
    }

    bindAdd() {
        document.querySelector('.btn-add').addEventListener('click', (e) => {
            const titleField = document.getElementById('titleField')
            const aboutField = document.getElementById('aboutField')

            if (!titleField.checkValidity() || !aboutField.checkValidity()) {
                titleField.reportValidity()
                aboutField.reportValidity()
                return
            }

            this.add(titleField.value, aboutField.value)
            titleField.value = ''
            aboutField.value = ''
        })
    }

    add(title, about) {
        let task = new Task(title, about)
        this.tasks.push(task)
        this.render()
    }

    delete(index) {        
        PopupRenderer.renderDeletePopup(index, (index) => this.confirmDelete(index))
    }

    confirmDelete(index) {
        this.tasks.splice(index, 1)
        this.render()
    }

    view(task) {
        PopupRenderer.renderTaskInfoPopup(false, task, null, null)
    }

    edit(task, index) {
        PopupRenderer.renderTaskInfoPopup(true, task, index, (index, title, about) => this.saveChangings(index, title, about))
        this.render()
    }

    saveChangings(index, title, about) {
        this.tasks[index].edit(title, about)
        this.render()
    }
}

// ----

const task_renderer = new TaskRenderer('.task-container', '.no-tasks')
const task_сontrol = new TaskControl(task_renderer)
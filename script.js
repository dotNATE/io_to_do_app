class TodoList {
    constructor() {
        this.items = []
        this.container = document.querySelector('#todoListItems')
        this.form = document.querySelector('form')
        this.input = document.querySelector('form input')
        this.crosses = document.querySelectorAll('.listItemCross')
        this.checkboxes = document.querySelectorAll('.checkbox')
    }

    refreshToDoList() {
        this.container.innerHTML = ''
        this.items.forEach((todo) => {
            this.container.innerHTML += todo.generateToDoHTML()
        })

        this.crosses = document.querySelectorAll('.listItemCross')
        this.checkboxes = document.querySelectorAll('.checkbox')

        this.crosses.forEach((el) => {
            el.addEventListener('click', (e) => {
                let index = e.target.parentElement.dataset.id
                this.deleteTodo(index)
                this.refreshToDoList()
            })
        })
    }

    deleteTodo(index) {
        this.items.forEach((todo) => {
            if (todo.id == index) {
                let id = this.items.indexOf(todo)
                this.items.splice(id, 1)
            }
        })
    }
}

class TodoItem {
    constructor(todo) {
        this.id = TodoItem.generateId()
        this.todoString = todo
    }

    static generateId() {
        if (!this.latestId) this.latestId = 1
        else this.latestId++
        return this.latestId
    }

    generateToDoHTML() {
        let output = '<div class="todoListItem" data-id="'
        output += this.id
        output += '">'
        output += '<div class="checkbox">'
        output += '</div><p class="listItemText">'
        output += this.todoString
        output += '</p><img class="listItemCross" src="images/icon-cross.svg" alt="Delete list item"/>'
        output += '</div>'
        return(output)
    }
}

let todoList = new TodoList()

todoList.form.addEventListener('submit', (e) => {
    e.preventDefault()
    todoList.items.push(new TodoItem(todoList.input.value))
    todoList.input.value = ''
    todoList.refreshToDoList()
})
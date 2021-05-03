let themeToggleButton = document.querySelector('#toggleThemeButton')
let clearButton = document.querySelector('#clearCompleted')
let allFilterButton = document.querySelector('#filterAll')
let activeFilterButton = document.querySelector('#filterActive')
let completedFilterButton = document.querySelector('#filterCompleted')

class TodoList {
    constructor() {
        this.items = []
        this.container = document.querySelector('#todoListItems')
        this.form = document.querySelector('form')
        this.input = document.querySelector('form input')
        this.crosses = document.querySelectorAll('.listItemCross')
        this.checkboxes = document.querySelectorAll('.checkbox')
        this.counter = document.querySelector('#listItemCount')
    }

    displayAllItems() {
        this.container.innerHTML = ''
        this.items.forEach((todo) => {
            this.container.innerHTML += todo.generateToDoHTML()
        })
    }

    refreshToDoList() {
        this.crosses = document.querySelectorAll('.listItemCross')
        this.checkboxes = document.querySelectorAll('.checkbox')

        this.crosses.forEach((el) => {
            el.addEventListener('click', (e) => {
                let index = e.target.parentElement.dataset.id
                this.deleteTodo(index)
                this.displayAllItems()
                this.refreshToDoList()
            })
        })

        this.checkboxes.forEach((el) => {
            el.addEventListener('click', (e) => {
                let index = e.target.parentElement.dataset.id
                this.toggleChecked(index)
                this.displayAllItems()
                this.refreshToDoList()
            })
        })

        this.counter.textContent = this.items.length + ' item/s left'
    }

    deleteTodo(index) {
        this.items.forEach((todo) => {
            if (todo.id == index) {
                let id = this.items.indexOf(todo)
                this.items.splice(id, 1)
            }
        })
    }

    toggleChecked(index) {
        this.items.forEach((todo) => {
            if (todo.id == index) {
                let id = this.items.indexOf(todo)
                this.items[id].checked = !this.items[id].checked
            }
        })
    }

    displayActiveItems() {
        this.container.innerHTML = ''
        let items = this.items.filter(todo => !todo.checked)
        items.forEach((todo) => {
            this.container.innerHTML += todo.generateToDoHTML()
        })
    }

    displayCompletedItems() {
        this.container.innerHTML = ''
        let items = this.items.filter(todo => todo.checked)
        items.forEach((todo) => {
            this.container.innerHTML += todo.generateToDoHTML()
        })
    }
}

class TodoItem {
    constructor(todo) {
        this.id = TodoItem.generateId()
        this.todoString = todo
        this.checked = false
    }

    static generateId() {
        if (!this.latestId) this.latestId = 1
        else this.latestId++
        return this.latestId
    }

    generateToDoHTML() {
        let output = '<div class="todoListItem'
        if (this.checked) {
            output += ' checked'
        }
        output += '" data-id="'
        output += this.id
        output += '">'
        output += '<div class="checkbox'
        if (this.checked) {
            output += ' checked'
        }
        output += '">'
        output += '</div><p class="listItemText'
        if (this.checked) {
            output += ' checked'
        }
        output += '">'
        output += this.todoString
        output += '</p><img class="listItemCross'
        if (this.checked) {
            output += ' checked'
        }
        output +='" src="images/icon-cross.svg" alt="Delete list item"/>'
        output += '</div>'
        return(output)
    }
}

function toggleTheme() {
    let themeStyleSheet = document.querySelectorAll('link')[2]
    if (themeStyleSheet.href.includes('dark')) {
        themeStyleSheet.href = 'http://localhost:1234/todo-app-main/styles/light_theme.css'
    } else themeStyleSheet.href = 'http://localhost:1234/todo-app-main/styles/dark_theme.css'
}

let todoList = new TodoList()

todoList.form.addEventListener('submit', (e) => {
    e.preventDefault()
    todoList.items.push(new TodoItem(todoList.input.value))
    todoList.input.value = ''
    todoList.container.innerHTML += todoList.items[todoList.items.length - 1].generateToDoHTML()
    todoList.refreshToDoList()
})

themeToggleButton.addEventListener('click', toggleTheme)

clearButton.addEventListener('click', () => {
    todoList.items = todoList.items.filter(el => !el.checked === true)
    todoList.displayAllItems()
    todoList.refreshToDoList()
})

allFilterButton.addEventListener('click', () => {
    allFilterButton.classList.add('activeFilter')
    activeFilterButton.classList.remove('activeFilter')
    completedFilterButton.classList.remove('activeFilter')
    todoList.displayAllItems()
    todoList.refreshToDoList()
})

activeFilterButton.addEventListener('click', () => {
    allFilterButton.classList.remove('activeFilter')
    activeFilterButton.classList.add('activeFilter')
    completedFilterButton.classList.remove('activeFilter')
    todoList.displayActiveItems()
    todoList.refreshToDoList()
})

completedFilterButton.addEventListener('click', () => {
    allFilterButton.classList.remove('activeFilter')
    activeFilterButton.classList.remove('activeFilter')
    completedFilterButton.classList.add('activeFilter')
    todoList.displayCompletedItems()
    todoList.refreshToDoList()
})
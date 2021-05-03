function getTodos() {
    return JSON.parse(localStorage.getItem('todos'))
}

function saveTodos(todoItems) {
    localStorage.setItem('todos', JSON.stringify(todoItems))
}

async function displayTodoArray(todoArray) {
    const templateData = await fetch('todo_list.hbs')
    const templateText = await templateData.text()
    const template = await Handlebars.compile(templateText)
    todoListDisplay.innerHTML = await template({todos: todoArray})
}

function addToDoEventListeners() {
    let todoCheckboxes = document.querySelectorAll('.checkbox')
    let todoDeleteCrosses = document.querySelectorAll('.listItemCross')

    todoCheckboxes.forEach((el) => {
        if (el !== todoCheckboxes[0]) {
            el.addEventListener('click', (e) => {
                const todoId = Number(e.target.parentElement.dataset.id)
                const todos = getTodos()

                todos.forEach((el) => {
                    if (el.id === todoId) {
                        el.isCompleted = !el.isCompleted
                    }
                    saveTodos(todos)
                })

                displayTodoArray(getTodos())
                    .then(() => addToDoEventListeners())
            })
        }
    })
}

function toggleTheme() {
    let themeStyleSheet = document.querySelectorAll('link')[2]
    if (themeStyleSheet.href.includes('dark')) {
        themeStyleSheet.href = 'http://localhost:1234/todo-app-main/styles/light_theme.css'
    } else themeStyleSheet.href = 'http://localhost:1234/todo-app-main/styles/dark_theme.css'
}

let form = document.querySelector('form')
let todoListDisplay = document.querySelector('#todoListItems')
let themeToggleButton = document.querySelector('#toggleThemeButton')

let todoItems = getTodos()

if (!todoItems) {
    todoItems = []
} else {
    displayTodoArray(todoItems)
        .then(() => addToDoEventListeners())
}

themeToggleButton.addEventListener('click', toggleTheme)

form.addEventListener('submit', (e) => {
    e.preventDefault()

    let todoInput = document.querySelector('#todoInput')

    if (todoInput.value !== '' && todoInput.value !== null) {

        let todo = {
            id: new Date().getTime(),
            name: todoInput.value,
            isCompleted: false
        }

        todoItems.push(todo)
        saveTodos(todoItems)
        form.reset()
    }
    displayTodoArray(todoItems)
        .then(() => addToDoEventListeners())
    todoInput.focus()
})



















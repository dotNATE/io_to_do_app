let form = document.querySelector('form')
let todoListDisplay = document.querySelector('#todoListItems')
let themeToggleButton = document.querySelector('#toggleThemeButton')

let todoItems = { todos: JSON.parse(localStorage.getItem('todos')) }

function displayTodoArray(todoArray) {
    fetch('todo_list.hbs')
        .then((data) => data.text())
        .then((data) => {
            const template = Handlebars.compile(data)
            const html = template(todoArray)
            todoListDisplay.innerHTML = html
        })
}

function toggleTheme() {
    let themeStyleSheet = document.querySelectorAll('link')[2]
    if (themeStyleSheet.href.includes('dark')) {
        themeStyleSheet.href = 'http://localhost:1234/todo-app-main/styles/light_theme.css'
    } else themeStyleSheet.href = 'http://localhost:1234/todo-app-main/styles/dark_theme.css'
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
        localStorage.setItem('todos', JSON.stringify(todoItems))
        form.reset()
    }

    todoInput.focus()
})

if (!todoItems.todos) {
    todoItems = []
} else {
    displayTodoArray(todoItems)
}
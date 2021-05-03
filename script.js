let form = document.querySelector('form')
let todoListDisplay = document.querySelector('#todoListItems')
let themeToggleButton = document.querySelector('#toggleThemeButton')
let clearCompletedButton = document.querySelector('#clearCompleted')
let displayFilters = document.querySelectorAll('.filterText')

refreshTodoArray()

function getTodos() {
    return JSON.parse(localStorage.getItem('todos'))
}

function saveTodos(todoItems) {
    localStorage.setItem('todos', JSON.stringify(todoItems))
}

async function displayTodoArray() {
    const todoArray = getTodos()
    const templateData = await fetch('todo_list.hbs')
    const templateText = await templateData.text()
    const template = await Handlebars.compile(templateText)
    const displayTodos = filterTodoItems(checkActiveFilter(), todoArray)
    todoListDisplay.innerHTML = await template({todos: displayTodos})
}

function checkActiveFilter() {
    let result = ''
    displayFilters.forEach((el) => {
        if (el.classList.value === 'filterText activeFilter') {
            result = el.innerText
        }
    })
    return result
}

function filterTodoItems(activeFilterString, todos) {
    switch (activeFilterString) {
        case 'All':
            return todos
        case 'Active':
            return todos.filter((todo) => !todo.isCompleted)
        case 'Completed':
            return todos.filter((todo) => todo.isCompleted)
    }
}

function updateTodoCounter() {
    let todoCountDisplay = document.querySelector('#listItemCount')
    let todos = getTodos()
    todoCountDisplay.textContent = todos.length + ' item/s left'
}

function markTodoAsChecked(event) {
    const todoId = Number(event.target.parentElement.dataset.id)
    const todos = getTodos()
    todos.forEach((el) => {
        if (el.id === todoId) {
            el.isCompleted = !el.isCompleted
            saveTodos(todos)
        }
    })
    refreshTodoArray()
}

function crossClickDeleteTodo(event) {
    const todoId = Number(event.target.parentElement.dataset.id)
    const todos = getTodos()
    todos.forEach((el) => {
        if (el.id === todoId) {
            todos.splice(todos.indexOf(el), 1)
            saveTodos(todos)
        }
    })
    refreshTodoArray()
}

function addTodoEventListeners() {
    let todoCheckboxes = document.querySelectorAll('.checkbox')
    let todoDeleteCrosses = document.querySelectorAll('.listItemCross')
    todoCheckboxes.forEach((el) => {
        if (el !== todoCheckboxes[0]) {
            el.addEventListener('click', markTodoAsChecked)
        }
    })
    todoDeleteCrosses.forEach((el) => {
        el.addEventListener('click', crossClickDeleteTodo)
    })
}

function clearActiveFilter() {
    displayFilters.forEach((el) => {
        el.classList.remove('activeFilter')
    })
}

function refreshTodoArray() {
    updateTodoCounter()
    displayTodoArray()
        .then(() => addTodoEventListeners())
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
    let inputValue = todoInput.value
    if (inputValue !== '' && inputValue !== null) {
        let todos = getTodos()
        let todo = {
            id: new Date().getTime(),
            name: inputValue,
            isCompleted: false
        }
        todos.push(todo)
        saveTodos(todos)
    }
    form.reset()
    refreshTodoArray()
    todoInput.focus()
})

clearCompletedButton.addEventListener('click', (e) => {
    let todos = getTodos()
    saveTodos(todos.filter(el => !el.isCompleted))
    refreshTodoArray()
})

displayFilters.forEach((el) => {
    el.addEventListener('click', (e) => {
        clearActiveFilter()
        e.target.classList.add('activeFilter')
        refreshTodoArray()
    })
})







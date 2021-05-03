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
    const displayTodos = filterTodoItems(checkActiveFilter(), todoArray)
    updateTodoCounter()
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

function addTodoEventListeners() {
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
                        saveTodos(todos)
                    }
                })

                displayTodoArray(getTodos())
                    .then(() => addTodoEventListeners())
            })
        }
    })

    todoDeleteCrosses.forEach((el) => {
        el.addEventListener('click', (e) => {
            const todoId = Number(e.target.parentElement.dataset.id)
            const todos = getTodos()

            todos.forEach((el) => {
                if (el.id === todoId) {
                    todos.splice(todos.indexOf(el), 1)
                    saveTodos(todos)
                }
            })

            displayTodoArray(getTodos())
                .then(() => addTodoEventListeners())
        })
    })
}

function clearActiveFilter() {
    displayFilters.forEach((el) => {
        el.classList.remove('activeFilter')
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
let displayFilters = document.querySelectorAll('.filterText')

let todoItems = getTodos()

if (todoItems) {
    displayTodoArray(todoItems)
        .then(() => addTodoEventListeners())
}

themeToggleButton.addEventListener('click', toggleTheme)

form.addEventListener('submit', (e) => {
    e.preventDefault()

    let todoInput = document.querySelector('#todoInput')
    let inputValue = todoInput.value
    let todos = getTodos() ? getTodos() : []

    if (inputValue !== '' && inputValue !== null) {

        let todo = {
            id: new Date().getTime(),
            name: inputValue,
            isCompleted: false
        }

        todos.push(todo)
        saveTodos(todos)
    }

    form.reset()

    displayTodoArray(todos)
        .then(() => addTodoEventListeners())

    todoInput.focus()
})

displayFilters.forEach((el) => {
    el.addEventListener('click', (e) => {
        clearActiveFilter()
        e.target.classList.add('activeFilter')
        displayTodoArray(getTodos())
            .then(() => addTodoEventListeners())
    })
})







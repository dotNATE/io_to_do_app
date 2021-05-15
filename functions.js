function getTodos() {
    try {
        JSON.parse(localStorage.getItem('todos'))
    } catch {
        saveTodos([])
    }
    let todos = JSON.parse(localStorage.getItem('todos'))
    if (todos === null) {
        saveTodos([])
    }
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
    todos ? todoCountDisplay.textContent = todos.length + ' item/s left' : '0 items left'
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
        .then(() => refreshEventListeners())
}

function toggleTheme() {
    let themeStyleSheet = document.querySelectorAll('link')[2]
    if (themeStyleSheet.href.includes('dark')) {
        themeStyleSheet.href = 'http://localhost:1234/todo-app-main/styles/light_theme.css'
    } else themeStyleSheet.href = 'http://localhost:1234/todo-app-main/styles/dark_theme.css'
}

function handleDragStart(e) {
    this.style.opacity = '0.4'

    dragSrcEl = Number(this.dataset.id)
}

function handleDragOver(e) {
    e.preventDefault()
}

function handleDragEnter(e) {
    if (dragSrcEl !== this.dataset.id) {
        this.classList.add('over')
    }
}

function handleDragLeave(e) {
    this.classList.remove('over')
}

function handleDrop(e) {
    let todos = getTodos()
    let srcIndex = todos.findIndex(el => el.id === dragSrcEl)
    let draggedTodo = todos[srcIndex]
    let destId = e.target.dataset.id
    let destIndex = todos.findIndex(el => el.id === Number(destId))

    if (destIndex === srcIndex - 1) {
        todos[srcIndex] = todos[destIndex]
        todos[destIndex] = draggedTodo
    } else if (srcIndex !== destIndex) {
        todos.splice(srcIndex, 1)
        destIndex = todos.findIndex(el => el.id === Number(destId))
        todos.splice(destIndex + 1, 0, draggedTodo)
    }

    saveTodos(todos)

    refreshTodoArray()
}

function handleDragEnd(e) {
    let todoItems = document.querySelectorAll('.todoListItem')
    this.style.opacity = '1'

    todoItems.forEach((el) => {
        el.classList.remove('over')
    })
}

function addDragEventListeners() {
    let todoItems = document.querySelectorAll('.todoListItem')
    todoItems.forEach((el) => {
        el.addEventListener('dragstart', handleDragStart)
        el.addEventListener('dragover', handleDragOver)
        el.addEventListener('dragenter', handleDragEnter)
        el.addEventListener('dragleave', handleDragLeave)
        el.addEventListener('drop', handleDrop)
        el.addEventListener('dragend', handleDragEnd)
    })
}

function refreshEventListeners() {
    addTodoEventListeners()
    addDragEventListeners()
}
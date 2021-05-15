let form = document.querySelector('form')
let todoListDisplay = document.querySelector('#todoListItems')
let themeToggleButton = document.querySelector('#toggleThemeButton')
let clearCompletedButton = document.querySelector('#clearCompleted')
let displayFilters = document.querySelectorAll('.filterText')
let dragSrcEl = ''

refreshTodoArray()

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
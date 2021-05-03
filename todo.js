let form = document.querySelector('form')
let todoListDisplay = document.querySelector('#todoListItems')

let todoItems = { todos: JSON.parse(localStorage.getItem('todos')) }

if (!todoItems.todos) {
    todoItems = []
} else {
    displayTodoArray(todoItems)
}

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

function displayTodoArray(todoArray) {
    fetch('todo_list.hbs')
        .then((data) => data.text())
        .then((data) => {
            const template = Handlebars.compile(data)
            const html = template(todoArray)
            todoListDisplay.innerHTML = html
        })
}
let form = document.querySelector('form')
let todoInput = document.querySelector('#todoInput')

let todoItems = []

form.addEventListener('submit', (e) => {
    e.preventDefault()

    let newTodoTask = todoInput.value

    if (newTodoTask !== '' && newTodoTask !== null) {
        let todo = {
            id: new Date().getTime(),
            name: newTodoTask,
            isCompleted: false
        }
        todoItems.push(todo)
        localStorage.setItem('todos', JSON.stringify(todoItems))
    }
})
## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

### Built with

- Semantic HTML5 markup
- CSS3 & SCSS
- Flexbox
- CSS Grid
- Mobile-first workflow
- Vanilla JavaScript
- Gulp SASS compiler
- Handlebars

### What I learned

```javascript
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
  form.reset() // An easier way to reset forms that I'll use going forward
  refreshTodoArray()
  todoInput.focus() // Better for user experience
})
```

```javascript
// Learning about and utilising LocalStorage has been interesting but
// I think I could've been more efficient with the code below had a I
// known what to expect

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
```

### Continued development

- Add styling rules for multi-line todos
- Expandable todos?
- Make todos editable
- Hover effects for toggle theme button
- Update item counter text if on 0, 1, or multi todos
- Change page 'title' and icon
- Allow user to set default theme
- Add todo categories feature
- Add todo categories filter
- Replace checkboxes HTML with inputs?
- Make todos re-orderable
- Refactor CSS into SASS
- Collapsible todo list?

### Useful resources

- [CCS Tricks](https://css-tricks.com/)
- [Video Tutorial - Web Dev Simplified on YouTube](https://www.youtube.com/watch?v=jfYWwQrtzzY)

## Author

- [LinkedIn](https://www.linkedin.com/in/bristoldevguy/)
- [GitHub](https://github.com/dotNATE/)

## Acknowledgments

- [Frontend Mentor](https://www.frontendmentor.io/challenges)
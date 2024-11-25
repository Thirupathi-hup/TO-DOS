const todoInput = document.getElementById("todoInput");
const addButton = document.getElementById("addButton");
const todoList = document.getElementById("todoList");
const searchInput = document.getElementById("searchInput");

let todos = [];

// Function to load todos from localStorage
function loadTodos() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
    }
}

// Function to save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Function to render the Todo list based on the current todos array
function renderTodoList() {
    todoList.innerHTML = "";
    const searchTerm = searchInput.value.toLowerCase();

    todos.forEach((todo, index) => {
        if (todo.text.toLowerCase().includes(searchTerm)) {
            const taskItem = createTaskElement(todo, index);
            todoList.appendChild(taskItem);
        }
    });
}

// Create a task element
function createTaskElement(task, index) {
    const taskItem = document.createElement('li');
    taskItem.className = 'list-group-item d-flex justify-content-between align-items-center';
    taskItem.textContent = task.text;

    const buttonsContainer = document.createElement('div');

    // Edit button
    const editButton = document.createElement('button');
    editButton.className = 'btn btn-warning btn-sm mx-1';
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editTodo(index)); // Edit action
    buttonsContainer.appendChild(editButton);

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTodo(index)); // Delete action
    buttonsContainer.appendChild(deleteButton);

    taskItem.appendChild(buttonsContainer);
    return taskItem;
}

// Add a new task to the Todo list
function addTodo() {
    const inputText = todoInput.value.trim();
    if (inputText !== "") {
        const newTodo = {
            text: inputText,
        };
        todos.push(newTodo);
        todoInput.value = "";
        saveTodos(); // Save updated todos to localStorage
        renderTodoList();
    }
}

// Edit an existing task
function editTodo(index) {
    const newText = prompt("Edit your task:", todos[index].text);
    if (newText !== null && newText.trim() !== "") {
        todos[index].text = newText.trim();
        saveTodos(); // Save updated todos to localStorage
        renderTodoList();
    }
}

// Delete a task
function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos(); // Save updated todos to localStorage
    renderTodoList();
}

// Event listeners
addButton.addEventListener("click", addTodo);
searchInput.addEventListener("input", renderTodoList); // Filter tasks as user types in the search input

// Load todos from localStorage on page load
loadTodos();

// Initial render
renderTodoList();

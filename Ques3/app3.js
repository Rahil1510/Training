// app3.js

// Function to retrieve tasks from local storage
function getTasks() {
    var tasks = [];
    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}

// Function to save tasks to local storage
function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to render tasks from local storage
function renderTasks() {
    var todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    var tasks = getTasks();
    
    tasks.forEach(function(task, index) {
        var li = document.createElement('li');
        li.textContent = task.name;

        if (task.completed) {
            li.classList.add('completed');
        }

        var removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', function() {
            tasks.splice(index, 1);
            saveTasks(tasks);
            renderTasks();
        });

        var completeButton = document.createElement('button');
        completeButton.textContent = task.completed ? 'Undo' : 'Complete';
        completeButton.addEventListener('click', function() {
            task.completed = !task.completed;
            saveTasks(tasks);
            renderTasks();
        });

        li.appendChild(removeButton);
        li.appendChild(completeButton);
        todoList.appendChild(li);
    });
}

// Event listener for form submission
document.getElementById('todoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var taskInput = document.getElementById('todoInput');
    var taskName = taskInput.value.trim();

    if (taskName === '') {
        alert('Please enter a task!');
        return;
    }

    var tasks = getTasks();
    tasks.push({ name: taskName, completed: false });
    saveTasks(tasks);
    renderTasks();

    taskInput.value = '';
});

// Initial rendering of tasks
renderTasks();

document.addEventListener('DOMContentLoaded', function() {
    loadTasks();

    document.getElementById('addTaskButton').addEventListener('click', function() {
        const taskInput = document.getElementById('taskInput');
        const prioritySelect = document.getElementById('prioritySelect');
        const dueDateInput = document.getElementById('dueDateInput');
        const taskText = taskInput.value;
        const priority = prioritySelect.value;
        const dueDate = dueDateInput.value;

        if (taskText) {
            const li = document.createElement('li');
            li.textContent = `${taskText} (Due: ${dueDate}) - Priority: ${priority}`;
            li.classList.add(priority);

            const completeButton = document.createElement('button');
            completeButton.textContent = '✔️';
            completeButton.addEventListener('click', function() {
                li.classList.toggle('completed');
                saveTasks();
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '❌';
            deleteButton.addEventListener('click', function() {
                li.remove();
                saveTasks();
            });

            li.appendChild(completeButton);
            li.appendChild(deleteButton);
            document.getElementById('taskList').appendChild(li);

            taskInput.value = ''; // Clear the input field
            dueDateInput.value = ''; // Clear the due date field
            saveTasks();
        }
    });

    document.getElementById('clearCompletedButton').addEventListener('click', function() {
        const tasks = document.querySelectorAll('#taskList li.completed');
        tasks.forEach(task => task.remove());
        saveTasks();
    });

    document.getElementById('filterAllButton').addEventListener('click', function() {
        loadTasks();
    });

    document.getElementById('filterCompletedButton').addEventListener('click', function() {
        filterTasks('completed');
    });

    document.getElementById('filterPendingButton').addEventListener('click', function() {
        filterTasks('pending');
    });
});

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(task => {
        tasks.push({
            text: task.childNodes[0].textContent,
            completed: task.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear existing tasks

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) {
            li.classList.add('completed');
        }

        const completeButton = document.createElement('button');
        completeButton.textContent = '✔️';
        completeButton.addEventListener('click', function() {
            li.classList.toggle('completed');
            saveTasks();
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.addEventListener('click', function() {
            li.remove();
            saveTasks();
        });

        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

function filterTasks(status) {
    const tasks = document.querySelectorAll('#taskList li');
    tasks.forEach(task => {
        if (status === 'completed' && !task.classList.contains('completed')) {
            task.style.display = 'none';
        } else if (status === 'pending' && task.classList.contains('completed')) {
            task.style.display = 'none';
        } else {
            task.style.display = 'flex';
        }
    });
}

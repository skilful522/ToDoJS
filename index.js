const addButton = document.querySelector("#addButton");
const textInput = document.querySelector('#textInput');
const dateInput = document.querySelector("#dateInput");
const tasksContainer = document.querySelector('#tasks-container');


addButton.addEventListener('click', () => {
    addContainer();
    cleanInputs();
});

function cleanInputs() {
    textInput.value = '';
    dateInput.value = '';
}

function createContainer(className, id) {
    const container = document.createElement('div');
    container.className = className;
    container.id = id;
    return container;
}


function createButton(id, innerText, color) {
    const button = document.createElement('button');
    button.id = id;
    button.innerText = innerText;
    button.style.color = color;
    return button;
}

function checkTextInput(textInput, divText) {
    if (textInput.value !== '') {
        divText.innerText = textInput.value;
    }
}

function createTaskDiv() {
    const taskDiv = document.createElement('div');
    taskDiv.id = 'task';
    checkTextInput(textInput, taskDiv);
    return taskDiv;
}

function createDateDiv() {
    const dateDiv = document.createElement('div');
    const date = moment().format('YYYY-MM-DD');
    dateDiv.id = 'date';
    dateDiv.innerText = dateInput.value;
    if (dateDiv.innerText === '') {
        dateDiv.innerText = date;
    }
    return dateDiv;
}

function addContainer() {
    const task = addElementIntoContainer();
    if (task !== undefined) {
        tasksContainer.appendChild(task);
    }
}

tasksContainer.addEventListener('click', (event) => {
    const taskContainer = document.querySelectorAll('.task-container');
    const delButtons = document.querySelectorAll('#delButton');
    const doneButtons = document.querySelectorAll('#doneButton');
    const tasks = document.querySelectorAll("#task");
    const dates = document.querySelectorAll("#date");
    //  removeTask(delButtons, event, taskContainer, tasksContainer);

    for (let i = 0; i < delButtons.length; i++) {
        if (event.target === delButtons[i]) {
            for (let i = 0; i < taskContainer.length; i++) {
                if (event.target.parentNode.id === taskContainer[i].id) {
                    tasksContainer.removeChild(taskContainer[i]);
                }
            }
        } else if (event.target === doneButtons[i]) {
            if (event.target.style.color === 'green') {
                visualizeTask(doneButtons[i], tasks[i], dates[i], 'gray', 'line-through');
            } else {
                visualizeTask(doneButtons[i], tasks[i], dates[i], 'green', 'none');
            }
        }
    }

});

function visualizeTask(button, task, date, color, textDecoration) {
    button.style.color = color;
    task.style.textDecoration = textDecoration;
    date.style.textDecoration = textDecoration;
}

/*function removeTask(buttons, event, taskContainer, tasksContainer) {
    buttons.forEach(function (button) {
        if (event.target === button) {
            taskContainer.forEach(function (task) {
                if (event.target.parentNode.id === task.id) {
                    tasksContainer.removeChild(task);
                }

            })
        }
    })
} */


function addElementIntoContainer() {
    const id = Date.now();
    const container = createContainer('task-container', id);
    const taskDateContainer = createContainer('task-date-container', id);
    const delBtn = createButton('delButton', '✖', 'red');
    const doneBtn = createButton('doneButton', '✓', 'green');
    const taskDiv = createTaskDiv();
    const timeDiv = createDateDiv();

    taskDateContainer.appendChild(taskDiv);
    container.appendChild(taskDateContainer);
    if (taskDiv.innerText !== '') {
        taskDateContainer.appendChild(timeDiv);
        container.appendChild(doneBtn);
        container.appendChild(delBtn);
        return container;
    }
}


const addButton = document.querySelector("#addButton");
const inputContainer = document.querySelector("#input-container");
const textInput = document.querySelector('#textInput');
const dateInput = document.querySelector("#dateInput");
const mainContainer = document.querySelector("#container");

addButton.addEventListener('click', () => {
    addContainer();
    cleanInputs();
});

function cleanInputs() {
    textInput.value = '';
    dateInput.value = '';
}

function createContainer() {
    const container = document.createElement('div');
    container.className = 'task-container';
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
        inputContainer.before(task);
    }
}

mainContainer.addEventListener('click', (event) => {
    const task = document.querySelector("#task");
    const date = document.querySelector("#date");
    if (event.target === document.querySelector('#doneButton')) {
        task.style.textDecoration = 'line-through';
        date.style.textDecoration = 'line-through';
    }
});

/* doneBtn.addEventListener('click', function (textDiv) {
        doneHandler(textDiv);
    });*/


function addElementIntoContainer() {
    const container = createContainer();
    const delBtn = createButton('delButton', '✖', 'red');
    const doneBtn = createButton('doneButton','✓', 'green');
    const taskDiv = createTaskDiv();
    const timeDiv = createDateDiv();

    container.appendChild(taskDiv);
    if (taskDiv.innerText !== '') {
        container.appendChild(timeDiv);
        container.appendChild(doneBtn);
        container.appendChild(delBtn);
        return container;
    }
}


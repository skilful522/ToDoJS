const addButton = document.querySelector("#addButton");
const inputContainer = document.querySelector("#input-container");
const textInput = document.querySelector('#textInput');
const dateInput = document.querySelector("#dateInput");


addButton.addEventListener('click', () => {
    addContainer();
    cleanInput(textInput, dateInput);
});

function cleanInput(textInput, dateInput) {
    textInput.value = '';
    dateInput.value = '';
}


// Класс нужен лишь для того, чтобы навесить стили
function createContainer() {
    const container = document.createElement('div');
    container.className = 'task-container';
    return container;
}


function createButton(id,innerText,color) {
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
    const today = new Date();
    const date = today.getFullYear()+'-0'+(today.getMonth()+1)+'-'+today.getDate();
    dateDiv.id = 'date';
    dateDiv.innerText = dateInput.value;
    if (dateDiv.innerText === '') {
        dateDiv.innerText = date;
    }
    console.log(dateInput.value);
    return dateDiv;
}


function addContainer() {
    const task = addElementIntoContainer();
    if (task !== undefined) {
        inputContainer.before(task);
    }
}


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


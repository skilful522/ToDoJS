const addButton = document.querySelector("#addButton");
const inputContainer = document.querySelector("#input-container");
const textInput = document.querySelector('#textInput');
const dateInput = document.querySelector("#dateInput");


addButton.addEventListener('click', function () {
    addContainer();
    cleanTextInput();
    cleanDateInput();
});

function cleanTextInput() {
    textInput.value = '';
}

function cleanDateInput() {
    dateInput.value = '';
}

function createContainer() {
    const container = document.createElement('div');
    container.id = 'task-container';
    return container;
}


function createDoneBtn() {
    const doneButton = document.createElement('button');
    doneButton.id = 'doneButton';
    doneButton.innerText = '✓';
    doneButton.style.color = 'green';
    return doneButton;
}

function createDelButton() {
    const delButton = document.createElement('button');
    delButton.id = 'delButton';
    delButton.innerText = '✖';
    delButton.style.color = 'red';
    return delButton;
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
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
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
    const delBtn = createDelButton();
    const doneBtn = createDoneBtn();
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


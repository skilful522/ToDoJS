const addButton = document.querySelector("#addButton");
const textInput = document.querySelector('#textInput');
const dateInput = document.querySelector("#dateInput");
const tasksContainer = document.querySelector('#tasks-container');
const taskArr = [];
const dateArr = [];
const untouchableTasksArr = [];
const untouchableDatesArr = [];
const sortAlphabetButton = document.querySelector("#sortAlphabet");
const sortDateButton = document.querySelector("#sortDate");
const filterInput = document.querySelector("#filterInput");
const filterDate = document.querySelector('#filterDate');
const multiFilterButton = document.querySelector('#multiFilter');
let sortAlphabetCounter = 0;
let sortDateCounter = 1;

addButton.addEventListener('click', () => {
    addContainer();
    resetSortTasks('taskArr');
    resetSortDates('dateArr');
    showTasksContainer();
    cleanInputs();
});

filterInput.addEventListener('keydown', startInputFilter);

filterDate.addEventListener('keydown', startDateFilter);

multiFilterButton.addEventListener('click', (event) => {
    startInputFilter(event.button);
    startDateFilter(event.button);
});

sortAlphabetButton.addEventListener('click', () => {
    const tasks = document.querySelectorAll('#task');

    if (taskArr.length > 1) {
        sortAlphabetCounter++;
        if (sortAlphabetCounter === 1) {
            const sortedTasks = taskArr.sort();

            for (let i = 0; i < tasks.length; i++) {
                tasks[i].innerText = sortedTasks[i];
            }
        } else if (sortAlphabetCounter === 2) {
            const sortedReversedTasks = taskArr.sort().reverse();

            for (let i = 0; i < tasks.length; i++) {
                tasks[i].innerText = sortedReversedTasks[i];
                sortAlphabetCounter = 0;
            }
        }
    }

});

sortDateButton.addEventListener('click', () => {
    sortByDate(sortDateCounter);
});

tasksContainer.addEventListener('click', (event) => {
    const taskContainer = document.querySelectorAll('.task-container');
    const delButtons = document.querySelectorAll('#delButton');
    const doneButtons = document.querySelectorAll('#doneButton');
    const taskDateContainer = document.querySelectorAll(".task-date-container");

    for (let i = 0; i < delButtons.length; i++) {
        if (event.target === delButtons[i]) {
            for (let i = 0; i < taskContainer.length; i++) {
                if (event.target.parentNode.id === taskContainer[i].id) {
                    tasksContainer.removeChild(taskContainer[i]);
                }
            }
        } else if (event.target === doneButtons[i]) {
            if (event.target.style.color === 'green') {
                taskDateContainer[i].classList.toggle('task-date-container-cross');
            }
        }
    }

});

function resetSortTasks(unsortedTasks) {
    const tasks = document.querySelectorAll('#task');

    if (textInput.value !== '') {
        untouchableTasksArr.push(textInput.value);
    }
    let storedTasks = JSON.parse(localStorage.getItem(unsortedTasks));

    localStorage.setItem(unsortedTasks, JSON.stringify(untouchableTasksArr));
    if (storedTasks) {
        for (let i = 0; i < tasks.length - 1; i++) {
            tasks[i].innerText = storedTasks[i];
        }
    }
}

function resetSortDates(unsortedDates) {
    const dates = document.querySelectorAll("#date");
    const date = moment().format('YYYY-MM-DD');

    if (dateInput.value === '' && textInput.value !== '') {
        untouchableDatesArr.push(date);
    } else if (textInput.value !== '') {
        untouchableDatesArr.push(dateInput.value);
    }
    let storedDates = JSON.parse(localStorage.getItem(unsortedDates));

    localStorage.setItem(unsortedDates, JSON.stringify(untouchableDatesArr));
    if (unsortedDates) {
        for (let i = 0; i < dates.length - 1; i++) {
            dates[i].innerText = storedDates[i];
        }
    }
}

function startDateFilter(event) {
    const dates = document.querySelectorAll("#date");
    let userFilterDate = filterDate.value;

    if (event.keyCode === 13 || event === 0) {
        if (userFilterDate === '') {
            for (let i = 0; i < dates.length; i++) {
                dates[i].parentNode.parentNode.style.display = 'flex';
            }
        } else {
            for (let i = 0; i < dateArr.length; i++) {
                if (userFilterDate !== dateArr[i]) {
                    dates[i].parentNode.parentNode.style.display = 'none';
                }
            }
        }
    }
}

function showTasksContainer() {
    const tasks = document.querySelectorAll('#task');
    if (tasks) {
        for (let i = 0; i < tasks.length; i++) {
            tasks[i].parentNode.parentNode.style.display = 'flex';
        }
    }

}

function startInputFilter(event) {
    const tasks = document.querySelectorAll('#task');
    let userFilterInput = filterInput.value;

    if (event.keyCode === 13 || event === 0) {
        if (filterInput.value === '') {
            for (let i = 0; i < tasks.length; i++) {
                tasks[i].parentNode.parentNode.style.display = 'flex';
            }

        } else {
            const filteredTaskArr = taskArr.filter(function (value) {
                return value.indexOf(userFilterInput) >= 0;
            });

            for (let i = 0; i < taskArr.length; i++) {
                for (let j = 0; j < filteredTaskArr.length; j++) {
                    if (taskArr[i] === filteredTaskArr[j]) {
                        tasks[i].parentNode.parentNode.style.display = 'flex';
                        break;
                    } else {
                        tasks[i].parentNode.parentNode.style.display = 'none';
                    }
                }
            }
            filterInput.value = '';
        }
    }
}

function sortByDate(counter) {
    const dates = document.querySelectorAll('#date');

    if (dateArr.length > 1) {
        sortDateCounter++;
        if (counter === 1) {
            const sortedDates = dateArr.sort(function (first, second) {
                return new Date(second) - new Date(first);
            });

            for (let i = 0; i < dates.length; i++) {
                dates[i].innerText = sortedDates[i];
            }
        } else if (counter === 2) {
            const reversedSortedDates = dateArr.sort(function (first, second) {
                return new Date(first) - new Date(second);
            });

            for (let i = 0; i < dates.length; i++) {
                dates[i].innerText = reversedSortedDates[i];
            }
            sortDateCounter = 1;
        }
    }
}

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
    if (taskDiv.innerText !== ''){
        taskArr.push(taskDiv.innerText);
    }
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
    dateArr.push(dateDiv.innerText);
    return dateDiv;
}

function addContainer() {
    const task = addElementIntoContainer();

    if (task !== undefined) {
        tasksContainer.appendChild(task);
    }

}

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


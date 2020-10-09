// ______________
// DOM ELEMENTS
// --------------
var todoList = document.querySelector('.todo-list');
var addTodoBtn = document.querySelector('#addTodoBtn');
var todoInput = document.querySelector('#todoInput');

// _________________
// event listeners
// -----------------
addTodoBtn.addEventListener('click', (e) => {
	createTodo(todoInput.value);
});
document.addEventListener('keydown', function (e) {
	if (e.key === 'Enter') {
		createTodo(todoInput.value);
	}
});

document.addEventListener('click', (e) => {
	let parent = e.target.parentElement;
	let targ = e.target;
	if (parent.classList.contains('todo-item') && targ.classList.contains('complete-box')) {
		newCompletion(parent.id);
	}
});

// would be server array of objects
var todos = [];

// ____________________
// utility functions
//---------------------
var rndId = function () {
	return '_' + Math.random().toString(36).substr(2, 9);
};

// _______________
// CLASS OBJECT
// ---------------
class Todo {
	constructor(note) {
		this.note = note;
		this.completed = false;
		this.id = rndId();
	}

	toggleComplete() {
		this.completed = !this.completed ? true : false;
	}
}

// ________________________
// TODO RELATED FUNCTIONS
// ------------------------
function createTodo(note) {
	if (todoInput.value != '') {
		const newTodo = new Todo(note);
		todos.push(newTodo);
		renderTodos();
	}
}

function getTodoIndex(id) {
	let index;
	todos.map((todo, i) => {
		if (todo.id == id) {
			index = i;
		}
	});
	return index;
}

function newCompletion(id) {
	let index = getTodoIndex(id);
	if (todos[index].completed == false) {
		todos[index].completed = true;
	} else {
		todos[index].completed = false;
	}
	renderTodos();
}
// todos = [new Todo('some stuf'), new Todo('even more'), new Todo('sort them all')];

function renderTodos() {
	todoList.innerHTML = '';
	todos.sort((a, b) => (a.completed > b.completed ? 1 : -1));
	for (let i = 0; i < todos.length; i++) {
		let todo = todos[i];
		let statusClass = todo.completed ? 'completeBox' : 'incompleteBox';
		let completedStyle = todo.completed ? 'completed-todo' : '';
		let todoTemplate = `
            <div class="todo-item ${completedStyle}" id='${todo.id}'>
                <p>${todo.note}</p>
                <div class="complete-box ${statusClass}"></div>
            </div>
        `;
		todoList.insertAdjacentHTML('beforeend', todoTemplate);
	}
	todoInput.value = ``;
}

renderTodos();

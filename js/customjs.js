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
	if (parent.classList.contains('todo-item') && targ.classList.contains('complete-icon')) {
		completeToggle(parent.id);
	}
});

// would be server array of objects
let todos = [];
if (localStorage.getItem('todos')) {
	todos = localStorage.getItem('todos');
}
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
		localStorage.removeItem(todos);
		localStorage.setItem(todos);
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

function completeToggle(id) {
	let index = getTodoIndex(id);
	let el = document.getElementById(id);
	if (todos[index].completed == false) {
		todos[index].completed = true;
		el.getElementsByTagName('p')[0].style.textDecoration = 'line-through';
	} else {
		todos[index].completed = false;
	}
	renderTodos();
}

todos = [new Todo('some stuf'), new Todo('even more'), new Todo('sort them all')];

function renderTodos() {
	todoList.innerHTML = '';

	// separate completed from incompleted on list
	todos.sort((a, b) => (a.completed > b.completed ? 1 : -1));

	// print todo template for all todos
	for (let i = 0; i < todos.length; i++) {
		let todo = todos[i];
		let todoClasses = todo.completed ? 'completed-todo todo-item ' : 'todo-item ';
		let todoIconClasses = todo.completed ? 'fa-check-circle completeBox' : 'fa-circle incompleteBox';

		let newTodo = `
            <div class="${todoClasses}" id='${todo.id}'>
                <p>${todo.note}</p>
				<i class="complete-icon far ${todoIconClasses}"></i>
            </div>
        `;
		todoList.insertAdjacentHTML('beforeend', newTodo);
	}
	todoInput.value = ``;
}

renderTodos();

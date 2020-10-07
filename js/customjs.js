var todoList = document.querySelector('.todo-list');
var addTodoBtn = document.querySelector('#addTodoBtn');
var todoInput = document.querySelector('#todoInput');

addTodoBtn.addEventListener('click', addTodo);
document.addEventListener('keydown', function (e) {
	if (e.key === 'Enter') {
		addTodo();
	}
});

function addTodo() {
	console.log('it adds stuff');
	let todo = todoInput.value;
	let todoTemplate = `
        <div class="todo-item">
            <p>${todo}</p>
            <div class="complete-box"></div>
        </div>
    `;
	if (todo != '') {
		todoList.insertAdjacentHTML('beforeend', todoTemplate);
	}
	todoInput.value = ``;
}

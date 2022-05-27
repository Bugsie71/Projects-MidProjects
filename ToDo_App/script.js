const formText = document.querySelector('#form-text')
const form = document.querySelector('form')

// Add Local Storage Information to Page
const lsTodos = JSON.parse(localStorage.getItem('lsTodos'))

if (lsTodos) {
	lsTodos.forEach((todo) => {
		addTodo(todo)
	})
}

// Add a Todo
form.addEventListener('submit', (e) => {
	e.preventDefault();
	addTodo()
})

function addTodo(todo) {
	const todos = document.querySelector('.todos')
	let input = formText.value
	
	if (todo) {
		input = todo
	}

	if (input) {
		let todoEl = document.createElement('li')
		todoEl.classList = 'todo'
		todoEl.innerHTML = `${input}<button><i class="fa-solid fa-x"></i></button>`;
		formText.value = "";
		todos.append(todoEl);
		updateLS()

// Remove Selected Todo
		const del = todoEl.children[0]
		del.addEventListener('click', () => {
			todoEl.remove();
			updateLS()
		})
	}
}

// Local Storage Updating
function updateLS() {
	const allTodos = document.querySelectorAll('li')
	let arrTodos = []

	allTodos.forEach((todo) => {
		arrTodos.push(todo.innerText)
	})

	localStorage.setItem('lsTodos', JSON.stringify(arrTodos))
}
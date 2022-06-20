const allNotes = document.querySelector('.allNotes');
const addBtn = document.querySelector('.addBtn');
const notes = JSON.parse(window.localStorage.getItem("allNotes"));

if (notes) {
	notes.forEach((note) => {
        createNote(note);
    });
}

addBtn.addEventListener('click', () => createNote())
document.addEventListener('visibilitychange', () => updateLS())

function createNote(note = '') {
	const noteEl = document.createElement('div');
	noteEl.classList.add('note');

	noteEl.innerHTML = `
	<section class="tools">
		<span id="colorValue">#000000</span>
		<input id="color" type="color">
		<button id="bold"><i class="fa-solid fa-bold"></i></button>
		<button id="italic"><i class="fa-solid fa-italic"></i></button>
		<button id="underline"><i class="fa-solid fa-underline"></i></button>
		<button id="delete" ><i class="fa-solid fa-trash-can"></i></button>
	</section>
	<div class="text" contenteditable="true">${note}</div>
	`;

	const deleteBtn = noteEl.querySelector('#delete')
	const bold = noteEl.querySelector('#bold');
	const italic = noteEl.querySelector('#italic');
	const underline = noteEl.querySelector('#underline');
	const color = noteEl.querySelector('#color')
	const colorValue = noteEl.querySelector('#colorValue')

	deleteBtn.addEventListener('click', () => noteEl.remove())
	bold.addEventListener('click', () => {document.execCommand('bold')})
	italic.addEventListener('click', () => {document.execCommand('italic')})
	underline.addEventListener('click', () => {document.execCommand('underline')})
	color.addEventListener("input", () => {
		document.execCommand("forecolor", false, color.value)
		colorValue.innerHTML = color.value
	});

	allNotes.append(noteEl);
}

function updateLS() {
	let allText = [];
	const allNoteText = document.querySelectorAll('.text');
	allNoteText.forEach((text) => {
		allText.push(text.innerHTML)
	})

	window.localStorage.setItem('allNotes', JSON.stringify(allText))
}
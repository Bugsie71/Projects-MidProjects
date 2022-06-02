const quizData = [
	{
		question: 'What is 2 + 2?',
		a: 2,
		b: 3,
		c: 4,
		d: 5,
		correctAnswer: 'c',
	},
	{
		question: 'What is the most important tool to have camping?',
		a: 'Knife',
		b: 'Fire Starter',
		c: 'Metal Pot',
		d: 'Bow & Arrows',
		correctAnswer: 'a',
	},
	{
		question: 'What game is considered a FPS?',
		a: 'League of Legends',
		b: 'Minecraft',
		c: 'Valorant',
		d: 'Roblox',
		correctAnswer: 'c',
	},
	{
		question: 'Which motorcycle is faster?',
		a: 'Yamaha MT 03',
		b: 'Yamaha YZF R7',
		c: 'Yamaha YZF R6',
		d: 'Yamaha MT 07',
		correctAnswer: 'c',
	},
	{
		question: 'Will I get a coding job?',
		a: 'Yes',
		b: 'No',
		c: 'Both A & B',
		d: 'All of the Above',
		correctAnswer: 'a',
	}
]
const quizForm = document.querySelector('.quizForm');
const question = document.querySelector('.question');
const answerA = document.querySelector('.a');
const answerB = document.querySelector('.b');
const answerC = document.querySelector('.c');
const answerD = document.querySelector('.d');
const ul = document.querySelector("ul");
const submitBtn = document.querySelector('.submit')
const radioBtns = document.querySelectorAll("ul input");

let currentQuiz = 0;
let score = 0;

function updateQuiz() {
	let currentQuizData = quizData[currentQuiz];

	question.textContent = currentQuizData.question;
	answerA.textContent = currentQuizData.a;
	answerB.textContent = currentQuizData.b;
	answerC.textContent = currentQuizData.c;
	answerD.textContent = currentQuizData.d;
}

updateQuiz();

quizForm.addEventListener('submit', (e) => {
	e.preventDefault();

	let currentQuizData = quizData[currentQuiz];

// check for answer & uncheck radio buttons
	radioBtns.forEach((btn) => {
		if (btn.checked) {
			btn.checked = false
			currentQuiz++;
// check for correct answer
			if (btn.id === currentQuizData.correctAnswer) {
				score++
			}
		}
	})

	if (currentQuiz >= quizData.length) {
// ending page
		question.textContent = `You got ${score} out of ${quizData.length} correct!`;
		ul.style.display = 'none';
		submitBtn.textContent = 'Try again'
		submitBtn.addEventListener('click', () => {
			window.location.reload();
		})
	} else {
		updateQuiz();
	}
})
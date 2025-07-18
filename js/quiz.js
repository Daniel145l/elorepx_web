const questions = [
  {
    title: 'Questão 01',
    text: 'Qual planeta é conhecido como o planeta vermelho?',
    answers: [
      { label: 'A', text: 'Terra', correct: false },
      { label: 'B', text: 'Vênus', correct: false },
      { label: 'C', text: 'Marte', correct: true },
      { label: 'D', text: 'Júpiter', correct: false },
    ],
  },
  {
    title: 'Questão 02',
    text: 'É a estrela mais próxima da Terra?',
    answers: [
      { label: 'A', text: 'Proxima Centauri', correct: false },
      { label: 'B', text: 'Sol', correct: true },
      { label: 'C', text: 'Sirius', correct: false },
      { label: 'D', text: 'Alpha Centauri', correct: false },
    ],
  },
];

let currentIndex = 0;
let answered = Array(questions.length).fill(null); // Agora guarda objetos
let correctCount = 0;
let answeredCount = 0;

const questionTitle = document.querySelector('[data-question-title]');
const questionText = document.querySelector('[data-question-text]');
const answersList = document.querySelector('[data-answers-list]');
const navList = document.querySelector('[data-side-list]');
const nextButton = document.querySelector('[data-next-button]');
const correctCounter = document.querySelector('[data-correct-answers-counter]');
const answeredCounter = document.querySelector('[data-questions-answered-counter]');

function renderQuestion(index) {
  const question = questions[index];
  questionTitle.textContent = question.title;
  questionText.textContent = question.text;
  answersList.innerHTML = '';

  const savedAnswer = answered[index];

  question.answers.forEach((answer, i) => {
    const li = document.createElement('li');
    li.className = 'bg-gray-100 p-2.5 border border-transparent rounded-xl flex gap-3 items-start hover:border-black transition-all cursor-pointer';
    li.setAttribute('role', 'button');
    li.setAttribute('tabindex', '0');
    li.dataset.index = i;

    const span = document.createElement('span');
    span.className = 'bg-[#DDDDDD] p-3 rounded-sm flex items-center justify-center size-5 text-sm';
    span.textContent = answer.label;

    const p = document.createElement('p');
    p.className = 'line-clamp-2 text-sm';
    p.textContent = answer.text;

    li.append(span, p);
    answersList.appendChild(li);

    // Aplicar estilos se a questão já foi respondida
    if (savedAnswer?.answered) {
      if (i === savedAnswer.selectedIndex) {
        li.classList.add(answer.correct ? 'correct-answer' : 'wrong-answer');
      } else if (answer.correct) {
        li.classList.add('correct-answer');
      }
    }
  });

  updateCurrentNavItem(index);
}

function renderNav() {
  navList.innerHTML = '';
  questions.forEach((q, i) => {
    const li = document.createElement('li');
    li.className = `h-[72px] flex items-center p-4 gap-2 hover:bg-gray-100 transition-colors cursor-pointer`;
    li.setAttribute('role', 'button');
    li.setAttribute('tabindex', '0');
    li.dataset.navIndex = i;

    const iconDiv = document.createElement('div');
    const saved = answered[i];

    let icon = 'brain';
    let iconClass = 'default-answer-nav-btn';

    if (saved?.answered) {
      if (saved.correct) {
        icon = 'badge-check';
        iconClass = 'correct-answer-nav-btn';
      } else {
        icon = 'badge-alert';
        iconClass = 'wrong-answer-nav-btn';
      }
    }

    iconDiv.className = `${iconClass} flex items-center justify-between rounded-full`;
    iconDiv.innerHTML = `<i data-lucide="${icon}" class="size-7 stroke-[1.5]"></i>`;

    const textDiv = document.createElement('div');
    textDiv.innerHTML = `
      <strong class="text-sm font-medium tracking-[-0.5px]">${q.title}</strong>
      <span class="line-clamp-1 text-sm text-[#495057] tracking-[-0.5px]">${q.text}</span>
    `;

    li.append(iconDiv, textDiv);
    navList.appendChild(li);
  });

  lucide.createIcons();
}

function updateCurrentNavItem(index) {
  navList.querySelectorAll('li').forEach((li, i) => {
    li.classList.toggle('current-question', i === index);
    li.setAttribute('aria-current', i === index ? 'true' : 'false');
  });
}

function updateCounters() {
  correctCounter.textContent = `${correctCount} acertos`;
  answeredCounter.textContent = `${answeredCount}/${questions.length} | Astronomia`;
}

function handleAnswerClick(answerIndex) {
  if (answered[currentIndex]?.answered) return;

  const question = questions[currentIndex];
  const correctIndex = question.answers.findIndex(a => a.correct);
  const isCorrect = answerIndex === correctIndex;
  const answers = answersList.querySelectorAll('li');

  answers.forEach((el, i) => {
    el.classList.remove('correct-answer', 'wrong-answer');

    if (i === correctIndex) {
      el.classList.add('correct-answer');
    } else if (i === answerIndex) {
      el.classList.add('wrong-answer');
    }
  });

  const navItem = navList.children[currentIndex];
  const iconDiv = navItem.querySelector('div');
  iconDiv.className = isCorrect
    ? 'correct-answer-nav-btn flex items-center justify-between rounded-full'
    : 'wrong-answer-nav-btn flex items-center justify-between rounded-full';
  iconDiv.innerHTML = `<i data-lucide="${isCorrect ? 'badge-check' : 'badge-alert'}" class="size-7 stroke-[1.5]"></i>`;

  answered[currentIndex] = {
    answered: true,
    selectedIndex: answerIndex,
    correct: isCorrect,
  };

  if (isCorrect) correctCount++;
  answeredCount++;
  updateCounters();
  lucide.createIcons();
}

answersList.addEventListener('click', e => {
  const li = e.target.closest('li[data-index]');
  if (!li) return;
  handleAnswerClick(Number(li.dataset.index));
});

navList.addEventListener('click', e => {
  const li = e.target.closest('li[data-nav-index]');
  if (!li) return;
  currentIndex = Number(li.dataset.navIndex);
  renderQuestion(currentIndex);
});

nextButton.addEventListener('click', () => {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    renderQuestion(currentIndex);
  }
});

renderNav();
renderQuestion(currentIndex);
updateCounters();

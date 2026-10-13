// JavaScript makes the page respond to actions. No libraries needed!

// 1. Read a form input and update a paragraph safely.
document.querySelector('#hello-form').addEventListener('submit', (event) => {
  event.preventDefault(); // Keep the form from reloading the page.
  const name = document.querySelector('#name').value.trim();
  document.querySelector('#greeting').textContent = name
    ? `Hello, ${name}! You’ve just made this page your own. 👋`
    : 'Hello, future developer! 👋';
});

// 2. Store related colours in an object, then update CSS variables.
const palettes = {
  gold: { accent: '#CA9B52', dark: '#705020', tint: '#FAF8F4', message: 'A little gold goes a long way.' },
  berry: { accent: '#a94e6f', dark: '#813551', tint: '#fcf3f6', message: 'Berry nice choice. Make it yours.' },
  forest: { accent: '#467c61', dark: '#2b6044', tint: '#f1f8f4', message: 'A fresh start in forest green.' }
};
document.querySelectorAll('[data-colour]').forEach((button) => {
  button.addEventListener('click', () => {
    const palette = palettes[button.dataset.colour];
    document.documentElement.style.setProperty('--accent', palette.accent);
    document.documentElement.style.setProperty('--accent-dark', palette.dark);
    document.documentElement.style.setProperty('--tint', palette.tint);
    document.querySelector('#colour-status').textContent = palette.message;
    document.querySelectorAll('[data-colour]').forEach((choice) => {
      choice.setAttribute('aria-pressed', String(choice === button));
    });
  });
});

// 3. A variable remembers the count until you reset or reload the page.
let count = 0;
function updateCounter() {
  document.querySelector('#count').textContent = count;
  document.querySelector('#count-note').textContent = count >= 10
    ? '✨ Double digits! You’ve made a variable grow.'
    : 'Every click adds one. Try reaching 10!';
}
document.querySelector('#add-click').addEventListener('click', () => {
  count += 1; // Challenge: change 1 to 2, then refresh!
  updateCounter();
});
document.querySelector('#reset').addEventListener('click', () => {
  count = 0;
  updateCounter();
});

// 4. A condition chooses the feedback for each quiz answer.
document.querySelectorAll('[data-answer]').forEach((button) => {
  button.addEventListener('click', () => {
    const answer = button.dataset.answer;
    const feedback = {
      HTML: 'HTML creates the structure, like headings and buttons. Try again!',
      CSS: 'CSS changes the appearance, like colours and spacing. Try again!',
      JavaScript: '✨ That’s it! JavaScript adds behaviour and responds to clicks.'
    };
    document.querySelector('#quiz-result').textContent = feedback[answer];
  });
});

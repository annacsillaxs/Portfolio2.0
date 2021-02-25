const colors = document.querySelectorAll('.color');
const color = document.querySelector('#random-color');

const btn_reload = document.querySelector('#btn-reload');
const btn_answer = document.querySelector('#btn-answer');
const btn_theme = document.querySelector('#btn-theme');

const message = document.querySelector('#message');
const container = document.querySelector('#container');
const body = document.querySelector('body');


let theme = true;

let playing = true;

let winnerIndex = 0;

init();

// --------- FUNCTIONS ---------

// Generate random number
function randomNum(min, max) {
  let num = Math.floor(Math.random() * (max - min) + min);
  return num;
}

// Generate random color => [0,0,0,]
function createColor() {
  let rgb = [];
  for (let num = 1; num <= 3; num++) {
    rgb.push(randomNum(0, 256));
  }
  return rgb;
}


function init() {
  playing = true;
  let playing_colors = [];


  console.log(playing_colors);
  // generate colors for every div
  colors.forEach(div => {
    let rgb = createColor().join(', ');
    playing_colors.push(div.style.backgroundColor = `rgb(${rgb})`);

  });

  // Choose a random color from the colors array
  const i = randomNum(1, 6);
  console.log(i);
  // console.log(i);
  color.innerText = playing_colors[i];
  console.log(playing_colors[i]);
  winnerIndex = i;
  console.log(winnerIndex);

  colors.forEach(div => div.classList.remove('answer'));

  message.innerText = 'Pick the correct color!';
  btn_answer.disabled = false;
}


// ------ EVENT LISTENERS ------

// Start a new game
btn_reload.addEventListener('click', () => {
  playing_colors = [];
  init();
});

// Show answer
btn_answer.addEventListener('click', () => {
  playing = false;
  colors[winnerIndex].classList.add('answer');
  message.innerText = 'Play another round!'
})


// Check if the guess and the answer are the same

  colors.forEach(div => {
    div.addEventListener('click', event => {
      console.log(event.currentTarget.style.backgroundColor, color.innerText);
    
      if(playing) {
        if(event.currentTarget.style.backgroundColor === color.innerText) {
          event.currentTarget.classList.add('answer');
          playing = false;
          message.innerText = 'You Are a Winner! Play again!';
          btn_answer.disabled = true;
        } else {
          event.currentTarget.style.backgroundColor = 'transparent';
        }
      }
    })
  })


// Theme Toggle
btn_theme.addEventListener('click', event => {
  if(theme) {
    event.currentTarget.innerText = `Change to Light Mode`;
    container.classList.add('dark-mode');
    body.classList.add('dark-mode');
    theme = !theme;
  } else if (!theme){
    event.currentTarget.innerText = `Change to Dark Mode`;
    container.classList.remove('dark-mode');
    body.classList.remove('dark-mode');
    theme = true;
  }
})
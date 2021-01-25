const 
main = document.querySelector('main');
addUser = document.querySelector('#add-user'),
doubleMoney = document.querySelector('#double-money'),
millionaires = document.querySelector('#only-millionaires'),
sortRichest = document.querySelector('#sort-richest'),
calcWealth = document.querySelector('#calculate-wealth');

let data = [];


getRandomUsers();
getRandomUsers();
getRandomUsers();
// --------  Functions  --------

// Fetch random user and money
async function getRandomUsers() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];

  // console.log(data);
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  }

  addData(newUser);
}

function doubleUsersMoney() {
  data = data.map((user) => {
    return {...user, money: user.money *2};
  })

  updateDOM();
}

function filterMillionaires() {
  data = data.filter(user => user.money > 1000000);

  updateDOM();
}

function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

function sumWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <span>${formatMoney(wealth)}</span></h3>`;
  main.appendChild(wealthEl);
}

// Add new object to data array
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Update DOM 
function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = '<h2>Person <span>Wealth</span></h2>';

  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(element);
  })
}

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return '£' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
} 

// -----  Event Listeners  -----
addUser.addEventListener('click', getRandomUsers);
doubleMoney.addEventListener('click', doubleUsersMoney);
millionaires.addEventListener('click', filterMillionaires);
sortRichest.addEventListener('click', sortByRichest);
calcWealth.addEventListener('click', sumWealth);
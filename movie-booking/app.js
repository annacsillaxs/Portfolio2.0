const seats = document.querySelectorAll(".seat");
const container = document.querySelector(".container");
const count = document.querySelector("#count");
const total = document.querySelector("#total");
const movieSelect = document.querySelector("#movie");

let ticketPrice = +movieSelect.value;

// -----  Functions  -----
// Selected seats count
function selectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  console.log(selectedSeats.length);

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// -----  Event Listeners  -----

// Clicked seat toggle 'selected' class
container.addEventListener('click', e =>  {
  if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    // console.log(e.target);
    e.target.classList.toggle('selected');
  }
  selectedCount();
})


// Movie select 
movieSelect.addEventListener('click', (e) => {
  ticketPrice = +e.target.value;

  selectedCount();
})


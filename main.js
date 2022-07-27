const cards = document.querySelectorAll('.matching-card');
/*To flip the card when clicked, a class flip is added to the element. Select matching-card elements with document.querySelectorAll. */
function flipCard() {
    this.classList.toggle('flip');
}

cards.forEach(card => card.addEventListener('click', flipCard));


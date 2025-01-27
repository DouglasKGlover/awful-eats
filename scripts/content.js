// Get all of the store cards
let storeCards = null;
function getStoreCards() {
  const carouselSlides = document.querySelectorAll(
    'li[data-testid="carousel-slide"], div[data-testid="store-card"]'
  );

  if (carouselSlides.length > 0) {
    return carouselSlides;
  }
}

// Function to add a button to every store card
function addButtonsToCards(cards) {
  cards.forEach((card) => {
    const button = document.createElement("button");
    button.innerText = "☠️";
    button.classList.add("bad-eats-button");
    button.addEventListener("click", () => {
      storeRestaurant(card);
    });

    card.appendChild(button);
  });
}

// Function to save a clicked card to Chrome storage
function storeRestaurant(card) {
  // Get the name of the restaurant from the card
  const restaurantName = card.querySelector("h3").innerText;
  // console.log(restaurantName);

  chrome.storage.sync.get("cards", (data) => {
    let cards = data.cards || [];

    // Only push the card if it's not already in the array
    if (!cards.includes(restaurantName)) {
      cards.push(restaurantName);
    }

    // cards = [];
    chrome.storage.sync.set({ cards });

    // Console log the cards to see if it's working
    // console.log(cards);
  });

  // Hide the card
  card.classList.remove("bad-eats-visible");
  card.classList.add("bad-eats-hidden");
}

// Function to hide stored cards from the page
function hideStoredCards() {
  chrome.storage.sync.get("cards", (data) => {
    const cards = data.cards || [];

    // For each storeCards, check if the name is in the cards array and hide if so
    storeCards.forEach((card) => {
      const restaurantName = card.querySelector("h3").innerText;

      if (cards.includes(restaurantName)) {
        // Add a class to the card to hide it
        card.classList.add("bad-eats-hidden");
      } else {
        // Add a class to the card to show it
        card.classList.add("bad-eats-visible");
      }
    });
  });
}

// Check for store cards every 100 milliseconds
function checkForStoreCards() {
  let interval = setInterval(() => {
    // console.log("Checking for store cards...");
    storeCards = getStoreCards();

    if (storeCards.length) {
      // console.log("Cards found!");
      clearInterval(interval);

      // Add buttons to the cards
      addButtonsToCards(storeCards);

      // Hide stored cards after a small delay
      setTimeout(() => {
        hideStoredCards();
      }, 500);
    } else {
      // console.log("No cards found yet.");
    }
  }, 100);
}

let lastRun = Date.now();
const observer = new MutationObserver((mutationsList) => {
  if (Date.now() - lastRun > 1000) {
    lastRun = Date.now();
    checkForStoreCards();
  }
});

// Observe changes to the body
observer.observe(document.body, { childList: true, subtree: true });

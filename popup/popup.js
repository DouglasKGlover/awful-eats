// Remove all stores from the "cards" array in Chrome storage
function resetChromeStorage() {
  chrome.storage.sync.set({ cards: [] });
  alert(
    "All stores have been removed from the list of Awful Eats. Refresh the page to see the changes."
  );
}

// Add an event listener to the reset button
document.addEventListener("DOMContentLoaded", () => {
  const resetButton = document.getElementById("reset-button");
  resetButton.addEventListener("click", resetChromeStorage);
});

// Get the list of stores currently stored in Chrome storage
function getStoredCards() {
  chrome.storage.sync.get("cards", (data) => {
    const cards = data.cards || [];
    const list = document.getElementById("store-list");

    // Clear the list before adding the stores
    list.innerHTML = "";

    // Add each store to the list
    cards.forEach((store) => {
      const listItem = document.createElement("li");
      listItem.innerText = store;
      list.appendChild(listItem);
    });
  });
}

// Add and event listener to the show blocked button
document.addEventListener("DOMContentLoaded", () => {
  const showButton = document.getElementById("show-blocked-button");
  showButton.addEventListener("click", getStoredCards);
});

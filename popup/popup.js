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

// Remove an individual store from Chrome storage
function removeStore(storeToRemove) {
  chrome.storage.sync.get("cards", (data) => {
    const cards = data.cards || [];
    const updatedCards = cards.filter((store) => store !== storeToRemove);

    chrome.storage.sync.set({ cards: updatedCards }, () => {
      getStoredCards(); // Refresh the list after removing a store
    });
  });
}

// Get the list of stores currently stored in Chrome storage
function getStoredCards() {
  chrome.storage.sync.get("cards", (data) => {
    const cards = data.cards || [];
    const list = document.getElementById("store-list");

    // Clear the list before adding the stores
    list.innerHTML = "";

    // Add each store to the list with a "Remove" button
    cards.forEach((store) => {
      // Create a split-container div with a remove button and store name as a label for the button
      const container = document.createElement("div");
      container.classList.add("split-container");

      const removeButton = document.createElement("button");
      removeButton.innerText = "X";
      removeButton.addEventListener("click", () => {
        removeStore(store);
      });
      removeButton.id = store.toLowerCase().replace(/[^a-z0-9]/g, "");

      const storeName = document.createElement("label");
      storeName.innerText = store;

      // set label's "for" to be the same as the button's id
      storeName.htmlFor = removeButton.id;

      // Create a div specifically to hold the button
      const buttonDiv = document.createElement("div");
      buttonDiv.appendChild(removeButton);

      // Create a div specifically to hold the store name
      const storeDiv = document.createElement("div");
      storeDiv.appendChild(storeName);

      container.appendChild(buttonDiv);
      container.appendChild(storeDiv);
      list.appendChild(container);
    });
  });
}

// Add event listeners for DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  const resetButton = document.getElementById("reset-button");
  resetButton.addEventListener("click", resetChromeStorage);

  const showButton = document.getElementById("show-blocked-button");
  showButton.addEventListener("click", getStoredCards);
});

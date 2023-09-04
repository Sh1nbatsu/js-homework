const getEmojiBtn = document.querySelector("button");

const dailyEmojiContainer = document.getElementById("dailyEmoji");

const peopleEmojiContainer = document.getElementById("peopleEmoji");

const foodEmojiContainer = document.getElementById("foodEmoji");

const travelEmojiContainer = document.getElementById("travelEmoji");

function distributeEmojisByCategory(emoji) {
  switch (emoji.category.name) {
    case "Smileys & Emotion":
      peopleEmojiContainer.innerText += emoji.emoji;
      break;
    case "Food & Drink":
      foodEmojiContainer.innerText += emoji.emoji;
      break;
    case "Travel & Places":
      travelEmojiContainer.innerText += emoji.emoji;
    default:
      break;
  }
}

getEmojiBtn.addEventListener("click", (e) => {
  fetch(" https://api.emojisworld.fr/v1/random")
    .then((result) => result.json())
    .then((parsedResult) => {
      dailyEmojiContainer.innerText = parsedResult.results[0].emoji;
    });
});

fetch("https://api.emojisworld.fr/v1/random")
  .then((result) => result.json())
  .then((parsedResult) => {
    parsedResult.results.forEach((item) => {
      distributeEmojisByCategory(item);
    });
  });


// Initialize the pet object
const pet = {
  name: "",
  hungerLevel: 0,
  attentionLevel: 10,
  happinessLevel: 10,
  lifeStage: "baby",
  weight: 1,
  age: 0,
  birthday: "",
};

// Get the user's input for the pet's name
pet.name = prompt("What is your fox's name?");

// Function to change the day counter and background of counter
function newDay() {
  let timeOfDay = "";
  let spanColor = "";
  const daySpan = document.querySelector(".time");
  switch ((pet.age * 2) % 1) {
    case (0):
      timeOfDay = "Morning";
      spanColor = "light blue";
      break;
    case (.25):
      timeOfDay = "Noon";
      spanColor = "orange";
      break;
    case (.50):
      timeOfDay = "Evening";
      spanColor = "dark blue";
      break;
    case (.75):
      timeOfDay = "Night";
      spanColor = "black";
      break;
    default:
      timeOfDay = "Twilight Zone";
      spanColor = "white";
      break;
  }
  daySpan.textContent = `Day ${Math.floor(pet.age * 2) + 1} ${timeOfDay}`;
  daySpan.style.backgroundColor = spanColor;
}

// Function to update the pet's life stage
function updateLifeStage() {
  if (pet.age >= 60) {
    pet.lifeStage = "senior";
  } else if (pet.age >= 20) {
    pet.lifeStage = "adult";
  } else if (pet.age >= 13) {
    pet.lifeStage = "teen";
  } else if (pet.age >= 4) {
    pet.lifeStage = "child";
  } else {
    pet.lifeStage = "baby";
  }
}

// Function to remove all buttons from screen
function buttonElimination() {
  buttons = document.querySelectorAll("button");
  for (button of buttons) {
    button.style.display = "none";
  }
}

// Function to update the pet's mood and conversation based on current state
function updateMoodAndConversation() {
  let needsStr = "";
  if (pet.hungerLevel > 3) {
    needsStr += "I am hungry. ";
  }
  if (pet.happinessLevel < 7) {
    needsStr += "I am unhappy. ";
  }
  if (pet.attentionLevel < 7) {
    needsStr += "I am bored. ";
  }
  if (needsStr === "") {
    needsStr = "I am doing just great! Thanks for checking on me!";
  }

  document.querySelector("#conversation").innerHTML = needsStr;

  if (pet.hungerLevel <= 3 && pet.attentionLevel >= 7 && pet.happinessLevel >= 7) {
    petMood = "happy";
  } else if (pet.hungerLevel > 3 || pet.attentionLevel < 7 || pet.happinessLevel < 7) {
    petMood = "neutral";
  } else if (pet.hungerLevel >= 6 || pet.attentionLevel <= 4 || pet.happinessLevel <= 4) {
    petMood = "sad";
  }
}

// Function to feed the pet
function feedPet(e) {
  let choice = e.target.id;
  switch (choice) {
    case "berries":
      pet.hungerLevel -= 1;
      pet.weight += 0.5;
      pet.happinessLevel -= 1;
      break;
    case "chicken":
      pet.hungerLevel -= 2;
      pet.weight += 3;
      pet.happinessLevel += 1;
      break;
    case "mouse":
      pet.hungerLevel -= 3;
      pet.weight += 5;
      pet.happinessLevel += 3;
      break;
    default:
      pet.hungerLevel += 1;
      break;
  }
  updateMoodAndConversation();
}

// Function to play with the pet
function playPet(e) {
  let choice = e.target.id;
  switch (choice) {
    case "toy":
      pet.attentionLevel += 1;
      pet.happinessLevel += 1;
      pet.weight -= 1;
      break;
    case "run":
      pet.attentionLevel += 2;
      pet.happinessLevel += 1;
      pet.weight -= 3;
      break;
    case "swim":
      pet.attentionLevel += 3;
      pet.happinessLevel += 1;
      pet.weight -= 5;
      break;
  }
  updateMoodAndConversation();
}

// Function to update the pet's health and display the conversation
function timeMarker() {
  pet.hungerLevel += 1;
  pet.attentionLevel -= 1;
  pet.age += 0.125;
  pet.happinessLevel -= 1;
  updateLifeStage();
  newDay();
  updateMoodAndConversation();

  if (pet.hungerLevel === 10) {
    clearInterval(trackingTime);
    clearInterval(timeCount);
    document.querySelector("img").src = "https://dejpknyizje2n.cloudfront.net/marketplace/products/0812fa8272494839a2619fdcd45e9563.png";
    document.querySelector("#conversation").innerHTML = `Your neglect has led to ${pet.name} starving. </br> GAME OVER!`;
    buttonElimination();
    console.log("Game Over");
  } else if (pet.attentionLevel === 0 || pet.happinessLevel === 0) {
    clearInterval(trackingTime);
    clearInterval(timeCount);
    document.querySelector("img").src = "img/leaving-fox.png";
    document.querySelector("#conversation").innerHTML =
      `Your lack of attention and care has caused ${pet.name} to leave. </br> GAME OVER!`;
    buttonElimination();
    console.log("gameover");
  }
}

// Initialize the tracking time and time count intervals
const trackingTime = setInterval(timeMarker, 8000);
const timeCount = setInterval(timeMarker, 8000);

// Add event listeners for buttons
document.querySelector("#info").addEventListener("click", function () {
  document.querySelector("#conversation").innerHTML = `A ${pet.lifeStage} tamagotchi named ${pet.name} born on ${pet.birthday} weighing ${pet.weight}lbs. They are currently ${pet.age} virtuals old. `;
});

document.querySelector("#toy").addEventListener("click", playPet);
document.querySelector("#run").addEventListener("click", playPet);
document.querySelector("#swim").addEventListener("click", playPet);
document.querySelector("#berries").addEventListener("click", feedPet);
document.querySelector("#chicken").addEventListener("click", feedPet);
document.querySelector("#mouse").addEventListener("click", feedPet);

// Add event listeners for buttons visibility
document.querySelector("#play").addEventListener("click", function () {
  const initialButtons = document.querySelectorAll(".options");
  const endingButtons = document.querySelectorAll(".play");
  for (let i = 0; i < endingButtons.length; i += 1) {
    initialButtons[i].style.display = "none";
    endingButtons[i].style.display = "unset";
  }
});

document.querySelector("#food").addEventListener("click", function () {
  const initialButtons = document.querySelectorAll(".options");
  const endingButtons = document.querySelectorAll(".food");
  for (let i = 0; i < endingButtons.length; i += 1) {
    initialButtons[i].style.display = "none";
    endingButtons[i].style.display = "unset";
  }
});

document.querySelector("#home").addEventListener("click", function () {
  const foodButtons = document.querySelectorAll(".food");
  const playButtons = document.querySelectorAll(".play");
  const endingButtons = document.querySelectorAll(".options");
  for (let i = 0; i < endingButtons.length; i += 1) {
    foodButtons[i].style.display = "none";
    playButtons[i].style.display = "none";
    endingButtons[i].style.display = "unset";
  }
});

// jQuery code
$(document).ready(function () {
  $('#food').click(function () {
    $('#feed-sound')[0].play();
    petMood = 'happy';
    $('#conversation').text('Yum! Thank you for feeding me!');
  });

  $('#play').click(function () {
    $('#play-sound')[0].play();
    petMood = 'happy';
    $('#conversation').text('Woohoo! I love playing with you!');
  });

  $('#toy').click(function () {
    $('#play-sound')[0].play();
    petMood = 'happy';
    $('#conversation').text('Yay! A new toy!');
  });

  $('#walk').click(function () {
    $('#play-sound')[0].play();
    petMood = 'happy';
    $('#conversation').text('I love going for walks!');
  });

  $('#swim').click(function () {
    $('#play-sound')[0].play();
    petMood = 'happy';
    $('#conversation').text('Splish splash! I love swimming!');
  });

  setInterval(function () {
    if (petMood === 'neutral') {
      $('#sad-sound')[0].play();
      petMood = 'ad';
      $('#conversation').text('Aww, I\'m feeling a little neglected...');
    } else if (petMood === 'ad') {
      $('#sad-sound')[0].play();
      $('#conversation').text('I\'m so sad... Please take care of me!');
    } else if (petMood === 'happy') {
      $('#happy-sound')[0].play();
      $('#conversation').text('I\'m so happy! Thank you for taking care of me!');
    }
  }, 30000); // Check every 30 seconds
});


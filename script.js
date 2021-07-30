// beat-that game base + scoring + leaderboard + 2mode (normal & lowest combined number)
// 2 players and players take turns

// 4 game modes: "player 1 dice roll", "player 1 choose dice order", "player 2 dice roll", "player 2 choose dice order", and the game restart

// 2 mode: "normal" (highest combined number win) || "reverse" (lowest combined number win)

var currentGameMode = "waiting for user to pick the mode";
var mode;
var currentPlayer = 1;
var pickDiceOrder;
var player1CombineNumber = 0;
var player2CombineNumber = 0;
var player1TotalScores = 0;
var player2TotalScores = 0;

// arrays to track each player's dice rolls
var player1DiceRolls = [];
var player2DiceRolls = [];
var player1Scores = [];
var player2Scores = [];

// to get random number for the dice rolls
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

// Player choose 2 mode: "normal" (highest combined number win) || "reverse" (lowest combined number win)
var chooseMode = function () {
  if (mode == "normal") {
    // game mode move to the next game
    currentGameMode = "player 1 dice roll";
    return `You have selected the NORMAL mode. <br> <br> Click 'Submit' to play the game.`;
  } else if (mode == "reverse") {
    // game mode move to the next game
    currentGameMode = "player 1 dice roll";
    return `You have selected the REVERSE mode. <br> <br> Click 'Submit' to play the game.`;
  }

  var myOutputValue = `Please pick your game mode: <br> <br> 1. Please type 'normal' to play the normal mode (when the highest combined numbers win). <br> 2. Please type 'reverse' to play the reverse mode (when the lowest combined numbers win).`;
  return myOutputValue;
};

// Player rolls to get random number of 2 dices
var playerRollDice = function () {
  var randomDice1 = rollDice();
  var randomDice2 = rollDice();
  console.log("player rolls dice 1:" + randomDice1);
  console.log("player rolls dice 2:" + randomDice2);

  // player 1 roll the dice
  if (currentGameMode == "player 1 dice roll") {
    currentPlayer = 1;
    // push dice result to arrays
    player1DiceRolls.push(randomDice1);
    player1DiceRolls.push(randomDice2);

    console.log("player 1 dice rolls: " + player1DiceRolls);

    //moving to the next game
    currentGameMode = "player 1 choose dice order";
  } // player 2 roll the dice
  else if (currentGameMode == "player 2 dice roll") {
    currentPlayer = 2;
    // push dice result to arrays
    player2DiceRolls.push(randomDice1);
    player2DiceRolls.push(randomDice2);

    console.log("player 2 dice rolls: " + player2DiceRolls);

    //moving to the next game
    currentGameMode = "player 2 choose dice order";
  }

  var myOutputValue = `Welcome Player ${currentPlayer}. <br> You rolled ${randomDice1} for Dice 1 and ${randomDice2} for Dice 2. <br><br> Please choose the order of the dice, by entering '1' or '2'.`;

  return myOutputValue;
};

// Player choose the dice order
var playerChooseDice = function () {
  var myOutputValue = `Player ${currentPlayer}, you choose Dice ${pickDiceOrder} first. <br>`;

  // player 1 pick dice 1 or 2
  if (currentGameMode == "player 1 choose dice order") {
    currentPlayer = 1;

    if (pickDiceOrder == 1) {
      player1CombineNumber = Number(
        `${player1DiceRolls[0]}${player1DiceRolls[1]}`
      );
    } else if (pickDiceOrder == 2) {
      player1CombineNumber = Number(
        `${player1DiceRolls[1]}${player1DiceRolls[0]}`
      );
    }
    //storing player 1 result
    player1Scores.push(player1CombineNumber);

    myOutputValue += `Your number is ${player1CombineNumber}. <br><br> It is now Player 2's turn.`;

    //moving to the next game
    currentGameMode = "player 2 dice roll";

    return myOutputValue;
  }
  if (currentGameMode == "player 2 choose dice order") {
    currentPlayer = 2;

    if (pickDiceOrder == 1) {
      player2CombineNumber = Number(
        `${player2DiceRolls[0]}${player2DiceRolls[1]}`
      );
    } else if (pickDiceOrder == 2) {
      player2CombineNumber = Number(
        `${player2DiceRolls[1]}${player2DiceRolls[0]}`
      );
    }
    //storing player 2 result
    player2Scores.push(player2CombineNumber);

    var currentWinnerMessage = currentWinner();
    var leaderBoardMessage = leaderBoard();

    myOutputValue += `Your number is ${player2CombineNumber} and Player 1's number is ${player1CombineNumber}. <br><br> ${currentWinnerMessage} wins this round. <br><br> ${leaderBoardMessage} <br><br> Click 'Submit' to play another round.`;

    // restarting the game
    restartGame();

    return myOutputValue;
  }

  return myOutputValue;
};

// restarting the game
var restartGame = function () {
  currentGameMode = "player 1 dice roll";
  currentPlayer = 1;
  player1DiceRolls = [];
  player2DiceRolls = [];
  pickDiceOrder;
  player1CombineNumber = 0;
  player2CombineNumber = 0;
};

// to determine the winner
var currentWinner = function () {
  //normal mode: highest combined number win
  if (mode == "normal" && player1CombineNumber > player2CombineNumber) {
    myOutputValue = "Player 1";
    return myOutputValue;
  } else if (mode == "normal" && player2CombineNumber > player1CombineNumber) {
    myOutputValue = "Player 2";
    return myOutputValue;
  } else if (mode == "normal" && player1CombineNumber == player2CombineNumber) {
    myOutputValue = "Both players";
    return myOutputValue;
  }

  // reverse mode: lowest combined number win
  if (mode == "reverse" && player1CombineNumber > player2CombineNumber) {
    myOutputValue = "Player 2";
    return myOutputValue;
  } else if (mode == "reverse" && player2CombineNumber > player1CombineNumber) {
    myOutputValue = "Player 1";
    return myOutputValue;
  } else if (
    mode == "reverse" &&
    player1CombineNumber == player2CombineNumber
  ) {
    myOutputValue = "Both players";
    return myOutputValue;
  }
};

// Leaderboard, lists the 2 players and their scores in decreasing order
var leaderBoard = function () {
  // to find the sum of player 1 scores
  player1TotalScores = 0;
  var counter = 0;
  while (counter < player1Scores.length) {
    player1TotalScores = player1TotalScores + player1Scores[counter];
    counter += 1;
  }

  // to find the sum of player 2 scores
  player2TotalScores = 0;
  var counter = 0;
  while (counter < player2Scores.length) {
    player2TotalScores = player2TotalScores + player2Scores[counter];
    counter += 1;
  }

  console.log("player 1 total scores: " + player1TotalScores);
  console.log("player 2 total scores: " + player2TotalScores);

  //normal mode: highest combined number win
  if (mode == "normal" && player1TotalScores > player2TotalScores) {
    myOutputValue = `Leaderboard: <br> Player 1 total score: ${player1TotalScores} <br> Player 2 total score: ${player2TotalScores}`;
    return myOutputValue;
  } else if (mode == "normal" && player2TotalScores > player1TotalScores) {
    myOutputValue = `Leaderboard: <br> Player 2 total score: ${player2TotalScores} <br> Player 1 total score: ${player1TotalScores}`;
    return myOutputValue;
  } else if (mode == "normal" && player1TotalScores == player2TotalScores) {
    myOutputValue = `Leaderboard: <br> Player 2 total score: ${player2TotalScores} <br> Player 1 total score: ${player1TotalScores}`;
    return myOutputValue;
  }

  // reverse mode: lowest combined number win
  if (mode == "reverse" && player1TotalScores > player2TotalScores) {
    myOutputValue = `Leaderboard: <br> Player 1 total score: ${player1TotalScores} <br> Player 2 total score: ${player2TotalScores}`;
    return myOutputValue;
  } else if (mode == "reverse" && player2TotalScores > player1TotalScores) {
    myOutputValue = `Leaderboard: <br> Player 1 total score: ${player1TotalScores} <br> Player 2 total score: ${player2TotalScores}`;
    return myOutputValue;
  } else if (mode == "reverse" && player1TotalScores == player2TotalScores) {
    myOutputValue = `Leaderboard: <br> Player 2 total score: ${player2TotalScores} <br> Player 1 total score: ${player1TotalScores}`;
    return myOutputValue;
  }
};

var main = function (input) {
  var myOutputValue = "INVALID";

  if (currentGameMode == "waiting for user to pick the mode") {
    mode = input;
    var myOutputValue = chooseMode();
  } else if (currentGameMode == "player 1 dice roll") {
    // player 1 clicks Submit, the game rolls 2 dice
    var myOutputValue = playerRollDice();
  } // player 1 choose the order of the dice
  else if (currentGameMode == "player 1 choose dice order") {
    pickDiceOrder = input;
    var myOutputValue = playerChooseDice();
  } // player 2 rolls
  else if (currentGameMode == "player 2 dice roll") {
    var myOutputValue = playerRollDice();
  } //player 2 choose the order of the dice
  else if (currentGameMode == "player 2 choose dice order") {
    pickDiceOrder = input;
    var myOutputValue = playerChooseDice();
  }

  console.log("player 1 scores: " + player1Scores);
  console.log("player 2 scores: " + player2Scores);

  return myOutputValue;
};

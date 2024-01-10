const attackvalue = 10;
const strongattackvalue = 17;
const monsterattackvalue = 21;
const healvalue = 20;

const MODE_ATTACK = "ATTACK";
const MODE_STRONG_ATTACK = "STRONG_ATTACK";
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

const entervalue = prompt("maximum life for you and the monster", "100");

let chosenMaxLife = parseInt(entervalue);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let bonuslife = true;

adjustHealthBars(chosenMaxLife);

function writetolog(event, value, monsterhealth, playerhealth) {
  let logentry = {
    event: event,
    value: value,
    finalmonsterhealth: monsterhealth,
    finalplayerhealth: playerhealth,
  };
  if (event === LOG_EVENT_PLAYER_ATTACK) {
    logentry = {
      event: event,
      value: value,
      target: "MONSTER",
      finalmonsterhealth: monsterhealth,
      finalplayerhealth: playerhealth,
    };
  } else if (event === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    logentry = {
      event: event,
      value: value,
      target: "MONSTER",

      finalmonsterhealth: monsterhealth,
      finalplayerhealth: playerhealth,
    };
  } else if (event === LOG_EVENT_MONSTER_ATTACK) {
    logentry = {
      event: event,
      value: value,
      target: "PLAYER",

      finalmonsterhealth: monsterhealth,
      finalplayerhealth: playerhealth,
    };
  } else if (event === LOG_EVENT_PLAYER_HEAL) {
    logentry = {
      event: event,
      value: value,
      target: "PLAYER",

      finalmonsterhealth: monsterhealth,
      finalplayerhealth: playerhealth,
    };
  } else if (event === LOG_EVENT_GAME_OVER) {
    logentry = {
      event: event,
      value: value,

      finalmonsterhealth: monsterhealth,
      finalplayerhealth: playerhealth,
    };
  }
}

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endround() {
  const intialplayerhealth = currentPlayerHealth;
  const playerdamage = dealPlayerDamage(monsterattackvalue);
  currentPlayerHealth -= playerdamage;
  writetolog(
    LOG_EVENT_MONSTER_ATTACK,
    playerdamage,
    currentMonsterHealth,
    currentPlayerHealth
  );

  if (currentPlayerHealth <= 0 && bonuslife === true) {
    bonuslife = false;
    removeBonusLife();
    currentPlayerHealth = intialplayerhealth;
    setPlayerHealth(intialplayerhealth);

    alert("you would br dead but the bonus life save you");
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("you won");
    writetolog(
      LOG_EVENT_GAME_OVER,
      "PLAYER WON",
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("you lost");
    writetolog(
      LOG_EVENT_GAME_OVER,
      "MONSTER WON",
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert("you have a draw");
    writetolog(
      LOG_EVENT_GAME_OVER,
      "DRAWW",
      currentMonsterHealth,
      currentPlayerHealth
    );
  }

  if (
    (currentMonsterHealth <= 0 && currentPlayerHealth > 0) ||
    (currentPlayerHealth <= 0 && currentMonsterHealth > 0) ||
    (currentPlayerHealth <= 0 && currentMonsterHealth)
  ) {
    reset();
  }
}

function attackmonster(mode) {
  let maxdamage;
  let logevent;
  if (mode === MODE_ATTACK) {
    maxdamage = attackvalue;
    logevent = LOG_EVENT_PLAYER_ATTACK;
  } else if (mode === MODE_STRONG_ATTACK) {
    maxdamage = strongattackvalue;
    logevent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  }
  const damage = dealPlayerDamage(maxdamage);
  currentMonsterHealth -= damage;
  writetolog(logevent, damage, currentMonsterHealth, currentPlayerHealth);
  endround();
}

function attackHandler() {
  attackmonster(MODE_ATTACK);
}

function strongattackHandler() {
  attackmonster(MODE_STRONG_ATTACK);
}

function healplayerhandler() {
  let hvalue;
  if (currentPlayerHealth >= chosenMaxLife - healvalue) {
    alert("you can't heal more than you max health");
    healvalue = chosenMaxLife - currentPlayerHealth;
  } else {
    hvalue = healvalue;
  }
  increasePlayerHealth(hvalue);
  currentPlayerHealth += hvalue;
  writetolog(
    LOG_EVENT_PLAYER_HEAL,
    hvalue,
    currentMonsterHealth,
    currentPlayerHealth
  );
  endround();
}

function printloghandler() {
  console.log(logentry);
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongattackHandler);
healBtn.addEventListener("click", healplayerhandler);
logBtn.addEventListener("click", printloghandler);

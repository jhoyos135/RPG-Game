let characterSelected = false;
let enemySelected = false;
let character = {};
let enemy = {};
let enemiesDefeated = 0;
let gameOver = false;

//characters
let lessray = {
  name: "Ray",
  health: 120,
  counterAttack: 15,
  attack: 15
};

let lukeSkywalker = {
  name: "Luke Skywalker",
  health: 100,
  counterAttack: 15,
  attack: 20
};

let yoda = {
  name: "Yoda",
  health: 150,
  counterAttack: 25,
  attack: 20
};

let darthVader = {
  name: "Darth Vader",
  health: 180,
  counterAttack: 25,
  attack: 25
};

const initializeCharacter = (chosenCharacter) => {
  character.name = chosenCharacter.name;
  character.health = chosenCharacter.health;
  character.counterAttack = chosenCharacter.counterAttack;
  character.attack = chosenCharacter.attack;
}

const initializeEnemy = (chosenEnemy) => {
  enemy.name = chosenEnemy.name;
  enemy.health = chosenEnemy.health;
  enemy.counterAttack = chosenEnemy.counterAttack;
  enemy.attack = chosenEnemy.attack;
}

// move characters to the enemies section
const moveToEnemies = () => {

  $(".available-character").removeClass("available-character").addClass("enemy-character");
  $("#enemies-available").append( $(".enemy-character") );

}

// reset game
const resetGame = () => {

  // Reset all
  $("#lessray-character .health").html(lessray.health + ' HP');
  $("#luke-skywalker-character .health ").html(lukeSkywalker.health + ' HP');
  $("#yoda-character .health").html(yoda.health + ' HP');
  $("#darth-vader-character .health").html(darthVader.health + ' HP');

  $(".character-image").removeClass("chosen-character enemy-character enemy").addClass("available-character");
  let available = $(".available-character").show();
  $("#characters-available").html(available);

  $("#game-message").empty();
  $("#enemies-available").hide();
  $("#restart").hide();

  characterSelected = false;
  enemySelected = false;
  enemiesDefeated = 0;
  gameOver = false;

  character = {};
  enemy = {};
}

$(document).ready( () => {
  
  $("#restart").hide();
  $("#enemies-available").hide();

//characters select

  //Ray
  $("#lessray-character").on("click", function() {

    $("#enemies-available").show();

    if(characterSelected === false) {
      $("#game-message").empty();

      initializeCharacter(lessray);
      characterSelected = true;

      $("#lessray-character").removeClass("available-character").addClass("chosen-character");
      $("#chosen-character").append(this);

      moveToEnemies();

    } else if ((characterSelected === true) && (enemySelected === false)) {

      if( $("#lessray-character").hasClass("enemy-character") ) {
        $("#game-message").empty();

        initializeEnemy(lessray);
        enemySelected = true;

        $("#lessray-character").removeClass("enemy-character").addClass("enemy");
        $("#enemy-section").append(this);
      }
    }
  });

  //Luke
  $("#luke-skywalker-character").on("click", function() {

    $("#enemies-available").show();

    if(characterSelected === false) {
      $("#game-message").empty();

      initializeCharacter(lukeSkywalker);
      characterSelected = true;

      $("#luke-skywalker-character").removeClass("available-character").addClass("chosen-character");
      $("#chosen-character").append(this);

      moveToEnemies();

    } else if ((characterSelected === true) && (enemySelected === false)) {

      if($("#luke-skywalker-character").hasClass("enemy-character")) {
        $("#game-message").empty();

        initializeEnemy(lukeSkywalker);
        enemySelected = true;

        $("#luke-skywalker-character").removeClass("enemy-character").addClass("enemy");
        $("#enemy-section").append(this);
      }
    }
  });

  //Yoda
  $("#yoda-character").on("click", function() {

    $("#enemies-available").show();

    if(characterSelected == false) {
      $("#game-message").empty();

      initializeCharacter(yoda);
      characterSelected = true;

      $("#yoda-character").removeClass("available-character").addClass("chosen-character");
      $("#chosen-character").append(this);

      moveToEnemies();

    } else if ((characterSelected === true) && (enemySelected === false)) {
      
      if($("#yoda-character").hasClass("enemy-character")) {
        $("#game-message").empty();

        initializeEnemy(yoda);
        enemySelected = true;

        $("#yoda-character").removeClass("enemy-character").addClass("enemy");
        $("#enemy-section").append(this);
      }
    }
  });

  //Vader
  $("#darth-vader-character").on("click", function() {

    $("#enemies-available").show();

    if(characterSelected === false) {
      $("#game-message").empty();

      initializeCharacter(darthVader);
      characterSelected = true;

      $("#darth-vader-character").removeClass("available-character").addClass("chosen-character");
      $("#chosen-character").append(this);

      moveToEnemies();

    } else if ((characterSelected === true) && (enemySelected === false)) {

      if($("#darth-vader-character").hasClass("enemy-character")) {
        $("#game-message").empty();

        initializeEnemy(darthVader);
        enemySelected = true;

        $("#darth-vader-character").removeClass("enemy-character").addClass("enemy");
        $("#enemy-section").append(this);
      }
    }
  });

  //Attack
  $("#attack").on("click", () => {

    // You are ready to attack
    if (characterSelected && enemySelected && !gameOver) {
		
      // decrease enemy points
      enemy.health = enemy.health - character.attack;
      $(".enemy .health").html(enemy.health + ' HP');

      $("#game-message").html(`
      <p>You attacked ${enemy.name} for ${character.attack} HP damage. <p>
      `);

      // attack increases
      character.attack = character.attack + character.counterAttack;

      if (enemy.health > 0) {
        character.health = character.health - enemy.counterAttack;
        $(".chosen-character .health").html(character.health + ' HP');

        // Check if the user survives the attack
        if (character.health > 0) {

          $("#game-message").append(`
          <p> ${enemy.name} counter attacked you back for ${enemy.counterAttack} HP damage. </p>
          `);

        } else {

          gameOver = true;
          $("#game-message").html(`<p>You were defeated by ${enemy.name} </br>`);
          $("#restart").show();
          $("#attack").hide();

        }
      } else {

        // enemy is defeated
        enemiesDefeated++;
        enemySelected = false;

        $("#game-message").html(`
        <p>You have defeated ${enemy.name}. Choose another enemy.</p>
        `);

        $(".enemy").hide();

        // you have won
        if (enemiesDefeated === 3) {
          gameOver = true;

          $("#game-message").html(`
          <p>Congratulations ${character.name} </br> You are a jedi master. </br></p>
          `);

          $("#restart").show();
          $("#attack").hide();
        }
      }
    } else if (!characterSelected && !gameOver) {

      $("#game-message").html("<p>You must first select your game character.</p>");

    } else if (!enemySelected && !gameOver) {

      $("#game-message").html("<p>You must choose an enemy to fight.</p>");
	}
	
  });

  $("#restart").on("click", () => {

    resetGame();
    $("#attack").show();

  });

});
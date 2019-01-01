let characterSelected = false;
let enemySelected = false;
let character = {};
let enemy = {};
let enemiesDefeated = 0;
let gameOver = false;

class Character {
  constructor(name, health, counterAttack, attack) {
    Object.assign(this, { name, health, counterAttack, attack })
  }
}

class Helper {

  static initializeCharacter (chosenCharacter) {
      character.name = chosenCharacter.name;
      character.health = chosenCharacter.health;
      character.counterAttack = chosenCharacter.counterAttack;
      character.attack = chosenCharacter.attack;
    }

  static initializeEnemy (chosenEnemy) {
      enemy.name = chosenEnemy.name;
      enemy.health = chosenEnemy.health;
      enemy.counterAttack = chosenEnemy.counterAttack;
      enemy.attack = chosenEnemy.attack;
    }

  // move characters to the enemies section
  static moveToEnemies() {

    $(".available-character").removeClass("available-character").addClass("enemy-character");
    $("#enemies-available").append( $(".enemy-character") );

}

  }


//characters
const ray = new Character('Ray', 120, 15, 15);
const luke = new Character('Luke Skywalker', 100, 25, 20);
const yoda = new Character('Yoda', 150, 25, 20);
const vader = new Character('Darth Vader', 180, 25, 25);

// reset game
const reset = () => {

  // Reset all
  $("#lessray-character .health").text(ray.health + ' HP');
  $("#luke-skywalker-character .health ").text(luke.health + ' HP');
  $("#yoda-character .health").text(yoda.health + ' HP');
  $("#darth-vader-character .health").text(vader.health + ' HP');

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
      $(this).removeClass("available-character").addClass("chosen-character");
      $("#chosen-character").append(this);

      Helper.initializeCharacter(ray);
      characterSelected = true;
      Helper.moveToEnemies();

    } else if ((characterSelected === true) && (enemySelected === false)) {

      if( $("#lessray-character").hasClass("enemy-character") ) {
        $("#game-message").empty();

        Helper.initializeEnemy(ray);
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
      $("#luke-skywalker-character").removeClass("available-character").addClass("chosen-character");
      $("#chosen-character").append(this);

      Helper.initializeCharacter(luke);
      characterSelected = true;
      Helper.moveToEnemies();

    } else if ((characterSelected === true) && (enemySelected === false)) {

      if($("#luke-skywalker-character").hasClass("enemy-character")) {
        $("#game-message").empty();

        Helper.initializeEnemy(luke);
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
      $("#yoda-character").removeClass("available-character").addClass("chosen-character");
      $("#chosen-character").append(this);

      Helper.initializeCharacter(yoda);
      characterSelected = true;
      Helper.moveToEnemies();

    } else if ((characterSelected === true) && (enemySelected === false)) {
      
      if($("#yoda-character").hasClass("enemy-character")) {
        $("#game-message").empty();

        Helper.initializeEnemy(yoda);
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
      $("#darth-vader-character").removeClass("available-character").addClass("chosen-character");
      $("#chosen-character").append(this);

      Helper.initializeCharacter(vader);
      characterSelected = true;
      Helper.moveToEnemies();

    } else if ((characterSelected === true) && (enemySelected === false)) {

      if($("#darth-vader-character").hasClass("enemy-character")) {
        $("#game-message").empty();

        Helper.initializeEnemy(vader);
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

          $("#enemies-available").hide();
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

        if(enemiesDefeated === 2) {
          $("#enemies-available h2").hide();
        }

        // you have won
        if (enemiesDefeated === 3) {

          $("#enemies-available").hide();
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

    reset();
    $("#attack").show();
    $("#enemies-available h2").show();

  });

});
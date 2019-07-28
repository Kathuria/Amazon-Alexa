var Alexa = require("alexa-sdk");
var speechOutput = " ";
var reprompt = " ";
var cardTitle = " ";
var cardContent = " ";
var imageObj = {};
var multiplier = 0;
var userJumped = false;

exports.handler = function(event, context, callback) {
  var alexa = Alexa.handler(event, context);
  alexa.APP_ID = "amzn1.ask.skill.4fd68e4e-a2d6-413e-bfa9-e36bbb0b48b5";

  alexa.dynamoDBTableName = "ScoreKeeper";

  alexa.registerHandlers(handlers);

  alexa.execute();
};

var handlers = {
  LaunchRequest: function() {
    this.emit("LaunchIntent");
  },

  LaunchIntent: function() {
    if (!this.attributes["ScoreCount"]) {
      speechOutput =
        "Hi, Welcome to Jump Numbers game. Here are the instructions for the game - In easy mode, you have to speak out 'jump' word on multiples of 5 and similary in medium, 3 and 7 multiples and in complex 4, 7 and 9. Remember you have to say pass if number is not a multiple. Every jump will give +5 points, every pass will give you +1 points and after 25 points level increases. After 2 levels upgrade you will earn a Batch as well. To begin the game, please tell me your mode of play.";
      reprompt = "Please, tell me your mode of play easy, medium or complex.";

      cardTitle = "Lets Jump";
      cardContent = "Choose your game mode";

      imageObj = {
        smallImageUrl:
          "https://s3-eu-west-1.amazonaws.com/akimagebucket/Shoot_Score_img/player+720.png",
        largeImageUrl:
          "https://s3-eu-west-1.amazonaws.com/akimagebucket/Shoot_Score_img/player+1200.png"
      };

      this.emit(
        ":askWithCard",
        speechOutput,
        reprompt,
        cardTitle,
        cardContent,
        imageObj
      );
    } else {
      speechOutput =
        "Hi, Welcome back to Jump Numbers game. I can still remember your previous score is " +
        this.attributes["ScoreCount"] +
        " , level is " +
        this.attributes["Level"] +
        (this.attributes["Level"] >= 2
          ? " and you have badge titled " + this.attributes["Badge"]
          : "") +
        ". To begin the game, please tell me your mode of play.";
      reprompt = "Please, tell me your mode of play easy, medium or complex.";

      cardTitle = "Lets Jump";
      cardContent = "Choose your game mode";

      imageObj = {
        smallImageUrl:
          "https://s3-eu-west-1.amazonaws.com/akimagebucket/Shoot_Score_img/player+720.png",
        largeImageUrl:
          "https://s3-eu-west-1.amazonaws.com/akimagebucket/Shoot_Score_img/player+1200.png"
      };
      this.emit(
        ":askWithCard",
        speechOutput,
        reprompt,
        cardTitle,
        cardContent,
        imageObj
      );
    }
  },

  PlayIntent: function() {
    if (
      !this.event.request.intent.slots.modes ||
      this.event.request.intent.slots.modes.value == "" ||
      this.event.request.intent.slots.modes.value == null
    ) {
      this.emitWithState("AMAZON.HelpIntent");
    } else if (this.event.request.intent.slots.modes.value == "repeat") {
      this.emitWithState("LaunchIntent");
    } else {
      this.attributes["myJumper"] = this.event.request.intent.slots.modes.value;
    }
    var check = this.attributes["myJumper"].match(
      /^jump|pass|next|easy|normal|medium|ok|complex|hard|difficult|yes|no/iu
    );

    if (check == null) {
      check = "fail";
    }

    switch (check[0].toLowerCase()) {
      case "easy":
      case "normal":
      case "medium":
      case "complex":
      case "hard":
      case "difficult":
        this.attributes["gameMode"] = check[0].toLowerCase();
        this.emit("GameIntent");
        break;
      case "no":
        this.emit("ScoreIntent");
        break;
      case "yes":
        this.emit("GameIntent");
        break;
      case "pass":
      case "next":
      case "jump":
        if (
          this.attributes["gameMode"] == "easy" ||
          this.attributes["gameMode"] == "ok"
        )
          this.emitWithState("EasyGameIntent");
        else if (
          this.attributes["gameMode"] == "medium" ||
          this.attributes["gameMode"] == "normal"
        )
          this.emitWithState("MediumGameIntent");
        else if (
          this.attributes["gameMode"] == "complex" ||
          this.attributes["gameMode"] == "hard" ||
          this.attributes["gameMode"] == "difficult"
        )
          this.emitWithState("HardGameIntent");
        else
          this.emit(
            ":ask",
            "Please enter mode of game easy, medium or complex."
          );
        break;
      default:
        this.emit(
          ":ask",
          "Sorry, I did not understand what you said. Say easy, medium or complex."
        );
    }
  },

  GameIntent: function() {
    if (!this.attributes["ScoreCount"] || this.attributes["ScoreCount"] < 25) {
      // Level I
      multiplier = Math.floor(Math.random() * 25 + 1);
      this.attributes["Badge"] = "Not available yet";
      this.attributes["Level"] = 1;
      if (!this.attributes["ScoreCount"]) this.attributes["ScoreCount"] = 0;
    } else if (
      this.attributes["ScoreCount"] > 25 &&
      this.attributes["ScoreCount"] < 50
    ) {
      // Level II, Badge - Begineer
      multiplier = Math.floor(Math.random() * 25 + 26);
      this.attributes["Badge"] = "Beginners";
      this.attributes["Level"] = 2;
    } else if (
      this.attributes["ScoreCount"] > 50 &&
      this.attributes["ScoreCount"] < 75
    ) {
      // Level III
      multiplier = Math.floor(Math.random() * 25 + 51);
      //this.attributes['Badge'] = "Beginners";
      this.attributes["Level"] = 3;
    } else if (
      this.attributes["ScoreCount"] > 75 &&
      this.attributes["ScoreCount"] < 100
    ) {
      // Level IV, Badge - Intermediate
      multiplier = Math.floor(Math.random() * 25 + 76);
      this.attributes["Badge"] = "Intermediate";
      this.attributes["Level"] = 4;
    } else if (
      this.attributes["ScoreCount"] > 100 &&
      this.attributes["ScoreCount"] < 150
    ) {
      // Level V
      multiplier = Math.floor(Math.random() * 50 + 101);
      //this.attributes['Badge'] = "Intermediate";
      this.attributes["Level"] = 5;
    } else if (this.attributes["ScoreCount"] > 150) {
      // Level VI, Badge Professional
      multiplier = Math.floor(Math.random() * 100 + 101);
      this.attributes["Badge"] = "Pro";
      this.attributes["Level"] = 6;
    }
    cardTitle = "Jump";
    cardContent = "Identify the multiplier number";
    reprompt = "Find multiplier number";

    imageObj = {
      smallImageUrl:
        "https://s3-eu-west-1.amazonaws.com/akimagebucket/Shoot_Score_img/num+720.jpg",
      largeImageUrl:
        "https://s3-eu-west-1.amazonaws.com/akimagebucket/Shoot_Score_img/num+1200.jpg"
    };
    speechOutput = multiplier;

    if (userJumped) {
      cardTitle = "Gotcha";
      cardContent = "You found it";
      reprompt = "Multiplier found";
      userJumped = false;

      this.emit(
        ":askWithCard",
        "<audio src='https://s3-eu-west-1.amazonaws.com/aksongs/Shoot_Score_Songs/Jump_Custom.mp3'/> You Got it right, Next Number is " +
          speechOutput,
        reprompt,
        cardTitle,
        cardContent,
        imageObj
      );
    } else {
      this.emit(
        ":askWithCard",
        "Number is " + speechOutput,
        reprompt,
        cardTitle,
        cardContent,
        imageObj
      );
    }
  },

  EasyGameIntent: function() {
    var input = this.event.request.intent.slots.modes.value;
    if (multiplier % 5 == 0 && multiplier > 0) {
      if (input == "jump") {
        userJumped = true;
        this.attributes["ScoreCount"] += 5;
        this.emit("GameIntent");
      } else {
        speechOutput =
          "<audio src='https://s3-eu-west-1.amazonaws.com/aksongs/Shoot_Score_Songs/GameOver_ACustom.mp3'/> You have to say jump on multiples of 5. Game over!!! Do you wanna play again?";
        cardTitle = "Multiplier is here";
        cardContent = "Identify the multiplier number";
        reprompt = "Find multiplier number";

        imageObj = {
          smallImageUrl:
            "https://s3-eu-west-1.amazonaws.com/akimagebucket/Shoot_Score_img/num+720.jpg",
          largeImageUrl:
            "https://s3-eu-west-1.amazonaws.com/akimagebucket/Shoot_Score_img/num+1200.jpg"
        };

        this.emit(
          ":askWithCard",
          speechOutput,
          reprompt,
          cardTitle,
          cardContent,
          imageObj
        );
      }
    } else if (input != "pass" && (multiplier % 5 != 0 || multiplier == 0)) {
      speechOutput =
        "<audio src='https://s3-eu-west-1.amazonaws.com/aksongs/Shoot_Score_Songs/GameOver_ACustom.mp3'/> You have to say pass if its not a multiple of 5. Game over!!! Do you wanna play again?";
      cardTitle = "Game Over";
      cardContent = "Better Luck next time";
      reprompt = "Try Again...";

      imageObj = {
        smallImageUrl:
          "https://s3-eu-west-1.amazonaws.com/akimagebucket/Shoot_Score_img/game+over+720.png",
        largeImageUrl:
          "https://s3-eu-west-1.amazonaws.com/akimagebucket/Shoot_Score_img/game+over+1200.png"
      };

      this.emit(
        ":askWithCard",
        speechOutput,
        reprompt,
        cardTitle,
        cardContent,
        imageObj
      );
    } else {
      this.attributes["ScoreCount"] += 1;
      this.emit("GameIntent");
    }
  },

  MediumGameIntent: function() {
    var input = this.event.request.intent.slots.modes.value;

    if ((multiplier % 3 == 0 || multiplier % 7 == 0) && multiplier > 0) {
      if (input == "jump") {
        userJumped = true;
        this.attributes["ScoreCount"] += 5;
        this.emit("GameIntent");
      } else {
        speechOutput =
          "<audio src='https://s3-eu-west-1.amazonaws.com/aksongs/Shoot_Score_Songs/GameOver_ACustom.mp3'/> You have to say jump on multiples of 3 and 7 both. Game over!!! Do you wanna play again?";
        cardTitle = "Multiplier is here";
        cardContent = "Identify the multiplier number";
        reprompt = "Find multiplier number";

        imageObj = {
          smallImageUrl:
            "https://s3-eu-west-1.amazonaws.com/akimagebucket/Shoot_Score_img/num+720.jpg",
          largeImageUrl:
            "https://s3-eu-west-1.amazonaws.com/akimagebucket/Shoot_Score_img/num+1200.jpg"
        };
        this.emit(
          ":askWithCard",
          speechOutput,
          reprompt,
          cardTitle,
          cardContent,
          imageObj
        );
      }
    } else if (
      input != "pass" &&
      (multiplier % 3 != 0 || multiplier % 7 != 0 || multiplier == 0)
    ) {
      speechOutput =
        "<audio src='https://s3-eu-west-1.amazonaws.com/aksongs/Shoot_Score_Songs/GameOver_ACustom.mp3'/> You have to say pass if its not a multiple of 3 and 7 both. Game over!!! Do you wanna play again?";
      cardTitle = "Game Over";
      cardContent = "Better Luck next time";
      reprompt = "Try Again...";

      imageObj = {
        smallImageUrl:
          "https://s3-eu-west-1.amazonaws.com/akimagebucket/Shoot_Score_img/game+over+720.png",
        largeImageUrl:
          "https://s3-eu-west-1.amazonaws.com/akimagebucket/Shoot_Score_img/game+over+1200.png"
      };

      this.emit(
        ":askWithCard",
        speechOutput,
        reprompt,
        cardTitle,
        cardContent,
        imageObj
      );
    } else {
      this.attributes["ScoreCount"] += 1;
      this.emit("GameIntent");
    }
  },

  HardGameIntent: function() {
    var input = this.event.request.intent.slots.modes.value;

    if (
      (multiplier % 4 == 0 || multiplier % 7 == 0 || multiplier % 9 == 0) &&
      multiplier > 0
    ) {
      if (input == "jump") {
        userJumped = true;
        this.attributes["ScoreCount"] += 5;
        this.emit("GameIntent");
      } else {
        speechOutput =
          "<audio src='https://s3-eu-west-1.amazonaws.com/aksongs/Shoot_Score_Songs/GameOver_ACustom.mp3'/> You have to say jump on multiples of 4, 7 and 9. Game over!!! Do you wanna play again?";
        cardTitle = "Multiplier is here";
        cardContent = "Identify the multiplier number";
        reprompt = "Find multiplier number";

        imageObj = {
          smallImageUrl:
            "https://s3-eu-west-1.amazonaws.com/akimagebucket/Shoot_Score_img/num+720.jpg",
          largeImageUrl:
            "https://s3-eu-west-1.amazonaws.com/akimagebucket/Shoot_Score_img/num+1200.jpg"
        };
        this.emit(
          ":askWithCard",
          speechOutput,
          reprompt,
          cardTitle,
          cardContent,
          imageObj
        );
      }
    } else if (
      input != "pass" &&
      (multiplier % 4 != 0 ||
        multiplier % 7 != 0 ||
        multiplier % 9 != 0 ||
        multiplier == 0)
    ) {
      speechOutput =
        "<audio src='https://s3-eu-west-1.amazonaws.com/aksongs/Shoot_Score_Songs/GameOver_ACustom.mp3'/> You have to say pass if its not a multiple of 4, 7 and 9. Game over!!! Do you wanna play again?";
      cardTitle = "Game Over";
      cardContent = "Better Luck next time";
      reprompt = "Try Again...";

      imageObj = {
        smallImageUrl:
          "https://s3-eu-west-1.amazonaws.com/akimagebucket/Shoot_Score_img/game+over+720.png",
        largeImageUrl:
          "https://s3-eu-west-1.amazonaws.com/akimagebucket/Shoot_Score_img/game+over+1200.png"
      };

      this.emit(
        ":askWithCard",
        speechOutput,
        reprompt,
        cardTitle,
        cardContent,
        imageObj
      );
    } else {
      this.attributes["ScoreCount"] += 1;
      this.emit("GameIntent");
    }
  },

  ScoreIntent: function() {
    speechOutput =
      "Your score is " +
      this.attributes["ScoreCount"] +
      " , level is " +
      this.attributes["Level"] +
      (this.attributes["Level"] >= 2
        ? " and Badge " + this.attributes["Badge"]
        : "") +
      ". Thanks for playing";
    this.emit(":tell", speechOutput);
  },

  "AMAZON.HelpIntent": function() {
    speechOutput =
      "You can play this game in three modes easy, medium and complex. In easy mode, you have to speak out 'jump' word on multiples of 5 and similary in medium, 3 and 7 multiples and in complex 4, 7 and 9 multiples. Remember you have to say pass if number is not a multiple. Every jump will give +5 points, every pass will give you +1 points and after 25 points level increases. After 2 levels upgrade you will earn a Batch as well. To continue, please answer the previous question.";
    reprompt = "Please, answer the previous question.";
    this.emitWithState(":ask", speechOutput, reprompt);
  },
  "AMAZON.StopIntent": function() {
    speechOutput = "See you again. Have a nice day!";
    this.emit(":tell", speechOutput);
  },
  "AMAZON.CancelIntent": function() {
    speechOutput = "No Problem, Good Bye..";
    this.emit(":tell", speechOutput);
  },
  Unhandled: function() {
    var speechOutput = "Sorry, can you try again please";
    this.emit(":tell", speechOutput);
  }
};

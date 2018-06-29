var Alexa = require('alexa-sdk');
var speechOutput = ' ';
var reprompt = ' ';
var cardTitle = ' ';
var cardContent = ' ';
var imageObj = {};
var culprit = 0;


exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = "amzn1.ask.skill.da27a887-b7be-4d4e-9e69-295cda0272e0";

    alexa.dynamoDBTableName = 'ScoreKeeper'; 
    
    alexa.registerHandlers(handlers);
    
    alexa.execute();

};

var handlers = {
    'LaunchRequest': function() { 
            this.emit('LaunchIntent');
    },
    
     'LaunchIntent': function() {
        if (!this.attributes['ScoreCount']){
            speechOutput = "Hi, welcome to Shooting the number game. You can play this game in two modes single player or multiplayer. Here are the instructions for the game - If you are playing singly then you have to speak out 'shoot' word on multiples of 5 and If you are playing in multiplayer, 'shoot' word on multiples of 3 and 7. Remember you have to say save if number is not a multiple. Every shoot will give +5 points, every save will give you +1 points and after 25 points level increases. After 2 levels upgrade you will earn a Batch as well. To begin the game, please tell me your mode of play single or multiplayer.";
            reprompt = "Please, tell me your mode of play single or multiplayer.";
            
            cardTitle = 'Lets Shoot';
            cardContent = 'Choose your game mode';
    
            imageObj = {
                smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Shoot_Score_img/player+720.png",
                largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Shoot_Score_img/player+1200.png"
            };
            
            this.emit(':askWithCard', speechOutput, reprompt, cardTitle, cardContent, imageObj);
        } else {
                speechOutput = "Hi, Welcome back to Shooting the number game. I can still remember your previous score is " + this.attributes['ScoreCount'] + " , level is " + this.attributes['Level'] + ((this.attributes['Level'] >= 2) ? " and you have badge titled " + this.attributes['Badge'] : "") + ". To begin the game, please tell me your mode of play single or multiplayer.";
                reprompt = "Please, tell me your mode of play single or multiplayer.";
            
            cardTitle = 'Lets Shoot';
            cardContent = 'Choose your game mode';
    
            imageObj = {
                smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Shoot_Score_img/player+720.png",
                largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Shoot_Score_img/player+1200.png"
            };
            this.emit(':askWithCard', speechOutput, reprompt, cardTitle, cardContent, imageObj);
        }
    },
    
    'PlayIntent': function() {
        if ( !this.event.request.intent.slots.modes || this.event.request.intent.slots.modes.value == '' || this.event.request.intent.slots.modes.value == null) {
            this.emitWithState('AMAZON.HelpIntent'); 
        } else if(this.event.request.intent.slots.modes.value == 'repeat'){
            this.emitWithState('LaunchIntent'); 
        } else {
            this.attributes['myShooter'] = this.event.request.intent.slots.modes.value;
        }    
        var check = this.attributes['myShooter'].match(/^shoot|save|kill|single|multiplayer|single-player|multi|start|yes|no/ui);
        
        if(check == null) {
            check = 'fail';
        }   
        
        switch (check[0].toLowerCase()){
            case 'single':
            case 'single-player':
            case 'singleplayer':    
            case 'start':    
            case 'multi':
            case 'multiplayer': 
            case 'multi-player':  
                this.attributes['gameMode'] = check[0].toLowerCase();
                this.emit('GameIntent');
                break;
            case 'no':
                this.emit('ScoreIntent');
                break;
            case 'yes':    
                this.emit('GameIntent');
                break;
            case 'save':
            case 'shoot':
            case 'kill': 
                if(this.attributes['gameMode'] == 'single' || this.attributes['gameMode'] == 'single-player' || this.attributes['gameMode'] == 'singleplayer')
                    this.emit('SingleGameIntent');
                else if(this.attributes['gameMode'] == 'multi' || this.attributes['gameMode'] == 'multi-player' || this.attributes['gameMode'] == 'multiplayer')
                    this.emitWithState('MultiGameIntent');
                else
                    this.emit(':ask', "Please enter mode of game single or multiplayer.");
                break;
            default:
                this.emit(':ask', "Please enter valid required value.");
            }
    },    
    
    'GameIntent': function() {
                     if (!this.attributes['ScoreCount'] || this.attributes['ScoreCount'] < 25){     // Level I
                        culprit = Math.floor(Math.random() * (25) + 1);
                        this.attributes['Badge'] = "Not available yet";
                        this.attributes['Level'] = 1;
                        if (!this.attributes['ScoreCount'])
                            this.attributes['ScoreCount'] = 0;
                    }
                    else if (this.attributes['ScoreCount'] > 25 && this.attributes['ScoreCount'] < 50){ // Level II, Badge - Begineer 
                        culprit = Math.floor(Math.random() * (25) + 26);
                        this.attributes['Badge'] = "Beginners";
                        this.attributes['Level'] = 2;
                    }
                     else if (this.attributes['ScoreCount'] > 50 && this.attributes['ScoreCount'] < 75){  // Level III
                        culprit = Math.floor(Math.random() * (25) + 51);
                        //this.attributes['Badge'] = "Beginners";
                        this.attributes['Level'] = 3;
                    }
                     else if (this.attributes['ScoreCount'] > 75 && this.attributes['ScoreCount'] < 100){  // Level IV, Badge - Intermediate
                        culprit = Math.floor(Math.random() * (25) + 76);
                        this.attributes['Badge'] = "Intermediate";
                        this.attributes['Level'] = 4;
                    }
                     else if (this.attributes['ScoreCount'] > 100 && this.attributes['ScoreCount'] < 150){  // Level V
                        culprit = Math.floor(Math.random() * (50) + 101);
                        //this.attributes['Badge'] = "Intermediate";
                        this.attributes['Level'] = 5;
                    }
                    else if (this.attributes['ScoreCount'] > 150){                      // Level VI, Badge Professional
                        culprit = Math.floor(Math.random() * (100) + 101);
                        this.attributes['Badge'] = "Pro";
                        this.attributes['Level'] = 6;
                    }
                    cardTitle = 'Shoot';
                    cardContent = 'Identify the culprit number';
                    reprompt = "Find culprit number";
    
                    imageObj = {
                        smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Shoot_Score_img/num+720.jpg",
                        largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Shoot_Score_img/num+1200.jpg"
                    };
                    speechOutput = culprit;
                    this.emit(':askWithCard', "Number is " + speechOutput, reprompt, cardTitle, cardContent, imageObj);
    },
    
    'SingleGameIntent' : function(){
        var input = this.event.request.intent.slots.modes.value;
        if (culprit % 5 == 0 && culprit > 0){
            if(input == 'shoot'){
                speechOutput = "<audio src='https://s3-eu-west-1.amazonaws.com/aksongs/Shoot_Score_Songs/Bullet+Shoot_ACustom.mp3'/> You Got it right, Play again for more fun!!! Do you wanna play again?";
                cardTitle = 'Gotcha';
                cardContent = 'You found it';
                reprompt = "Culprit found";
    
                imageObj = {
                        smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Shoot_Score_img/game+over+720.png",
                        largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Shoot_Score_img/game+over+1200.png"
                    };
                
                this.attributes['ScoreCount'] += 5;    
                this.emit(':askWithCard', speechOutput, reprompt, cardTitle, cardContent, imageObj);
            }
            else {
                speechOutput = "<audio src='https://s3-eu-west-1.amazonaws.com/aksongs/Shoot_Score_Songs/GameOver_ACustom.mp3'/> You have to say shoot on multiples of 5. Game over!!! Do you wanna play again?";
                cardTitle = 'Culprit is here';
                cardContent = 'Identify the culprit number';
                reprompt = "Find culprit number";
        
                imageObj = {
                            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Shoot_Score_img/num+720.jpg",
                            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Shoot_Score_img/num+1200.jpg"
                        };
                        
                this.emit(':askWithCard', speechOutput, reprompt, cardTitle, cardContent, imageObj);
            }
        }
        else if(input != 'save' && (culprit % 5 != 0 || culprit == 0)){
            speechOutput = "<audio src='https://s3-eu-west-1.amazonaws.com/aksongs/Shoot_Score_Songs/GameOver_ACustom.mp3'/> You have to say save if its not a multiple of 5. Game over!!! Do you wanna play again?";
            cardTitle = 'Game Over';
            cardContent = 'Better Luck next time';
            reprompt = "Try Again...";
    
            imageObj = {
                        smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Shoot_Score_img/game+over+720.png",
                        largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Shoot_Score_img/game+over+1200.png"
                    };
                    
            this.emit(':askWithCard', speechOutput, reprompt, cardTitle, cardContent, imageObj);
        }
        else{
                this.attributes['ScoreCount'] += 1;
                this.emit('GameIntent');
                }    
    },
    
       'MultiGameIntent' : function(){
        var input = this.event.request.intent.slots.modes.value;
        
        if (((culprit % 3 == 0) || (culprit % 7 == 0)) && culprit > 0){
            if(input == 'shoot'){
                speechOutput = "<audio src='https://s3-eu-west-1.amazonaws.com/aksongs/Shoot_Score_Songs/Bullet+Shoot_ACustom.mp3'/> You Got it right, Play again for more fun!!! Do you wanna play again?";
                cardTitle = 'Gotcha';
                cardContent = 'You found it';
                reprompt = "Culprit Found";
    
                    imageObj = {
                        smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Shoot_Score_img/game+over+720.png",
                        largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Shoot_Score_img/game+over+1200.png"
                    };
                    
                    this.attributes['ScoreCount'] += 5;
                    this.emit(':askWithCard', speechOutput, reprompt, cardTitle, cardContent, imageObj);
            }
            else {
                speechOutput = "<audio src='https://s3-eu-west-1.amazonaws.com/aksongs/Shoot_Score_Songs/GameOver_ACustom.mp3'/> You have to say shoot on multiples of 3 & 7 both. Game over!!! Do you wanna play again?";
                cardTitle = 'Culprit is here';
                cardContent = 'Identify the culprit number';
                reprompt = "Find culprit number";
        
                imageObj = {
                            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Shoot_Score_img/num+720.jpg",
                            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Shoot_Score_img/num+1200.jpg"
                        };
                this.emit(':askWithCard', speechOutput, reprompt, cardTitle, cardContent, imageObj);
            }
        }
        else if((input != 'save') && ((culprit % 3 != 0) || (culprit % 7 != 0) || (culprit == 0))){
            speechOutput = "<audio src='https://s3-eu-west-1.amazonaws.com/aksongs/Shoot_Score_Songs/GameOver_ACustom.mp3'/> You have to say save if its not a multiple of 3 & 7 both. Game over!!! Do you wanna play again?";
            cardTitle = 'Game Over';
            cardContent = 'Better Luck next time';
            reprompt = "Try Again...";
    
            imageObj = {
                        smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Shoot_Score_img/game+over+720.png",
                        largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Shoot_Score_img/game+over+1200.png"
                    };
                    
            this.emit(':askWithCard', speechOutput, reprompt, cardTitle, cardContent, imageObj);
        }
        else{
                this.attributes['ScoreCount'] += 1;
                this.emit('GameIntent');
            }    
    },
    
    'ScoreIntent': function() {
        speechOutput = "Your score is " + this.attributes['ScoreCount'] + " , level is " + this.attributes['Level'] + ((this.attributes['Level'] >= 2) ? " and Badge " + this.attributes['Badge'] : "") + ". Thanks for playing";
        this.emit(':tell', speechOutput);
    },
    
    'AMAZON.HelpIntent': function () {    
        speechOutput = "You can play this game in two modes single player or multiplayer. Here are the instructions for the game - If you are playing singly then you have to speak out 'shoot' word on multiples of 5 and If you are playing in multiplayer, 'shoot' word on multiples of 3 and 7. Remember you have to say save if number is not a multiple. Every shoot will give +5 points, every save will give you +1 points and after 25 points level increases. After 2 levels upgrade you will earn a Batch as well. To begin the game you need to select mode of play single or multiplayer. To continue, please answer the previous question.";
        reprompt = "Please, answer the previous question.";
        this.emitWithState(':ask', speechOutput, reprompt);
    },
    'AMAZON.StopIntent': function () {
        speechOutput = "See you again. Have a nice day!";
        this.emit(':tell', speechOutput);
    },
    'AMAZON.CancelIntent': function () {
        speechOutput = "No Problem, Good Bye..";
        this.emit(':tell', speechOutput);
    },
    'Unhandled': function () {
        console.log(this.event);
        console.log("Slots:");
        console.log(this.event.request.intent.slots);
        var speechOutput = "Sorry, can you try again please";
        this.emit(':tell', speechOutput);
    }
};
var Alexa = require('alexa-sdk');
var speechOutput = ' ';
var reprompt = ' ';
var cardTitle = 'Nursery Rhymes';
var cardContent = ' ';
var imageObj = {};
var check = ' ';

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);

    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function() { 
        this.emit('LaunchIntent');
    },

     'LaunchIntent': function() {
        speechOutput = "Hi, which rhyme do you wanna play, Here are the options: Twinkle Twinkle, Humpty Dumpty, Hello Song, Baa Baa Black Sheep, Wheels on Bus, Bath Song, Drive in my car, Blue Whale, Brush our teeth or Abc Song";
        reprompt = "Please, tell me the name of rhyme or say help";
        
        cardContent = 'List of Rhymes';

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Rhymes/List+720w+480h.png",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Rhymes/List+1200w+800h.png"
        };
        this.emit(':askWithCard', speechOutput, reprompt, cardTitle, cardContent, imageObj);
    },

    'RhymesIntent': function(){
        this.attributes['myRhyme'] = this.event.request.intent.slots.myRhymes.value;
        var check = this.attributes['myRhyme'].match(/twinkle|humpty|dumpty|hello|baa|sheep|bus|wheels|bath|car|drive|driving|blue|whale|brush|abc/iu);
        
        if(check == null)
            check = 'fail';
        
        switch (check[0].toLowerCase()){
            case 'twinkle':
                this.emit('TwinkleIntent');
                break;
            case 'dumpty':    
            case 'humpty':
                this.emit('HumptyIntent');
                break;
            case 'hello':
                this.emit('HelloIntent');
                break;
            case 'sheep':    
            case 'baa':
                this.emit('BaaBaaIntent');
                break;
            case 'wheels':
            case 'bus':
                this.emit('BusWheelsIntent');
                break;
            case 'bath':
                this.emit('BathSongIntent');
                break;
            case 'car':
            case 'drive':    
            case 'driving':
                this.emit('DriveCarIntent');
                break;
            case 'whale':
            case 'blue':
                this.emit('BlueWhaleIntent');
                break;
            case 'brush':
                this.emit('BrushTeethIntent');
                break;
            case 'abc':
                this.emit('ABCSongIntent');
                break;
            default:
                this.emit('AMAZON.HelpIntent');
        }
    },
    'TwinkleIntent': function() {
        speechOutput = "Lets enjoy Twinkle Twinkle, <audio src='https://s3-eu-west-1.amazonaws.com/aksongs/Twinkle+Twinkle+Little+Star+-+Nursery+rhyme+48kbps+16000Hz.mp3'/>, goodBye";
        
        cardContent = 'Twinkle Twinkle Little Star';

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Twinkle+Twinkle+-+720+480.png",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Twinkle+Twinkle+-+1200++800.png"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    },
    'HumptyIntent': function() {
        speechOutput = "Lets enjoy Humpty Dumpty, <audio src='https://s3-eu-west-1.amazonaws.com/aksongs/Humpty+Dumpty+-+48kbps+16000Hz.mp3'/>, goodBye";
        
        cardContent = 'Humpty Dumpty Sat On A Wall';

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Humpty+Dumpty+720+480.png",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Humpty+Dumpty+1200+800.png"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    },
    'HelloIntent': function() {
        speechOutput = "Lets enjoy Hello Song, <audio src='https://s3-eu-west-1.amazonaws.com/aksongs/Rhymes/Hello_Song+48kbps+16000Hz.mp3'/>, goodBye";
        
        cardContent = 'Hello Song';

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Rhymes/Hello_Song+720w+480h.png",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Rhymes/Hello_Song+1200w+800h.png"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    },
     'BaaBaaIntent': function() {
        speechOutput = "Lets enjoy Baa Baa Black Sheep, <audio src='https://s3-eu-west-1.amazonaws.com/aksongs/Rhymes/Baa_Baa_Black_Sheep+48kbps+16000Hz.mp3'/>, goodBye";
        
        cardContent = 'Baa Baa Black Sheep';

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Rhymes/Baa_Baa_Black_Sheep+720w+480h.png",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Rhymes/Baa_Baa_Black_Sheep+1200w+800h.png"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    },
    'BusWheelsIntent': function() {
        speechOutput = "Lets enjoy Wheels On The Bus, <audio src='https://s3-eu-west-1.amazonaws.com/aksongs/Rhymes/Wheels_On_The_Bus_48kbps_16000Hz.mp3'/>, goodBye";
        
        cardContent = 'Wheels On The Bus';

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Rhymes/Wheels_On_The_Bus+720w+480h.png",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Rhymes/Wheels_On_The_Bus+1200w+800h.png"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    },  
    'BathSongIntent': function() {
        speechOutput = "Lets enjoy Bath Song, <audio src='https://s3-eu-west-1.amazonaws.com/aksongs/Rhymes/Bath_Song_48kbps_16000Hz.mp3'/>, goodBye";
        
        cardContent = 'Bath Song';

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Rhymes/Bath+Song+720w+480h.jpeg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Rhymes/Bath+Song+1200w+800h.jpeg"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    }, 
    'DriveCarIntent': function() {
        speechOutput = "Lets enjoy Driving In My Car, <audio src='https://s3-eu-west-1.amazonaws.com/aksongs/Rhymes/Driving_In_My_Car+48kbps+16000Hz.mp3'/>, goodBye";
        
        cardContent = 'Driving In My Car';

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Rhymes/Drive+Car+720w+480h.jpeg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Rhymes/Drive+Car+1200w+800h.jpeg"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    },
     'BlueWhaleIntent': function() {
        speechOutput = "Lets enjoy Blue Whale, <audio src='https://s3-eu-west-1.amazonaws.com/aksongs/Rhymes/Blue_Whale_48kbps_16000Hz.mp3'/>, goodBye";
        
        cardContent = 'Blue Whale';

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Rhymes/Blue+Whale+720w+480h.jpeg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Rhymes/Blue+Whale+1200w+800h.jpeg"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    },
    'BrushTeethIntent': function() {
        speechOutput = "Lets enjoy Brush Our Teeth, <audio src='https://s3-eu-west-1.amazonaws.com/aksongs/Rhymes/This_Is_The_Way_We_Brush_Our_Teeth_48kbps_16000Hz.mp3'/>, goodBye";
        
        cardContent = 'Brush Our Teeth';

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Rhymes/Brush+Teeth+720w+480h.jpeg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Rhymes/Brush+Teeth+1200w+800h.jpeg"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    },  
    'ABCSongIntent': function() {
        speechOutput = "Lets enjoy ABC Song, <audio src='https://s3-eu-west-1.amazonaws.com/aksongs/Rhymes/ABC_Song+48kbps+16000Hz.mp3'/>, goodBye";
        
        cardContent = 'ABC Song';

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Rhymes/ABC_Song+720w+480h.png",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Rhymes/ABC_Song+1200w+800h.png"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    },       
    'AMAZON.HelpIntent': function () {    
        speechOutput = "You can listen nursery rhymes, or, you can say stop... What can I help you with?";
        reprompt = "Here are the option for rhymes : Twinkle Twinkle, Humpty Dumpty, Hello Song, Baa Baa Black Sheep, Wheels on Bus, Bath Song, Drive in my car, Blue Whale, Brush your teeth or Abc Song";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.StopIntent': function () {
        speechOutput = "See you again. Have a nice day!";
        this.emit(':tell', speechOutput);
    },
    'AMAZON.CancelIntent': function () {
        speechOutput = "No Problem, Good Bye..";
        this.emit(':tell', speechOutput);
    }
};

var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);

    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function() { //Executes when a new session is launched
        this.emit('LaunchIntent');
    },

    'LaunchIntent': function() {
        var speechOutput = "Let's enjoy Indian National Anthem, <audio src='https://s3-eu-west-1.amazonaws.com/aksongs/Indian+National+Anthem.mp3'/> Vande mataram!!!";
        
        var cardTitle = 'Indian National Anthem';
        
        var cardContent = 'Enjoy the anthem with proud. Vande Mataram';

        var imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/India+-+720w+480h.jpg",
            largeImageUrl: 'https://s3-eu-west-1.amazonaws.com/akimagebucket/National-anthem-1200w+800h.jpg'
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    },
    'AMAZON.HelpIntent': function () {    
          var speechOutput = "You can listen national anthem, or, you can say exit... What can I help you with?";
            var reprompt = "What can I help you with?";
            this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.StopIntent': function () {
          var speechOutput = "Stopping Services. Have a nice day!";
          this.emit(':tell', speechOutput);
    },
    'AMAZON.CancelIntent': function () {
          var speechOutput = "Cancelling initiated. Goodbye";
          this.emit(':tell', speechOutput);
    }
};

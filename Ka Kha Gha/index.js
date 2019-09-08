var Alexa = require("alexa-sdk");

exports.handler = function(event, context, callback) {
  var alexa = Alexa.handler(event, context);

  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {
  LaunchRequest: function() {
    this.emit("LaunchIntent");
  },

  LaunchIntent: function() {
    //var speechOutput = "चलिए क ख ग सीखते है, <audio src='https://s3-eu-west-1.amazonaws.com/aksongs/Indian+National+Anthem.mp3'/> Vande mataram!!!";
    //        var speechOutput = "चलिए क ख ग सीखते है, <audio src='https://aksongs.s3-eu-west-1.amazonaws.com/K+Kha+Ga+Gha+-+48kbps+16000Hz.mp3'/>";
    var speechOutput = "चलिए क ख ग सीखते है";

    var cardTitle = "क ख ग ";

    var cardContent = "क ख ग की पढ़ाई ";

    var imageObj = {
      smallImageUrl:
        "https://akimagebucket.s3-eu-west-1.amazonaws.com/Hindi+Alphabets/K+Kha+Gha+720x480.jpg",
      largeImageUrl:
        "https://akimagebucket.s3-eu-west-1.amazonaws.com/Hindi+Alphabets/K+Kha+Gha+1200x800.jpg"
    };

    this.emit(":tellWithCard", speechOutput, cardTitle, cardContent, imageObj);
  },
  "AMAZON.HelpIntent": function() {
    var speechOutput =
      "आप ka kha Ga को सुन सकते हैं, Help या Exit कह सकते हैं ... मैं आपकी क्या मदद कर सकता हूं?";
    var reprompt = "में आपकी कैसे मदद कर सकता हूं?";
    this.emit(":ask", speechOutput, reprompt);
  },
  "AMAZON.StopIntent": function() {
    var speechOutput = "सेवाएं रोक दी गई. आपका दिन शुभ हो!";
    this.emit(":tell", speechOutput);
  },
  "AMAZON.CancelIntent": function() {
    var speechOutput = "रद्द कर दिया. अलविदा";
    this.emit(":tell", speechOutput);
  }
};

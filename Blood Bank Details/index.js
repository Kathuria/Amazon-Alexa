//var Alexa = require('alexa-sdk');
var request = require("request");

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */

    // if (event.session.application.applicationId !== "amzn1.ask.skill.d5b1304a-d9b4-41be-9324-1eed83b931e9") {
    //     context.fail("Invalid Application ID");
    //  }

        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request, event.session, function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request, event.session, function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest" || event.request.type ==="AMAZON.StopIntent" || event.request.type ==="AMAZON.CancelIntent") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

var handlers = {
     'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say tell me a blood bank details, or, you can say stop... What can I help you with?";
        var reprompt = "What can I help you with?";
            this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.StopIntent': function () {
        var speechOutput = "Donate Blood to save lives. Have a nice day!";
          this.emit(':tell', speechOutput);
    },
    'AMAZON.CancelIntent': function () {
        var speechOutput = "Cancelling initiated. Goodbye, Stay Safe";
          this.emit(':tell', speechOutput);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    // add any session init logic here
}

/**
 * Called when the user invokes the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {

    var intent = intentRequest.intent;
    var intentName = intentRequest.intent.name;

    // dispatch custom intents to handlers here
    if (intentName == "GetInfoIntent") {
        handleGetInfoIntent(intent, session, callback);
    } else {
         throw "Invalid intent";
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    var header = "Blood Bank Directory";

    var speechOutput = "Donate Blood to save lives. Have a nice day!";
          //this.emit(':tell', speechOutput);
    callback(sessionAttributes, buildSpeechletResponse(header, speechOutput, "" ,shouldEndSession));
}

// ------- Skill specific logic -------

function getWelcomeResponse(callback) {
    var speechOutput = "Welcome! Do you want to know Blood Bank Details?";

    var reprompt = "Do you want to hear Blood Bank Details?";

    var header = "Blood Bank Details";

    var cardTitle = 'Blood Details Card';
        
    var cardContent = 'Please follow these guidelines.';

    var shouldEndSession = false;

    var sessionAttributes = {
        "speechOutput" : speechOutput,
        "repromptText" : reprompt
    };

        var imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/word-hello-background+108h+108w.jpg",
            largeImageUrl: 'https://s3-eu-west-1.amazonaws.com/akimagebucket/Hello+World+large+1200w+800h.png'
        };

    //this.emit(':tellWithCard', cardTitle, cardContent, imageObj);

    callback(sessionAttributes, buildSpeechletResponse(header, speechOutput, reprompt, shouldEndSession));

}

function handleGetInfoIntent(intent, session, callback) {

    var speechOutput = "We have an error";

    getJSON(function(data) {
        if (data != "ERROR") {
            var speechOutput = data;
        }
        callback(session.attributes, buildSpeechletResponseWithoutCard(speechOutput, "", true));
    });

}

function url() {
    return {
        url: "https://api.data.gov.in/resource/fced6df9-a360-4e08-8ca0-f283fc74ce15",
        qs: {
            "format" : "json",
            "api-key" : "579b464db66ec23bdd0000012c8c03cfc3a548a97bcb5ea2067e58ec",
            "filters[pincode]" : "201301"
        }
    };
}

function getJSON(callback) {
    //Total Records
    request.get(url(), function(error, response, body) {
        var d = JSON.parse(body);
        var result = d.records;
        if (result.length > 0) {
            callback("Here are the required details: Name "+ result[0]._blood_bank_name + ", City " + result[0]._city + ", State " + result[0]._state + ", District " + result[0]._district + ", Address " + result[0]._address + " and Contact Number " + result[0]._contact_no + ". Please look at the card for location map");
        } else {
            callback("ERROR");
        }
    });
}


// ------- Helper functions to build responses for Alexa -------


function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "BodyTemplate6",
            title: title,
            content: output,
            textContent: "Blood Content displayed here",
            token: "string",
            backButton: "VISIBLE", //(default) | "HIDDEN",
            backgroundImage: "https://s3-eu-west-1.amazonaws.com/akimagebucket/hello+1200w+800h.jpg",
            image: { // image is optional
                smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/word-hello-background+108h+108w.jpg",
                largeImageUrl: 'https://s3-eu-west-1.amazonaws.com/akimagebucket/Hello+World+large+1200w+800h.png'
            }
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}

function capitalizeFirst(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
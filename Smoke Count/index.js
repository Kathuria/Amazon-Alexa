var Alexa = require('alexa-sdk');
var speechOutput = ' ';
var reprompt = ' ';
var cardTitle = ' ';
var cardContent = ' ';
var imageObj = {};
var flag = false;
var smoker = 0;


exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = "amzn1.ask.skill.792043c2-26c7-46e8-a83c-26a5285d8d8d";
    var locale = event.request.locale;

    alexa.dynamoDBTableName = 'smokingData'; 
    
    if (locale == 'en-IN'){
        alexa.registerHandlers(INhandlers);

    } else if (locale == 'en-US') {
        alexa.registerHandlers(UShandlers);
        
    } else if (locale == 'en-GB') {
        alexa.registerHandlers(UKhandlers);
        
    } else if (locale == 'en-CA') {
        alexa.registerHandlers(CAhandlers);
        
    } else if (locale == 'en-AU') {
        alexa.registerHandlers(AUhandlers);
        
    } else {
        alexa.registerHandlers(INhandlers);
        
    }
    alexa.execute();

};

var INhandlers = {
    'LaunchRequest': function() { 
            this.emit('LaunchIntent');
    },
    
     'LaunchIntent': function() {
        if (!this.attributes['cigCount']){
            speechOutput = "Hi, welcome to your daily smoke count. Please help me with required details to start, tell me the number of cigarette you smoked.";
            reprompt = "Please, tell me the number of cigarette you smoked.";
            
            cardTitle = 'Smoke Count';
            cardContent = 'Because every smoke counts';
    
            imageObj = {
                smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/DSC+images/Launch+720x480.png",
                largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/DSC+images/Launch+1200x800.png"
            };
            
            this.emitWithState(':askWithCard', speechOutput, reprompt, cardTitle, cardContent, imageObj);
        } else {
            if(new Date().getDate() != this.attributes['Date']){
                speechOutput = "Hi, Welcome back to your daily smoke count. Please tell me your today's smoke count";
                reprompt = "Please tell me your today's smoke count";
                this.emitWithState(':ask', speechOutput, reprompt);
            }
            else{
                speechOutput = "You have already updated today's smoke count. Here are your available options: For Today's Smoke Summary Say 1, For Resetting Today's Smoke Count say 2, For Complete Smoke Summary say 3, For Health Effects say 4, For Advantages of Quitting Smoke say 5 and For Help say 6";
                reprompt = "Here are your available options: For Today's Smoke Summary Say 1, For Resetting Today's Smoke Count say 2, For Complete Smoke Summary say 3, For Health Effects say 4, For Advantages of Quitting Smoke say 5 and For Help say 6";
                this.emitWithState(':ask', speechOutput, reprompt);
            }
        }
    },
    
    'CountIntent': function() {
        var input = this.event.request.intent.slots.cigCount.value;
        
         if(isNaN(input)){
            this.emit(':ask', "Please enter valid required value.");
         } else {
                if(!this.attributes['cigCount']){
                    this.attributes['cigCount'] = Number(input);
                    this.attributes['todayCigCount'] = Number(input);
                    this.attributes['Date'] = new Date().getDate();
                    this.emit('SummaryIntent');
                 } else {
                        if(new Date().getDate() != this.attributes['Date']){
                            this.attributes['cigCount'] = Number(this.attributes['cigCount']) + Number(input);
                            this.attributes['oldCigCount'] = this.attributes['todayCigCount'];
                            this.attributes['todayCigCount'] = Number(input);
                            this.attributes['Date'] = new Date().getDate();
                            flag = true;
                            this.emit('SummaryIntent');
                        } else{
                            switch(Number(input)){
                                case 1:
                                    flag = true;
                                    this.emitWithState('SummaryIntent');
                                    break;
                                case 2:  
                                    this.emit('ResetTodaysCount');
                                    break;
                                case 3:
                                    flag = false;
                                    this.emitWithState('SummaryIntent');
                                    break;
                                case 4:
                                    this.emit('HealthIntent');
                                    break;
                                case 5:
                                    this.emit('QuitIntent');
                                    break;
                                case 6:
                                    this.emitWithState('AMAZON.HelpIntent');
                                    break;
                                default:    
                                    this.emitWithState('AMAZON.HelpIntent');
                        }
                    }
            }
         }    
    },    
    
    'SummaryIntent': function() {
        var cCount = flag ? this.attributes['todayCigCount']:this.attributes['cigCount'];
        
        var sTime = (cCount * 6);    //Average time spent
        var totalTime = sTime >= 60? (sTime/60) + " hour(s)" : sTime + " minutes";

        var sTar = (cCount * (14.3)).toFixed(2);
        var totalTar = sTar>1000? (sTime/1000).toFixed(2) + " grams" : sTar + " miligrams";

        var sNico = (cCount * (0.93)).toFixed(2);
        var totalNico = sNico>1000? (sNico/1000).toFixed(2) + " grams" : sNico + " miligrams";

        var totalPrice = (cCount * 15);
        
        var LifeRedn = (cCount * 11);
        LifeRedn = LifeRedn >= 60 ? ((LifeRedn/60).toFixed(2) + " hour(s)"): (LifeRedn + " minutes");
        
        if (this.attributes['oldCigCount'] > this.attributes['todayCigCount']){
            var lcount = (this.attributes['oldCigCount'] - this.attributes['todayCigCount']);
            smoker = "Bravo!!! You have reduced your smoke count by "+ lcount + " cigarette(s) and saved "+ (lcount * 15) + " Rupees today.";
        } else if (this.attributes['todayCigCount'] > this.attributes['oldCigCount']){
            var hcount = (this.attributes['todayCigCount'] - this.attributes['oldCigCount']);
            smoker = "Ohh Gosh, Something went wrong today? You have increased your smoke count by "+ hcount + " cigarette(s) and spent "+ (hcount * 15) + " Rupees more.";
        } else {
            smoker = "Keep counting your daily smoke.";
        }
        
        if(cCount == 0){
            speechOutput = "Yayyy, you are non-smoker. Keep up this spirit, enjoy the healthy life.";
        } else{
            if(cCount == this.attributes['cigCount']){
                speechOutput = "Here is the summary of your smoke, You smoked " + cCount + " cigarette(s) with total time spent of " + totalTime + " considering an average of 6 minute per cigarette. You consumed " + totalTar + " of tar and " + totalNico  + " of nicotine approximately, which reduced " + LifeRedn + " from your lifespan. Your average spent amount is " + totalPrice + " Rupees, considering 15 Rupees per cigarette. Advice: Keep tracking your count.";
            } else{
                speechOutput = "Today's Smoke Summary, You smoked " + cCount + " cigarette(s) with total time spent of " + totalTime + ". You consumed " + totalTar + " tar and " + totalNico  + " nicotine approximately, which reduced " + LifeRedn + " from your lifespan. Your average spent amount is " + totalPrice + " Rupees. Analysis: "+ smoker;
            }
            
        }    
            reprompt = " ";
            
            cardTitle = 'Your Smoke Summary';
            cardContent = "Cigarette(s) = " + cCount + ",  Time Spent(6min/cig) = " + totalTime + ", Tar Intake = " + totalTar + " (approx.), Nicotine Intake = " + totalNico  + " (approx.), LifeTime Reduced (11 min/cig) = " + LifeRedn + ", Expenditure (Rs. 15/cig) = " + totalPrice + " Rupees.";
    
            imageObj = {
                smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/DSC+images/Overview+720x480.png",
                largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/DSC+images/Overview+1200x800.png"
            };
            
            this.emit(':tellWithCard', speechOutput, reprompt, cardTitle, cardContent, imageObj);
    },
    
    'ResetTodaysCount' : function() {
        this.attributes['cigCount'] = (this.attributes['cigCount'] - this.attributes['todayCigCount']);
        this.attributes['todayCigCount'] = 0;
        this.attributes['Date'] = (new Date().getDate()) - 1;
        this.emit(':tell', "Roger that! Your today's smoke count is resetted as per request");
    },
    
     'HealthIntent': function() {
        this.emit(':tell', "Here are few health effects from smoking. \n First) Cigarette smoking increases risk for death from all causes in men and women.\n Second) Smoking causes diminished overall health, increased absenteeism from work, and increased health care utilization and cost.\n Third) Even people who smoke fewer than five cigarettes a day can have early signs of cardiovascular disease.\n Fourth) Cigarette smoking causes most cases of lung cancer.\n Fifth) Smoking harms nearly every organ of the body and affects a person’s overall health.");
    },
    
    'QuitIntent' : function() {
        this.emit(':tell', "Here are some facts of Quitting Smoke.\n First) Quitting smoking cuts cardiovascular risks. Just 1 year after quitting smoking, your risk for a heart attack drops sharply. \n Second) Within 2 to 5 years after quitting smoking, your risk for stroke may reduce to about that of a nonsmoker’s. \n Third) If you quit smoking, your risks for cancers of the mouth, throat, esophagus, and bladder drop by half within 5 years. \n Fourth) Ten years after you quit smoking, your risk for lung cancer drops by half. ");
    },
    
    'AMAZON.HelpIntent': function () {    
        speechOutput = "You can track your smoke count, or, you can say stop... Please note smoke count is daily tracker so it can save records once a day only";
        reprompt = "You can simply track your smoke count with entering required details once a day";
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

var UShandlers = {
    'LaunchRequest': function() { 
            this.emit('LaunchIntent');
    },
    
     'LaunchIntent': function() {
        if (!this.attributes['cigCount']){
            speechOutput = "Hi, welcome to your daily smoke count. Please help me with required details to start, tell me the number of cigarette you smoked.";
            reprompt = "Please, tell me the number of cigarette you smoked.";
            
            cardTitle = 'Smoke Count';
            cardContent = 'Because every smoke counts';
    
            imageObj = {
                smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/DSC+images/Launch+720x480.png",
                largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/DSC+images/Launch+1200x800.png"
            };
            
            this.emitWithState(':askWithCard', speechOutput, reprompt, cardTitle, cardContent, imageObj);
        } else {
            if(new Date().getDate() != this.attributes['Date']){
                speechOutput = "Hi, Welcome back to your daily smoke count. Please tell me your today's smoke count";
                reprompt = "Please tell me your today's smoke count";
                this.emitWithState(':ask', speechOutput, reprompt);
            }
            else{
                speechOutput = "You have already updated today's smoke count. Here are your available options: For Today's Smoke Summary Say 1, For Resetting Today's Smoke Count say 2, For Complete Smoke Summary say 3, For Health Effects say 4, For Advantages of Quitting Smoke say 5 and For Help say 6";
                reprompt = "Here are your available options: For Today's Smoke Summary Say 1, For Resetting Today's Smoke Count say 2, For Complete Smoke Summary say 3, For Health Effects say 4, For Advantages of Quitting Smoke say 5 and For Help say 6";
                this.emitWithState(':ask', speechOutput, reprompt);
            }
        }
    },
    
    'CountIntent': function() {
        var input = this.event.request.intent.slots.cigCount.value;
        
         if(isNaN(input)){
            this.emit(':ask', "Please enter valid required value.");
         } else {
                if(!this.attributes['cigCount']){
                    this.attributes['cigCount'] = Number(input);
                    this.attributes['todayCigCount'] = Number(input);
                    this.attributes['Date'] = new Date().getDate();
                    this.emit('SummaryIntent');
                 } else {
                        if(new Date().getDate() != this.attributes['Date']){
                            this.attributes['cigCount'] = Number(this.attributes['cigCount']) + Number(input);
                            this.attributes['oldCigCount'] = this.attributes['todayCigCount'];
                            this.attributes['todayCigCount'] = Number(input);
                            this.attributes['Date'] = new Date().getDate();
                            flag = true;
                            this.emit('SummaryIntent');
                        } else{
                            switch(Number(input)){
                                case 1:
                                    flag = true;
                                    this.emitWithState('SummaryIntent');
                                    break;
                                case 2:  
                                    this.emit('ResetTodaysCount');
                                    break;
                                case 3:
                                    flag = false;
                                    this.emitWithState('SummaryIntent');
                                    break;
                                case 4:
                                    this.emit('HealthIntent');
                                    break;
                                case 5:
                                    this.emit('QuitIntent');
                                    break;
                                case 6:
                                    this.emitWithState('AMAZON.HelpIntent');
                                    break;
                                default:    
                                    this.emitWithState('AMAZON.HelpIntent');
                        }
                    }
            }
         }    
    },    
    
    'SummaryIntent': function() {
        var cCount = flag ? this.attributes['todayCigCount']:this.attributes['cigCount'];
        
        var sTime = (cCount * 6);    //Average time spent
        var totalTime = sTime >= 60? (sTime/60) + " hour(s)" : sTime + " minutes";

        var sTar = (cCount * (14.3)).toFixed(2);
        var totalTar = sTar>1000? (sTime/1000).toFixed(2) + " grams" : sTar + " miligrams";

        var sNico = (cCount * (0.93)).toFixed(2);
        var totalNico = sNico>1000? (sNico/1000).toFixed(2) + " grams" : sNico + " miligrams";

        var subPrice = (cCount * (0.31)).toFixed(2);
        var totalPrice = subPrice>1 ? subPrice + " dollar(s)" : (subPrice * 100) + " cents";
        
        var LifeRedn = (cCount * 11);
        LifeRedn = LifeRedn >= 60 ? ((LifeRedn/60).toFixed(2) + " hour(s)"): (LifeRedn + " minutes");
        
        if (this.attributes['oldCigCount'] > this.attributes['todayCigCount']){
            var lcount = (this.attributes['oldCigCount'] - this.attributes['todayCigCount']);
            smoker = "Bravo!!! You have reduced your smoke count by "+ lcount + " cigarette(s) and saved "+ (lcount * (0.31)).toFixed(2) + " dollar(s) today.";
        } else if (this.attributes['todayCigCount'] > this.attributes['oldCigCount']){
            var hcount = (this.attributes['todayCigCount'] - this.attributes['oldCigCount']);
            smoker = "Ohh Gosh, Something went wrong today? You have increased your smoke count by "+ hcount + " cigarette(s) and spent "+ (hcount * (0.31)).toFixed(2) + " dollar(s) more.";
        } else {
            smoker = "Keep counting your daily smoke.";
        }
        
        if(cCount == 0){
            speechOutput = "Yayyy, you are non-smoker. Keep up this spirit, enjoy the healthy life.";
        } else{
            if(cCount == this.attributes['cigCount']){
                speechOutput = "Here is the summary of your smoke, You smoked " + cCount + " cigarette(s) with total time spent of " + totalTime + " considering an average of 6 minute per cigarette. You consumed " + totalTar + " of tar and " + totalNico  + " of nicotine approximately, which reduced " + LifeRedn + " from your lifespan. Your average spent amount is " + totalPrice + ", considering 31 cents per cigarette. Advice: Keep tracking your count.";
            } else{
                speechOutput = "Today's Smoke Summary, You smoked " + cCount + " cigarette(s) with total time spent of " + totalTime + ". You consumed " + totalTar + " tar and " + totalNico  + " nicotine approximately, which reduced " + LifeRedn + " from your lifespan. Your average spent amount is " + totalPrice + ". Analysis: "+ smoker;
            }
            
        }    
            reprompt = " ";
            
            cardTitle = 'Your Smoke Summary';
            cardContent = "Cigarette(s) = " + cCount + ",  Time Spent(6min/cig) = " + totalTime + ", Tar Intake = " + totalTar + " (approx.), Nicotine Intake = " + totalNico  + " (approx.), LifeTime Reduced (11 min/cig) = " + LifeRedn + ", Expenditure (31 cents/cig) = " + totalPrice + ".";
    
            imageObj = {
                smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/DSC+images/Overview+720x480.png",
                largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/DSC+images/Overview+1200x800.png"
            };
            
            this.emit(':tellWithCard', speechOutput, reprompt, cardTitle, cardContent, imageObj);
    },
    
    'ResetTodaysCount' : function() {
        this.attributes['cigCount'] = (this.attributes['cigCount'] - this.attributes['todayCigCount']);
        this.attributes['todayCigCount'] = 0;
        this.attributes['Date'] = (new Date().getDate()) - 1;
        this.emit(':tell', "Roger that! Your today's smoke count is resetted as per request");
    },
    
     'HealthIntent': function() {
        this.emit(':tell', "Here are few health effects from smoking. \n First) Cigarette smoking increases risk for death from all causes in men and women.\n Second) Smoking causes diminished overall health, increased absenteeism from work, and increased health care utilization and cost.\n Third) Even people who smoke fewer than five cigarettes a day can have early signs of cardiovascular disease.\n Fourth) Cigarette smoking causes most cases of lung cancer.\n Fifth) Smoking harms nearly every organ of the body and affects a person’s overall health.");
    },
    
    'QuitIntent' : function() {
        this.emit(':tell', "Here are some facts of Quitting Smoke.\n First) Quitting smoking cuts cardiovascular risks. Just 1 year after quitting smoking, your risk for a heart attack drops sharply. \n Second) Within 2 to 5 years after quitting smoking, your risk for stroke may reduce to about that of a nonsmoker’s. \n Third) If you quit smoking, your risks for cancers of the mouth, throat, esophagus, and bladder drop by half within 5 years. \n Fourth) Ten years after you quit smoking, your risk for lung cancer drops by half. ");
    },
    
    'AMAZON.HelpIntent': function () {    
        speechOutput = "You can track your smoke count, or, you can say stop... Please note smoke count is daily tracker so it can save records once a day only";
        reprompt = "You can simply track your smoke count with entering required details once a day";
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

var UKhandlers = {
    'LaunchRequest': function() { 
            this.emit('LaunchIntent');
    },
    
     'LaunchIntent': function() {
        if (!this.attributes['cigCount']){
            speechOutput = "Hi, welcome to your daily smoke count. Please help me with required details to start, tell me the number of cigarette you smoked.";
            reprompt = "Please, tell me the number of cigarette you smoked.";
            
            cardTitle = 'Smoke Count';
            cardContent = 'Because every smoke counts';
    
            imageObj = {
                smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/DSC+images/Launch+720x480.png",
                largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/DSC+images/Launch+1200x800.png"
            };
            
            this.emitWithState(':askWithCard', speechOutput, reprompt, cardTitle, cardContent, imageObj);
        } else {
            if(new Date().getDate() != this.attributes['Date']){
                speechOutput = "Hi, Welcome back to your daily smoke count. Please tell me your today's smoke count";
                reprompt = "Please tell me your today's smoke count";
                this.emitWithState(':ask', speechOutput, reprompt);
            }
            else{
                speechOutput = "You have already updated today's smoke count. Here are your available options: For Today's Smoke Summary Say 1, For Resetting Today's Smoke Count say 2, For Complete Smoke Summary say 3, For Health Effects say 4, For Advantages of Quitting Smoke say 5 and For Help say 6";
                reprompt = "Here are your available options: For Today's Smoke Summary Say 1, For Resetting Today's Smoke Count say 2, For Complete Smoke Summary say 3, For Health Effects say 4, For Advantages of Quitting Smoke say 5 and For Help say 6";
                this.emitWithState(':ask', speechOutput, reprompt);
            }
        }
    },
    
    'CountIntent': function() {
        var input = this.event.request.intent.slots.cigCount.value;
        
         if(isNaN(input)){
            this.emit(':ask', "Please enter valid required value.");
         } else {
                if(!this.attributes['cigCount']){
                    this.attributes['cigCount'] = Number(input);
                    this.attributes['todayCigCount'] = Number(input);
                    this.attributes['Date'] = new Date().getDate();
                    this.emit('SummaryIntent');
                 } else {
                        if(new Date().getDate() != this.attributes['Date']){
                            this.attributes['cigCount'] = Number(this.attributes['cigCount']) + Number(input);
                            this.attributes['oldCigCount'] = this.attributes['todayCigCount'];
                            this.attributes['todayCigCount'] = Number(input);
                            this.attributes['Date'] = new Date().getDate();
                            flag = true;
                            this.emit('SummaryIntent');
                        } else{
                            switch(Number(input)){
                                case 1:
                                    flag = true;
                                    this.emitWithState('SummaryIntent');
                                    break;
                                case 2:  
                                    this.emit('ResetTodaysCount');
                                    break;
                                case 3:
                                    flag = false;
                                    this.emitWithState('SummaryIntent');
                                    break;
                                case 4:
                                    this.emit('HealthIntent');
                                    break;
                                case 5:
                                    this.emit('QuitIntent');
                                    break;
                                case 6:
                                    this.emitWithState('AMAZON.HelpIntent');
                                    break;
                                default:    
                                    this.emitWithState('AMAZON.HelpIntent');
                        }
                    }
            }
         }    
    },    
    
    'SummaryIntent': function() {
        var cCount = flag ? this.attributes['todayCigCount']:this.attributes['cigCount'];
        
        var sTime = (cCount * 6);    //Average time spent
        var totalTime = sTime >= 60? (sTime/60) + " hour(s)" : sTime + " minutes";

        var sTar = (cCount * (14.3)).toFixed(2);
        var totalTar = sTar>1000? (sTime/1000).toFixed(2) + " grams" : sTar + " miligrams";

        var sNico = (cCount * (0.93)).toFixed(2);
        var totalNico = sNico>1000? (sNico/1000).toFixed(2) + " grams" : sNico + " miligrams";

        var subPrice = (cCount * (0.46)).toFixed(2);
        var totalPrice = subPrice>1 ? subPrice + " pound(s)" : (subPrice * 100) + " pence";
        
        var LifeRedn = (cCount * 11);
        LifeRedn = LifeRedn >= 60 ? ((LifeRedn/60).toFixed(2) + " hour(s)"): (LifeRedn + " minutes");
        
        if (this.attributes['oldCigCount'] > this.attributes['todayCigCount']){
            var lcount = (this.attributes['oldCigCount'] - this.attributes['todayCigCount']);
            smoker = "Bravo!!! You have reduced your smoke count by "+ lcount + " cigarette(s) and saved "+ (lcount * (0.46)).toFixed(2) + " pound(s) today.";
        } else if (this.attributes['todayCigCount'] > this.attributes['oldCigCount']){
            var hcount = (this.attributes['todayCigCount'] - this.attributes['oldCigCount']);
            smoker = "Ohh Gosh, Something went wrong today? You have increased your smoke count by "+ hcount + " cigarette(s) and spent "+ (hcount * (0.46)).toFixed(2) + " pound(s) more.";
        } else {
            smoker = "Keep counting your daily smoke.";
        }
        
        if(cCount == 0){
            speechOutput = "Yayyy, you are non-smoker. Keep up this spirit, enjoy the healthy life.";
        } else{
            if(cCount == this.attributes['cigCount']){
                speechOutput = "Here is the summary of your smoke, You smoked " + cCount + " cigarette(s) with total time spent of " + totalTime + " considering an average of 6 minute per cigarette. You consumed " + totalTar + " of tar and " + totalNico  + " of nicotine approximately, which reduced " + LifeRedn + " from your lifespan. Your average spent amount is " + totalPrice + ", considering 46 pence per cigarette. Advice: Keep tracking your count.";
            } else{
                speechOutput = "Today's Smoke Summary, You smoked " + cCount + " cigarette(s) with total time spent of " + totalTime + ". You consumed " + totalTar + " tar and " + totalNico  + " nicotine approximately, which reduced " + LifeRedn + " from your lifespan. Your average spent amount is " + totalPrice + ". Analysis: "+ smoker;
            }
            
        }    
            reprompt = " ";
            
            cardTitle = 'Your Smoke Summary';
            cardContent = "Cigarette(s) = " + cCount + ",  Time Spent(6min/cig) = " + totalTime + ", Tar Intake = " + totalTar + " (approx.), Nicotine Intake = " + totalNico  + " (approx.), LifeTime Reduced (11 min/cig) = " + LifeRedn + ", Expenditure (46 pence/cig) = " + totalPrice + ".";
    
            imageObj = {
                smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/DSC+images/Overview+720x480.png",
                largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/DSC+images/Overview+1200x800.png"
            };
            
            this.emit(':tellWithCard', speechOutput, reprompt, cardTitle, cardContent, imageObj);
    },
    
    'ResetTodaysCount' : function() {
        this.attributes['cigCount'] = (this.attributes['cigCount'] - this.attributes['todayCigCount']);
        this.attributes['todayCigCount'] = 0;
        this.attributes['Date'] = (new Date().getDate()) - 1;
        this.emit(':tell', "Roger that! Your today's smoke count is resetted as per request");
    },
    
     'HealthIntent': function() {
        this.emit(':tell', "Here are few health effects from smoking. \n First) Cigarette smoking increases risk for death from all causes in men and women.\n Second) Smoking causes diminished overall health, increased absenteeism from work, and increased health care utilization and cost.\n Third) Even people who smoke fewer than five cigarettes a day can have early signs of cardiovascular disease.\n Fourth) Cigarette smoking causes most cases of lung cancer.\n Fifth) Smoking harms nearly every organ of the body and affects a person’s overall health.");
    },
    
    'QuitIntent' : function() {
        this.emit(':tell', "Here are some facts of Quitting Smoke.\n First) Quitting smoking cuts cardiovascular risks. Just 1 year after quitting smoking, your risk for a heart attack drops sharply. \n Second) Within 2 to 5 years after quitting smoking, your risk for stroke may reduce to about that of a nonsmoker’s. \n Third) If you quit smoking, your risks for cancers of the mouth, throat, esophagus, and bladder drop by half within 5 years. \n Fourth) Ten years after you quit smoking, your risk for lung cancer drops by half. ");
    },
    
    'AMAZON.HelpIntent': function () {    
        speechOutput = "You can track your smoke count, or, you can say stop... Please note smoke count is daily tracker so it can save records once a day only";
        reprompt = "You can simply track your smoke count with entering required details once a day";
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
  
var CAhandlers = {
    'LaunchRequest': function() { 
            this.emit('LaunchIntent');
    },
    
     'LaunchIntent': function() {
        if (!this.attributes['cigCount']){
            speechOutput = "Hi, welcome to your daily smoke count. Please help me with required details to start, tell me the number of cigarette you smoked.";
            reprompt = "Please, tell me the number of cigarette you smoked.";
            
            cardTitle = 'Smoke Count';
            cardContent = 'Because every smoke counts';
    
            imageObj = {
                smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/DSC+images/Launch+720x480.png",
                largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/DSC+images/Launch+1200x800.png"
            };
            
            this.emitWithState(':askWithCard', speechOutput, reprompt, cardTitle, cardContent, imageObj);
        } else {
            if(new Date().getDate() != this.attributes['Date']){
                speechOutput = "Hi, Welcome back to your daily smoke count. Please tell me your today's smoke count";
                reprompt = "Please tell me your today's smoke count";
                this.emitWithState(':ask', speechOutput, reprompt);
            }
            else{
                speechOutput = "You have already updated today's smoke count. Here are your available options: For Today's Smoke Summary Say 1, For Resetting Today's Smoke Count say 2, For Complete Smoke Summary say 3, For Health Effects say 4, For Advantages of Quitting Smoke say 5 and For Help say 6";
                reprompt = "Here are your available options: For Today's Smoke Summary Say 1, For Resetting Today's Smoke Count say 2, For Complete Smoke Summary say 3, For Health Effects say 4, For Advantages of Quitting Smoke say 5 and For Help say 6";
                this.emitWithState(':ask', speechOutput, reprompt);
            }
        }
    },
    
    'CountIntent': function() {
        var input = this.event.request.intent.slots.cigCount.value;
        
         if(isNaN(input)){
            this.emit(':ask', "Please enter valid required value.");
         } else {
                if(!this.attributes['cigCount']){
                    this.attributes['cigCount'] = Number(input);
                    this.attributes['todayCigCount'] = Number(input);
                    this.attributes['Date'] = new Date().getDate();
                    this.emit('SummaryIntent');
                 } else {
                        if(new Date().getDate() != this.attributes['Date']){
                            this.attributes['cigCount'] = Number(this.attributes['cigCount']) + Number(input);
                            this.attributes['oldCigCount'] = this.attributes['todayCigCount'];
                            this.attributes['todayCigCount'] = Number(input);
                            this.attributes['Date'] = new Date().getDate();
                            flag = true;
                            this.emit('SummaryIntent');
                        } else{
                            switch(Number(input)){
                                case 1:
                                    flag = true;
                                    this.emitWithState('SummaryIntent');
                                    break;
                                case 2:  
                                    this.emit('ResetTodaysCount');
                                    break;
                                case 3:
                                    flag = false;
                                    this.emitWithState('SummaryIntent');
                                    break;
                                case 4:
                                    this.emit('HealthIntent');
                                    break;
                                case 5:
                                    this.emit('QuitIntent');
                                    break;
                                case 6:
                                    this.emitWithState('AMAZON.HelpIntent');
                                    break;
                                default:    
                                    this.emitWithState('AMAZON.HelpIntent');
                        }
                    }
            }
         }    
    },    
    
    'SummaryIntent': function() {
        var cCount = flag ? this.attributes['todayCigCount']:this.attributes['cigCount'];
        
        var sTime = (cCount * 6);    //Average time spent
        var totalTime = sTime >= 60? (sTime/60) + " hour(s)" : sTime + " minutes";

        var sTar = (cCount * (14.3)).toFixed(2);
        var totalTar = sTar>1000? (sTime/1000).toFixed(2) + " grams" : sTar + " miligrams";

        var sNico = (cCount * (0.93)).toFixed(2);
        var totalNico = sNico>1000? (sNico/1000).toFixed(2) + " grams" : sNico + " miligrams";

        var subPrice = (cCount * (0.52)).toFixed(2);
        var totalPrice = subPrice>1 ? subPrice + " Canadian dollar(s)" : (subPrice * 100) + " piece";
        
        var LifeRedn = (cCount * 11);
        LifeRedn = LifeRedn >= 60 ? ((LifeRedn/60).toFixed(2) + " hour(s)"): (LifeRedn + " minutes");
        
        if (this.attributes['oldCigCount'] > this.attributes['todayCigCount']){
            var lcount = (this.attributes['oldCigCount'] - this.attributes['todayCigCount']);
            smoker = "Bravo!!! You have reduced your smoke count by "+ lcount + " cigarette(s) and saved "+ (lcount * (0.52)).toFixed(2) + " Canadian dollar(s) today.";
        } else if (this.attributes['todayCigCount'] > this.attributes['oldCigCount']){
            var hcount = (this.attributes['todayCigCount'] - this.attributes['oldCigCount']);
            smoker = "Ohh Gosh, Something went wrong today? You have increased your smoke count by "+ hcount + " cigarette(s) and spent "+ (hcount * (0.52)).toFixed(2) + " Canadian dollar(s) more.";
        } else {
            smoker = "Keep counting your daily smoke.";
        }
        
        if(cCount == 0){
            speechOutput = "Yayyy, you are non-smoker. Keep up this spirit, enjoy the healthy life.";
        } else{
            if(cCount == this.attributes['cigCount']){
                speechOutput = "Here is the summary of your smoke, You smoked " + cCount + " cigarette(s) with total time spent of " + totalTime + " considering an average of 6 minute per cigarette. You consumed " + totalTar + " of tar and " + totalNico  + " of nicotine approximately, which reduced " + LifeRedn + " from your lifespan. Your average spent amount is " + totalPrice + ", considering 0.52 piece per cigarette. Advice: Keep tracking your count.";
            } else{
                speechOutput = "Today's Smoke Summary, You smoked " + cCount + " cigarette(s) with total time spent of " + totalTime + ". You consumed " + totalTar + " tar and " + totalNico  + " nicotine approximately, which reduced " + LifeRedn + " from your lifespan. Your average spent amount is " + totalPrice + ". Analysis: "+ smoker;
            }
            
        }    
            reprompt = " ";
            
            cardTitle = 'Your Smoke Summary';
            cardContent = "Cigarette(s) = " + cCount + ",  Time Spent(6min/cig) = " + totalTime + ", Tar Intake = " + totalTar + " (approx.), Nicotine Intake = " + totalNico  + " (approx.), LifeTime Reduced (11 min/cig) = " + LifeRedn + ", Expenditure (52 piece/cig) = " + totalPrice + ".";
    
            imageObj = {
                smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/DSC+images/Overview+720x480.png",
                largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/DSC+images/Overview+1200x800.png"
            };
            
            this.emit(':tellWithCard', speechOutput, reprompt, cardTitle, cardContent, imageObj);
    },
    
    'ResetTodaysCount' : function() {
        this.attributes['cigCount'] = (this.attributes['cigCount'] - this.attributes['todayCigCount']);
        this.attributes['todayCigCount'] = 0;
        this.attributes['Date'] = (new Date().getDate()) - 1;
        this.emit(':tell', "Roger that! Your today's smoke count is resetted as per request");
    },
    
     'HealthIntent': function() {
        this.emit(':tell', "Here are few health effects from smoking. \n First) Cigarette smoking increases risk for death from all causes in men and women.\n Second) Smoking causes diminished overall health, increased absenteeism from work, and increased health care utilization and cost.\n Third) Even people who smoke fewer than five cigarettes a day can have early signs of cardiovascular disease.\n Fourth) Cigarette smoking causes most cases of lung cancer.\n Fifth) Smoking harms nearly every organ of the body and affects a person’s overall health.");
    },
    
    'QuitIntent' : function() {
        this.emit(':tell', "Here are some facts of Quitting Smoke.\n First) Quitting smoking cuts cardiovascular risks. Just 1 year after quitting smoking, your risk for a heart attack drops sharply. \n Second) Within 2 to 5 years after quitting smoking, your risk for stroke may reduce to about that of a nonsmoker’s. \n Third) If you quit smoking, your risks for cancers of the mouth, throat, esophagus, and bladder drop by half within 5 years. \n Fourth) Ten years after you quit smoking, your risk for lung cancer drops by half. ");
    },
    
    'AMAZON.HelpIntent': function () {    
        speechOutput = "You can track your smoke count, or, you can say stop... Please note smoke count is daily tracker so it can save records once a day only";
        reprompt = "You can simply track your smoke count with entering required details once a day";
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

var AUhandlers = {
    'LaunchRequest': function() { 
            this.emit('LaunchIntent');
    },
    
     'LaunchIntent': function() {
        if (!this.attributes['cigCount']){
            speechOutput = "Hi, welcome to your daily smoke count. Please help me with required details to start, tell me the number of cigarette you smoked.";
            reprompt = "Please, tell me the number of cigarette you smoked.";
            
            cardTitle = 'Smoke Count';
            cardContent = 'Because every smoke counts';
    
            imageObj = {
                smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/DSC+images/Launch+720x480.png",
                largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/DSC+images/Launch+1200x800.png"
            };
            
            this.emitWithState(':askWithCard', speechOutput, reprompt, cardTitle, cardContent, imageObj);
        } else {
            if(new Date().getDate() != this.attributes['Date']){
                speechOutput = "Hi, Welcome back to your daily smoke count. Please tell me your today's smoke count";
                reprompt = "Please tell me your today's smoke count";
                this.emitWithState(':ask', speechOutput, reprompt);
            }
            else{
                speechOutput = "You have already updated today's smoke count. Here are your available options: For Today's Smoke Summary Say 1, For Resetting Today's Smoke Count say 2, For Complete Smoke Summary say 3, For Health Effects say 4, For Advantages of Quitting Smoke say 5 and For Help say 6";
                reprompt = "Here are your available options: For Today's Smoke Summary Say 1, For Resetting Today's Smoke Count say 2, For Complete Smoke Summary say 3, For Health Effects say 4, For Advantages of Quitting Smoke say 5 and For Help say 6";
                this.emitWithState(':ask', speechOutput, reprompt);
            }
        }
    },
    
    'CountIntent': function() {
        var input = this.event.request.intent.slots.cigCount.value;
        
         if(isNaN(input)){
            this.emit(':ask', "Please enter valid required value.");
         } else {
                if(!this.attributes['cigCount']){
                    this.attributes['cigCount'] = Number(input);
                    this.attributes['todayCigCount'] = Number(input);
                    this.attributes['Date'] = new Date().getDate();
                    this.emit('SummaryIntent');
                 } else {
                        if(new Date().getDate() != this.attributes['Date']){
                            this.attributes['cigCount'] = Number(this.attributes['cigCount']) + Number(input);
                            this.attributes['oldCigCount'] = this.attributes['todayCigCount'];
                            this.attributes['todayCigCount'] = Number(input);
                            this.attributes['Date'] = new Date().getDate();
                            flag = true;
                            this.emit('SummaryIntent');
                        } else{
                            switch(Number(input)){
                                case 1:
                                    flag = true;
                                    this.emitWithState('SummaryIntent');
                                    break;
                                case 2:  
                                    this.emit('ResetTodaysCount');
                                    break;
                                case 3:
                                    flag = false;
                                    this.emitWithState('SummaryIntent');
                                    break;
                                case 4:
                                    this.emit('HealthIntent');
                                    break;
                                case 5:
                                    this.emit('QuitIntent');
                                    break;
                                case 6:
                                    this.emitWithState('AMAZON.HelpIntent');
                                    break;
                                default:    
                                    this.emitWithState('AMAZON.HelpIntent');
                        }
                    }
            }
         }    
    },    
    
    'SummaryIntent': function() {
        var cCount = flag ? this.attributes['todayCigCount']:this.attributes['cigCount'];
        
        var sTime = (cCount * 6);    //Average time spent
        var totalTime = sTime >= 60? (sTime/60) + " hour(s)" : sTime + " minutes";

        var sTar = (cCount * (14.3)).toFixed(2);
        var totalTar = sTar>1000? (sTime/1000).toFixed(2) + " grams" : sTar + " miligrams";

        var sNico = (cCount * (0.93)).toFixed(2);
        var totalNico = sNico>1000? (sNico/1000).toFixed(2) + " grams" : sNico + " miligrams";

        var totalPrice = (cCount * (1.5)).toFixed(2);
        
        var LifeRedn = (cCount * 11);
        LifeRedn = LifeRedn >= 60 ? ((LifeRedn/60).toFixed(2) + " hour(s)"): (LifeRedn + " minutes");
        
        if (this.attributes['oldCigCount'] > this.attributes['todayCigCount']){
            var lcount = (this.attributes['oldCigCount'] - this.attributes['todayCigCount']);
            smoker = "Bravo!!! You have reduced your smoke count by "+ lcount + " cigarette(s) and saved "+ (lcount * (1.5)).toFixed(2) + " Australian dollar(s) today.";
        } else if (this.attributes['todayCigCount'] > this.attributes['oldCigCount']){
            var hcount = (this.attributes['todayCigCount'] - this.attributes['oldCigCount']);
            smoker = "Ohh Gosh, Something went wrong today? You have increased your smoke count by "+ hcount + " cigarette(s) and spent "+ (hcount * (1.5).toFixed(2)) + " Australian dollar(s) more.";
        } else {
            smoker = "Keep counting your daily smoke.";
        }
        
        if(cCount == 0){
            speechOutput = "Yayyy, you are non-smoker. Keep up this spirit, enjoy the healthy life.";
        } else{
            if(cCount == this.attributes['cigCount']){
                speechOutput = "Here is the summary of your smoke, You smoked " + cCount + " cigarette(s) with total time spent of " + totalTime + " considering an average of 6 minute per cigarette. You consumed " + totalTar + " of tar and " + totalNico  + " of nicotine approximately, which reduced " + LifeRedn + " from your lifespan. Your average spent amount is " + totalPrice + " Australian dollar(s), considering 1.5 Australian dollar per cigarette. Advice: Keep tracking your count.";
            } else{
                speechOutput = "Today's Smoke Summary, You smoked " + cCount + " cigarette(s) with total time spent of " + totalTime + ". You consumed " + totalTar + " tar and " + totalNico  + " nicotine approximately, which reduced " + LifeRedn + " from your lifespan. Your average spent amount is " + totalPrice + " Australian dollar(s). Analysis: "+ smoker;
            }
            
        }    
            reprompt = " ";
            
            cardTitle = 'Your Smoke Summary';
            cardContent = "Cigarette(s) = " + cCount + ",  Time Spent(6min/cig) = " + totalTime + ", Tar Intake = " + totalTar + " (approx.), Nicotine Intake = " + totalNico  + " (approx.), LifeTime Reduced (11 min/cig) = " + LifeRedn + ", Expenditure (1.5 AUD/cig) = " + totalPrice + " Australian dollar(s).";
    
            imageObj = {
                smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/DSC+images/Overview+720x480.png",
                largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/DSC+images/Overview+1200x800.png"
            };
            
            this.emit(':tellWithCard', speechOutput, reprompt, cardTitle, cardContent, imageObj);
    },
    
    'ResetTodaysCount' : function() {
        this.attributes['cigCount'] = (this.attributes['cigCount'] - this.attributes['todayCigCount']);
        this.attributes['todayCigCount'] = 0;
        this.attributes['Date'] = (new Date().getDate()) - 1;
        this.emit(':tell', "Roger that! Your today's smoke count is resetted as per request");
    },
    
     'HealthIntent': function() {
        this.emit(':tell', "Here are few health effects from smoking. \n First) Cigarette smoking increases risk for death from all causes in men and women.\n Second) Smoking causes diminished overall health, increased absenteeism from work, and increased health care utilization and cost.\n Third) Even people who smoke fewer than five cigarettes a day can have early signs of cardiovascular disease.\n Fourth) Cigarette smoking causes most cases of lung cancer.\n Fifth) Smoking harms nearly every organ of the body and affects a person’s overall health.");
    },
    
    'QuitIntent' : function() {
        this.emit(':tell', "Here are some facts of Quitting Smoke.\n First) Quitting smoking cuts cardiovascular risks. Just 1 year after quitting smoking, your risk for a heart attack drops sharply. \n Second) Within 2 to 5 years after quitting smoking, your risk for stroke may reduce to about that of a nonsmoker’s. \n Third) If you quit smoking, your risks for cancers of the mouth, throat, esophagus, and bladder drop by half within 5 years. \n Fourth) Ten years after you quit smoking, your risk for lung cancer drops by half. ");
    },
    
    'AMAZON.HelpIntent': function () {    
        speechOutput = "You can track your smoke count, or, you can say stop... Please note smoke count is daily tracker so it can save records once a day only";
        reprompt = "You can simply track your smoke count with entering required details once a day";
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

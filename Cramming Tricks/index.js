var Alexa = require('alexa-sdk');
var speechOutput = ' ';
var reprompt = ' ';
var cardTitle = ' ';
var cardContent = ' ';
var imageObj = {};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);

    alexa.dynamoDBTableName = 'tricksCounter';
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function() { 
        if (!this.attributes['item']) {
            this.attributes['item']=0;
        }
        this.emit('CrammerIntent');
    },

    'CrammerIntent': function(){
        var return_Content = '';    
        
        let content_list = [
             "Four Buddhist council held at the following places - Trick is 'RAVA PAKA' - RAjgriha, VAishali, PAtilputra, KAshmir",
              "Permanent member of UNO - Trick is 'FRECA' - France, Russia, England, China, America",
              "Language added under the 92nd amendment - Trick is 'BDMS' - Bodo, Dogri, Maithili, Santhali",
              "Battle won by Babar in chronological order - Trick is 'Panni Pikar Khana Khakar Chnaderi Chali Ghagra Pahankar' - Panipat rst battle(1526), Khanva Battle(1527), Chanderi(1528), Ghagra(1529)",
              "Indian states whose boundary touch the Myanmar - Trick is 'ARUNA MAMI' - ARUnachal Pradesh, NAgaland, MAnipur, MIzoram",
              "Delhi Sultanate Dynasty - Trick is 'GUD KHA TASLE ME' - GUlam, KHilji, Tuglak, Sayad, Lodhi",
              "Various Disease caused by Virus - Trick is 'Roj AP CM se Mile' - Rabies, Aids, Polio, Chickenpox, Measles",
              "State touching Bhutan - Trick is 'SAAB' - Sikkim, Arunachal Pradesh, Assam, Bengal",
              "Vitamin Soluble in Water - Trick is 'B C P' - Vitamin B, Vitamin C, Vitamin P",
             "Navratan in Akbar court - Trick is 'BAT BAT me MDH' - Birbal, Abu Faizal, Todarmal,Bhagwandas, Abdur Rahim Khan, Tansingh, Masingh, Do Payaza, Hakim Hukam",
             "Important Place Of Harappa Civilisation Situated at - Trick is 'GPRS' - Gujrat, Punjab, Rajasthan, Sind",
             "Human being start to use metals in this order - Trick is 'C B I' - COPPER, BRONZE, IRON",
             "Mughal Kings in sequence -  Trick is 'B H A J S A B' - Babur, Humayun, Akbar, Jahangir, Shahjahan, Aurangzeb, Bahadur Shah I",
             "Kings that belongs to Morya kaal - Trick is 'A B C' - Ashok,  Bindusar, Chandrgupt",
             "Tri ratnas of Jainism are - Trick is 'K F C' - right Knowledge,  right Faith, right Conduct",
             "In Jainism there is panchamvrats which is expected to be followed by monks they are - Trick is 'CLIPS' - Chastity - Brahmacharya, no Lying - satya, no Injury - ahinsa, no Possession - aparigraha, no Stealing - asteya",
             "Emperor who followed Budhism - Trick is 'BAPU Khus Hua' - Bimbisar, Ashoka, Prasen Jeet, Udaysen, Kanishka, Harshvardhan",
             "Eight fold path of Buddhsim are - Trick is 'EVIL SCAM' - right Effort, right View, right Information, right Livlihood, right Speech, right Concentration, right Action, right Mindfullness",
             "Ashoka Seven pole incription are - Trick is 'MaaR DALa' - Meerut, Rampura, Delhi, Allahabad, Lauriya Araraj (Pak.), Lauriya Nandangrih (Pak.)",
             "Five Dynasties of Delhi Sultanate - Trick is 'Sab Khatrnak The Sale Log' - Slave (mamluk) dynasty (1206-90), Khilji dynasty (1290-1320), Tughlaq dynasty (1320-1414), Sayyid dynasty (1414-51), Lodi dynasty (1451-1526)",
             "Direct Taxes - Trick is 'wepro.co.in' - WEalth tax, PROperty tax, COrporate tax, INcome tax",
             "Indirect Taxes - Trick is 'EXCUSE ME' - EXcise tax, CUstom tax, SErvice tax, Market tax or vat, Entertainment tax"
        ];
            
            let begin_Words = '';
            this.attributes['item'] == 0 ? begin_Words = 'Welcome to Cramming Tricks, we will provide you tricks that can help you in exams. Lets begin with tricks, ': begin_Words = 'Welcome back to Cramming Tricks, lets check another trick, ';
            
            return_Content = content_list[this.attributes['item']];
            speechOutput = `${begin_Words}${return_Content}, Do you want to know more tricks?`;
            reprompt = "You can listen to tricks or say help";
            cardTitle = `Trick ${this.attributes['item']+1}`;
            cardContent = `${return_Content}.`;

            imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Crammer/trick+720x480.jpg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Crammer/trick+1200x800.jpg"
            };
            
            this.attributes['item'] = (this.attributes['item'] == 21) ? 0 : this.attributes['item'] + 1;
            
        this.emit(':askWithCard', speechOutput, reprompt, cardTitle, cardContent, imageObj); 
    },
    
    'LaunchIntent': function() {
        if (!this.event.request.intent.slots || !this.event.request.intent.slots.Crammer || this.event.request.intent.slots.Crammer.value == '' || this.event.request.intent.slots.Crammer.value == null) {
            this.emitWithState('AMAZON.HelpIntent'); 
        }
         else if(this.event.request.intent.slots.Crammer.value == 'yes' || this.event.request.intent.slots.Crammer.value == 'next'){
            this.emitWithState('CrammerIntent'); 
        }
        else if(this.event.request.intent.slots.Crammer.value == 'repeat'){
            this.attributes['item']--; 
            this.emit('CrammerIntent');
        }
        else{
            this.emit('AMAZON.StopIntent');
        }
    },
    
    'AMAZON.HelpIntent': function () {    
        speechOutput = "You can listen to tricks that can help you in exams or check details on alexa app. You can also say next, cancel or stop... What can I help you with?";
        reprompt = "You can simply start the skill with invocation, Alexa open cramming tips";

        this.emit(':ask', speechOutput, reprompt);
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
        speechOutput = "We are facing some issue at this moment, please try again later";
        this.emit(':tell', speechOutput);
    }
};
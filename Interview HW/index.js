var Alexa = require('alexa-sdk');
var speechOutput = ' ';
var reprompt = ' ';
var cardTitle = ' ';
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
        speechOutput = "Interview Homework can help you do you homework for collecting data about companies, Here are your options: Amazon, Microsoft, Thoughtworks, Wipro, Capgemini, Cognizant, Tech Mahindra, Jio, Infosys, Hilti, HSBC, Hero Motorcop, Deloitte, MindTree, Yamaha. Please select any one option to begin.";        
        reprompt = "Please, tell me the name of company or say help";
        cardTitle = 'Company Selection';
        cardContent = 'Interview Homework can help any person to score more and know more about company for which person using the skill';

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Company+Images/Comapnies+List+720x480.jpg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Company+Images/Comapnies+List+1200x800.jpg"
        };
        this.emit(':askWithCard', speechOutput, reprompt, cardTitle, cardContent, imageObj);
    },

    'CompanyIntent': function(){
        if ( !this.event.request.intent.slots.CompaniesName || this.event.request.intent.slots.CompaniesName.value == '' || this.event.request.intent.slots.CompaniesName.value == null) {
            this.emitWithState('AMAZON.HelpIntent'); 
        } else if(this.event.request.intent.slots.CompaniesName.value == 'repeat'){
            this.emitWithState('LaunchIntent'); 
        } else {
            this.attributes['companies'] = this.event.request.intent.slots.CompaniesName.value;
        }    
        var check = this.attributes['companies'].match(/^amazon|microsoft|thought works|works|thought|wipro|why|pro|capgemini|cognizant|cogni|tech|mahindra|tech mahindra|jio|jeo|reliance|infosys|hilti|hill|hsbc|HSBC|aytch|hero|hero motorcop|deloitte|deloi|mind tree|mind|tree|yamaha|any|random|2|3|4|5|6|7|8|9|10|11|12|13|14|15|1/ui);
        
        if(check == null) {
            check = 'fail';
        }else if(check[0] == 'tech mahindra'){
            check = 'tech';
        }
        else if(check[0] == 'thought works'){
            check = 'thought';
        }
        else if(check[0] == 'mind tree'){
            check = 'mind';
        }
        else if(check[0] == 'hero motorcop'){
            check = 'hero';
        }
        else if(check[0] == 'any' || check[0] == 'random'){
            check = (Math.floor(Math.random() * (14)) + 1).toString();
        }  
        
        switch (check[0].toLowerCase()){
            case '1':
            case 'one':
            case 'amazon':    
                this.emit('AmazonIntent');
                break;
            case '2':
            case 'two':    
            case 'microsoft':
                this.emit('MicrosoftIntent');
                break;
            case '3':    
            case 'three':    
            case 'thoughtworks':
            case 'thought':
            case 'works':    
                this.emit('ThoughtWksIntent');
                break;
            case '4':    
            case 'four':    
            case 'wipro':
            case 'why':
            case 'pro':    
                this.emit('WiproIntent');
                break;
            case '5':    
            case 'five':    
            case 'capgemini':
                this.emit('CapgeminiIntent');
                break;
            case '6':    
            case 'six':    
            case 'cognizant':
            case 'cogni':    
                this.emit('CogniIntent');
                break;
            case '7':    
            case 'seven':    
            case 'tech mahindra':
            case 'tech':
            case 'mahindra':
                this.emit('MahindraIntent');
                break;
            case '8':    
            case 'eight':    
            case 'jio':
            case 'jeo':    
            case 'reliance':
                this.emit('Jiointent');
                break;
            case '9':    
            case 'nine':    
            case 'infosys':
                this.emit('InfosysIntent');
                break;
            case '10':    
            case 'ten':    
            case 'hilti':
            case 'hill':    
                this.emit('HiltiIntent');
                break;
            case '11':    
            case 'eleven':    
            case 'hsbc':
            case 'aytch':    
            case 'bank':
                this.emit('HSBCIntent');
                break;
            case '12':    
            case 'twelve':    
            case 'hero motorcop':
            case 'hero':
            case 'motorcop':    
                this.emit('HeroIntent');
                break;
            case '13':    
            case 'thirteen':    
            case 'deloitte':
            case 'deloi':    
                this.emit('DeloitteIntent');
                break;
            case '14':    
            case 'fourteen':    
            case 'mindtree':
            case 'mind tree':
            case 'mind':
            case 'tree':    
                this.emit('MindTreeIntent');
                break;
            case '15':    
            case 'fifteen':    
            case 'yamaha':
                this.emit('YamahaIntent');
                break;                
            case 'fail':    
            default:
                this.emit('DefaultIntent');
        }
    },
    
    'DefaultIntent': function() {
        speechOutput = "Sorry I didn't get what you said. If you mentioned a company name then I don't have its detail please mention in review of skill, I will add in future. Else you say help or company name to begin.";        
        reprompt = "Please, tell me the name of company or say help";
        cardTitle = 'Sorry...';
        cardContent = "Please review our skill and share company name if you want it's details to be added in skill. You can also report any issues in review, we will fix it.";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Company+Images/Companies+720x480.png",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Company+Images/Companies+1200x800.png"
        };
        this.emit(':askWithCard', speechOutput, reprompt, cardTitle, cardContent, imageObj);
    },
    
    //1
    'AmazonIntent': function() {
        speechOutput = "Amazon is an American electronic commerce and cloud computing company. It's founder and owner is Jeff Bezos, Founded on July 5, 1994, Headquarters in Seattle, Washington, United States. Check out interview details on alexa app, Good Luck";
        cardTitle = 'Amazon';
        cardContent = "Amazon Interview Process includes one Written round, two Technical Interviews and finally HR Interview.";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Company+Images/Amazon+720x480.jpg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Company+Images/Amazon+1200x800.jpg"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    },
    //2
    'MicrosoftIntent': function() {
        speechOutput = "Microsoft Corporation is an American multinational technology company which develops, manufactures, licenses, supports etc. Founded on 4 April 1975 in Albuquerque, New Mexico, United States. Founded by Bill Gates and Paul Allen. CEO is Satya Nadella, Headquarters at Redmond, Washington, United States. Check out interview details on alexa app, Good Luck";
        cardTitle = 'Microsoft';
        cardContent = "Microsoft Corporation Interview Process includes One Online Coding or MCQ round then two rounds of group discussion and three rounds of Tech Interviews followed by HR Interview.";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Company+Images/microsoft+720x480.jpg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Company+Images/microsoft+1200x800.jpg"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    },
    //3
    'ThoughtWksIntent': function() {
        speechOutput = "ThoughtWorks is a privately owned global technology company with forty-two offices in fifteen countries. It provides software design and delivery, pioneering tools and consulting services. CEO is Guo Xiao, Founded by Neville Roy Singham in 1993. Headquarters at Chicago, Illinois, United States. Having five thousand total number of employees. Check out interview details on alexa app, Good Luck";
        cardTitle = 'ThoughtWorks';
        cardContent = "ThoughtWorks Interview Process includes two Online Coding Rounds, two Tech Interview maybe on Skype/Phone and finally HR Interview.";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Company+Images/Thoughtworks+720x480.png",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Company+Images/Thoughtworks+1200x800.png"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    },
    //4
     'WiproIntent': function() {
        speechOutput = "Wipro Limited is an Indian information technology services corporation. Headquartered in Bengaluru, India. Founded on 29 December 1945, Owner: Azim Premji (73 percent). Founders are M.H. Hasham Premji, Mohamed Prem. Check out interview details on alexa app, Good Luck";
        cardTitle = 'Wipro';
        cardContent = "Wipro Limited Interview Process includes Aptitude Test then Group Discussion or Tech Interview followed by HR Interview.";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Company+Images/Wipro+720x480.png",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Company+Images/Wipro+1200x800.png"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    },
    //5
    'CapgeminiIntent': function() {
        speechOutput = "Capgemini is a French multinational professional services and business consulting corporation, CEO is Paul Hermelin, Headquarter in Paris, France. Check out interview details on alexa app, Good Luck";
        cardTitle = 'Capgemini';
        cardContent = "Capgemini Interview Process includes one written Round then Tech Interview followed by HR Interview.";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Company+Images/capgemini+720x480.png",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Company+Images/Capgemini+1200x800.jpg"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    },  
    //6
    'CogniIntent': function() {
        speechOutput = "Cognizant is a multinational corporation that provides IT services, including digital, technology, consulting and operations services. Headquarters in Teaneck, New Jersey, United States. Founded on 26 January 1994 by Francisco D'Souza, Lakshmi Narayanan, Kumar Mahadeva. Check out interview details on alexa app, Good Luck";
        cardTitle = 'Cognizant';
        cardContent = "Cognizant Interview Process includes Written Round then Group Discussion, one Tech Interview followed by HR Interview.";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Company+Images/Cogni+1200x800.png",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Company+Images/Cogni+1200x800.png"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    }, 
    //7
    'MahindraIntent': function() {
        speechOutput = "Tech Mahindra Limited is an Indian multinational provider of information technology, networking technology solutions and Business Process Outsourcing to various industry verticals and horizontals. CEO is C. P. Gurnani, Headquarters at Mumbai. Check out interview details on alexa app, Good Luck";
        cardTitle = 'Tech Mahindra';
        cardContent = "Tech Mahindra Interview Process includes Online Apti test, Essay Writing then Tech Interview followed by HR Interview.";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Company+Images/TechM+720x480.jpg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Company+Images/TechM+1200x800.jpg"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    }, 
    //8
    'Jiointent': function() {
        speechOutput = "Reliance Jio Infocomm Limited, is an Indian mobile network operator. Owned by Reliance Industries and headquartered in Navi Mumbai. Founder is Mukesh Ambani and Founded in 2007. Check out interview details on alexa app, Good Luck";
        cardTitle = 'Reliance Jio';
        cardContent = "Reliance Jio Interview Process includes Apti test, then Offline Coding Round, Tech Interview followed by HR Interview.";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Company+Images/Jio+720x480.jpg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Company+Images/Jio+1200x800.jpg"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    }, 
    //9
    'InfosysIntent': function() {
        speechOutput = "Infosys Limited is an Indian multinational corporation that provides business consulting, information technology and outsourcing services. CEO is Salil Parekh and Headquarter in Bengaluru. Founders are N. R. Narayana Murthy, Nandan Nilekani, and others. Check out interview details on alexa app, Good Luck";
        cardTitle = 'Infosys';
        cardContent = "Infosys Interview Process includes Written Test (Apti) then Tech Interview followed by HR Interview.";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Company+Images/Infosys+720x480.jpg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Company+Images/Infosys+1200x800.jpg"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    }, 
    //10
    'HiltiIntent': function() {
        speechOutput = "Hilti Corporation is a Liechtenstein multinational company that develops, manufactures, and markets products for the construction, building maintenance, and mining industries, mainly to the professional end-user. Headquarters in Schaan, Liechtenstein. CEO is Christoph Loos. Check out interview details on alexa app, Good Luck";
        cardTitle = 'Hilti';
        cardContent = "Hilti Corporation Interview Process includes Written Test, Group Discussion then Tech Interviews and finally HR Interview.";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Company+Images/Hilti+720x480.png",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Company+Images/Hilti+1200x800.png"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    }, 
    //11
    'HSBCIntent': function() {
        speechOutput = "HSBC Holdings is a British multinational banking and financial services holding company. It is the seventh largest bank in the world and the largest in Europe. CEO is John M. Flint and Headquarters in London, United Kingdom. Founder is Thomas Sutherland. Check out interview details on alexa app, Good Luck";
        cardTitle = 'HSBC';
        cardContent = "HSBC Interview Process includes Coding and Apti test, then Tech Interview followed by two HR Interviews.";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Company+Images/HSBC+720x480.png",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Company+Images/HSBC+1200x800.png"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    }, 
    //12
    'HeroIntent': function() {
        speechOutput = "Hero Motocorp, formerly Hero Honda, is an Indian motorcycle and scooter manufacturer based in New Delhi, India. The company is the largest two-wheeler manufacturer in the world, and also in India, where it has a market share of about 46 percent in the two-wheeler category. Headquarter in New Delhi, Founder is Brijmohan Lall Munjal. Check out interview details on alexa app, Good Luck";
        cardTitle = 'Hero Motocorp Ltd.';
        cardContent = "Hero Motocorp Interview Process includes Online Apti test then Group Discussions and Tech Interview followed by HR Interview.";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Company+Images/Hero+720x480.jpeg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Company+Images/Hero+1200x800.png"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    },    
    //13
    'DeloitteIntent': function() {
        speechOutput = "Deloitte Touche Tohmatsu Limited, commonly referred to as Deloitte, is a multinational professional services network. Deloitte is one of the Big Four accounting organizations and the largest professional services network in the world by revenue and number of professionals. CEO is Punit Renjen, Headquarter in London, United Kingdom. Founder is William Welch Deloitte and Founded in 1845. Check out interview details on alexa app, Good Luck";
        cardTitle = 'Deloitte';
        cardContent = "Deloitte Interview Process includes Online Written Test (Apti), Group Discussion, Tech Interview and finally HR Interview.";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Company+Images/Deloitte+720x480.png",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Company+Images/Deloitte+1200x800.jpg"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    },
    //14
    'MindTreeIntent': function() {
        speechOutput = "Mindtree Limited is a multinational information technology and outsourcing company. Headquarters in Bengaluru, India and New Jersey, USA. Founded in 1999, Founders are Subroto Bagchi, Ashok Soota, Krishnakumar Natarajan, Scott Staples. CEO is Rostow Ravanan. Check out interview details on alexa app, Good Luck";
        cardTitle = 'Mindtree';
        cardContent = "Mindtree Interview Process includes Written Amcat test, Coding Questions test, Tech Interview followed by HR Interview.";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Company+Images/MindTree+720x480.jpg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Company+Images/MindTree+1200x800.jpg"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    }, 
    //15
    'YamahaIntent': function() {
        speechOutput = "Yamaha Motor Company Limited is a Japanese manufacturer of motorcycles, marine products such as boats and outboard motors, and other motorized products. Established in 1955 upon separation from Yamaha Corporation, Headquarter in Iwata, Shizuoka Prefecture, Japan. CEO is Hiroyuki Yanagi. Check out interview details on alexa app, Good Luck";
        cardTitle = 'Yamaha';
        cardContent = "Yamaha Interview Process includes Apti Written test then Tech Interview and finally HR Interview.";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Company+Images/Yamaha+720x480.jpg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Company+Images/Yamaha+1200x800.jpg"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    },
    'AMAZON.HelpIntent': function () {    
        speechOutput = "You can listen companies details by saying any company name or saying number from one to fifteen, or, you can say stop... What can I help you with?";
        reprompt = "You can simply say a number from one to ten to listen Tradition";
        cardTitle = 'Interview Homework';
        cardContent = "You can listen to companies detail (say 1-15), or, you can say stop... What can I help you with?";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Company+Images/Comapnies+List+720x480.jpg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Company+Images/Comapnies+List+1200x800.jpg"
        };
        this.emit(':askWithCard', speechOutput, reprompt, cardTitle, cardContent, imageObj);
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
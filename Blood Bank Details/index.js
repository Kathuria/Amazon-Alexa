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
        speechOutput = "Hi, which city are you planning to visit in India, Here are the options: Kolkata, Darjeeling, Varanasi, Agra, Delhi, Leh Ladakh, Jaipur, Goa, Kerala, Pondicherry";
        reprompt = "Please, tell me the name of any indian city or say help";
        
        cardTitle = 'Itinerary Selection';
        cardContent = 'Available Itinerary';

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/ITG+images/Itinerary+Guide+720x480.png",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/ITG+images/Itinerary+Guide+1200x800.png"
        };
        this.emit(':askWithCard', speechOutput, reprompt, cardTitle, cardContent, imageObj);
    },

    'ItineraryIntent': function(){
        if ( !this.event.request.intent.slots.myItinerary || this.event.request.intent.slots.myItinerary.value == '' || this.event.request.intent.slots.myItinerary.value == null) {
            this.emitWithState('AMAZON.HelpIntent'); 
        } else if(this.event.request.intent.slots.myItinerary.value == 'repeat'){
            this.emitWithState('LaunchIntent'); 
        } else {
            this.attributes['myItinerary'] = this.event.request.intent.slots.myItinerary.value;
        }    
        var check = this.attributes['myItinerary'].match(/^kolkata|calcutta|darjeeling|varanasi|agra|delhi|leh|ladakh|jaipur|goa|kerala|puducherry|pondicherry|1|2|3|4|5|6|7|8|9|10|one|two|three|four|five|six|seven|eight|nine|ten|chandigarh|assam|gujrat|shimla|mumbai|bengaluru|noida|pune|gurgaon|gurugram|hyderabad|chennai|ahmedabad|kochi|mysore|surat|madurai|thiruvananthapuram|lucknow|kanpur|amritsar|srinagar|patna|ludhiana|ooty|jabalpur|ujjain|tiruchirappalli|meerut|gwalior|raipur|dehradun|bhopal|somewhere in india|any city|amaze me|surprise me|anywhere|take me somewhere|where should i go|good place in india/ui);
        
        if(check == null) {
            check = 'fail';
        }else if(check[0] == 'somewhere in india' || check[0] == 'any city' || check[0] == 'amaze me' || check[0] == 'surprise me' || check[0] == 'anywhere' || check[0] == 'where should i go' || check[0] == 'take me somewhere' || check[0] == 'good place in india'){
            check = Math.floor(Math.random() * (10) + 1).toString();
        }    
        
        switch (check[0].toLowerCase()){
            case '1':
            case 'one':
            case 'calcutta':    
            case 'kolkata':
                this.emit('KolkataIntent');
                break;
            case '2':
            case 'two':    
            case 'darjeeling':
                this.emit('DarjeelingIntent');
                break;
            case '3':    
            case 'three':    
            case 'varanasi':
                this.emit('VaranasiIntent');
                break;
            case '4':    
            case 'four':    
            case 'agra':    
                this.emit('AgraIntent');
                break;
            case '5':    
            case 'five':    
            case 'delhi':
                this.emit('DelhiIntent');
                break;
            case '6':    
            case 'six':    
            case 'leh':
            case 'ladakh':
                this.emit('LehLadakhIntent');
                break;
            case '7':    
            case 'seven':    
            case 'jaipur':
                this.emit('JaipurIntent');
                break;
            case '8':    
            case 'eight':    
            case 'goa':
                this.emit('GoaIntent');
                break;
            case '9':    
            case 'nine':    
            case 'kerala':
                this.emit('KeralaIntent');
                break;
            case '10':    
            case 'ten':
            case 'puducherry':    
            case 'pondicherry':
                this.emit('PondicherryIntent');
                break;
            case 'chandigarh':
            case 'assam':
            case 'gujrat':
            case 'shimla':
            case 'mumbai':
            case 'bengaluru':
            case 'noida':
            case 'pune':
            case 'gurgaon':
            case 'gurugram':
            case 'hyderabad':
            case 'chennai':
            case 'ahmedabad':
            case 'kochi':
            case 'mysore':
            case 'surat':
            case 'madurai':
            case 'thiruvananthapuram':
            case 'lucknow':
            case 'kanpur':
            case 'amritsar':
            case 'srinagar':
            case 'patna':
            case 'ludhiana':
            case 'ooty':
            case 'jabalpur':
            case 'ujjain':
            case 'tiruchirappalli':
            case 'meerut':
            case 'gwalior':
            case 'raipur':
            case 'dehradun':
            case 'bhopal':    
                this.emit('NotAvailableIntent');
                break;
            case 'fail':    
            default:
                this.emit('AMAZON.HelpIntent');
        }
    },
    'KolkataIntent': function() {
        speechOutput = "Kolkata (formerly Calcutta) is the capital of India's West Bengal state. Founded as an East India Company trading post, it was India's capital under the British Raj from 1773–1911. Today it’s known for its grand colonial architecture, art galleries and cultural festivals. It’s also home to Mother House, headquarters of the Missionaries of Charity, founded by Mother Teresa, whose tomb is on site. <audio src='https://s3-eu-west-1.amazonaws.com/aksongs/ITG+audios/Kolkata+tour+1-day+itinerary.mp3'/>, goodBye";
        cardTitle = 'Kolkata City';
        cardContent = "Kolkata (formerly Calcutta) is the capital of India's West Bengal state. Founded as an East India Company trading post, it was India's capital under the British Raj from 1773–1911. Today it’s known for its grand colonial architecture, art galleries and cultural festivals. It’s also home to Mother House, headquarters of the Missionaries of Charity, founded by Mother Teresa, whose tomb is on site.";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/ITG+images/Kolkata+720x480.jpg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/ITG+images/Kolkata+1200x800.jpg"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    },
    'DarjeelingIntent': function() {
        speechOutput = "Darjeeling is a town in India's West Bengal state, in the Himalayan foothills. Once a summer resort for the British Raj elite, it remains the terminus of the narrow-gauge Darjeeling Himalayan Railway, or “Toy Train,” completed in 1881. It's famed for the distinctive black tea grown on plantations that dot its surrounding slopes. Its backdrop is Mt. Kanchenjunga, among the world’s highest peaks. <audio src='https://s3-eu-west-1.amazonaws.com/aksongs/ITG+audios/Darjeeling+tour+3-day+itinerary.mp3'/>, goodBye";
        cardTitle = 'Darjeeling Town';
        cardContent = "Darjeeling is a town in India's West Bengal state, in the Himalayan foothills. Once a summer resort for the British Raj elite, it remains the terminus of the narrow-gauge Darjeeling Himalayan Railway, or “Toy Train,” completed in 1881. It's famed for the distinctive black tea grown on plantations that dot its surrounding slopes. Its backdrop is Mt. Kanchenjunga, among the world’s highest peaks.";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/ITG+images/Darjelling+720x480.jpg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/ITG+images/Darjelling+1200x800.jpg"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    },
    'VaranasiIntent': function() {
        speechOutput = "Varanasi is a city in the northern Indian state of Uttar Pradesh dating to the 11th century B.C. Regarded as the spiritual capital of India, the city draws Hindu pilgrims who bathe in the Ganges River’s sacred waters and perform funeral rites. Along the city's winding streets are some 2,000 temples, including Kashi Vishwanath, the “Golden Temple,” dedicated to the Hindu god Shiva. <audio src='https://s3-eu-west-1.amazonaws.com/aksongs/ITG+audios/Varanasi+tour+1-day+itinerary.mp3'/>, goodBye";
        cardTitle = 'Varanasi City';
        cardContent = "Varanasi is a city in the northern Indian state of Uttar Pradesh dating to the 11th century B.C. Regarded as the spiritual capital of India, the city draws Hindu pilgrims who bathe in the Ganges River’s sacred waters and perform funeral rites. Along the city's winding streets are some 2,000 temples, including Kashi Vishwanath, the “Golden Temple,” dedicated to the Hindu god Shiva.";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/ITG+images/Varanasi+720x480.jpg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/ITG+images/Varanasi+1200x800.jpg"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    },
     'AgraIntent': function() {
        speechOutput = "Agra is a city in northern India’s Uttar Pradesh state. It's home to the iconic Taj Mahal, a mausoleum built for the Mughal ruler Shah Jahan’s wife, Mumtaz Mahal (who died in childbirth in 1631). The imposing main building features a massive dome and intricately carved white marble inlaid with precious stones. This is set behind a reflecting pool inside a courtyard defined by 4 minarets. <audio src='https://s3-eu-west-1.amazonaws.com/aksongs/ITG+audios/Agra+tour+3-day+itinerary.mp3'/>, goodBye";
        cardTitle = 'Agra City';
        cardContent = "Agra is a city in northern India’s Uttar Pradesh state. It's home to the iconic Taj Mahal, a mausoleum built for the Mughal ruler Shah Jahan’s wife, Mumtaz Mahal (who died in childbirth in 1631). The imposing main building features a massive dome and intricately carved white marble inlaid with precious stones. This is set behind a reflecting pool inside a courtyard defined by 4 minarets.";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/ITG+images/Agra+720x480.jpg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/ITG+images/Agra+1200x800.jpg"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    },
    'DelhiIntent': function() {
        speechOutput = "Delhi, India’s capital territory, is a massive metropolitan area in the country’s north. In Old Delhi, a neighborhood dating to the 1600s, stands the imposing Mughal-era Red Fort, a symbol of India, and the sprawling Jama Masjid mosque, whose courtyard accommodates 25,000 people. Nearby is Chandni Chowk, a vibrant bazaar filled with food carts, sweets shops and spice stalls. <audio src='https://s3-eu-west-1.amazonaws.com/aksongs/ITG+audios/New+Delhi+tour+3-day+itinerary.mp3'/>, goodBye";
        cardTitle = 'Delhi - Indian union territory';
        cardContent = "Delhi, India’s capital territory, is a massive metropolitan area in the country’s north. In Old Delhi, a neighborhood dating to the 1600s, stands the imposing Mughal-era Red Fort, a symbol of India, and the sprawling Jama Masjid mosque, whose courtyard accommodates 25,000 people. Nearby is Chandni Chowk, a vibrant bazaar filled with food carts, sweets shops and spice stalls.";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/ITG+images/Delhi+720x480.jpg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/ITG+images/Delhi+1200x800.jpg"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    },  
    'LehLadakhIntent': function() {
        speechOutput = "Leh, a high-desert city in the Himalayas, is the capital of the Leh region in northern India’s Jammu and Kashmir state. Originally a stop for trading caravans, Leh is now known for its Buddhist sites and nearby trekking areas. Massive 17th-century Leh Palace, modeled on the Dalai Lama’s former home (Tibet’s Potala Palace), overlooks the old town’s bazaar and mazelike lanes. <audio src='https://s3-eu-west-1.amazonaws.com/aksongs/ITG+audios/Leh+Ladakh+tour+6-day+itinerary.mp3'/>, goodBye";
        cardTitle = 'Leh-Ladakh Town';
        cardContent = "Leh, a high-desert city in the Himalayas, is the capital of the Leh region in northern India’s Jammu and Kashmir state. Originally a stop for trading caravans, Leh is now known for its Buddhist sites and nearby trekking areas. Massive 17th-century Leh Palace, modeled on the Dalai Lama’s former home (Tibet’s Potala Palace), overlooks the old town’s bazaar and mazelike lanes.";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/ITG+images/Leh+720x480.jpg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/ITG+images/Leh+1200x800.jpg"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    }, 
    'JaipurIntent': function() {
        speechOutput = "Jaipur is the capital of India’s Rajasthan state. It evokes the royal family that once ruled the region and that, in 1727, founded what is now called the Old City, or “Pink City” for its trademark building color. At the center of its stately street grid (notable in India) stands the opulent, colonnaded City Palace complex. With gardens, courtyards and museums, part of it is still a royal residence. <audio src='https://s3-eu-west-1.amazonaws.com/aksongs/ITG+audios/Jaipur+tour+3-day+itinerary.mp3'/>, goodBye";
        cardTitle = 'Jaipur - Pink City of India';
        cardContent = "Jaipur is the capital of India’s Rajasthan state. It evokes the royal family that once ruled the region and that, in 1727, founded what is now called the Old City, or “Pink City” for its trademark building color. At the center of its stately street grid (notable in India) stands the opulent, colonnaded City Palace complex. With gardens, courtyards and museums, part of it is still a royal residence.";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/ITG+images/Jaipur+720x480.jpg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/ITG+images/Jaipur+1200x800.jpg"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    },
     'GoaIntent': function() {
        speechOutput = "Goa is a state in western India with coastlines stretching along the Arabian Sea. Its long history as a Portuguese colony prior to 1961 is evident in its preserved 17th-century churches and the area’s tropical spice plantations. Goa is also known for its beaches, ranging from popular stretches at Baga and Palolem to those in laid-back fishing villages such as Agonda. <audio src='https://s3-eu-west-1.amazonaws.com/aksongs/ITG+audios/Goa+tour+3-day+itinerary.mp3'/>, goodBye";
        cardTitle = 'Goa State';
        cardContent = "Goa is a state in western India with coastlines stretching along the Arabian Sea. Its long history as a Portuguese colony prior to 1961 is evident in its preserved 17th-century churches and the area’s tropical spice plantations. Goa is also known for its beaches, ranging from popular stretches at Baga and Palolem to those in laid-back fishing villages such as Agonda.";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/ITG+images/Goa+720x480.jpg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/ITG+images/Goa+1200x800.jpg"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    },
    'KeralaIntent': function() {
        speechOutput = "Kerala, a state on India's tropical Malabar Coast, has nearly 600km of Arabian Sea shoreline. It's known for its palm-lined beaches and backwaters, a network of canals. Inland are the Western Ghats, mountains whose slopes support tea, coffee and spice plantations as well as wildlife. National parks like Eravikulam and Periyar, plus Wayanad and other sanctuaries, are home to elephants, langur monkeys and tigers. <audio src='https://s3-eu-west-1.amazonaws.com/aksongs/ITG+audios/Kerala+tour+4-day+itinerary.mp3'/>, goodBye";
        cardTitle = 'Kerala State';
        cardContent = "Kerala, a state on India's tropical Malabar Coast, has nearly 600km of Arabian Sea shoreline. It's known for its palm-lined beaches and backwaters, a network of canals. Inland are the Western Ghats, mountains whose slopes support tea, coffee and spice plantations as well as wildlife. National parks like Eravikulam and Periyar, plus Wayanad and other sanctuaries, are home to elephants, langur monkeys and tigers.";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/ITG+images/Kerla+720x480.jpg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/ITG+images/Kerla+1200x800.jpg"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    },  
    'PondicherryIntent': function() {
        speechOutput = "Pondicherry (or Puducherry), a French colonial settlement in India until 1954, is now a Union Territory town bounded by the southeastern Tamil Nadu state. Its French legacy is preserved in its French Quarter, with tree-lined streets, mustard-colored colonial villas and chic boutiques. A seaside promenade runs along the Bay of Bengal and passes several statues, including a 4m-high Gandhi Memorial. <audio src='https://s3-eu-west-1.amazonaws.com/aksongs/ITG+audios/Pondicherry+tour+2-day+itinerary.mp3'/>, goodBye";
        cardTitle = 'Pondicherry City';
        cardContent = "Pondicherry (or Puducherry), a French colonial settlement in India until 1954, is now a Union Territory town bounded by the southeastern Tamil Nadu state. Its French legacy is preserved in its French Quarter, with tree-lined streets, mustard-colored colonial villas and chic boutiques. A seaside promenade runs along the Bay of Bengal and passes several statues, including a 4m-high Gandhi Memorial.";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/ITG+images/Pondicherry+720x480.jpg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/ITG+images/Pondicherry+1200x800.jpg"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    },
    'NotAvailableIntent': function () {    
        speechOutput = "Sorry, this city's information not available, It will be added in next update of skill. You can select from available options such as Kolkata, goa, delhi, etc.";
        reprompt = "You can simply say a number from one to ten to listen itinerary or ask for help or say stop";
        cardTitle = 'Itinerary not available';
        cardContent = "Sorry, this city's information not available, It will be added in next update of skill. You can select from available options";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/ITG+images/Not+available+720x480.jpg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/ITG+images/Not+available+1200x800.jpg"
        };
        this.emit(':askWithCard', speechOutput, reprompt, cardTitle, cardContent, imageObj);
    },
    'AMAZON.HelpIntent': function () {    
        speechOutput = "You can listen indian cities itinerary by saying any indian city name or saying number from one to ten, or, you can say stop... What can I help you with?";
        reprompt = "You can simply say a number from one to ten to listen itinerary";
        cardTitle = 'Itinerary Options';
        cardContent = "You can listen indian cities itinerary (say 1-10), or, you can say stop... What can I help you with?";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/ITG+images/Itinerary+Guide+720x480.png",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/ITG+images/Itinerary+Guide+1200x800.png"
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
    }
};

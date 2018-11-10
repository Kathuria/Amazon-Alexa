var Alexa = require('alexa-sdk');
var speechOutput = ' ';
var reprompt = ' ';
var cardTitle = ' ';
var cardContent = ' ';
var imageObj = {};



exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);

    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function() { 
        this.emit('AlphabetIntent');
    },

    'AlphabetIntent': function(){
        let alphabet = returnAlphabet();   
        function returnAlphabet() {
            let alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            return alphabets.charAt(Math.floor(Math.random() * alphabets.length));
          }

          let fruitsList = [
            "Acai",
            "Apples",
            "Apricots",
            "Avocado",
            "Ackee",
            "Bananas",
            "Bilberries",
            "Blueberries",
            "Blackberries",
            "Boysenberries",
            "Bread fruit",
            "Cantaloupes (cantalope)",
            "Chocolate-Fruit",
            "Cherimoya",
            "Cherries",
            "Cranberries",
            "Cucumbers",
            "Currants",
            "Dates",
            "Durian",
            "Eggplant",
            "Elderberries",
            "Figs",
            "Gooseberries",
            "Grapes",
            "Grapefruit",
            "Guava",
            "Honeydew melons",
            "Horned melon (Kiwano)",
            "Huckleberries",
            "Ita Palm",
            "Jujubes",
            "Kiwis",
            "Kumquat",
            "Lemons",
            "Limes",
            "Lychees",
            "Mangos",
            "Mangosteen",
            "Mulberries",
            "Muskmelon",
            "Nectarines",
            "Ogden melons",
            "Olives",
            "Oranges",
            "Papaya",
            "Passion fruit",
            "Peaches",
            "Pears",
            "Peppers",
            "Persimmon",
            "Pineapple",
            "Plums",
            "Pluot",
            "Pomegranate",
            "Prickly Pear",
            "Quince",
            "Rambuton",
            "Raspberries",
            "Rose Apple",
            "Starfruit",
            "Sapadilla",
            "Strawberries",
            "Tamarind",
            "Tangelo",
            "Tangerines",
            "Tomatoes",
            "Ugli fruit",
            "Voavanga (Spanish Tamarind)",
            "Watermelons",
            "Xigua melon",
            "Yellow watermelon",
            "Zucchini"
          ];

          let countriesList = [
            "Afghanistan",
            "Albania",
            "Algeria",
            "Andorra",
            "Angola",
            "Antigua and Barbuda",
            "Argentina",
            "Armenia",
            "Aruba",
            "Australia",
            "Austria",
            "Azerbaijan",
            "Bahamas",
            "Bahrain",
            "Bangladesh",
            "Barbados",
            "Belarus",
            "Belgium",
            "Belize",
            "Benin",
            "Bhutan",
            "Bolivia",
            "Bosnia and Herzegovina",
            "Botswana",
            "Brazil",
            "Brunei",
            "Bulgaria",
            "Burkina Faso",
            "Burma",
            "Burundi",
            "Cambodia",
            "Cameroon",
            "Canada",
            "Cabo Verde",
            "Central African Republic",
            "Chad",
            "Chile",
            "China",
            "Colombia",
            "Comoros",
            "Congo",
            "Costa Rica",
            "Cote d'Ivoire",
            "Croatia",
            "Cuba",
            "Curacao",
            "Cyprus",
            "Czechia",
            "Denmark",
            "Djibouti",
            "Dominica",
            "Dominican Republic",
            "East Timor",
            "Ecuador",
            "Egypt",
            "El Salvador",
            "Equatorial Guinea",
            "Eritrea",
            "Estonia",
            "Eswatini",
            "Ethiopia  ",
            "Fiji",
            "Finland",
            "France",
            "Gabon",
            "Gambia",
            "Georgia",
            "Germany",
            "Ghana",
            "Greece",
            "Grenada",
            "Guatemala",
            "Guinea",
            "Guinea-Bissau",
            "Guyana",
            "Haiti",
            "Holy See",
            "Honduras",
            "Hong Kong",
            "Hungary",
            "Iceland",
            "India",
            "Indonesia",
            "Iran",
            "Iraq",
            "Ireland",
            "Israel",
            "Italy",
            "Jamaica",
            "Japan",
            "Jordan",
            "Jamaica",
            "Japan",
            "Jordan",
            "Laos",
            "Latvia",
            "Lebanon",
            "Lesotho",
            "Liberia",
            "Libya",
            "Liechtenstein",
            "Lithuania",
            "Luxembourg",
            "Macau",
            "Macedonia",
            "Madagascar",
            "Malawi",
            "Malaysia",
            "Maldives",
            "Mali",
            "Malta",
            "Marshall Islands",
            "Mauritania",
            "Mauritius",
            "Mexico",
            "Micronesia",
            "Moldova",
            "Monaco",
            "Mongolia",
            "Montenegro",
            "Morocco",
            "Mozambique",
            "Namibia",
            "Nauru",
            "Nepal",
            "Netherlands",
            "New Zealand",
            "Nicaragua",
            "Niger",
            "Nigeria",
            "North Korea",
            "Norway",
            "Oman",
            "Pakistan",
            "Palau",
            "Palestinian Territories",
            "Panama",
            "Papua New Guinea",
            "Paraguay",
            "Peru",
            "Philippines",
            "Poland",
            "Portugal",
            "Qatar",
            "Romania",
            "Russia",
            "Rwanda",
            "Saint Kitts and Nevis",
            "Saint Lucia",
            "Saint Vincent and the Grenadines",
            "Samoa",
            "San Marino",
            "Sao Tome and Principe",
            "Saudi Arabia",
            "Senegal",
            "Serbia",
            "Seychelles",
            "Sierra Leone",
            "Singapore",
            "Sint Maarten",
            "Slovakia",
            "Slovenia",
            "Solomon Islands",
            "Somalia",
            "South Africa",
            "South Korea",
            "South Sudan",
            "Spain",
            "Sri Lanka",
            "Sudan",
            "Suriname",
            "Swaziland",
            "Sweden",
            "Switzerland",
            "Syria",
            "Taiwan",
            "Tajikistan",
            "Tanzania",
            "Thailand",
            "Timor-Leste",
            "Togo",
            "Tonga",
            "Trinidad and Tobago",
            "Tunisia",
            "Turkey",
            "Turkmenistan",
            "Tuvalu",
            "Uganda",
            "Ukraine",
            "United Arab Emirates",
            "United Kingdom",
            "Uruguay",
            "Uzbekistan",
            "Vanuatu",
            "Venezuela",
            "Vietnam",
            "Yemen",
            "Zambia",
            "Zimbabwe"
          ];

          let toysList = [
            "Alphabet Blocks",
            "Atari Game System",
            "Baby Doll",
            "Ball",
            "Barbie",
            "Bicycle",
            "Big Wheel",
            "Bubbles",
            "Candy Land",
            "Cardboard Box",
            "Checkers",
            "Chess",
            "Clue",
            "Crayola Crayons",
            "Dollhouse",
            "Dominoes",
            "Duncan Yo-Yo",
            "Dungeons & Dragons",
            "Easy-Bake Oven",
            "Erector Set",
            "Etch A Sketch",
            "Fisher-Price Little People",
            "Frisbee",
            "G.I. Joe",
            "The Game of Life",
            "Hot Wheels",
            "Hula Hoop",
            "Jack-in-the-Box",
            "Jacks",
            "Jigsaw Puzzle",
            "Jump Rope",
            "Kite",
            "LEGO",
            "Lincoln Logs",
            "Lionel Trains",
            "Little Green Army Men",
            "Marbles",
            "Monopoly",
            "Mister Potato Head",
            "Nintendo Game Boy",
            "Paper Airplane",
            "Play-Doh",
            "Playing Cards",
            "Puppet",
            "Radio Flyer Wagon",
            "Raggedy Ann and Andy",
            "Rocking Horse",
            "Roller Skates",
            "Rubber Duck",
            "Rubik's Cube",
            "Scrabble",
            "Silly Putty",
            "Skateboard",
            "Slinky",
            "Stick",
            "Super Soaker",
            "Swing",
            "Teddy Bear",
            "Tinkertoy",
            "Tonka Trucks",
            "Twister",
            "View-Master",
            "Wiffle Ball"
          ];
            
           
          function returnWords (words){
              let wordsList = words.filter(word => word.startsWith(alphabet));
              let wordsNum = Math.floor(Math.random() * wordsList.length);
              return wordsList[wordsNum];
          }
            
            let fruit = returnWords(fruitsList) ? `"${returnWords(fruitsList)}" which is a fruit`:'';
            let country = returnWords(countriesList) ? `, "${returnWords(countriesList)}" which is a country`:'';
            let toy = returnWords(toysList) ? ` and "${returnWords(toysList)}" which is a toy`:'';
        
            speechOutput = `${alphabet} for ${fruit}${country}${toy}, Do you want to listen more?`;
            reprompt = "You can listen to words or say help";
            cardTitle = `Three Words : ${alphabet}`;
            cardContent = `${alphabet} for ${fruit}${country}${toy}.`;

            imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/3+Words/abc+720x480.jpg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/3+Words/abc+1200x800.jpg"
            };
        
        this.emit(':askWithCard', speechOutput, reprompt, cardTitle, cardContent, imageObj); 
    },
    
    'LaunchIntent': function() {
        if (!this.event.request.intent.slots || !this.event.request.intent.slots.Alphabets || this.event.request.intent.slots.Alphabets.value == '' || this.event.request.intent.slots.Alphabets.value == null) {
            this.emitWithState('AMAZON.HelpIntent'); 
        }
         else if(this.event.request.intent.slots.Alphabets.value == 'yes'){
            this.emitWithState('LaunchRequest'); 
        }
        else if(this.event.request.intent.slots.Alphabets.value == 'repeat'){
            this.emit('AlphabetIntent');
        }
        else{
            this.emit('AMAZON.StopIntent');
        }
    },
    
    'AMAZON.HelpIntent': function () {    
        speechOutput = "You can listen to three words of random alphabet that comprises of words from different categories as Fruits, Countries and Toys. You can say cancel or stop... What can I help you with?";
        reprompt = "You can simply start the skill with invocation, Alexa open three words";

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
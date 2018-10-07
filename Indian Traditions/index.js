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
        speechOutput = "Indian Culture is full of several unique customs and traditions, Most of these originate from the Ancient Indian scriptures and texts, which have dictated the way of life in India for thousands of years. So, which indian tradition you want to know about, Here are the options: Namaste, Curd and Sugar, Holy Cow, Indian temples, Chandan and Haldi, Touching Feets, Festive India, Joint Families, Fasting (upvas or vrat), Arranged Marriages, Ethnic Wears or Dance Forms";        
        reprompt = "Please, tell me the name of tradition or say help";
        cardTitle = 'Tradition Selection';
        cardContent = 'Indian Culture and traditions are something which has now become renowned all across the world.  We all refer to India and its culture as something very diverse and unique. But seldom do we give a thought to why things are done in certain specific ways. Indian Culture is full of several unique customs and traditions, which outsiders might find really intriguing. Please select any tradition to know more about it.';

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Indian+Tradition/Indian-Culture-And-Traditions+-+720+x+480.png",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Indian+Tradition/Indian-Culture-And-Traditions.jpg"
        };
        this.emit(':askWithCard', speechOutput, reprompt, cardTitle, cardContent, imageObj);
    },

    'TraditionIntent': function(){
        if ( !this.event.request.intent.slots.myTraditions || this.event.request.intent.slots.myTraditions.value == '' || this.event.request.intent.slots.myTraditions.value == null) {
            this.emitWithState('AMAZON.HelpIntent'); 
        } else if(this.event.request.intent.slots.myTraditions.value == 'repeat'){
            this.emitWithState('LaunchIntent'); 
        } else {
            this.attributes['traditions'] = this.event.request.intent.slots.myTraditions.value;
        }    
        var check = this.attributes['traditions'].match(/^namaste|curd and sugar|curd|sugar|holy|cow|holycow|barefoot|temples|gurudwara|mandir|greeting|tilak|tikka|chandan and haldi|chandan|haldi|feet touching|touching|feet|festival|festive|families|joint|joint family|family|fasting|vrats|upvas|arranged marriage|arranged|marriage|vivah|vivaah|ethnic wear|ethnic|wear|clothes|dance|dances|forms|folk|classical|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|1|2|3|4|5|6|7|8|9|10|11|12|any tradition|amaze me|surprise me|anything|random/ui);
        
        if(check == null) {
            check = 'fail';
        }else if(check[0] == 'any tradition' || check[0] == 'amaze me' || check[0] == 'surprise me' || check[0] == 'anything' || check[0] == 'random'){
            check = (Math.floor(Math.random() * (11)) + 1).toString();
        }  
        else if(check[0] == 'curd and sugar'){
            check = 'two';
        }  
        else if(check[0] == 'chandan and haldi'){
            check = 'five';
        }    
        else if(check[0] == 'joint family'){
            check = 'eight';
        }   
        else if(check[0] == 'arranged marriage'){
            check = 'ten';
        }    
        else if(check[0] == 'ethnic wear'){
            check = 'eleven';
        }   
        
        switch (check[0].toLowerCase()){
            case '1':
            case 'one':
            case 'namaste':    
                this.emit('NamasteIntent');
                break;
            case '2':
            case 'two':    
            case 'curd':
            case 'sugar':
            case 'curd and sugar':
                this.emit('CurdSugarIntent');
                break;
            case '3':    
            case 'three':    
            case 'holy':
            case 'cow':
            case 'holycow':
                this.emit('HolyCowIntent');
                break;
            case '4':    
            case 'four':    
            case 'barefoot': 
            case 'temples': 
            case 'mandir':
            case 'gurudwara':  
                this.emit('TemplesIntent');
                break;
            case '5':    
            case 'five':    
            case 'chandan and haldi':
            case 'chandan':
            case 'haldi':
            case 'tilak':
            case 'tikka':
                this.emit('ChandanHaldiIntent');
                break;
            case '6':    
            case 'six':    
            case 'feet touching':
            case 'feet':
            case 'touching':
            case 'greeting':
                this.emit('FeetTouchingIntent');
                break;
            case '7':    
            case 'seven':    
            case 'festival':
            case 'festive':
                this.emit('FestiveIntent');
                break;
            case '8':    
            case 'eight':    
            case 'joint':
            case 'families':
            case 'family':
            case 'joint family':
                this.emit('JointFamiliesIntent');
                break;
            case '9':    
            case 'nine':    
            case 'fasting':
            case 'vrats':
            case 'upvas':
                this.emit('FastingIntent');
                break;
            case '10':    
            case 'ten':    
            case 'arranged':
            case 'marriages':
            case 'vivah':
            case 'vivaah':
            case 'arranged marriage':
                this.emit('ArrangedMarriagesIntent');
                break;
            case '11':    
            case 'eleven':    
            case 'ethnic':
            case 'wear':
            case 'clothes':
            case 'ethnic wear':
                this.emit('EthinicWearIntent');
                break;
            case '12':    
            case 'twelve':    
            case 'dances':
            case 'forms':
            case 'dance':    
            case 'classical':
            case 'folk':
                this.emit('DancesIntent');
                break;
            case 'fail':    
            default:
                this.emit('AMAZON.HelpIntent');
        }
    },
    //1
    'NamasteIntent': function() {
        speechOutput = "<audio src='https://s3-eu-west-1.amazonaws.com/aksongs/Indian+Traditions/Namaste_16000Hz+48kbps.mp3'/>, goodBye";
        cardTitle = 'The Namaste';
        cardContent = "The Namaste is one of the most popular Indian customs and isn't really just restricted to the Indian territory anymore. You have Barack Obama, who has been seen doing it on various occasions, or you had Ban Ki-moon, the UN Secretary-General, greeting everyone with a namaste at the Times? Square in New York on the first International Yoga Day";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Indian+Tradition/Namaste+720x480.jpg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Indian+Tradition/Namaste+1200x800.jpg"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    },
    //2
    'CurdSugarIntent': function() {
        speechOutput = "<audio src='https://s3-eu-west-1.amazonaws.com/aksongs/Indian+Traditions/Curd+and+Sugar_16000Hz+48kbps.mp3'/>, goodBye";
        cardTitle = 'Curd and Sugar';
        cardContent = "CurdSugar is a town in India's West Bengal state, in the Himalayan foothills. Once a summer resort for the British Raj elite, it remains the terminus of the narrow-gauge CurdSugar Himalayan Railway, or “Toy Train,” completed in 1881. It's famed for the distinctive black tea grown on plantations that dot its surrounding slopes. Its backdrop is Mt. Kanchenjunga, among the world’s highest peaks.";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Indian+Tradition/Curd+Sugar+720x480.jpg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Indian+Tradition/Curd+Sugar+1200x800.jpg"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    },
    //3
    'HolyCowIntent': function() {
        speechOutput = "<audio src='https://s3-eu-west-1.amazonaws.com/aksongs/Indian+Traditions/Holycow_16000Hz+48kbps.mp3'/>, goodBye";
        cardTitle = 'Holy Cow';
        cardContent = "Cow, in the Indian culture, is considered to be a Holy animal. She is worshipped as a maternal figure and is a depiction of the bounty of Mother Earth. Cows are a source of life-sustaining milk. Even the cow dung is an essential and energy efficient source of fuel, especially in rural India. Killing the cow or consuming cow meet is considered to be a sin.";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Indian+Tradition/HolyCow+720x480.jpg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Indian+Tradition/HolyCow+1200x800.jpg"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    },
    //4
     'TemplesIntent': function() {
        speechOutput = "Most temples are located along magnetic wave lines of the earth, which help in maximizing the available positive energy. The copper plate (called Garbhagriha or Moolasthan) buried under the main idol absorbs and resonates this energy to its surroundings. Going to the temple often helps in having a positive mind and garnering positive energies, which in turn lead to healthier functioning. <audio src='https://s3-eu-west-1.amazonaws.com/aksongs/Indian+Traditions/Indian+Temples_16000Hz+48kbps.mp3'/>, goodBye";
        cardTitle = 'Temples in India';
        cardContent = "Most temples are located along magnetic wave lines of the earth, which help in maximizing the available positive energy. The copper plate (called Garbhagriha or Moolasthan) buried under the main idol absorbs and resonates this energy to its surroundings. Going to the temple often helps in having a positive mind and garnering positive energies, which in turn lead to healthier functioning.";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Indian+Tradition/IndianTemples+720x480.jpg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Indian+Tradition/IndianTemples+1200x800.jpg"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    },
    //5
    'ChandanHaldiIntent': function() {
        speechOutput = "<audio src='https://s3-eu-west-1.amazonaws.com/aksongs/Indian+Traditions/Tilak_16000Hz+48kbps.mp3'/>, goodBye";
        cardTitle = 'Chandan Haldi (Tilak)';
        cardContent = "ChandanHaldi, India’s capital territory, is a massive metropolitan area in the country’s north. In Old ChandanHaldi, a neighborhood dating to the 1600s, stands the imposing Mughal-era Red Fort, a symbol of India, and the sprawling Jama Masjid mosque, whose courtyard accommodates 25,000 people. Nearby is Chandni Chowk, a vibrant bazaar filled with food carts, sweets shops and spice stalls.";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Indian+Tradition/Chandan+Haldi+720x480.jpg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Indian+Tradition/Chandan+Haldi+1200x800.jpg"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    },  
    //6
    'FeetTouchingIntent': function() {
        speechOutput = "<audio src='https://s3-eu-west-1.amazonaws.com/aksongs/Indian+Traditions/Touching+Feet_16000Hz+48kbps.mp3'/>, goodBye";
        cardTitle = 'Feet Touching';
        cardContent = "Leh, a high-desert city in the Himalayas, is the capital of the Leh region in northern India’s Jammu and Kashmir state. Originally a stop for trading caravans, Leh is now known for its Buddhist sites and nearby trekking areas. Massive 17th-century Leh Palace, modeled on the Dalai Lama’s former home (Tibet’s Potala Palace), overlooks the old town’s bazaar and mazelike lanes.";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Indian+Tradition/Touching+Feets+720x480.jpg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Indian+Tradition/Touching+Feets+1200x800.jpg"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    }, 
    //7
    'FestiveIntent': function() {
        speechOutput = "India also sees a large number of festivals, mainly because of the prevalence of diverse religions and groups. The Muslims celebrate Eid, the Christians have Christmas, good Friday and so on, the Sikhs have Baisakhi (harvesting of crop), and the birthdays of their Gurus and the Hindus have Diwali, Holi, Makar Sakranti, the Jains have Mahavir Jayanti, the Buddhists celebrate the Buddha?s birthday on Buddha Poornima, and quite honestly, the number is endless. GoodBye";
        cardTitle = 'Festive India';
        cardContent = "India also sees a large number of festivals, mainly because of the prevalence of diverse religions and groups. We celebrate Eid, Christians, Good Friday, Baisakhi (harvesting of crop), and Diwali, Holi, Makar Sakranti, Mahavir Jayanti, Buddha Poornima, and quite honestly, the number is endless. All of these translate to holidays in our book, of course.";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Indian+Tradition/Festivals+720x480.jpg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Indian+Tradition/Festivals+1200x800.jpg"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    }, 
    //8
    'JointFamiliesIntent': function() {
        speechOutput = "Also, in India, there exists the concept of a joint family, wherein the entire family (parents, wife, children and in some cases relatives) all live together. This is mostly because of the cohesive nature of the Indian society, and also reportedly helps in handling pressure and stress. GoodBye";
        cardTitle = 'Joint Families';
        cardContent = "In India, there exists the concept of a joint family, wherein the entire family (parents, wife, children and in some cases relatives) all live together. This is mostly because of the cohesive nature of the Indian society, and also reportedly helps in handling pressure and stress.";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Indian+Tradition/Joint+Family+720x480.jpg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Indian+Tradition/Joint+Family+1200x800.jpg"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    }, 
    //9
    'FastingIntent': function() {
        speechOutput = "Fasting is an integral part of Hindu culture. Fasts or Vrats or Upvas are a way to represent your sincerity and resolve, or express your gratitude to the Gods and Goddesses.  People throughout the country observe fasts during various religious occasions. Some people also observe fast on different days of a week in favour of a particular God or Goddess associated with that particular day. It is widely believed that by doing so, you are depriving your body of a basic necessity and thus, punishing yourself to cleanse off the sins that you have committed until the day of fast. The rules and regulations of a fast are in accordance with the particular occasion. The origin of fast probably comes from the Vedic ritual of kindling the sacrificial fire for sacrifice purposes. Since the word upvas has been used for denoting both fasts and kindling sacrificial fire, it can be thought that people observed fasts when they had to kindle or rekindle the domestic fires kept in their homes to perform daily sacrifices. GoodBye";
        cardTitle = 'Fasting (Vrats or Upvas)';
        cardContent = "Fasting is an integral part of Hindu culture. Fasts or Vrats or Upvas are a way to represent your sincerity and resolve, or express your gratitude to the Gods and Goddesses.  People throughout the country observe fasts during various religious occasions..";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Indian+Tradition/Fasting+720x480.jpg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Indian+Tradition/Fasting+1200x800.jpg"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    }, 
    //10
    'ArrangedMarriagesIntent': function() {
        speechOutput = "The concept of arranged marriage in India traces its origin to as early as the Vedic times. For royal families, a ceremony known as the Swayambar would be arranged for the bride. Suitable matches from all over the kingdom were invited to either compete in some competition to win over the bride, or the bride would herself choose her ideal husband. Even today, the concept of arranged marriage remains a favourite among Indians. GoodBye";
        cardTitle = 'Arranged Marriages';
        cardContent = "The concept of arranged marriage in India traces its origin to as early as the Vedic times. For royal families, a ceremony known as the Swayambar would be arranged for the bride. Even today, the concept of arranged marriage remains a favourite among Indians.";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Indian+Tradition/Marriages+720x480.jpg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Indian+Tradition/Marriages+1200x800.jpg"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    }, 
    //11
    'EthinicWearIntent': function() {
        speechOutput = "Indian women are often seen sporting saris. The sari is a single cloth and needs no stitching, it is easy to make and comfortable to wear, and also adheres to religious etiquette. It initially started out as a Hindu tradition but has very elegantly spread across all religions. The same applies to the more functional Kurta-Pyjama, and the ceremonial wear of Sherwani for Indian men of all religions. GoodBye";
        cardTitle = 'Indian Ethnic Wear';
        cardContent = "Indian women are often seen sporting saris. The same applies to the more functional Kurta-Pyjama, and the ceremonial wear of Sherwani for Indian men of all religions.";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Indian+Tradition/Ethnic+Wear+720x480.jpg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Indian+Tradition/Ethnic+Wear+1200x800.jpg"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    },
    //12
    'DancesIntent': function() {
        speechOutput = "India is a land of unity in diversity, and our dances are no different. Different forms of dance(classified as folk or classical) find origin from different parts of the country, and they are a way of representation of the particular culture from which they originate. Eight classical dances, which are classified as Indian classical dances and find a mention in the Hindu Sanskrit text Natyashashtra, (a text of performing arts) are: Bharatnatyam from Tamil Nadu, Kathakali from Kerela, Kathak from North, West and Central India, Mohiniyattam from Kerela, Kuchipudi from Andhra Pradesh, Oddisi from Odhisa, Manipuri from Manipur, Sattriya from Assam. GoodBye";
        cardTitle = 'Indian Dances';
        cardContent = "India is a land of unity in diversity, and our dances are no different. Different forms of dance(classified as folk or classical) find origin from different parts of the country. Folk dances Bhangra - Punjab, Rasleela - Uttar Pradesh, Garba - Gujarat, Ghoomar - Rajasthan, Bihu -  Assam, Lavani - Maharashtra, Raut Nacha - Chhattisgarh.";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Indian+Tradition/Dance+Forms+720x480.jpg",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Indian+Tradition/Dance+Forms+1200x800.jpg"
        };
        
        this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);
    },
    'AMAZON.HelpIntent': function () {    
        speechOutput = "You can listen indian tradition by saying any indian tradition name or saying number from one to twelve, or, you can say stop... What can I help you with?";
        reprompt = "You can simply say a number from one to ten to listen Tradition";
        cardTitle = 'Tradition Options';
        cardContent = "You can listen to indian tradition (say 1-12), or, you can say stop... What can I help you with?";

        imageObj = {
            smallImageUrl:"https://s3-eu-west-1.amazonaws.com/akimagebucket/Indian+Tradition/Indian-Culture-And-Traditions+-+720+x+480.png",
            largeImageUrl: "https://s3-eu-west-1.amazonaws.com/akimagebucket/Indian+Tradition/Indian-Culture-And-Traditions.jpg"
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
    },
};
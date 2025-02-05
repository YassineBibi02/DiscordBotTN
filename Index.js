const { Client, GatewayIntentBits,MessageAttachment, messageLink,ActivityType  } = require('discord.js');
require('dotenv/config');
const fs = require('fs');
const path = require('path');

//nodemon to start
const cooldown = new Map(); // Mapping for time
const cooldownTime = 5000;


//parameter
let botMentioned = false;
let isReply = false;
let Awake = true;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.on('ready', async () => {
    console.log('Ready as si zibi');
    Or9ed(false);
});


client.on('messageCreate', (message) => {
    //Ignores ro7o
    if(message.author.id==='1177993953606377472' ){
        return;
    }


    const channel = message.guild.channels.cache.get(message.channelId);
    console.log('Message Recieved :[' ,message.content,"]\nFrom :",message.author.globalName , "at channel :", channel.name,"/", channel.guild.name);
    //console.log(message); // Emergency
   
   

    //Message Channel Selection 
    //if( !(message.channelId === '1178002778988216450' || message.channelId==="1178316536876904520")){ //ignore the bot's messages and chooses the Channel
    if (!Awake ){
        Message = message.content.toLowerCase();
        if (Message.includes("aaa")|| Message==="aa" || Message==="waa" ){
            Or9ed(true);
            message.reply("3leh hikka taw tfaye9 fi zibbi mil noum");
            return;
        }
        console.log("Ignored Because ena re9eeed")
        return;
    }   


    // Check if the bot is mentioned
    botMentioned = message.mentions.has(client.user);

    // Check if the message is a reply to the bot
    if (message.reference ) {
        console.log("REFERENCE:",message.reference );
        message.channel.messages.fetch(message.reference.messageId)
            .then(referencedMessage => {
                if (referencedMessage.author.id === client.user.id) {
                    isReply = true;
                } else {
                    isReply = false;
                }
            })
            .catch(error => {
                console.error("Error fetching the referenced message:", error);
            });
    } 


   
    if(Commands(message)){
        return;
    }


    let RandomnessFactor = Math.floor(Math.random() * 100);
    console.log("Random Index:" ,RandomnessFactor);

    Randomness(message,RandomnessFactor);
     // to mess with ppl and stop there if conditons are met

    Colldown(message,RandomnessFactor);
    //to give that gif when time between messages is fewer than 1 second three times


    

    //Yjaweb el 3bed linna
    processString(message)
    

    


    return;
});


//Randomly does a react
function Randomness(message, factor){
    if (factor <= 1){
        message.react("<a:5arta:1178083986396950569>");
        return true;
    }else 
    if(factor <40){
        return react(message);
    }else {
        return false;
    }
    
}

//reacts to fares or to a channel
function react (message){
     //Emoji li tnarvez batrick
     if( message.author.username ==="batrick5959" || message.channelId==="1178316536876904520"|| message.channelId==="1178002778988216450" ){  

        const setMaster = [
            ["<a:Labez:1178360553257848883>"],
            ["<a:5arta:1178083986396950569>"],
            ["<a:7achwa:1178336047441121371>"],
            ["🩲", "👬", "💋"],
            ["🇬", "🇦", "🇾", "🏳️‍🌈"],
            ["🇵", "🇪", "🇩", "🇴", "🍑"],
            ["🇹","🇷","🇦","🇳","🇸","🏳️‍⚧️"],
            ["🇳","🇮","🇬","🇪","🇷","👶🏿"],
            ["🇷","🇪","🇹","🇦","🈷️","🇩","♿"],
            ["🤓"],
            ["💀"],
            ["👀"],
            ["🤡"],
            ["💩"] 
        ];
        
        const l = setMaster.length;
        for (const emoji of setMaster[Math.floor(Math.random() * l)]) {
            message.react(emoji).catch(error => console.error('Error Reacting:', error));;
        }
 
        return true;
    }

    if( message.author.id ==="1052707196145762384"){  //clashi el mermani

            message.react("🇵");
            message.react("🇪");
            message.react("🇩");
            message.react("🇴");
            message.react("🍑");

            
         return true;
    }

    return false;   
}

//delete commands and so on
function Commands( message){
    let Message = message.content.toLowerCase();

    if (message.content.startsWith('@delete')) {
        // Extract the number following "@delete"
        const match = message.content.match(/^@delete(\d+)/);
        // If a match is found
        if (match) {
            const numberOfMessages = parseInt(match[1], 10);
            // Check if the extracted value is a valid number
            if (!isNaN(numberOfMessages) && numberOfMessages > 0) {
                // Use bulkDelete to delete the specified number of messages
                message.channel.bulkDelete(numberOfMessages+1)
                    .then(messages => console.log(`Deleted ${messages.size} messages`))
                    .catch(error => console.error('Error deleting messages:', error));
            } else {
                message.reply('Please provide a valid number for deletion.');
            }
        } else {
            message.reply('ya3tek 3asba mouch kika titekteb. 5adem mo5ej chwaya trah \n"@delete [number]" to delete messages.');
        }
        return true;
    }else
    if (Message.startsWith("@o9sef")) {

        let ismou = message.content.split(' ')[1];

        const fares = client.users.cache.find(u => u.username === ismou);
       

       const sabben = [//5
        'bay bay bay malla terma 💋',
        'tra hat bousa ya 9a7boucha',
        '3asba',
        'yaatik 3asba w se9 w stal bze9',
        'nheb nshed akel trima w nhot feha mte3i 💋',
        'aya na3tik 10 alaf w tji m3eya ?',
        '💋'
        ]

        let IndexSabben = Math.floor(Math.random() *sabben.length);

        if(fares){
            fares.send(sabben[IndexSabben]);
            console.log("Sent",sabben[IndexSabben] ,"to ", fares.displayName);
            message.channel.send("mrigel hhhh");
        }else{
            console.log(client.users.cache);
            message.channel.send("Me9itouch zab");
        }
        return true;
    } 
    return false;;
}

//Handles the acutal speaking
function processString( message) {
   
    let Message = message.content.toLowerCase();

    const Replies = [
        [ //1
            '3sa f ja3bek nshalah ya miboun',
            't9ayem f zebi mel noum aaleh aasba',
            'Ouh ne9es ken zok 3amtek enti ena taw',
            'Chbik aasba chbik?'
        ], 

        [ //2
            'nayek wahdek w zebi tahtek',
            'lweh l klem l mnayek ya tahan',
            '5rit fih ma3neha enti taw',
            'nikek b bounya l jde9 mta3 3os 3amtek nfat9ou men ba3dhou',
        ],

        [  //3
            'hay tbambi fou9 zebi',
            'tal9aha fel toilette tardha3 fih lmoula l 7anout',
            'taba3 ri7et l 7out ta tal9aha',
            'ritni pimp kol 9a7ba t9oli aaleha na3rafha win?'
        ],

        [//4
            'tkashe5 3asba 3le jde9ek?',
            'fomek l ma7loul eka shen7ot fih nammi',
            'adh7ek aasba adh7ek mli7 besh ki yet7shelek yet7shelek bel behi',
            'tadh7ek assba 9adi 9adek nadh7ek m3ak ena?'
        ],

        [//5
            'yaatik 3asba w se9 w stal bze9',
            'ya fares yna3n 3os 3amtek',
            'l hwi li tshem fih 9arwi awla bih ya miboun',
            'Aasba lik nhebou menish shensebou',
            'Ya fares nheb nshed akel trima w nhot feha mte3i'
        ],

        [//6
            "Nektlek bouk w makhalastoush?",
            "💋"
        ],

        [//7
            "9alk fama wehed mnayek barsha, faded aalekher nhar mel nharat ekhy f 3oudh mamshé kalem shabou ki rab laabed je yef9esli fihom f discord"
        ],

        [//8
            "Chbini 9adi 9adek tkalem fiya, itlam ay",
            "ti fok 3el zibbi aad ib3iiiidni",
            "lim jal8tek ya si zibbi",
            "heni bish intaffik",
            "Tfou 3le man4rek ib3idni",
            "vue",
            "💋"

        ],

        [//9
            "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGJidDVkemQ4N2xucDd6bjJsbHkzdmxwNmg0dzAxeDdkdHc5YnB3ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9JcCZRONQclnDXtKzU/giphy-downsized-large.gif",
            "https://tenor.com/view/mask-choke-prank-gif-15128976",
            "https://tenor.com/view/ghost-dick-sucking-invisible-dick-gif-15956532",
            "https://tenor.com/view/real-spidey2-gif-7949861",
            {
                content: `ilbes`,
                stickers: client.guilds.cache.get("425590857161244682").stickers.cache.filter(s => s.id === "1178360763631542344")   
           }
        ],

        [//10
            "https://tenor.com/view/blah-blah-whatever-bye-talking-kid-gif-17923976",
            "https://tenor.com/view/spongebob-spongebob-mocking-gif-15817237996465785395",
            "https://tenor.com/view/annoyed-steve-carrell-not-funny-about-to-cry-gif-13573194"
        ],

        [//11
            'yaatik 3asba w se9 w stal bze9',
            "bara nayek"
        ],

        [//12
            "Mena 9olna tlaha f jrodek aad",
            'talaha f jrodek'
        ]
            
    ]

    function CaseChoose(number, param){
        number = number -1;
        let Random = Math.floor(Math.random() *Replies[number].length);
      if(param ===1){
        message.reply(Replies[number][Random]).catch(error => console.error('Error Replying 1:', error));;
      } else {
        message.channel.send(Replies[number][Random]).catch(error => console.error('Error Writing reply:', error));;
      }
      return;
    }

    function CaseChoose1(number, param , faresParam){
        number = number -1;
        let Random = Math.floor(Math.random() *Replies[number].length);
      if(param ===1){
        message.reply(Replies[number][Random]).catch(error => console.error('Error Replying 1:', error));;
      } else {
        message.channel.send(`${faresParam}! ${Replies[number][Random]}`).catch(error => console.error('Error Writing reply:', error));
      }
      return; 
    }

    if ((Message===("ri4 mi7rez")||Message===("ri4 ya mi7rez")||Message===("or9ed ya mi7rez")||Message===("or9ed mi7rez")) && Awake) {
        message.channel.send("allahi ybarek heni bish nimchi nitmarged");
        Or9ed(false) ;

        return;
    } else

    if (Message.includes("mi7rez") || Message.includes("mihrez") ||  Message.includes("mehrez")||
         Message.includes("mehres")|| Message.includes("sidi mihrez") ||Message.includes("sidi m") || (botMentioned || isReply)
        
        ){
        CaseChoose(8,1);
    } else

    if (Message.includes("hhhhhhhhhhhhhhhhhhhhh")){
        CaseChoose(10,1);
        return;
    } else

    if (Message.includes("hhh")|| Message.includes("hah")){
        CaseChoose(4,0);
        return;
    } else

    if (Message.includes("aaaaaaaaaaaaaaaaaaaaaaaaaaaa") ){
        CaseChoose(9,1)
        return;
    } else

    if (Message.includes("aaa")|| Message==="aa" || Message==="waa" ){
        CaseChoose(1,0);
        return;
    } else

    if (Message.includes("adam")|| Message==="aadam" || Message==="adaam" ){
        message.channel.send("Chbik aasba chbiiik?");
        return;
    } else
    
    if (Message.includes("nokta belehi") ||Message.includes("ahkili nokta")  ||Message.includes("nokta")){
        CaseChoose(7,0);
        return;
    } else

    if (Message.includes("bara nayek")){
        CaseChoose(2,0);
        return;
    } else
    if (Message.includes("ya3tek 3asba")){
        CaseChoose(11,0);
        return;
    } else

    if (Message.includes("mala wabna")){
        CaseChoose(6,0);
        return;
    } else

    if (Message.includes("seb fares")){

        const fares2 = client.users.cache.find(u => u.username === "batrick5959")
        if(fares2 != undefined){
            CaseChoose1(5,0,fares2);
            console.log("1");
        }else{
            CaseChoose(5,0);  
            console.log("2");
        }
        return;
    } else

    if (Message.includes("ritchi 3amti")){
        CaseChoose(3,0);
        return;
    } else

    if (Message.includes("attack le")){
        
        const channel = client.channels.cache.get(message.channelId);

        channel.messages.fetch({ limit: 3 }).then(messages => {
            console.log(`Received ${messages.size} messages`);
            const secondMessage = Array.from(messages.values())[1];
            if(secondMessage.author.id ==="1177993953606377472"){
                message.reply("Ti barra nayek manich bish niklashi ro7i");
                return;
            }
            let ran = Math.floor(Math.floor(Math.random() *Replies[10].length));
            secondMessage.reply( Replies[10][ran] );
          })
        
        return;
    } else

    if (Message.includes("chta3mel 3amtek")||Message.includes("chta3mel amtek")) {
        CaseChoose(12,0);
        return;
    } else


    if (Message===("thumbs")) {
        message.channel.send("zazwa");
       
        return;
    } else

    if (Message.includes("israel")||Message.includes("isreal")||Message.includes("zionist")||Message.includes("sohyouni")) {
        const PicPaths = [
            "AntiIs1.jfif",
            "AntiIs2.png",
            "AntiIs3.png",
            "AntiIs4.png"
            
        ];

        let IndexImage =  Math.floor(Math.random() *PicPaths.length);


        const imagePath = path.join(__dirname,"Images/",PicPaths[IndexImage]); // Change this to the actual path of your image

        try {
            // Read the image file
            const image = fs.readFileSync(imagePath);
            // Send the image as an attachment
            message.reply({  content: "is 3absa 3le 5li9tek",files: [{ attachment: image }] });

        } catch (error) {
            console.error('Error sending image:', error);
            message.reply('ya3tiha 3asba hal israshit w khaw');
        }
        return;
    } else
   
    

    

   
    
    
    {
      //  message.channel.send('mafhimtekch nayek');
    }
    
    return ;
}

//El spam filter lol
function Colldown(message , RandomnessFactor) {

    if (cooldown.has(message.channel.id)) {
        const lastMessageTimestamp = cooldown.get(message.channel.id);
        const timeDifference = message.createdTimestamp - lastMessageTimestamp;
        
        // Check if the time difference is less than or equal to 1000 milliseconds (1 second)
        if (timeDifference <= 1000 && RandomnessFactor < 5) {
            message.channel.send("https://media.discordapp.net/attachments/785094960105127956/1008910918953996368/pedo.gif");
            return;
        }
    }
    // Update the cooldown timestamp for the channel
    cooldown.set(message.channel.id, message.createdTimestamp);
}

function Or9ed(value){
    if (value){
        client.user.setPresence({
            activities: [{ name: `3amtek`, type: ActivityType.Watching }],
            status: 'online',
        });
        console.log("Bot is now awake");
    } else {
        client.user.setPresence({
            activities: [{ name: `Dreams`, type: ActivityType.Custom , state: 'yi7lem b 3amtek 💋' }],
            status: 'dnd', // 'dnd' stands for Do Not Disturb
        });
        console.log("Bot is now sleeping");
    }
    Awake = value;
    return;
}



client.login(process.env.TOKEN);

const Discord = require('discord.js');
const Canvas = require ('canvas');
module.exports ={
    name : "tindas",
    usage : "<pilihan>\nPilihan : <>, <furry>, <tertindas>, <penindas> <tertindas>",
    description : "Mari tindas member atau musuh bersama dalam server!",
    cooldown : 1
}
module.exports.execute = async (message, args, bot) => {
    let auth = message.author.id;
    let cmdAuth = message.guild.members.find(tg => tg.user.id === auth);
    let frr=[
        'https://i.imgur.com/5gAPDI6.png',
        'https://i.imgur.com/63wFV4e.png',
        'https://i.imgur.com/AGFW3oJ.png',
        'https://i.imgur.com/GwES7CB.jpg'
    ];
    let i = Math.floor(Math.random() * frr.length)

    let memberOne, memberTwo;

    let guild = message.guild;

    if (message.mentions.members.size>2) return;

    //BIG THANKS TO IKRAMULLAH, untuk mecahin masalah dynamic target
    switch (message.mentions.members.size) {
        case 1:
            memberOne = message.author;
            function getUserFromMention(mention) {
                const matches = mention.match(/^<@!?(\d+)>$/);
                if (!matches) return;
                const id = matches[1];
                return bot.users.get(id);
            }
            memberTwo = getUserFromMention(args[0]);
            if(memberTwo.id===message.author.id) 
            return message.channel.send(`Kamu tidak bisa menindas dirimu sendiri!`).then(m=>m.delete(5000));
            break;
        case 2:
            function getUserFromMention(mention) {
                const matches = mention.match(/^<@!?(\d+)>$/);
                if (!matches) return;
                const id = matches[1];
                return bot.users.get(id);
            }
            memberOne = getUserFromMention(args[0]);
            memberTwo = getUserFromMention(args[1]);
            if(memberOne.id === message.author.id && memberTwo===message.author.id) 
            return message.channel.send(`Kamu tidak bisa menindas dirimu sendiri!`).then(m=>m.delete(5000));
            break;
        default :
            break;
    }

    const tindasE = new Discord.RichEmbed()
    .setColor ("#"+((1<<24)*Math.random()|0).toString(16));
    try{
        if(!args[0]) {
            tindasE.setTitle(`**Parahmen, ${cmdAuth.displayName} sedang menindas!**`);
            tindasE.setImage('https://i.imgur.com/Nk0ARXw.png');
            return message.channel.send(tindasE);
        }
        else {
           if(args[0]==='furry'){
                tindasE.setTitle(`**${cmdAuth.displayName} menindas Furry!**`);
                tindasE.setImage(frr[i]);
                return message.channel.send(tindasE);
            }
            else if(message.mentions.members.first()){
                let canvas = Canvas.createCanvas(512, 384);
                let ctx = canvas.getContext('2d');
                let background = await Canvas.loadImage('https://image.prntscr.com/image/7LbV8KDBSxidWBk7bx1uDQ.png');
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            
            
                let av = await Canvas.loadImage(memberOne.displayAvatarURL);
                ctx.drawImage(av, 195, 10, 100, 100);
            
                let avt = await Canvas.loadImage(memberTwo.displayAvatarURL);
                ctx.drawImage(avt, 291, 197, 100, 100);
            
                let attachment = new Discord.Attachment(canvas.toBuffer(), `test.png`);
                return message.channel.send(`**Parahmen!** ${guild.member(memberOne).displayName} sedang menindas ${guild.member(memberTwo).displayName}!`, attachment);            
            }
            else return;
        }    
    } catch (err){
        console.log(err);
        return;
    }
}
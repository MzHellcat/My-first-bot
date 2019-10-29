const Discord = require('discord.js');
module.exports ={
    name : "tindas",
    description : "Mari tindas member atau musuh bersama dalam server!",
    cooldown : 1
}
module.exports.execute = async (message, args, bot) => {
    let auth = message.author.id;
    let cmdAuth = message.guild.members.find(tg => tg.user.id === auth)
    let frr=[
        'https://i.imgur.com/5gAPDI6.png',
        'https://i.imgur.com/63wFV4e.png',
        'https://i.imgur.com/AGFW3oJ.png',
        'https://i.imgur.com/GwES7CB.jpg'
    ];
    let i = Math.floor(Math.random() * frr.length)
    const tindasE = new Discord.RichEmbed()
        .setColor ("#"+((1<<24)*Math.random()|0).toString(16));

    if(!args[0]){
        tindasE.setTitle(`**Parahmen, ${cmdAuth.displayName} sedang menindas!**`);
        tindasE.setImage('https://i.imgur.com/Nk0ARXw.png');
    }
    if(args[0]){
        if(args[0] === 'furry' ){
            tindasE.setTitle(`**${cmdAuth.displayName} menindas Furry!**`);
            tindasE.setImage(frr[i]);
        } else return;
    }
    message.channel.send(tindasE);
}
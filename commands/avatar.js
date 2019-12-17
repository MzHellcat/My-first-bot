const Discord = require('discord.js');
const {version, bName} = require('../config.json');
module.exports = {
    name : 'avatar',
    description : 'Menampilkan avatar user yang di tag atau avatar sendiri.',
    usage : '<user>',
    alias : ['pfp', 'pp', 'ava'],
    cooldown : 1,
}

module.exports.execute = async (message, args, bot) =>{
    let member = message.mentions.members.first() ||
        message.guild.members.find(member => member.user.tag === args[0]) ||
        message.guild.members.get(args[0]);

    const avatarEmbed = new Discord.RichEmbed()
        .setColor('03b1fc');

    //cek apakah argumen berisi member
    if(!member){
        //jika isinya server, menampilkan avatar server
        if(args[0]==="server"){
            avatarEmbed.setAuthor(message.guild.name, message.guild.iconURL);
            avatarEmbed.setDescription(`[Direct Link](${message.guild.iconURL})`);
            avatarEmbed.setImage(`${message.guild.iconURL}`);
        }
        //jika isinya bukan server, menampilkan avatar author 
        else{
            avatarEmbed.setAuthor(message.author.tag);
            avatarEmbed.setDescription(`[Direct Link](${message.author.displayAvatarURL})`);
            avatarEmbed.setImage(`${message.author.displayAvatarURL}`);
        }
    }
    //jika argumen pertama termasuk member, menampilkan avatar member tersebut
    if(member){
        avatarEmbed.setAuthor(member.user.tag);
        avatarEmbed.setDescription(`[Direct Link](${member.user.displayAvatarURL})`);
        avatarEmbed.setImage(`${member.user.displayAvatarURL}`);
    }
    avatarEmbed.setTimestamp();
    avatarEmbed.setFooter(`${bName} ${version}`);

    //memanggil embed
    message.channel.send(avatarEmbed)
        .catch(err => {
            console.log(err);
            message.channel.send('Ada masalah saat memproses command.');
        })
}
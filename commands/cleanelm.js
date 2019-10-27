const Discord = require ('discord.js');
const {version, bName} = require('../config.json');
module.exports={
    name : `cleanelm`,
    description : `Melepas ELM kepada member yang disebut dan secara otomatis hanya mengembalikan role Santai.`,
    usage : `<user>`,
    alias : [`unelm`, `unex`, `unexmute`],
    restriction : 'Moderator and Admin only'
}
module.exports.execute = async (message, args, bot) => {
    //PALING SULIT DIJELASKAN!!! Males ah
    const target = message.mentions.members.first() ||
        message.guild.members.get(args[0]) ||
        message.guild.members.find(member => member.user.tag === args[0]);
    const muteRole =  message.guild.roles.find(role => role.id == 505004825621168128);
    const santai = message.guild.roles.find(role => role.id == 627312787776864276);

    const muteEmbed = new Discord.RichEmbed()
        .setColor('ff0000')
        .setThumbnail(target.user.displayAvatarURL)
        .setTitle(`**${target.displayName}** telah berhasil diunmute.`);

    if(message.member.roles.find(role => role.hasPermission('KICK_MEMBERS'))){
        if(!args[0]){
            return message.reply('kamu tidak menyebutkan member yang ingin diunmute!')
                .then(m => m.delete(5000));
        }
        
        muteEmbed.setTimestamp();
        muteEmbed.setFooter(`Author ID : ${message.author.id}`, message.author.displayAvatarURL, ` | ${bName} ${version}`);
        
        if(target.roles.has(muteRole.id)){
            return;
        } else {
            target.removeRole(muteRole.id).catch(err=>{
            console.log(err);
            message.channel.send('Terdapat kesulitan saat berusaha unmute member tersebut');
            })
            target.addRole(santai.id);
        }

        message.channel.send(muteEmbed).catch(err => {
            console.log(err);
            message.channel.send('Terdapat kesulitan saat berusahan unmute member tersebut!');
        })
    }
}
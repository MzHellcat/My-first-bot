const Discord = require ('discord.js');
const {version, bName} = require('../config.json');
module.exports={
    name : `unmute`,
    description : `Unmute member yang disebutkan`,
    usage : `<user>`,
    alias : [`unbisu`],
    restriction : 'Moderator and Admin only'
}
module.exports.execute = async (message, args, bot) => {
    const target = message.mentions.members.first() ||
        message.guild.members.get(args[0]) ||
        message.guild.members.find(member => member.user.tag === args[0]);
    const muteRole =  message.guild.roles.find(role => role.id == your mute role id here);
    const muteEmbed = new Discord.RichEmbed()
        .setColor('00aeff')
        .setThumbnail(target.user.displayAvatarURL)
        .setTitle(`**${target.displayName}** telah berhasil dimute.`)
        .addField(`Staff eksekutor :`, message.author.tag)
        .setTimestamp()
        .setFooter(`Author ID : ${message.author.id}`, message.author.displayAvatarURL, ` | ${bName} ${version}`);

    if(message.member.roles.find(role => role.hasPermission('KICK_MEMBERS'))){
        if(!args[0]){
            return;
        }
        if(target.id === message.author.id){
                return;
            }
                    
        if(target.roles.has(muteRole.id)){
            target.removeRole(muteRole.id);    
            return message.channel.send(muteEmbed).catch(err => {
                console.log(err);
                message.channel.send('Terdapat kesulitan saat berusahan unmute member tersebut!');
            });
        } else return;
    }
}
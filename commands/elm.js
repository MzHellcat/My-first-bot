const Discord = require ('discord.js');
const {version, bName} = require('../config.json');
module.exports={
    name : `elm`,
    description : `ELM (Extreme Level Mute) member yang disebutkan. Oleh karena itu, sebaiknya staff tidak mematikan DM dari bot ini agar list role lain yang tercabut tidak hilang`,
    usage : `<user> <alasan>`,
    alias : [`lem`, `extmute`, `exmute`],
    restriction : 'Moderator and Admin only'
}
module.exports.execute = async (message, args, bot) => {
    const target = message.mentions.members.first() ||
        message.guild.members.get(args[0]) ||
        message.guild.members.find(member => member.user.tag === args[0]);
    const muteRole =  message.guild.roles.find(role => role.id == extreme mute role id here);
    const muteEmbed = new Discord.RichEmbed()
        .setColor('ff0000')
        .setThumbnail(target.user.displayAvatarURL)
        .setTitle(`**${target.displayName}** telah berhasil dimute.`);
    const report = new Discord.RichEmbed()
        .setColor('0025f7')
        .setTitle(`Member tersebut memiliki role :`);

    if(message.member.roles.find(role => role.hasPermission('KICK_MEMBERS'))){
        if(!target.roles.find(role => role.hasPermission('KICK_MEMBERS'))){
            if(!args[0]){
                return message.reply('kamu tidak menyebutkan member yang ingin dimute!')
                    .then(m => m.delete(5000));
            }
            if(target.id === message.author.id){
                return message.reply('kamu tidak dapat mute diri kamu sendiri!')
                    .then (m => m.delete(5000));
            }
            
            if(!args[1]){
                muteEmbed.setDescription(`Alasan : -`);
            } else {
                muteEmbed.setDescription(`Alasan : ${args.slice(1).join(" ")}`);
            }
            muteEmbed.addField(`Staff eksekutor :`, message.author.tag);
            muteEmbed.setTimestamp();
            muteEmbed.setFooter(`Author ID : ${message.author.id}`, message.author.displayAvatarURL, ` | ${bName} ${version}`);
            
            if(target.roles.has(muteRole.id)){
                return message.channel.send(`**${target.displayName}** sudah dimute!`)
            } else {
                target.addRole(muteRole.id).catch(err=>{
                    console.log(err);
                    message.channel.send('Terdapat kesulitan saat berusaha mute member tersebut');
                })
                message.author.send(report).catch(err => {
                    console.log(err);
                });
            }

            message.channel.send(muteEmbed).catch(err => {
                console.log(err);
                message.channel.send('Terdapat kesulitan saat berusahan mute member tersebut!');
            })
        } else message.reply(`Anda tidak bisa mute sesama staff!`);
    }
}
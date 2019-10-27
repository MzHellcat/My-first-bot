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
    const muteRole =  message.guild.roles.find(role => role.id == 505004825621168128);
    const santai = message.guild.roles.find(role => role.id == 627312787776864276);
    const donatur = message.guild.roles.find(role => role.id == 438335830726017025);
    const hnt = message.guild.roles.find(role => role.id == 360232451525574668);
    const giveaways = message.guild.roles.find(role => role.id == 473869471183011860);

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
                if(target.roles.has(santai.id)) {
                    target.removeRole(santai.id);
                } 
                if(target.roles.has(donatur.id)) {
                    target.removeRole(donatur.id);
                    report.addField(`${donatur.name}`,'\u200b');
                }
                if(target.roles.has(hnt.id)) {
                    target.removeRole(hnt.id);
                    report.addField(`${hnt.name}`,'\u200b');
                }
                if(target.roles.has(giveaways.id)) {
                    target.removeRole(giveaways.id);
                    report.addField(`${giveaways.name}`,'\u200b');
                }
             
                report.addField(`**Harap kembalikan role tersebut kepada member yang bersangkutan setelah melepas ELM!**`,'\u200b');

                message.author.send(report).catch(err => {
                    console.log(err);
                });
                target.addRole(muteRole.id).catch(err=>{
                    console.log(err);
                    message.channel.send('Terdapat kesulitan saat berusaha mute member tersebut');
                })
            }

            message.channel.send(muteEmbed).catch(err => {
                console.log(err);
                message.channel.send('Terdapat kesulitan saat berusahan mute member tersebut!');
            })
        } else message.reply(`Anda tidak bisa mute sesama staff!`);
    }
}
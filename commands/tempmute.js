const Discord = require('discord.js');
const {version, bName} = require('../config.json');
const ms = require('ms');
module.exports ={
    name : 'tempmute',
    description : 'Mute member yang disebutkan dengan jangka waktu tertentu.\n**NOTE** : Jangan pernah terbalik meletakkan **JANGKA WAKTU** dan **ALASAN**, atau member yang disebut **tidak akan diunmute otomatis!**',
    usage : '<user> <alasan>',
    alias : ['tmute'],
    restriction : 'Moderator and Admin only'
}
module.exports.execute = async (message, args, bot) => {
    const target = message.mentions.members.first() ||
        message.guild.members.get(args[0]) ||
        message.guild.members.find(member => member.user.tag === args[0]);
    const muteRole =  message.guild.roles.find(role => role.id == 430378151651049486);
    const filter = m => m.author.id === message.author.id;
    const muteEmbed = new Discord.RichEmbed()
        .setColor('00aeff')
        .setThumbnail(target.user.displayAvatarURL)
        .setTitle(`**${target.displayName}** telah berhasil dimute.`)

    const reMute = new Discord.RichEmbed()
        .setColor('00aeff')
        .setThumbnail(target.user.displayAvatarURL)
        .setTitle(`**${target.displayName}** telah diunmute!`)            
        .setTimestamp()
        .setFooter(`Author ID : ${message.author.id}`, message.author.displayAvatarURL, ` | ${bName} ${version}`)

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
                muteEmbed.addField(`Alasan : -`);

            } else {
                muteEmbed.addField(`Alasan : `, args.slice(1).join(" "))
            }

            message.reply(`Berapa lama jangka waktunya?`);
            message.channel.awaitMessages(filter, {
                max : 1,
                time : 7000
            })
            .then(async collected => {
                let waktu = collected.first().content;
                muteEmbed.addField(`Jangka waktu mute :`, waktu)
                muteEmbed.addField(`Staff eksekutor :`, message.author.tag)          
                muteEmbed.setTimestamp()
                muteEmbed.setFooter(`Author ID : ${message.author.id}`, message.author.displayAvatarURL, ` | ${bName} ${version}`)
    
                if(target.roles.has(muteRole.id)){
                    return message.channel.send(`${target.displayName} sudah dimute!`)
                } else {        
                        message.channel.send(muteEmbed).catch(err => {
                        console.log(err);
                        message.channel.send('Terdapat kesulitan saat berusahan mute member tersebut!');
                    })
                    target.addRole(muteRole.id).catch(err=>{
                    console.log(err);
                    message.channel.send('Terdapat kesulitan saat berusaha mute member tersebut');
                    })
                    setTimeout(function(){
                        target.removeRole(muteRole.id);
                        message.channel.send(reMute).catch(err => {
                            console.log(err);
                        })
                    }, ms(waktu));
                }
            })
        } else message.reply(`Anda tidak bisa mute sesama staff!`);
    }
}
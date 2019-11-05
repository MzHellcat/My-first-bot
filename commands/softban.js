const Discord = require('discord.js');
const {version, bName} = require('../config.json');
module.exports = {
    name : 'softban',
    description : 'Softban user yang telah ditentukan.',
    usage : '<user> <alasan>',
    alias : ['softhammer', 'sban'],
    restriction : 'Moderator and Admin only'
}

module.exports.execute = async (message, args, bot) => {
    const target = message.mentions.members.first() ||
        message.guild.members.get(args[0]) ||
        message.guild.members.find(member => member.user.tag === args[0])
    const banned = new Discord.RichEmbed() 
        .setColor('#ff2424')
        .setThumbnail(target.user.displayAvatarURL)
        .setTitle(`**${target.displayName}** telah berhasil di-softban.`) 
    const filter = m => m.author.id === message.author.id;
    
    if(message.member.roles.find(role => role.hasPermission('BAN_MEMBERS'))) {
        if(!args[0]){
            return message.reply('kamu tidak menyebutkan member yang ingin di-softban!')
            .then( m => m.delete(5000));
        }
    
        if(target.id === message.author.id){
            return message.reply('kamu tidak dapat melakukan softban kepada diri kamu sendiri!')
            .then( m => m.delete(5000));
        }
    
        if(!args[1]){
            banned.setDescription(`Alasan : -`);
        } else {
            banned.setDescription (`Alasan : ${args.slice(1).join(" ")}`);
        }
        banned.addField(`Staff eksekutor :`, message.author.tag);
        banned.setTimestamp();
        banned.setFooter(`Author ID : ${message.author.id}`, message.author.displayAvatarURL,` | ${bName} ${version}`);

        message.reply(`Apakah kamu ingin softban **${target.user.username}** dari ${message.guild.name}?\nKetik \`confirm\` untuk mengeksekusi proses softban!`).then(m => m.delete(7000));
        message.channel.awaitMessages(filter, {
            max : 1,
            time : 7000
        }).then(async collected => {
            if(collected.first() == 'confirm'){
                await target.send(`Kamu telah di-softban dari ${message.guild.name} karena ${args.slice(1).join(" ")}\nTetapi kamu masih bisa join kembali ke server kapanpun kamu mau.`)
                .catch(err =>{
                    console.log(err);
                    message.guild.ban(target, {days : 7, reason : `${args.slice(1).join(" ")}`})
                    .then(() => message.guild.unban(target.id))
                    .catch(err => {
                        console.log(err);
                    });

                    message.channel.send(banned)
                    .catch(error => {
                        console.log(error);
                        message.channel.send(`Terdapat kesulitan saat berusahan melakukan tindakan softban kepada member tersebut!`);
                    })
                message.author.dmChannel.send(`Sepertinya **${target.user.username}** telah mematikan fitur DM`);
                })                
                message.guild.ban(target, {days : 7, reason : `${args.slice(1).join(" ")}`})
                    .then(() => message.guild.unban(target.id))
                    .catch(err => {
                        console.log(err);
                    });

                message.channel.send(banned).catch(error => {
                console.log(error);
                message.channel.send(`Terdapat kesulitan saat berusahan melakukan tindakan softban kepada member tersebut!`);
                })
            } else {
                return message.channel.send(`**${message.guild.member(message.author).displayName}** telah membatalkan command.`);
            }
        }).catch (err =>{
            console.log(err);
            message.channel.send(`**${message.guild.member(message.author).displayName}** telah membatalkan command.`);
        })
    } else return;
}
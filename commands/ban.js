const Discord = require('discord.js');
const {version, bName} = require('../config.json');
module.exports = {
    name : 'ban',
    description : 'Ban user yang telah ditentukan.',
    usage : '<user> <alasan>',
    alias : ['banhammer', 'blacklist'],
    restriction : 'Moderator and Admin only'
}

module.exports.execute = async (message, args, bot) => {
    const target = message.mentions.members.first() ||
        message.guild.members.get(args[0]) ||
        message.guild.members.find(member => member.user.tag === args[0])

    const banned = new Discord.RichEmbed() 
        .setColor('#ff2424')
        .setThumbnail(target.user.displayAvatarURL)
        .setTitle(`**${target.displayName}** telah berhasil diban.`);
    const filter = m => m.author.id === message.author.id;
    
    if(message.member.roles.find(role => role.hasPermission('BAN_MEMBERS'))) {
        if(!args[0]){
            return message.reply('kamu tidak menyebutkan member yang ingin diban!')
            .then( m => m.delete(5000));
        }
        
        if(target.id === message.author.id){
            return message.reply('kamu tidak dapat melakukan ban kepada diri kamu sendiri!')
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

        message.reply(`Apakah kamu ingin ban **${target.user.username}** dari ${message.guild.name}?\nKetik \`confirm\` untuk mengeksekusi proses ban!`).then(m => m.delete(7000));
        message.channel.awaitMessages(filter, {
            max : 1,
            time : 7000
        }).then(async collected => {
            if(collected.first() == 'confirm'){
                await target.send(`Kamu telah diban dari ${message.guild.name} karena ${args.slice(1).join(" ")}`)
                .catch(err =>{
                    console.log(err);
                    message.guild.ban(target);

                    message.channel.send(banned)
                    .catch(error => {
                        console.log(error);
                        message.channel.send(`Terdapat kesulitan saat berusahan melakukan tindakan ban kepada member tersebut!`);
                    })
                    message.author.send(`Sepertinya **${target.user.username}** telah mematikan fitur DM`);
                })              
                message.guild.ban(target);

                message.channel.send(banned)
                .catch(error => {
                    console.log(error);
                    message.channel.send(`Terdapat kesulitan saat berusahan melakukan tindakan ban kepada member tersebut!`);
                })
            } 
            else {
                return message.channel.send(`**${message.guild.member(message.author).displayName}** telah membatalkan command.`);
            }
        })
        .catch (err =>{
            console.log(err);
            message.channel.send(`**${message.guild.member(message.author).displayName}** telah membatalkan command.`);
        })
    } else return;
}
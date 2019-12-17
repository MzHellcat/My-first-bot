const Discord = require('discord.js');
const {version, bName} = require('../config.json');
module.exports = {
    name : 'kick',
    description : 'Kick user yang telah ditentukan.',
    usage : '<user> <alasan>',
    alias : ['tendang'],
    restriction : 'Moderator and Admin only'
}

module.exports.execute = async (message, args, bot) => {
    const target = message.mentions.members.first() ||
        message.guild.members.get(args[0]) ||
        message.guild.members.find(member => member.user.tag === args[0]);
    const attach = [
        'https://media.giphy.com/media/eLw5pXMEJUjtxiAbfn/source.gif',
        'https://media.giphy.com/media/WmurdDqWy41uRzYaOY/source.gif',
        'https://media.giphy.com/media/gFPUyBl9RU9OFrYmVJ/source.gif'
    ]
    let i = Math.floor(Math.random() * attach.length);
    const tendang = new Discord.RichEmbed()
        .setColor('#fcca03')
        .setThumbnail(target.user.displayAvatarURL)
        .setTitle(`**${target.displayName}** telah berhasil dikick.`,)
    const filter = m => m.author.id === message.author.id;

    if(message.member.roles.find(role => role.hasPermission('KICK_MEMBERS'))) {
        if(!args[0]){
            return message.reply('kamu tidak menyebutkan member yang ingin dikick!')
            .then (m =>m.delete(5000));
        }
    
        if(target.id === message.author.id){
            return message.reply('kamu tidak dapat melakukan kick diri kamu sendiri!')
            .then(m => m.delete(5000));
        }
        
        if(!args[1]){
            tendang.setDescription(`Alasan : -`);
        } else {
            tendang.setDescription (`Alasan : ${args.slice(1).join(" ")}`);
        }
        tendang.addField(`Staff eksekutor :`, message.author.tag);
        tendang.setTimestamp();
        tendang.setImage(attach[i]);
        tendang.setFooter(`Author ID : ${message.author.id}`, message.author.displayAvatarURL,` | ${bName} ${version}`);

        message.reply(`Apakah kamu ingin kick **${target.user.username}** dari ${message.guild.name}?\nKetik \`confirm\` untuk mengeksekusi proses kick!`).then(m => m.delete(7000));
        message.channel.awaitMessages(filter, {
            max : 1,
            time : 7000
        })
        .then(async collected => {
            if(collected.first() == 'confirm'){
                await target.send(`Kamu telah dikick dari ${message.guild.name} karena ${args.slice(1).join(" ")}`)
                .catch(err =>{
                    console.log(err);

                    target.kick(args.slice(1).join(" "));

                    message.channel.send(tendang).then(m => m.delete()).catch(error => {
                        console.log(error);
                        message.channel.send(`Terdapat kesulitan saat berusahan kick member tersebut!`);
                    })
                    message.author.send(`Sepertinya **${target.user.username}** telah mematikan fitur DM`);
                })
                target.kick(args.slice(1).join(" "));

                message.channel.send(tendang)
                .catch(error => {
                    console.log(error);
                    message.channel.send(`Terdapat kesulitan saat berusahan kick member tersebut!`);
                })
            } else {
                return message.channel.send(`**${message.guild.member(message.author).displayName}** telah membatalkan command.`);
            }
        })
        .catch (err =>{
            console.log(err);
            message.channel.send(`**${message.guild.member(message.author).displayName}** telah membatalkan command.`);
        })
    } else return;
}
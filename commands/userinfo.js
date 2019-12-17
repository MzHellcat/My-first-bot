const Discord = require ('discord.js');
const {version, bName} = require('../config.json');
module.exports = {
    name : 'userinfo',
    description : 'Menampilkan info dari user yang disebut',
    alias : ['ufo'],
    restriction : 'Moderator and Admin only'
}

module.exports.execute = async (message, args, bot) => {
    const member = message.mentions.members.first() ||
        message.guild.members.find(member => member.user.tag === args[0]) ||
        message.guild.members.get(args[0]) ||
        message.guild.members.get(message.author.id);
    function cek(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
    };

    const ufoembed = new Discord.RichEmbed()
        .setColor('00c284')
        .setAuthor(member.user.tag, member.user.displayAvatarURL)
        .setThumbnail(member.user.displayAvatarURL)
        .addField('Username', member.user.username)
        .addField('User ID', member.id)
        .addField('Role yang dimiliki', member.roles.map(r =>`${r}`).join(', '))
        .addField('Tanggal akun dibuat', `${member.user.createdAt.toUTCString()} (${cek(member.user.createdAt)})`)
        .addField(`Tanggal bergabung ke ${message.guild.name}`, `${member.joinedAt.toUTCString()} (${cek(member.joinedAt)})`)
        .setTimestamp()
        .setFooter(`${bName} ${version}`)

    if(message.member.roles.find(role => role.hasPermission('KICK_MEMBERS'))){
        message.channel.send(ufoembed).catch(err => {
            console.log(err);
        })
    } else return;
}

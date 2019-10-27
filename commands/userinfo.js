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
        message.guild.members.find(member => member.user.tag === args) ||
        message.guild.members.get(args[0]) ||
        message.guild.members.get(message.author.id);
    function cek(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
    };
    const rls = member.roles.map(role => `<@&${role.id}>`)
    const userRole = new Map()
    let count = 0
    for (let i = 0; i < rls.length; i++) {
        if (i % 0) count++
        if (userRole.has(count)) userRole.get(count).push(rls[i])
        else {
        userRole.set(count, [])
        userRole.get(count).push(rls[i])
        }
    }
    // console.log(rolearr)
    // userRole.forEach(r => {
    //   ufoembed.addField('\u200B', r.join(' | '))
    // })
    const ufoembed = new Discord.RichEmbed()
        .setColor('00c284')
        .setAuthor(member.user.tag, member.user.displayAvatarURL)
        .addField('Username', member.user.username)
        .addField('User ID', member.id)
        userRole.forEach(r => {
            ufoembed.addField('Role yang dimiliki', r.join(', '))
        })
        ufoembed.addField('Tanggal akun dibuat', `${member.user.createdAt.toUTCString()} (${cek(member.user.createdAt)})`)
        ufoembed.addField(`Tanggal bergabung ke ${message.guild.name}`, `${member.joinedAt.toUTCString()} (${cek(member.joinedAt)})`)
        ufoembed.setTimestamp()
        ufoembed.setFooter(`${bName} ${version}`)

    if(message.member.roles.find(role => role.hasPermission('KICK_MEMBERS'))){
        message.channel.send(ufoembed).catch(err => {
            console.log(err);
        })
    } else return;

}
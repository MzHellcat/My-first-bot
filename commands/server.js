const Discord = require('discord.js');
const {version, bName} = require('../config.json');
module.exports = {
    name : 'serverinfo',
    description : 'Menampilkan info Server',
    alias : ['servo']
}

module.exports.execute = async (message, args, bot) => {

    function cek(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
    };
    let verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
    let region = {
        "brazil": ":flag_br: Brazil",
        "eu-central": ":flag_eu: Central Europe",
        "singapore": ":flag_sg: Singapore",
        "us-central": ":flag_us: U.S. Central",
        "sydney": ":flag_au: Sydney",
        "us-east": ":flag_us: U.S. East",
        "us-south": ":flag_us: U.S. South",
        "us-west": ":flag_us: U.S. West",
        "eu-west": ":flag_eu: Western Europe",
        "vip-us-east": ":flag_us: VIP U.S. East",
        "london": ":flag_gb: London",
        "amsterdam": ":flag_nl: Amsterdam",
        "hongkong": ":flag_hk: Hong Kong",
        "russia": ":flag_ru: Russia",
        "southafrica": ":flag_za:  South Africa"
    };

    const sinfo = new Discord.RichEmbed()
        .setColor('00c284')
        .setAuthor(message.guild.name, message.guild.iconURL)
        .setThumbnail(message.guild.iconURL)
        .addField("Nama server", message.guild.name)
        .addField("Server ID", message.guild.id, true)
        .addField("Region", region[message.guild.region], true)
        .addField("Level Verifikasi", verifLevels[message.guild.verificationLevel])
        .addField("Jumlah Channel", message.guild.channels.size, true)
        .addField("Jumlah Role", message.guild.roles.size, true)
        .addField("Tanggal server dibuat", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${cek(message.channel.guild.createdAt)})`)
        .setTimestamp()
        .setFooter(`${bName} ${version}`)
    
        if(message.member.roles.find(role => role.hasPermission('KICK_MEMBERS'))) {
            message.channel.send(sinfo)
        } else return;
}
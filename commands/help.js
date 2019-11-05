const Discord = require('discord.js');
const {prefix, version, bName} = require('../config.json');
module.exports ={
    name : 'help',
    description : 'List dan info command yang dimiliki oleh bot ini.',
    alias : ['commands','tulung'],
    cooldown : 1
}

module.exports.execute = async (message, args, bot)=>{
    const {commands} = message.client;
    const helpEmbed = new Discord.RichEmbed()
        .setColor("#"+((1<<24)*Math.random()|0).toString(16))
        .setAuthor(`${bot.user.username}`, bot.user.displayAvatarURL)

    if(!args.length){
        helpEmbed.setTitle(`Daftar command yang dapat digunakan :`);
        helpEmbed.addField(`Moderasi :`, '\`mute\`, \`unmute\`, \`tempmute\`, \`elm\`, \`cleanelm\`, \`kick\`, \`ban\`, \`softban\`');
        helpEmbed.addField(`Utility :`, '\`prune\`, \`role\`, \`serverinfo\`, \`userinfo\`, \`ping\`');
        helpEmbed.addField(`Just for Fun :`, '\`avatar\`, \`say\`, \`tindas\`');
        helpEmbed.addField(`Kamu dapat mengirim \`${prefix}help <command>\` untuk mendapatkan informasi dari command yang spesfik!`,`Contoh : \`s.help tulung\``);
        helpEmbed.setTimestamp();
        helpEmbed.setFooter(`${bName} ${version}`);

        return message.channel.send(helpEmbed);
    }

    const name = args[0].toLowerCase();
    const command = commands.get(name) || commands.find(c => c.alias && c.alias.includes(name));

    if(!command){
        return message.reply(`\`${args[0]}\` tidak termasuk kedalam daftar command!`);
    }

    helpEmbed.setTitle(`**Nama :**`);
    helpEmbed.setDescription(`${command.name}`);

    if (command.alias) helpEmbed.addField(`**Alias :**`, `${command.alias.join(', ')}`);
    if (command.description) helpEmbed.addField(`**Deskripsi :**`,`${command.description}`);
    if (command.restriction) helpEmbed.addField(`**Role Restriction :**`,`${command.restriction}`);
    if (command.usage) helpEmbed.addField(`**Penggunaan :**`,`${prefix}${command.name} ${command.usage} `);

    helpEmbed.addField(`**Cooldown :**`,`${command.cooldown || 0} detik`);
    
    helpEmbed.setTimestamp();
    helpEmbed.setFooter(`${bName} ${version}`);

    message.channel.send(helpEmbed);
}

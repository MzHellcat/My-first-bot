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
        .setColor('#3dfc03')
        .setAuthor(`${bot.user.username}`, bot.user.displayAvatarURL)

    //kalo author tidak memberikan argumen lain, maka bot akan mengirim DM daftar command
    if(!args.length){
        helpEmbed.setTitle(`Daftar command yang dapat digunakan :`);
        //helpEmbed.setDescription(commands.map(command => command.name).join('\n'));  //ye olde command list, but automatic
        //new command list, but manual
        helpEmbed.addField(`Free for All :`, '\`avatar\`, \`serverinfo\`, \`help\`, \`say\`');
        helpEmbed.addField(`Moderasi :`, '\`userinfo\`, \`mute\`, \`unmute\`, \`tempmute\`, \`elm\`, \`cleanelm\`, \`kick\`, \`ban\`, \`softban\`, \`prune\`, \`role\`');
        helpEmbed.addField(`Kamu dapat mengirim \`${prefix}help <command>\` untuk mendapatkan informasi dari command yang spesfik!`,`Contoh : \`!help tulung\``);
        helpEmbed.setTimestamp();
        helpEmbed.setFooter(`${bName} ${version}`);

        return message.author.send(helpEmbed)
            .then(() => {
                message.reply(`Cek DM untuk melihat daftar command!`);
            })
            .catch(error =>{console.error(`Tidak dapat mengirim pesan melalui DM kepada ${message.author.tag}.\n`, error);
                message.reply(`Tampaknya saya tidak bisa mengirim pesan via DM kepadamu. Apakah kamu menonaktifkan fitur DM?`);  
            });
    }

    //kalau author memberikan argumen
    const name = args[0].toLowerCase();
    const command = commands.get(name) || commands.find(c => c.alias && c.alias.includes(name));

    //pengecekan apakah argumen tsb termasuk command
    if(!command){
        return message.reply(`\`${args[0]}\` tidak termasuk kedalam daftar command!`);
    }

    //embed
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

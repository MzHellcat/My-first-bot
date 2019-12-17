const Discord = require ('discord.js');
const {version, bName} = require('../config.json');
module.exports={
    name : `mute`,
    description : `Mute member yang disebutkan`,
    usage : `<user> <alasan>`,
    alias : [`bisu`],
    restriction : 'Moderator and Admin only'
}
module.exports.execute = async (message, args, bot) => {
    const target = message.mentions.members.first() ||
        message.guild.members.get(args[0]) ||
        message.guild.members.find(member => member.user.tag === args[0]);
    const muteRole =  message.guild.roles.id('652395918846590987')||
        message.guild.roles.find(`name`, "Muted");
    if(!muteRole) {
        try{
            muterole = await message.guild.createRole({
                name : "Muted",
                color : '#000000',
                permissions : []
            });
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermission(muterole, {
                    SEND_MESSAGES : false,
                    ADD_REACTIONS : false
                });
            });
        }
        catch {
            message.channel.send("Gagal membuat role Mute");
        }
    }
    const muteEmbed = new Discord.RichEmbed()
        .setColor('00aeff')
        .setThumbnail(target.user.displayAvatarURL)
        .setTitle(`**${target.displayName}** telah berhasil dimute.`);

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
                return message.channel.send(`${target.displayName} sudah dimute!`)
            } else target.addRole(muteRole.id).catch(err=>{
                console.log(err);
                message.channel.send('Terdapat kesulitan saat berusaha mute member tersebut');
            });

            message.channel.send(muteEmbed).catch(err => {
                console.log(err);
                message.channel.send('Terdapat kesulitan saat berusahan mute member tersebut!');
            })
        } else message.reply(`Anda tidak bisa mute sesama staff!`);
    }
}
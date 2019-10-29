const Discord = require('discord.js');
module.exports ={
    name : 'ping',
    usage : '<ping>'
}
module.exports.execute = async (message, args, bot) => {
    const msg = await message.channel.send(`Tunggu sebentar`).then(m => m.delete());
    const pingE = new Discord.RichEmbed()
        .setColor("#"+((1<<24)*Math.random()|0).toString(16))
        .setAuthor(bot.user.username, bot.user.displayAvatarURL)
        .setTitle('Ping!')
        .addField(`Latency :`, `${Math.floor(msg.createdAt - message.createdAt)}ms`)
        .addField(`API :`, `${Math.round(bot.ping)}ms`);
    message.channel.send(pingE);
}
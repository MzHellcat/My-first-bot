const Discord = require('discord.js');
module.exports ={
    name : 'reload',
    restriction : 'Bot Owner only'
}
module.exports.execute = async (message, args, bot) => {
    if(message.author.id == "433993894422904853") {
        if(!args[0]) return message.channel.send("Sebutkan command yang ingin di reload")

        let commandName = args[0].toLowerCase()
    
        try{
            delete require.cache[require.resolve(`./${commandName}.js`)]
            bot.commands.delete(commandName);
            const pull = require(`./${commandName}.js`);
            bot.commands.set(commandName, pull);
        } catch (err){
            console.log(err);
            return message.channel.send(`Tidak bisa mereload \`${args[0].toLowerCase()}\``);
        }
    
        message.channel.send(`Command \`${args[0].toLowerCase()}\` berhasil di reload!`);    
    } else return;
}
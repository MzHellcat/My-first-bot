const Discord = require('discord.js');
module.exports ={
    name : 'shutdown',
    restriction : 'Bot Owner only'
}
module.exports.execute = async (message, args, bot) => {
    if(message.author.id == "433993894422904853") {
        try{
            await message.channel.send("Shutting down bot...")
            process.exit()
        } catch(err){
            message.channel.send(`ERROR : ${e.message}`);
        }    
    } else return;
}
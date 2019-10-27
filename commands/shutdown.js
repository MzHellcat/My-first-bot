const Discord = require('discord.js');
module.exports ={
    name : 'shutdown',
    restriction : 'Bot Owner only'
}
module.exports.execute = async (message, args, bot) => {
    if(message.author.id == "masukkan id owner bot disini") {
        try{
            await message.channel.send("Shutting down bot...")
            process.exit()
        } catch(err){
            message.channel.send(`ERROR : ${e.message}`);
        }    
    } else return;
}
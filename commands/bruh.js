const Discord = require('discord.js');

module.exports = (message) => {
    const image = new Discord.Attachment('https://image.prntscr.com/image/Nl8Vy5fySfSf8FQ8CvIfog.jpg');
    if(message.content.toLocaleLowerCase()==='bruh')
        message.channel.send(image);
    if(message.content.toLowerCase()=== 'takbir!')
        message.channel.send(`ALLAHUAKBAR!`);
}
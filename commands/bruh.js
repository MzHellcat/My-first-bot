const Discord = require('discord.js');

module.exports = (message) => {
    const bruh = new Discord.Attachment('https://image.prntscr.com/image/Nl8Vy5fySfSf8FQ8CvIfog.jpg');
    const hoes = new Discord.Attachment('https://media.giphy.com/media/lTYdI4CFKITn0Ctjuz/source.gif');
    const wow = new Discord.Attachment('https://cdn.discordapp.com/attachments/447408276628307969/645502497603059722/giphy-1.gif');
    const resing = [
        'https://cdn.discordapp.com/attachments/447408276628307969/516183615613173782/images_57.jpeg',
        'https://cdn.discordapp.com/attachments/447408276628307969/551807281042292737/JPEG_20180513_104431-picsay.jpg',
    ];
    const resingC = [
        'Motor sangar gahar bang Kharis',
        'Riki Haryanto'
    ];
    let i = Math.floor(Math.random() * resing.length);
    
    if(message.content.toLowerCase()==='bruh')
        message.channel.send(bruh);
    if(message.content.toLowerCase()=== 'takbir!')
        message.channel.send(`ALLAHUAKBAR!`);
    if(message.content.toLowerCase()=== 'hoes mad')
        message.channel.send(hoes);
    if(message.content.toLowerCase()=== 'ngeeng')
        message.channel.send(`${resingC[i]}`, {files:[`${resing[i]}`]});
    if(message.content.toLowerCase()==='wow')
        message.channel.send(wow);
}
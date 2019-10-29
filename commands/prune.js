module.exports = {
    name : 'prune',
    description : 'Meneghapus beberapa pesan sekaligus',
    alias : ['clear'],
    usage : '<jumlah pesan>',
    cooldown : 2,
    restriction : 'Moderator and Admin only'
}

module.exports.execute = async (message, args, bot)=>{
    const amount = parseInt(args[0]);
    if(message.member.roles.find(role => role.hasPermission('MANAGE_MESSAGES'))) {
        if(isNaN(amount)){
            return message.reply('angka tidak valid!');
        } else if (amount<2 || amount>100){
            return message.reply('input angka diantara 2 dan 100!.');
        }
        else {
            message.channel.bulkDelete(amount+1, true).then(m => m.delete(3000))
            await message.channel.send(`Sukses menghapus sebanyak ${amount} pesan!`).then(m => m.delete(3000))
            .catch(err => {
            //+1 agar command prune juga terhapus
            console.error(err);
            message.channel.send('Error pak');
        });}
    } else return;
}
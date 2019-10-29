const Discord = require('discord.js');
const {version, bName} = require('../config.json');
module.exports = {
    name : 'ban',
    description : 'Ban user yang telah ditentukan.',
    usage : '<user> <alasan>',
    alias : ['banhammer', 'blacklist'],
    restriction : 'Moderator and Admin only'
}

module.exports.execute = async (message, args, bot) => {
    //declare apa itu target
    const target = message.mentions.members.first() ||
        message.guild.members.get(args[0]) ||
        message.guild.members.find(member => member.user.tag === args[0])

    //declare embed
    const banned = new Discord.RichEmbed() 
        .setColor('#ff2424')
        .setThumbnail(target.user.displayAvatarURL)
        .setTitle(`**${target.displayName}** telah berhasil diban.`);
    //declare filter untuk confirm nanti
    const filter = m => m.author.id === message.author.id;
    
    //cek apakah author memiliki permission untuk ban member
    //jika iya, maka eksekusi perintah dibawahnya
    //jika tidak, maka akan mereturn perintah kosong/tidak ada
    if(message.member.roles.find(role => role.hasPermission('BAN_MEMBERS'))) {
        //jika tidak ada argumen member, maka return tidak menyebutkan member
        if(!args[0]){
            return message.reply('kamu tidak menyebutkan member yang ingin diban!')
            .then( m => m.delete(5000));
        }
        
        //jika argumen pertama adalah target, cek apakah id target adalah id author
        //jika iya, maka keluarkan pesan tidak dapat memban diri sendiri
        if(target.id === message.author.id){
            return message.reply('kamu tidak dapat melakukan ban kepada diri kamu sendiri!')
            .then( m => m.delete(5000));
        }
        
        //cek apakah memiliki argumen setelah argumen pertama(args[0])
        //jika tidak terdapat argumen selanjutnya (args[1]), maka set deskripsi ke "-"
        //jika terdapat args[1], set deskripsi berupa alasan ke args[1] dan selanjutnya dengan join " "
        if(!args[1]){
            banned.setDescription(`Alasan : -`);
        } else {
            banned.setDescription (`Alasan : ${args.slice(1).join(" ")}`);
        }
        banned.addField(`Staff eksekutor :`, message.author.tag);
        banned.setTimestamp();
        banned.setFooter(`Author ID : ${message.author.id}`, message.author.displayAvatarURL,` | ${bName} ${version}`);

        //membuat reply kepada author dan menanyakan konfirmasi dari author
        message.reply(`Apakah kamu ingin ban **${target.username}** dari ${message.guild.name}?\nKetik \`confirm\` untuk mengeksekusi proses ban!`).then(m => m.delete(7000));
        //membuat instruksi awaitMessages untuk menunggu pesan berupa konfirmasi dari author
        //filter digunakan untuk memastikan hanya menanggapi balasan dari author dengan timeout selama 7 detik
        message.channel.awaitMessages(filter, {
            max : 1,
            time : 7000
        }).then(async collected => {
            //cek apakah balasan author adalah confirm
            //jika iya, maka eksekusi instruksi didalamnya
            if(collected.first().content === 'confirm'){
                //mengirim DM kepada target bahwa target sudah diban
                //menggunakan await agar memastikan bahwa target mendapatkan DM terlebih dahulu
                await target.send(`Kamu telah diban dari ${message.guild.name} karena ${args.slice(1).join(" ")}`)
                .catch(err =>{
                    console.log(err);
                    //jika gagal, target akan tetap diban karena apabila gagal mengirim DM
                    //bot tidak memban member dan menghentikan proses ban
                    //oleh karena itu, walaupun error mengirim DM kepada target, diberikan instruksi yang sama apabila 
                    //bot dapat memban member
                    message.guild.ban(target);

                    //memanggil embed banned
                    message.channel.send(banned)
                    .catch(error => {
                        console.log(error);
                        message.channel.send(`Terdapat kesulitan saat berusahan melakukan tindakan ban kepada member tersebut!`);
                    })
                    message.author.send(`Sepertinya **${target.username}** telah mematikan fitur DM`);
                })              
                message.guiild.ban(target);

                message.channel.send(banned)
                .catch(error => {
                    console.log(error);
                    message.channel.send(`Terdapat kesulitan saat berusahan melakukan tindakan ban kepada member tersebut!`);
                })
            } 
            //jika pesan dari author bukan confirm, keluarkan pesan bahwa author telah membatalkan command
            else {
                return message.channel.send(`**${message.author.member.displayName}** telah membatalkan command.`);
            }
        })
        //jika timeout, keluarkan pesan bahwa author telah membatalkan command
        .catch (err =>{
            console.log(err);
            message.channel.send(`**${message.member.displayName}** telah membatalkan command.`);
        })
    } else return;
}
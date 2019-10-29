const Discord = require('discord.js');

//prefix dan token
const {prefix, token} = require('./config.json');
const bot = new Discord.Client();

//array dari koleksi cooldown
const cooldowns = new Discord.Collection();

//changing status? why not!
require("./handler")(bot)

//dynamic command handling
const fs = require('fs');

//membuat koleksi command untuk dynamic command handling
bot.commands = new Discord.Collection();

//mengambil nama command secara dinamis dengan menyaring file yang berekstensi .js
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//loop untuk mengisi array koleksi bot.commands
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

bot.on('message', message => {
    require("./commands/bruh")(message)
    //filter command dan cek apakah command diakses dari DM
    if(message.isMentioned(bot.user)) {
        let filter = m => m.author.id === message.author.id;
        
        message.reply(`ada yang perlu saya bantu?`);
        message.channel.awaitMessages(filter, {
            max :1,
            time : 10000
        })
        .then(async collected => {
            if(!collected.size){
                message.channel.send(`Tidak ada? Baiklah kalau begitu.`);
            } else message.reply(`Ngomong kok ke bot.`);
        })
        .catch (err => {
            message.channel.send(`Tidak ada? Baiklah kalau begitu.`);
        })
    }

    if(!message.content.startsWith(prefix) || message.author.bot || message.channel.type === "dm") return;
    
    //pembagian argumen menjadi array
    const args = message.content.slice(prefix.length).split(/ +/);

    //deklarasi commandName sekaligus mengubah menjadi lowercase
    const commandName = args.shift().toLowerCase();

    //definisikan command via alias
    let command = bot.commands.get(commandName) || bot.commands.find(cmd=> cmd.alias && cmd.alias.includes(commandName));

    //kalau bukan termasuk command maka akan mengembalikan null
    if(!command) return;

    //args-info check
    if(command.args && !args.length){
        return message.channel.send(`Kamu tidak memberikan argumen apapun ${message.author}`)
    }

    //definisikan cooldown
    if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 0) * 1000;

    if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`Tolong tunggu ${timeLeft.toFixed(1)} detik agar dapat menggunakan command \`${command.name}\` kembali.`);
        }
    }

    //timestamp
    timestamps.set(message.author.id, now); 

    //timeout
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount); 

    //eksekusi command secara dinamis
    try{
        command.execute (message, args, bot);
    } catch (error){
        console.error(error);
        message.reply('ada sedikit masalah dalam mencoba memproses command tersebut.')
    }

});

bot.login(token);

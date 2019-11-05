const Discord = require('discord.js');
const {prefix, token} = require('./config.json');
const bot = new Discord.Client();
const fs = require('fs');
bot.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

require('./handler')(bot);

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

bot.on(`message`, message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    require('./commands/bruh.js')(message);

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    let command = bot.commands.get(commandName) || bot.commands.find(cmd=> cmd.alias && cmd.alias.includes(commandName));
    if(!command) return;
    if(!message.content.startsWith(prefix)) return;

    if(!cooldowns.has(command.name)){
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 0) * 1000;

    if(timestamps.has(message.author.id)){
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if(now<expirationTime){
            const timeLeft = (expirationTime - now)/1000;
            return message.reply(`Tolong tunggu ${timeLeft.toFixed(1)} detik agar dapat menggunakan command \`${command.name}\` kembali.`);
        }
    }
    timestamps.set(message.author.id, now);
    setTimeout(()=>{
        timestamps.delete(message.author.id), cooldownAmount
    })

    try{
        command.execute(message, args, bot);
    } catch {
        return;
    }
})

bot.login(token);
module.exports={
    name : 'role',
    description : 'Menambahkan/mencopot role dari seseorang',
    usage : '<add/remove> <user> <role>',
    restriction : 'Moderator and Admin only'
}

module.exports.execute = async (message, args, bot) => {
    if(message.member.roles.find(role => role.hasPermission('MANAGE_ROLES'))){
        if(args[0] === 'add'){
            let member = message.mentions.members.first() || 
                message.guild.members.find(member => member.user.tag === args[1]) || 
                message.guild.members.get(args[1]);
            let role = message.guild.roles.find(role => role.name == args[2]) || 
                message.guild.roles.find(role => role.id == args[2]) || 
                message.mentions.roles.first();
    
            //sanity check
            if(!member) return message.reply(`sebutkan dengan jelas member yang ingin diberikan role.`);
            if(!role) return message.reply(`sebutkan secara spesifik role yang ingin dicabut!`);
    
            if(member.roles.has(role.id)){
                return message.channel.send(`${member.displayName} sudah memiliki role ${role}!`)
            }
            member.addRole(role.id).catch(error => console.log(error.message));
            message.channel.send(`**${member.displayName}** mendapatkan role **${role.name}**!`);

        } else if (args[0] === 'remove'){
            let member = message.mentions.members.first() || 
                message.guild.members.find(member => member.user.tag === args[1]) || 
                message.guild.members.get(args[1]);
            let role = message.guild.roles.find(role => role.name == args[2]) || 
                message.guild.roles.find(role => role.id == args[2]) ||
                message.mentions.roles.first();
            
            //sanity check
            if(!member) return message.reply(`sebutkan dengan jelas member yang ingin dicabut rolenya.`);
            if(!role) return message.reply(`sebutkan secara spesifik role yang ingin dicabut!`);
    
            if(!member.roles.has(role.id)){
                return message.channel.send(`${member.displayName} tidak memiliki role ${role.name}!`)
            }
            member.removeRole(role.id).catch(error => console.log(error.message));
            message.channel.send(`Role **${role.name}** telah dicabut dari **${member.displayName}**`);
        } else return message.reply(`sebutkan perintah role yang diinginkan (add/remove)!`);
    } else return;
}
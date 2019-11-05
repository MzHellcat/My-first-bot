const Discord = require("discord.js");
const {prefix} = require('../config.json');

module.exports = bot => {
    console.log(`${bot.user.username} is online`)

    let activity = [
        `${prefix}help`,
        `menyamar`,
        `merendam kursi`,
        `${prefix}help`,
        `minum cokelat panas`
    ]

    setInterval(() => {
        let activities = activity[Math.floor(Math.random() * activity.length)];
        bot.user.setActivity(activities, {type: "PLAYING"});

    }, 10000)

}
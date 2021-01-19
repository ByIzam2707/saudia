const { token } = require("./config.json")
const fs = require("fs")
const discord = require("discord.js")
const Bot = new discord.Client();

Bot.commands = new discord.Collection();



Bot.on("ready", ()=> {
    console.log("Ready")
    Bot.user.setActivity("watching over Saudia")
    fs.readdir('./commands', (err, files) => {
        if(err) return console.log(err);
        let jsfile = files.filter(f => f.split(".").pop() == 'js');
             
        if(jsfile.length == 0) {return console.log("There was nothing to find")}
        jsfile.forEach(f => {
            let props = require(`./commands/${f}`);
            Bot.commands.set(props.help.name , props)
        })
    })
})

Bot.on('message', (message) => {
    if(message.author.bot) return;
    if(message.channel.type !== 'text') return;
    let prefix = 's!';
    let MessageArray = message.content.split(' ');
    let cmd = MessageArray[0].slice(prefix.length)
    let args = MessageArray.slice(1)
    if(!message.content.startsWith(prefix)) return;

    let commandfile = Bot.commands.get(cmd);
    if(commandfile) {commandfile.run(Bot, message, args)}
})


Bot.login(token)
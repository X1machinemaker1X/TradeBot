exports.run = async (bot, msg, args) => {
  if (msg.author.id !== bot.settings.ownerID) return;
  const code = args.join(' ')
  try {
    const evaled = eval(code)
    const clean = await bot.clean(bot, evaled);
    await msg.channel.send(`${clean}`, {code: "js", split: true})
  } catch (err) {
    msg.channel.send(`\`ERROR\` \`\`\`xl\n${await bot.clean(bot, err)}\n\`\`\``, {split: true}).catch(err => {
      bot.logger.error("Cant send the error message")
      bot.logger.error(err)
    })
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: ["Owner"]
}

exports.help = {
  name: "eval",
  category: "System",
  description: "Evaluates JavaScript code",
  usage: "eval [...code]"
}

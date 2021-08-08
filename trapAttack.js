function createChatMessage(message) {
  let chatData = {
    user: game.user.id,
    content: message,
  }
  ChatMessage.create(chatData, {})
}

game.togglePause(true, true)
game.playlists.find(p => p.name == "Test").playAll()
LMRTFYRoller.requestSavingThrows(token.actor, "dex")
if (!token) {
  return createChatMessage("TrapMacro: No token selected.")
}

let trapActor = game.actors.contents.find(a => a.name === args[0])
if (!trapActor) {
  return createChatMessage(`TrapMacro: Target token ${args[0]} not found`)
}

let item = trapActor.items.find(i => i.name === args[1])
if (!item) {
  return createChatMessage(`TrapMacro: Item ${args[1]} not found`)
}

let trapToken = canvas.tokens.placeables.find(t => t.name === args[2])
if (!trapToken) {
  return createChatMessage(`TrapMacro: Trap ${args[2]} not found`)
}

let damage = (await item.rollDamage({ event: { shiftKey: true } })).total
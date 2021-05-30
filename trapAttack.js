game.togglePause(true, true)
LMRTFYRoller.requestSavingThrows(token.actor, "dex")
let trapActor = game.actors.entities.find(a => a.name === args[0])
if (!trapActor) return `/Whisper GM "DoTrap: Target token ${args[0]} not found"`
let item = trapActor.items.find(i => i.name === args[1])
if (!item) return `/Whisper GM "DoTrap: Item ${args[1]} not found"`
let trapToken = canvas.tokens.placeables.find(t => t.name === args[2])
if (!trapToken) return `/Whisper GM "DoTrap: Trap ${args[2]} not found"`
let damage = (await item.rollDamage({ event: { shiftKey: true } })).total
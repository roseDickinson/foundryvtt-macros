let colour = args[1]
let distance = args[2]

// Add aura
if (args[0] === "on") {
  token.data.flags["token-auras"].aura1 = {
    colour,
    distance,
    opacity: 0.5,
    square: false,
  }
}
// Remove aura
if (args[0] === "off") {
  token.data.flags["token-auras"].aura1 = {
    colour: null,
    distance: null,
    opacity: 0.5,
    square: false,
  }
}
token.drawAuras()

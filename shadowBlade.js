//DAE Item Macro Execute, Effect Value = @attributes.spelldc

const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);
const DAEItem = lastArg.efData.flags.dae.itemData

/**
 * Create Shadow Blade item in inventory
 */
if (args[0] === "on") {
  const sl = args[1]
  console.log("lastArg", lastArg)
  let startRound = game.combats.combats[0].current.round
  lastArg.efData.duration.rounds = 10
  lastArg.efData.duration.seconds = null
  lastArg.efData.duration.startTime = null
  lastArg.efData.duration.startRound = startRound
  lastArg.efData.disabled = true
  let damage = 5
  if (sl === "2") {
    damage = 2
  } else if (sl === "3" || sl === "4") {
    damage = 3
  } else if (sl === "5" || sl === "6") {
    damage = 4
  }
  tactor.createOwnedItem(
    {
      "name": "Shadow Blade repeating",
      "type": "weapon",
      "data": {
        "source": "Casting Shadow Blade",
        "ability": "dex",
        "actionType": "mwak",
        "attackBonus": 0,
        "equipped": true,
        "proficient": true,
        "weaponType": "simpleM",
        "damage": {
          "parts": [
            [
              `${damage}d10 + @mod`,
              "psychic"
            ]
          ],
        },
        "formula": "",
        "preparation": {
          "mode": "prepared",
          "prepared": false
        },
      },
      "img": DAEItem.img,
    }
  );
}

console.log("SHADOW BLADE - ", args[0])

// Delete Shadow Blade
if (args[0] === "off") {
  let casterItem = tactor.data.items.find(i => i.name === "Shadow Blade repeating" && i.type === "weapon")
  tactor.deleteOwnedItem(casterItem._id)
}
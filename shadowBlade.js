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
  let damage = 5
  if (sl == "2" || sl == 2) {
    damage = 2
  } else if (sl == "3" || sl == 3 || sl == "4" || sl == 4) {
    damage = 3
  } else if (sl == "5" || sl == 5 || sl == "6" || sl == 6) {
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
  ui.notifications.notify("Weapon created in your inventory")
}


// Delete Shadow Blade
if (args[0] === "off") {
  let casterItem = tactor.data.items.find(i => i.name === "Shadow Blade repeating" && i.type === "weapon")
  tactor.deleteOwnedItem(casterItem._id)
}
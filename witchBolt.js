//DAE Item Macro Execute, Effect Value = @attributes.spelldc

const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);
const DAEItem = lastArg.efData.flags.dae.itemData

/**
 * Create Witch Bolt item in inventory
 */
if (args[0] === "on") {
  const sl = args[1]
  let damage = sl
  tactor.createEmbeddedDocuments("Item",
    [{
      "name": "Witch Bolt repeating",
      "type": "weapon",
      "data": {
        "source": "Casting Witch Bolt",
        "actionType": "other",
        "equipped": true,
        "proficient": true,
        "weaponType": "simpleR",
        "damage": {
          "parts": [
            [
              `${damage}d12`,
              "lightning"
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
    }]
  );
  ui.notifications.notify("Weapon created in your inventory")
}


// Delete Witch Bolt
if (args[0] === "off") {
  let casterItem = tactor.data.items.find(i => i.name === "Witch Bolt repeating" && i.type === "weapon")
  if (casterItem) await casterItem.delete();
}
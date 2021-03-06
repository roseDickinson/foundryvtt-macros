//DAE Item Macro Execute, value = @item.level
// Set spell to self cast, no damage/attack roll
const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);
const target = canvas.tokens.get(lastArg.tokenId) || token;

const castingItem = lastArg.efData.flags.dae.itemData
let data = {}
let activeScene = game.scenes.active

/**
 * Create Spiritual Weapon item in inventory and token in active scene
 */
if (args[0] === "on") {
  let damage = Math.floor(Math.floor(args[1] / 2));
  let image = castingItem.img;

  let weaponActor = game.actors.contents.find(a => a.name === "SpiritualWeaponToken")
  let weaponToken = weaponActor.data.token
  let gridSize = activeScene.data.grid
  let createdTokens = await activeScene.createEmbeddedDocuments('Token', [weaponToken])
  createdTokens[0].update({
    "x": target.x + gridSize || 0,
    "y": target.y || 0
  })

  await tactor.createEmbeddedDocuments("Item",
    [{
      "name": "Summoned Spiritual Weapon",
      "type": "weapon",
      "data": {
        "equipped": true,
        "identified": true,
        "activation": {
          "type": "bonus",
        },
        "target": {
          "value": 1,
          "width": null,
          "type": "creature"
        },
        "range": {
          "value": 5,
          "units": "ft"
        },
        "ability": args[2],
        "actionType": "msak",
        "attackBonus": "0",
        "chatFlavor": "",
        "critical": null,
        "damage": {
          "parts": [
            [
              `${damage}d8+@mod`,
              "force"
            ]
          ],
        },
        "weaponType": "simpleM",
        "proficient": true
      },
      "flags": {
        "DAESRD": {
          "SpiritualWeapon":
            target.actor.id
        }
      },
      "img": `${image}`,
    }]
  );
  ui.notifications.notify("Weapon created in your inventory")
}

// Delete Spitirual Weapon and template
if (args[0] === "off") {
  let removeItem = tactor.items.find(i => i.data.flags?.DAESRD?.SpiritualWeapon === tactor.id)
  if (removeItem) await removeItem.delete();
  let weaponToken = activeScene.data.tokens.find(t => t.name === "SpiritualWeaponToken")
  activeScene.deleteEmbeddedDocuments("Token", [weaponToken.id])
}
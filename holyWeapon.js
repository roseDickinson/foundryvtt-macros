//DAE Item Macro Execute, Effect Value = @attributes.spelldc

const lastArg = args[args.length - 1];
let tactor;
if (lastArg.tokenId) tactor = canvas.tokens.get(lastArg.tokenId).actor;
else tactor = game.actors.get(lastArg.actorId);
const DAEItem = lastArg.efData.flags.dae.itemData

/**
 * Create Holy Weapon item in inventory
 */
if (args[0] === "on") {
    tactor.createOwnedItem(
        {
            "name": "Holy Weapon Damage",
            "type": "weapon",
            "data": {
                "source": "Casting Holy Weapon",
                "actionType": "other",
                "equipped": true,
                "proficient": true,
                "weaponType": "simpleM",
                "damage": {
                    "parts": [
                        [
                            `2d8`,
                            "radiant"
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

// Delete Holy Weapon 
if (args[0] === "off") {
    let casterItem = tactor.data.items.find(i => i.name === "Holy Weapon Damage" && i.type === "weapon")
    tactor.deleteOwnedItem(casterItem._id)
}
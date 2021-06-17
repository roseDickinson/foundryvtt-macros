
if (args[0] === "on") {
  const sl = args[1]

  const table = game.tables.entities.find(t => t.name === "Chaos Bolt Damage Type");

  let roll1 = await table.roll()
  let roll2 = await table.roll()

  let result1 = roll1.results[0].data;
  let result2 = roll2.results[0].data;

  let damageType1 = result1.text;
  let damageType2 = result2.text;

  let damage1 = result1.range[0];
  let damage2 = result2.range[0];

  function printMessage(type, xtraDmg) {
    let rollagain = damage1 === damage2 ? '<br/><strong>Bzzzt! Chaos Bolt jumps to another target, pick one and roll again.</strong>' : ''
    let xtraDmgTerms = xtraDmg.terms[0].results
    let xtraDmgCalc = ''
    for (let [index, term] of xtraDmgTerms.entries()) {
      if (index === xtraDmgTerms.length - 1) {
        xtraDmgCalc += `${term.result}`
      } else {
        xtraDmgCalc += `${term.result} + `
      }
    }
    let message = `<h2> Chaos Bolt </h2><br/><p>1d8(${damage1}) + 1d8(${damage2}) + ${xtraDmg._formula}(${xtraDmgCalc}) = </p></br><h3>${damage1 + damage2 + xtraDmg.total} ${type} damage</h3>${rollagain}`;
    let chatData = {
      user: game.user._id,
      content: message,
    }
    ChatMessage.create(chatData, {})
  }

  function castAtLevel(lvl) {
    let simpleDamage = new Roll(`${lvl}d6`).evaluate();
    new Dialog({
      title: 'Choose your damage type',
      content: `Deal ${damageType1} or ${damageType2} damage?`,
      buttons: {
        damageType1: {
          label: damageType1,
          callback: () => { printMessage(damageType1, simpleDamage) }
        },
        damageType2: {
          label: damageType2,
          callback: () => { printMessage(damageType2, simpleDamage) }
        }
      }
    }).render(true)

  }

  castAtLevel(sl)
}


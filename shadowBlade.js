function castAtLevel(lvl) {
  let damage = new Roll(`${lvl}d8`).evaluate();
  let dmgTerms = damage.terms[0].results
  let dmgCalc = ''
  for (let [index, term] of dmgTerms.entries()) {
    if (index === dmgTerms.length - 1) {
      dmgCalc += `${term.result}`
    } else {
      dmgCalc += `${term.result} + `
    }
  }
  let message = `<h2> Shadow Blade </h2><br/><p>${lvl}d8(${dmgCalc}) = </p></br><h3>${damage.total} psychic damage</h3>`;
  let chatData = {
    user: game.user._id,
    content: message,
  }
  ChatMessage.create(chatData, {})
}

new Dialog({
  title: 'What level spell was used to create the blade?',
  buttons: {
    two: {
      label: 'two',
      callback: () => {
        castAtLevel(2)
      }
    },
    threeFour: {
      label: 'three or four',
      callback: () => {
        castAtLevel(3)
      }
    },
    fiveSix: {
      label: 'five or six',
      callback: () => {
        castAtLevel(4)
      }
    },
    sevenUp: {
      label: 'seven or higher',
      callback: () => {
        castAtLevel(5)
      }
    },
  }
}).render(true)
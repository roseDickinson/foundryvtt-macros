function createRaceObject(masc, fem, andro, last) {
  return {masc,fem,andro,last}
}

const nameByRace = {
  Human: createRaceObject("mascHumanNames", "femHumanNames", "androHumanNames", "lastHumanNames"),
  Loxodon: createRaceObject("mascLoxodonNames", "femLoxodonNames", null, null),
  Tiefling: createRaceObject("mascTieflingNames", "femTieflingNames", "androTieflingNames", null),
  Vedalken: createRaceObject("mascVedalkenNames", "femVedalkenNames", "androVedalkenNames", null),
}
nameByRace.Aasimar = nameByRace.Human

async function getTableResult(tableName) {
  let table = game.tables.entities.find(t => t.name === tableName)
  let roll = await table.roll()
  return roll.results[0].data.text 
}

async function generateName(race, gender) {
  let nameTables = nameByRace[race]
  let table = ""
  if (gender.includes(" woman")) {
    table = "fem"
  } else if (gender.includes(" man")) {
    table = "masc"
  } else {
    if (tableNames.andro) {
      table = "andro"
    } else {
      let nameRoll = await new Roll("1d2").roll()
      if(nameRoll._total === 2) {
        table = "fem"
      } else {
        table = "masc"
      }
    }
  }
 
  let firstName = ""
  if (nameTables[table]) {
    firstName = await getTableResult(nameTables[table])
  } else {
    firstName = `Table for ${race} ${gender} not found`
  }

  let lastName = ""
  if (nameTables.last) {
    lastName = await getTableResult(nameTables.last)
  }

  return `${firstName} ${lastName}`
}

async function generatePerson(location) {
  let gender = await getTableResult("GenderIdentity")
  let sexuality = await getTableResult("Sexuality")
  let race = await getTableResult(`${location}Race`)
  let name = await generateName(race, gender)

  let message = `
  <h2> ${name} </h2>
  <p>
    Race - <strong>${race}</strong><br/>
    Gender - <strong>${gender}</strong><br/>
    Sexuality - <strong>${sexuality}</strong><br/>
  </p>
  `
  let chatData = {
    user: game.user._id,
    content: message,
    whisper: [game.user._id]
  }
  ChatMessage.create(chatData, {})
}


let locations = ["Aurwald", "Generic"]
  
let buttons = {}

for (const l of locations) {
  buttons[l] = {
    label: l,
    callback: () => generatePerson(l)
  }
}

new Dialog({
  title: "What location to generate person for?",
  buttons,
}).render(true)

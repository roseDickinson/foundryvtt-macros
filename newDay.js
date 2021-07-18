
async function calculateWeather(tables) {
  let generalTable = game.tables.entities.find(t => t.name === tables.general);
  let precipitationTable = game.tables.entities.find(t => t.name === tables.precipitation);
  let windTable = game.tables.entities.find(t => t.name === tables.wind);

  let generalRoll = await generalTable.roll()
  let generalResult = generalRoll.results[0].data.text
  let precipitationResult = null

  if (
    generalResult === 'Rain' ||
    generalResult === 'Thunderstorm' ||
    generalResult === 'Snow'
  ) {
    let precipitationRoll = await precipitationTable.roll()
    precipitationResult = precipitationRoll.results[0].data.text
  }

  let windRoll = await windTable.roll()
  let windResult = windRoll.results[0].data.text

  if (!precipitationResult) {
    precipitationResult = "N/A"
  }

  let message = `<h2> Weather for the new day </h2><br/><p>General - <strong>${generalResult}</strong></p><br/><p>Precipitation level - <strong>${precipitationResult}</strong></p><br/><p>Wind speed - <strong>${windResult}</strong></p><br/><p><strong>Don't forget to move the day forward scrub</strong></p>`
  let chatData = {
    user: game.user._id,
    content: message,
  }
  ChatMessage.create(chatData, {})
}

let weatherTables = {
  Autumn: {
    general: "General Weather - Autumn",
    precipitation: "Precipitation - Autumn",
    wind: "Wind - Autumn",
  },
  "Extreme Summer (Desert)": {
    general: "General Weather - Extreme Summer (Desert)",
    precipitation: "Precipitation - Extreme Summer (Desert)",
    wind: "Wind - Extreme Summer (Desert)",
  },
  "Extreme Winter (North/Ice plain)": {
    general: "General Weather - Extreme Winter (North/Ice plain)",
    precipitation: "Precipitation - Extreme Winter (North/Ice plain)",
    wind: "Wind - Extreme Winter (North/Ice plain)",
  },
  Spring: {
    general: "General Weather - Spring",
    precipitation: "Precipitation - Spring",
    wind: "Wind - Spring",
  },
  Summer: {
    general: "General Weather - Summer",
    precipitation: "Precipitation - Summer",
    wind: "Wind - Summer",
  },
  Winter: {
    general: "General Weather - Winter",
    precipitation: "Precipitation - Winter",
    wind: "Wind - Winter",
  }
}

let buttons = {}

for (const key in weatherTables) {
  buttons[key] = {
    label: key,
    callback: () => calculateWeather(weatherTables[key])
  }
}

new Dialog({
  title: 'What is the season/location?',
  buttons,
}).render(true)
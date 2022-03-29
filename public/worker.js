self.onmessage = function (message) {
  const type = message.data.type.toLowerCase()
  if (type === 'init') {
    init(message.data.data)
  }
}

const init = data => {
  const root = `https://database.deta.sh/v1/${data.DETA_ID}/${data.DETA_NAME}/`
  fetch(`${root}query`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-API-Key': data.DETA_KEY
    }
  }).then(response => {
    if (response.ok) {
      return response.json()
    }
    else {
      returnError(response)
    }
  }).then(json => {
    json.items.sort((a, b) => {
      if (a.cat > b.cat) return 1
      if (a.cat < b.cat) return -1
      if (!('sub' in a)) return -1
      if (!('sub' in b)) return 1
      if (a.sub > b.sub) return 1
      if (a.sub < b.sub) return -1
      return 0
    })
    json.categories = []
    const icons = {
      'Amanides': 'fa-solid fa-carrot',
      'Aperitius': 'fa-solid fa-bowl-food',
      'Arrossos': 'fa-solid fa-bowl-rice',
      'Carn': 'fa-solid fa-drumstick-bite',
      'Conserves': 'fa-solid fa-jar',
      'Digestius': 'fa-solid fa-bottle-droplet',
      'Entrants': 'fa-solid fa-egg',
      'Llegums': 'fa-solid fa-cloud-meatball',
      'Pa': 'fa-solid fa-wheat-awn',
      'Pasta': 'fa-solid fa-plate-wheat',
      'Peix': 'fa-solid fa-fish-fins',
      'Postres': 'fa-solid fa-cake-candles',
      'Salses': 'fa-solid fa-blender',
      'Vegetarià': 'fa-solid fa-apple-whole'
    }
    json.items.forEach(item => {
      item.isFiltered = false
      if (!json.categories.find(cat => cat.name === item.cat)) {
        json.categories.push({
          key: json.categories.length,
          name: item.cat,
          subs: [],
          icon: item.cat in icons ? icons[item.cat] : 'print',
          isSelected: false
        })
      }
      item.key = parseInt(item.key)
      item.ing = item.ing.map((ing, index) => {
        return {
          key: index,
          name: capitalize(ing[0]),
          description: ing[1] ? capitalize(ing[1]) : ing[1],
          done: false
        }
      })
      item.stp = item.stp.map((stp, index) => {
        return {
          key: index,
          description: capitalize(stp),
          done: false
        }
      })
      if ('sub' in item) {
        const current = json.categories[json.categories.length - 1]
        if (!current.subs.includes(item.sub)) current.subs.push(item.sub)
      }
    })
    self.postMessage({
      type: 'init',
      data: json
    })
  })
}


const capitalize = str => {
  return str[0].toUpperCase() + str.substring(1)
}

const returnError = error => {
  self.postMessage({
    type: 'error',
    data: error
  })
}

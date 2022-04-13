let DETA_ID, DETA_KEY, DETA_NAME

self.onmessage = function (message) {
  const type = message.data.type.toLowerCase()
  if (type === 'init') {
    init(message.data.data)
  }
  if (type === 'login') {
    login(message.data.data)
  }
}

const login = data => {
  const rootUsers = `https://database.deta.sh/v1/${DETA_ID}/users/`
  fetch(`${rootUsers}items/${data.username}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-API-Key': DETA_KEY
    }
  }).then(response => {
    if (response.ok) {
      return response.json()
    }
    else {
      response.json().then(r => {
        if (!Object.keys(r).includes('username')) {
          self.postMessage({
            type: 'login',
            data: { error: true }
          })
        }
      })
    }
  }).then(json => {
    if (json) {
      sha256(data.password).then(hash => {
        let answer = {
          type: 'login',
          data: { error: true }
        }
        if (json.password === hash) {
          answer.data.error = false
        }
        self.postMessage(answer)
      })
    }
  })
}

let users = []

const init = data => {
  DETA_ID = data.DETA_ID
  DETA_KEY = data.DETA_KEY
  DETA_NAME = data.DETA_NAME
  loadRecipes(data)
}


const loadRecipes = data => {
  const root = `https://database.deta.sh/v1/${DETA_ID}/${DETA_NAME}/`
  fetch(`${root}query`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-API-Key': DETA_KEY
    }
  }).then(response => {
    if (response.ok) {
      return response.json()
    }
    else {
      response.json().then(r => {
        console.log(r)
        returnError(r)
      })
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


async function sha256 (message) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message)
  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  // convert bytes to hex string
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}


const capitalize = str => {
  return str[0].toUpperCase() + str.substring(1)
}


const returnError = error => {
  console.log(error)
  self.postMessage({
    type: 'error',
    data: error
  })
}

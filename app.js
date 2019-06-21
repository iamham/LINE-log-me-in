const express = require('express')
const path = require('path')
const qs = require('querystring')
const axios = require('axios')

const serverSecret = 'assignment'

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

const generateLINEURL = () => {

  const LINEData = {
    response_type: 'code',
    client_id: '1590448222',
    redirect_uri: 'http://line.hiaham.com/callback',
    state: serverSecret,
    scope: 'profile'
  }
  return 'https://access.line.me/oauth2/v2.1/authorize?' + qs.encode(LINEData)
}

const getProfileFromLINE = (code) => {
  const url = 'https://api.line.me/oauth2/v2.1/token'
  const option = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: 'http://line.hiaham.com/callback',
      client_id: '1590448222',
      client_secret: '264314ba82d87dc4986c920185a5e5d5'
    }),
    url
  }

  axios(option)
  .then((res) => {
    console.log(`statusCode: ${res.statusCode}`)
    return res.data
  })
  .catch((error) => {
    console.error(error, 'ERROR !')
    return error
  })
}

// Route
app.get('/', (req, res, next) => {
  const LINELogin = generateLINEURL()
  res.render('index', {
    title: 'Log me in - LINE',
    LINELogin: LINELogin
  })
})

app.get('/callback', (req, res, next) => {
  if (req.query.error) {
    res.render('index', {
      title: 'Log me in - LINE',
    })
  }

  if (req.query.state !== serverSecret) res.render('index', {
    title: 'Log me in - LINE',
  })

  const profile = getProfileFromLINE(req.query.code)
  res.render('index', {
    title: 'Profile - LINE',
    data: JSON.stringify(profile)
  })
})

module.exports = app

const express = require('express')

const ip = require('ip')
const app = express()
const PORT = 80

app.set('PORT', PORT)
app.get('/', (request, response) => response.send('Hello World!'))
app.post('/api/v1/auth', (request, response) => {
    let { username, password } = request.query

    if (username === 'dlsadmin' && password === 'prueba123') return response.status(200).send({ message: 'Bienvenido!!!', token: 'ABC-LONG-TOKEN' })

    return response.status(401).send({ message: 'Credenciales Invalidas !!!' })
})

app.listen(PORT, () =>
    console.log(
        `\n=============================================================\n` +
            `Express app listening on port http://${ip.address()}:${PORT} !` +
            `\n=============================================================\n`,
    ),
)

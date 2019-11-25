const express = require('express')

const ip = require('ip')
const app = express()
const PORT = 80
/* ================================== */

app.set('PORT', PORT)
app.get('/', (request, response) => response.send('Hello World!'))
app.post('/api/v1/auth', (request, response) => {
    let { username, password } = request.query
    console.table(request.query)
    if (username === 'admin' && password === 'prueba123') return response.status(200).send({ message: 'Bienvenido!!!', token: 'ABC-LONG-TOKEN' })

    return response.status(401).send({ message: 'Credenciales Invalidas !!!' })
})
app.get('/api/v1/appointments', (request, response) => {
    //let {  } = request.query

    return response.json({
        '2019-05-18': [{ name: 'Cita en Mariano' }, { name: 'Cita en Mariano 2' }, { name: 'Cita en Mariano 3' }, { name: 'Cita en Mariano 4' }],
        '2019-05-20': [{ name: 'Cita en ASUncion' }, { name: 'Cita en ASU 2' }, { name: 'Cita en ASU 3' }, { name: 'Cita en ASU 4' }],
        '2019-05-15': [{ name: 'Cita en DLS Tech' }, { name: 'Cita en DLS 2' }, { name: 'Cita en DLS 3' }, { name: 'Cita en DLS 4' }],
    })
})

/* ================================== */

app.listen(PORT, () =>
    console.log(
        `\n=============================================================\n` +
        `Express app listening on port http://${ip.address()}:${PORT} !` +
        `\n=============================================================\n`,
    ),
)

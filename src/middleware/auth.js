const jwt = require('jsonwebtoken')

async function auth(req, res, next) {
    const token = req.header('access-token')
    if (!token) return res.status(401).json({ //401-Not Authorized
        msg: 'Acesso negado. É obrigatório o envio do token JWT'
    })
    try {
        const decoded = jwt.verify(token, eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjQ0MGFmOTM0ODc0Mzk3NTJiMjc4ZmEiLCJpYXQiOjE3MTU3MzUyODksImV4cCI6MTcxNTczODg4OX0.t4H1hDvBmoKhJv7ZDhLRxg_US9bBKNQ_K5qAzGR2wBo)
       
        req.user = await decoded.user
        next() //direcionamos para o endpoint
    } catch (e) {
        res.status(403).send({ error: `Token inválido: ${e.message}` })
    }
}
module.exports = auth
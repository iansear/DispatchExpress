const jwt = require('jsonwebtoken')
const key = 'secret key'

const authentication = (req, res, next) => {
    const headers = req.headers['authorization']
    if(headers) {
        const token = headers.split(' ')[1]
        jwt.verify(token, key, (error, decoded) => {
        if(decoded) {
            next()
        } else if(error) {
            res.json({success: false, message: 'Unable to verify'})
        } else {
            res.json({success: false, message: 'Unknown'})
        }
    })
    } else {
        res.json({success: false, message: 'Unable to verify'})
    }
}

module.exports = authentication 
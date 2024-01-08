import jsonwebtoken from 'jsonwebtoken'

export function Auth (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
        if (!token) {
            return res.status(401).json({message: "Not authorized"})
        }
        const decoded = jsonwebtoken.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (e) {
        res.status(401).json({message: "Not authorized"})
    }
};
import jwt from "jsonwebtoken"

export function check(req, res, next) {
    let token = req.headers.token;
    if (!token)
        return res.status(401).json({ title: "first, log in", message: "unauthorized" })
    try {
        let result = jwt.verify(token, process.env.SECRET_KEY);
        req.user = result;
        next()
    }
    catch (err) {
        return res.status(401).json({ title: "first, log in", message: "unauthorized" + err.message })
    }
}

export function checkManager(req, res, next) {
    let token = req.headers.token;
    if (!token)
        return res.status(401).json({ title: "first, log in", message: "unauthorized" })

    try {
        let result = jwt.verify(token, process.env.SECRET_KEY);
        req.user = result;
        if (result.role == "MANAGER")
            next()
        else
            return res.status(403).json({ title: "dont have access" })
    }
    catch (err) {
        return res.status(401).json({ title: "first, log in", message: "unauthorized" + err.message })
    }
}


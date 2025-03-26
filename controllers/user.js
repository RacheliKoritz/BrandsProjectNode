// import { title } from "process";
import { userModel } from "../models/user.js"
import { generateToken } from "../utils/token.js";
import axios from "axios";
import https from "https";

export async function getAllUsers(req, res) {
    try {
        let data = await userModel.find();
        res.json(data);
    }
    catch (err) {
        console.log("err");
        res.status(400).json({
            title: "error cannot connect to getAll",
            message: "something wrong "
        })
    }
}
export async function getUserById(req, res) {

    let { id } = req.params;
    try {
        let data = await userModel.findById(id);
        if (!data)
            return res.status(400).json({
                title: "error cannot connect to get byId",
                message: "something wrong"
            })
        res.json(data);
    }
    catch (err) {
        console.log("err");
        res.status(400).json({
            title: "error cannot connect to getById",
            message: "something wrong "
        })
    }

}
export async function addUser(req, res) {
    if (!req.body.userName)
        return res.status(400).json({
            title: "erorr to add user",
            message: "you must enter userName "
        });

    if (!req.body.mail)
        return res.status(400).json({
            title: "erorr to add user",
            message: "you must enter mail "
        });

    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!pattern.test(req.body.mail))
        return res.status(400).json({
            title: "erorr to add user",
            message: "you must enter a valid  mail "
        });

    if (!req.body.password)
        return res.status(400).json({
            title: "erorr to add user",
            message: "you must enter password "
        });

    try {
        let existingUser = await userModel.findOne({ mail: req.body.mail });
        if (existingUser) {
            return res.status(401).json({
                title: "error to add user",
                message: "This email is already registered"
            });
        }

        let newUser = new userModel(req.body);
        newUser.role = "USER";
        newUser.dateSignIn = Date.now();
        let data = await newUser.save();
        let tkn = generateToken(data);
        // data.token = tkn;
        let { password, ...user } = data;
        console.log(data);
        res.json({ ...data, token: tkn });
    }
    catch (err) {
        console.log("err" + err);
        res.status(400).json({
            title: "error cannot connect to add user",
            message: "something wrong "
        })
    }
}

export async function updateUserById(req, res) {
    let { id } = req.params;

    if (req.body.password)
        return res.status(400).json({
            title: "erorr to update user",
            message: "you can't change the password  "
        });
    if (req.body.mail && req.body.mail == "" || req.body.userName && req.body.userName == "") {
        return res.status(400).json({
            title: "erorr to update user",
            message: "you can't change the password  "
        });
    }
    try {
        let data = await userModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!data)
            return res.status(400).json({
                title: "erorr to update user",
                message: "no find user to update "
            });
        res.json(data);
    }

    catch (err) {
        console.log("err");
        res.status(400).json({
            title: "error cannot connect to update user",
            message: "something wrong "
        })
    }

}
export async function updateUserPassword(req, res) {
    let { id } = req.params;
    let { password } = req.body;
    if (!password)
        return res.status(400).json({
            title: "erorr to update user password",
            message: "you must enter a password"
        });

    try {
        let data = await userModel.findByIdAndUpdate(id, { password }, { new: true });
        if (!data)
            return res.status(400).json({
                title: "erorr to update user password",
                message: "no find user to update password "
            });
        res.json(data);
    }
    catch (err) {
        console.log("err");
        res.status(400).json({
            title: "error cannot connect to update user password",
            message: "something wrong "
        })
    }

}
export async function loginUser(req, res) {
    console.log("Request body:", req.body);

    if (!req.body.mail || !req.body.password || !req.body.captchaToken) {
        return res.status(400).json({
            title: "Error login to user",
            message: "You must enter mail, password, and captchaToken"
        });
    }


    try {

        const agent = new https.Agent({ rejectUnauthorized: false });

        const recaptchaSecret = process.env.RECAPTCHA_SECRET;

        const recaptchaResponse = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify`,
            null,
            {
                params: {
                    secret: recaptchaSecret,
                    response: req.body.captchaToken
                },
                httpsAgent: agent
            }
        );

        if (!recaptchaResponse.data.success) {
            return res.status(400).json({
                title: "reCAPTCHA verification failed",
                message: "Please complete the reCAPTCHA correctly."
            });
        }


        let user = await userModel.findOne({
            mail: req.body.mail,
            password: req.body.password
        });
        if (!user)
            return res.status(400).json({
                title: "Error log in",
                message: "User not found"
            });
        let tkn = generateToken(user);
        // data.token = tkn;
        user = user.toObject();
        delete user.password;
        res.json({ ...user, token: tkn });
    }
    catch (err) {
        console.log("err log" + err);
        res.status(400).json({
            title: "error cannot connect login to user",
            message: "something wrong "
        });
    }
}

import fs from "fs/promises";

export default function logToFile(req,res,next) {

    fs.appendFile("log.txt", 
        `-> date: ${new Date()}\n method: ${req.method}` , (err => {
        if (err)
            console.log("err" + err);
        else
            console.log("write succsess");
    }));
    next();


}


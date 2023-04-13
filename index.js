import mongoose from "mongoose";
import app from "./src/app.js";
import config from "./src/config/index.js";

(async () => {
    try{
        await mongoose.connect(config.MONGODB_URL)
        console.log("DB CONNECTED");

        app.on("ERROR", (error) => {
            console.error("ERROR:", err)
            throw err
        })

        const onListening = () => {
            console.log(`Listening on PORT ${config.PORT}`)
        }

        app.listen(config.PORT, onListening)

    }catch(err){
        console.log("ERROR:", err)
        throw err
    }
})()

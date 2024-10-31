import "dotenv/config";
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from "cors";
import accountRoute from "./routes/account.route.js";
import userRoute from "./routes/user.route.js";
import securityRoute from "./routes/security.route.js"
import viajesRoute from "./routes/viajes.router.js"

const app = express();

const whiteList = [
    process.env.ORIGIN1,
    process.env.ORIGIN2
];

app.use(cors({
    origin: function(origin, callback) {
        if(!origin || whiteList.includes(origin)){
            return callback(null, origin);
        }

        return callback("Error de CORS: " + origin + " No autorizado!");
    },
    credentials: true
}));

const apiPath = "/api";
app.use(express.json());
app.use(cookieParser());
app.use(apiPath + "/account", accountRoute);
app.use(apiPath + "/user", userRoute);
app.use(apiPath + "/viajes", viajesRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("http://localhost:" + PORT + apiPath))
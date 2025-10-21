import express from "express";
import handlebars from "express-handlebars";
import mongoose from 'mongoose'
import cookieParser from "cookie-parser";
import 'dotenv/config'

import routes from "./routes.js";
import authMiddleware from "./middlewares/authMiddleware.js";

const url = process.env.PUBLIC_URL


try {
    await mongoose.connect(url, { dbName: 'magic-movie-2025' })
    console.log('Succesfully connected to DB!');

} catch (error) {
    console.error('Cannot connect to DB, ', error.message);

}

const app = express();

app.engine("hbs", handlebars.engine(
    {
        extname: "hbs",
        runtimeOptions: {
            allowProtoMethodsByDefault: true,
            allowProtoPropertiesByDefault: true
        }
    }
));

app.set('view engine', 'hbs');
app.set('views', 'src/views')

app.use(express.static('src/public'))
app.use(express.urlencoded())
app.use(cookieParser())
app.use(authMiddleware)
app.use(routes)

app.listen(5000, () => {
    console.log('Server is listening on port http://localhost:5000...')
})
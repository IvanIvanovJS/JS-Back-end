import express from "express";
import routes from "./routes.js";
import handlebars from "express-handlebars"
import mongoose from "mongoose";
import 'dotenv/config'
import cookieParser from "cookie-parser";
import authMiddleware from "./middlewares/authMiddleware.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();
try {
    await mongoose.connect('mongodb://localhost:27017',
        { dbName: 'friendly-world-2025' }
    )

    console.log('Successfully connected to DB!');

} catch (err) {
    console.error('Unable to connect to DB! ', err.message)
}

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    },
    helpers: {
        setTitle(title) {
            this.pageTitle = title;
        },
        getTitle() {
            return this.pageTitle || 'Friendly-world'
        }
    }

}))
app.set('view engine', 'hbs')
app.set('views', 'src/views')

app.use(express.static('src/public'))
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(authMiddleware)
app.use(routes)

app.use(errorMiddleware)

app.listen('3000', () => console.log('Server is listening on http://localhost:3000...'))
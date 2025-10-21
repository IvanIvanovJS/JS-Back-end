import express from "express";
import routes from "./routes.js";
import handlebars from "express-handlebars"
import mongoose from "mongoose";

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
    }

}))
app.set('view engine', 'hbs')
app.set('views', 'src/views')

app.use(express.static('src/public'))
app.use(express.urlencoded({ extended: false }))
app.use(routes)

app.get("/", (req, res) => {
    res.send("It works")
})

app.listen('5000', () => console.log('Server is listening on http://localhost:5000...'))
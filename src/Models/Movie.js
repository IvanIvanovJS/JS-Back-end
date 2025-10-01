import { Schema, model } from "mongoose";

const movieSchema = new Schema({
    title: String,
    category: String,
    genre: String,
    director: String,
    year: String,
    imageUrl: String,
    rating: Number,
    description: String
})

const Movie = model('Movie', movieSchema);


export default Movie;
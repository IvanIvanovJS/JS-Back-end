import Movie from '../Models/Movie.js';

export default {
    getAll(filter) {
        return Movie.find(filter)
    },
    async create(movieData) {
        const movie = new Movie(movieData);

        return await movie.save()

    },

    getOne(movieId) {
        return Movie.findOne({ _id: movieId })
    }
}
import Movie from '../Models/Movie.js';

export default {
    getAll(filter = {}) {
        let query = Movie.find();

        if (filter.title) {
            query = query.find({ title: { $regex: filter.title, $options: 'i' } });
        }


        if (filter.genre) {
            query = query.find({ genre: { $regex: new RegExp(`^${filter.genre}$`, 'i') } })
        }


        if (filter.year) {
            query = query.find({ year: filter.year })
        }
        return query
    },
    async create(movieData, ownerId) {
        const movie = new Movie({ ...movieData, owner: ownerId });

        return await movie.save()

    },

    getOne(movieId) {
        return Movie.findById(movieId).populate('casts');
    },

    attach(movieId, castId) {
        return Movie.findByIdAndUpdate(movieId, { $push: { casts: castId } })
    },
    delete(movieId) {
        return Movie.findByIdAndDelete(movieId)
    }
}
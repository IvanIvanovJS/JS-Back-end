import { v4 as uuid } from 'uuid'
import fs from 'fs/promises'

const dbSerialized = await fs.readFile('./db.json', { encoding: 'utf-8' })
const db = JSON.parse(dbSerialized);
const movies = db.movies;
class Movie {

    constructor(data) {
        Object.assign(this, data)
        this._id = uuid();
    }

    static find(filter = {}) {
        let result = movies.slice();
        if (filter.title) {
            result = result.filter(movie => movie.title.toLocaleLowerCase().includes(filter.title.toLocaleLowerCase()))
        }
        if (filter.genre) {
            result = result.filter(movie => movie.genre.toLocaleLowerCase() === filter.genre.toLocaleLowerCase())
        }
        if (filter.year) {
            result = result.filter(movie => movie.year === filter.year)
        }
        return result
    }

    static findOne(filter) {
        let result;
        if (filter._id) {
            result = movies.find(movie => movie._id === filter._id)
        }

        return result
    }

    async save() {
        movies.push(this)
        const dbSerialized = JSON.stringify(db, null, 2)
        await fs.writeFile('./db.json', dbSerialized)
        return this;
    }

    get id() {
        return this._id
    }
}
export default Movie
import Cast from '../Models/Cast.js'

export default {
    create(castData) {
        return Cast.create(castData)
    },

    getAll(filter = {}) {
        let query = Cast.find()

        if (filter.excludes) {
            query = query.nin('_id', filter.excludes)
        }
        return query
    }
}
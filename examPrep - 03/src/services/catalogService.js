import Catalog from "../models/Catalog.js";



export function getAll() {
    return Catalog.find();
}

export function getLatest() {
    return Catalog.find().sort({ _id: -1 }).limit(3)
}

export function getOne(dataId) {
    return Catalog.findById(dataId).populate('owner')
}

export function getOneAndUpdate(dataId, userId) {
    return Catalog.findByIdAndUpdate(dataId, { $push: { likedList: userId } },
        { new: true })
}


export function create(data, userId) {

    return Catalog.create({ ...data, owner: userId })
}

export async function deleteyById(dataId, userId) {
    const data = await Catalog.findById(dataId)

    if (!data.owner.equals(userId)) {

        throw {
            statusCode: 401,
            message: 'Cannot delete data that you are not owner!'
        }
    }

    return Catalog.findOneAndDelete(dataId)
}

export function edit(dataId, data) {


    return Catalog.findByIdAndUpdate(dataId, data, { runValidators: true })
}

export function getAllByLocation(location) {
    return Catalog.find({ location: { $regex: new RegExp(`^${location}$`, 'i') } });
}



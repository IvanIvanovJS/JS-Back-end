import Catalog from "../models/catalog.js";
import User from "../models/User.js";


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
    return Catalog.findByIdAndUpdate(dataId, { $push: { followList: userId } },
        { new: true })
}

export function getAllFollowers(followList) {
    return User.find({ _id: { $in: followList } }).select('username');
}

export function create(catalogData, userId) {

    return Catalog.create({ ...catalogData, owner: userId })
}

export function deleteyById(dataId) {
    return Catalog.findOneAndDelete(dataId)
}

export function edit(dataId, data) {
    return Catalog.findByIdAndUpdate(dataId, data, { runValidators: true })
}






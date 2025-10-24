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
    return Catalog.findByIdAndUpdate(dataId, { $push: { donation: userId } },
        { new: true })
}

export function getAllFollowers(donation) {
    return User.find({ _id: { $in: donation } });
}

export function create(catalogData, userId) {

    return Catalog.create({ ...catalogData, owner: userId })
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

export function getAllByOnwer(ownerId) {
    return Catalog.find({ owner: ownerId });
}

export function getUserFollowing(userId) {
    return Catalog.find({ followList: userId })
}



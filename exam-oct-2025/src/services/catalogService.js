import Myth from "../models/Myth.js";



export function getAll() {
    return Myth.find();
}

export function getLatest() {
    return Myth.find()
        .sort({ createdAt: -1 })
        .limit(3)
        .populate('owner', 'email')
        .select('name origin role symbol era imageUrl owner createdAt')
}

export function getOne(dataId) {
    return Myth.findById(dataId).populate('owner')
}

export function addToLikedlist(dataId, userId) {
    return Myth.findByIdAndUpdate(dataId, { $push: { likedList: userId } },
        { new: true })
}


export function create(data, userId) {

    return Myth.create({ ...data, owner: userId })
}

export async function deleteyById(dataId, userId) {
    const data = await Myth.findById(dataId)

    if (!data.owner.equals(userId)) {

        throw {
            statusCode: 401,
            message: 'Cannot delete myth that you are not owner!'
        }
    }

    return Myth.findOneAndDelete(dataId)
}

export function edit(dataId, data) {


    return Myth.findByIdAndUpdate(dataId, data, { runValidators: true })
}





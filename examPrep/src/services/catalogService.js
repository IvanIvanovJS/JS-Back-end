import Catalog from "../models/catalog.js";

export function getAll() {
    return Catalog.find();
}

export function getLatest() {
    return Catalog.find().sort({ _id: -1 }).limit(3)
}

export function create(catalogData, userId) {

    return Catalog.create({ ...catalogData, owner: userId })
}

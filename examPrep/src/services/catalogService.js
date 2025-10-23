import Catalog from "../models/catalog.js";

export function getAll() {
    return Catalog.find();
}

export function create(catalogData, userId) {

    return Catalog.create({ ...catalogData, owner: userId })
}

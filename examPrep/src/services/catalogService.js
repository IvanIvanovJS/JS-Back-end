import catalog from "../models/catalog.js";

export async function create(catalogData, userId) {

    return catalog.create({ ...catalogData, owner: userId })
}
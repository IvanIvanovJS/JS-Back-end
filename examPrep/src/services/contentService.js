import Content from "../models/Content.js";

export async function create(contentData, userId) {

    return Content.create({ ...contentData, owner: userId })
}
import { filterModel } from "../models/filter.js";
import { brandsModel } from "../models/brands.js";

export async function getAllFilter(req, res) {
    try {
        const { gender } = req.query;

        if (!gender) {
            return res.status(400).json({ error: "Missing gender parameter" });
        }

        // חיפוש כל המוצרים הרלוונטיים לפי gender
        const products = await brandsModel.find({ gender });

        // שליפת כל הערכים הקיימים בפועל במלאי
        const sizes = await brandsModel.distinct("size", { gender });
        const categories = await brandsModel.distinct("category", { gender });
        const brands = await brandsModel.distinct("brand", { gender });

        // יצירת אובייקט מאורגן לפילטרים
        const availableFilters = {
            size: sizes,
            category: categories,
            brand: brands
        };
        console.log(availableFilters);
        res.json(availableFilters);
    }
    catch (err) {
        console.error("Error fetching filters:", err);
        res.status(500).json({
            title: "Error fetching filters",
            message: "Something went wrong."
        });
    }
}







export async function addFilter(req, res) {
    const { gender, filter, value } = req.body;
    if (!gender)
        return res.status(400).json({
            title: "erorr to add filter",
            message: "you must enter type of gender "
        });
    if (!filter)
        return res.status(400).json({
            title: "erorr to add filter",
            message: "you must enter type of filter "
        });
    if (!value)
        return res.status(400).json({
            title: "erorr to add filter",
            message: "you must enter type of value"
        });
    try {
        const existingFilter = await filterModel.findOne({
            gender: req.body.gender,
            filter: req.body.filter,
            value: req.body.value
        });
        if (existingFilter) {
            return res.status(400).json({
                title: "erorr to add filter",
                message: "you have this filter"
            });
        }
        const newFilter = new filterModel(gender, filter, value);
        let data = await newFilter.save();
        res.status(200).json(data);
    }
    catch (err) {
        console.log("err", err);
        res.status(500).json({
            title: "error, cannot connect to add filter",
            message: "something wrong "
        })
    }


}
export async function deleteFilterById(req, res) {

    let { id } = req.params;
    try {
        let data = await filterModel.findByIdAndDelete(id);
        if (!data)
            return res.status(400).json({
                title: "erorr to delete filter",
                message: "filter not found to delete "
            });
        res.status(200).json(data);
    }
    catch (err) {
        console.log("err");
        res.status(500).json({
            title: "error, cannot connect to delete filter",
            message: "something wrong "
        });
    }
}

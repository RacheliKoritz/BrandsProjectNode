// import { title } from "process";
import { brandsModel } from "../models/brands.js"

export async function getAllBrands(req, res) {
    let limit = parseInt(req.query.limit) || 8;
    let page = parseInt(req.query.page) || 1;

    try {
        const { gender, size, category, brand } = req.query;

        if (!gender) {
            return res.status(400).json({ error: "Missing gender parameter" });
        }

        // בניית פילטרים דינאמיים
        const filter = { gender };

        if (size) filter.size = { $in: size.split(",") }; 
        if (category) filter.category = { $in: category.split(",") };
        if (brand) filter.brand = { $in: brand.split(",") };

        console.log("Filters:", filter);

        // שליפת מוצרים עם סינון
        const data = await brandsModel.find(filter).skip((page - 1) * limit).limit(limit);

        console.log("Products:", data);
        res.json(data);
    }
    catch (err) {
        console.error("Error fetching brands:", err);
        res.status(500).json({
            title: "Error fetching brands",
            message: "Something went wrong."
        });
    }
}


// פונקציה המחזירה מספר עמודים

export async function getNumPages(req, res) {
    let limit = parseInt(req.query.limit) || 8;
    
    try {
        const { gender, size, category, brand } = req.query;

        if (!gender) {
            return res.status(400).json({ error: "Missing gender parameter" });
        }

        const filter = { gender };
        if (size) filter.size = { $in: size.split(",") };
        if (category) filter.category = { $in: category.split(",") };
        if (brand) filter.brand = { $in: brand.split(",") };

        const totalCount = await brandsModel.countDocuments(filter);
        res.json({
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
            limit
        });
    } catch (err) {
        console.error("Error fetching number of pages:", err);
        res.status(500).json({
            title: "Error fetching number of pages",
            message: err.message
        });
    }
}



export async function getBrandById(req, res) {

    let { id } = req.params;
    try {
        let data = await brandsModel.findById(id);
        if (!data)
            return res.status(400).json({
                title: "error cannot connect to get byId",
                message: "something wrong"
            })
        res.json(data);
    }
    catch (err) {
        console.log("err");
        res.status(400).json({
            title: "error cannot connect to getById",
            message: "something wrong "
        })
    }

}

export async function getBrandByBrand(req, res) {
    try {
        const { brand } = req.query;

        if (!brand) {
            return res.status(400).json({ error: "Missing brand parameter" });
        }

        // חיפוש מוצרים לפי שם המותג
        const products = await brandsModel.find({ nameBrand: brand });

        if (!products.length) {
            return res.status(404).json({ message: "No products found for this brand" });
        }

        res.status(200).json(products);
    } 
    catch (err) {
        console.error("Error fetching products by brand:", err);
        res.status(500).json({
            title: "Error fetching products",
            message: "Something went wrong."
        });
    }
}




/*צריך לאכוף העלאת תמונה */
export async function addBrand(req, res) {
    const { nameBrand, modelBrand, srcImg, price, gender, category, size } = req.body;

    if (!nameBrand || !modelBrand || !price || !category || !size || !gender || !srcImg)
        return res.status(400).json({
            title: "erorr to add brand",
            message: "you must enter required fileds "
        });

    try {
        let newBrand = new brandsModel(req.body);
        let data = await newBrand.save();
        res.json(data);
    }
    catch (err) {
        console.log("err",err);
        res.status(500).json({
            title: "Error, cannot connect to add brand",
            message: "something wrong "
        })
    }


}
export async function updateBrandById(req, res) {
    let { id } = req.params;

    if (req.body.nameBrand != null && req.body.nameBrand.length < 2)
        return res.status(400).json({
            title: "erorr to update brand",
            message: "you must enter name with at least 2 letters "
        });

    try {

        let data = await brandsModel.findByIdAndUpdate(id, req.body, { new: true });

        if (!data)
            return res.status(400).json({
                title: "erorr to update brand",
                message: "no find brand to update "
            });
        res.json(data); 
    }
    catch (err) {
        console.log("err");
        res.status(400).json({
            title: "error cannot connect to update brand",
            message: "something wrong "
        })
    }

}
export async function deleteBrandById(req, res) {

    let { id } = req.params;
    try {
        let data = await brandsModel.findByIdAndDelete(id);
        if (!data)
            return res.status(400).json({
                title: "erorr to delete brand",
                message: "no find brand to delete "
            });
        res.json(data);
    }
    catch (err) {
        console.log("err");
        res.status(400).json({
            title: "error cannot connect to delete brand",
            message: "something wrong "
        });
    }

}

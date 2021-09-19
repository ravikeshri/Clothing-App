const mongoose = require("mongoose");

/*
 * Product schema:
 * product = {
 *      name,
 *      description,
 *      gender,
 *      category,
 *      price,
 *      reviews = [{
 *          user_id,
 *          rating,
 *          comment,
 *          images = [],
 *      }],
 *      average_rating,
 *      stocks = [{
 *          colour = {name, code},
 *          _s,
 *          _m,
 *          _l,
 *          _xl,
 *          images = []
 *      }]
 * }
 * 
 * 1) name, description, gender, category, price and stocks are required fields
 * 2) name => product name
 * 3) description => product description
 * 4) gander => man, woman, and unisex (will be shown to both)
 * 5) category => must be one of upperwear, bottoms, outerwear, knitwear, accessories
 * 6) price => must be a positive number
 * 7) reviews => 
 *      a) if a reviews is added then user_id and rating will be required fields
 *      b) user_id => object id of reviewer
 *      c) rating => any integer between 1 & 5
 *      d) comment => the review
 *      e) images => maximum 3 customer images from each customer
 * 8) average_rating => rating = stars, count = no. of ratings
 * 9) stocks => (contains atleast one element) each element of this array represents stock size for each colour
 *      a) colour => colour name and colour code of the product (say x and #yyy)
 *      b) _s, _m, _l, _xl => represnts the quantity of colour x having size small, medium, large and extra large
 *      c) images => maximum 5 images for colour x of the product
 *      d) for products having no relation with size, _s will be the stock size (_m, _l, _xl will be 0)
 */

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['man', 'woman', 'unisex'],
        required: true
    },
    category: {
        type: String,
        enum: ['upperwear', 'bottoms', 'outerwear', 'knitwear', 'accessories'],
        required: true
    },
    price: {
        type: Number,
        min: [0, 'Price cannot be negative!'],
        required: true
    },
    reviews: [
        {
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            rating: {
                type: Number,
                enum: [1, 2, 3, 4, 5],
                required: true
            },
            comment: {
                type: String
            },
            images: [String]
        }
    ],
    average_rating: {
        rating: {
            type: Number,
            default: 0
        },
        count: {
            type: Number,
            default: 0
        }
    },
    stocks: {
        type: [
            {
                colour: {
                    type: {
                        name: String,
                        code: String
                    },
                    required: true
                },
                _s: {
                    type: Number,
                    min: 0,
                    required: true
                },
                _m: {
                    type: Number,
                    min: 0,
                    required: true
                },
                _l: {
                    type: Number,
                    min: 0,
                    required: true
                },
                _xl: {
                    type: Number,
                    min: 0,
                    required: true
                },
                images: [String]
            }
        ],
        required: true
    }
});

module.exports = mongoose.model("Product", productSchema);
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
 *          images,
 *      }],
 *      average_rating,
 *      stocks = [{
 *          colour,
 *          _s,
 *          _m,
 *          _l,
 *          _xl,
 *          images
 *      }]
 * }
 * 
 * 1) name, description, gender, category, price and stocks are required fields
 * 2) name => product name
 * 3) description => product description
 * 4) gander => m is for male, f for female, and u (unisex) will be shown to both
 * 5) category => must be one of t-shirt, shirt, bottoms, oterwear, headwear, socks, accessories
 * 6) price => must be a positive number
 * 7) reviews => 
 *      a) if a reviews is added then user_id and rating will be required fields
 *      b) user_id => object id of reviewer
 *      c) rating => any integer between 1 & 5
 *      d) comment => the review
 *      e) images => maximum 3 customer images from each customer
 * 8) average_rating => rating = stars, count = no. of ratings
 * 9) stocks => (contains atleast one element) each element of this array represents stock size for each colour
 *      a) colour => colour of the product (say x)
 *      b) _s, _m, _l, _xl => represnts the quantity of colour x having size small, medium, large and extra large
 *      c) images => maximum 5 images for colour x of the product
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
        enum: ['m', 'f', 'u'],
        required: true
    },
    category: {
        type: String,
        // enum: ['t-shirt', 'shirt', 'bottoms', 'oterwear', 'headwear', 'socks', 'accessories'],
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
                type: string
            },
            images: {
                type: [ String ],
                validate: [arrayLimit, 3, '{PATH} exceeds the limit of 3']
            }
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
                    type: String,
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
                images: {
                    type: [ String ],
                    validate: [arrayLimit, 5, '{PATH} exceeds the limit of 5']
                }
            }
        ],
        required: true
    }
});

arrayLimit = (arr, length) => {
    return arr.length <= length;
}

module.exports = mongoose.model("Product", productSchema);
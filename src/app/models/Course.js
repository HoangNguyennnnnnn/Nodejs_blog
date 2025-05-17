const mongoose = require("mongoose");
var slugify = require('slugify')
const mongoose_delete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: String, required: true, maxLength: 255 },
    description: { type: String, maxLength: 600 },
    image: { type: String },
    videoId: { type: String, required: true, maxLength: 255 },
    level: { type: String, maxLength: 255 },
    slug: { type: String, unique: true },
}, {
    timestamps: true,
});

// Tự động tạo slug từ name trước khi lưu
Course.pre('save', function (next) {
    if (this.isModified('name') || this.isNew) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});

//ADDING PLUGIN
Course.plugin(mongoose_delete,
    {
        overrideMethods: 'all',
        deletedAt: true,
    });
module.exports = mongoose.model('Course', Course);

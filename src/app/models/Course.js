const mongoose = require("mongoose");
var slugify = require('slugify')
const mongoose_delete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    _id: { type: Number },
    name: { type: String, required: true, maxLength: 255 },
    description: { type: String, maxLength: 600 },
    image: { type: String },
    videoId: { type: String, required: true, maxLength: 255 },
    level: { type: String, maxLength: 255 },
    slug: { type: String, unique: true },
}, {
    timestamps: true,
    _id: false,
});

// Tự động tạo slug từ name trước khi lưu
CourseSchema.pre('save', function (next) {
    if (this.isModified('name') || this.isNew) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});

// Custom query helpers
CourseSchema.query.sortable = function (req, res) {
    if (Object.prototype.hasOwnProperty.call(req.query, '_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        });
    }
    return this;
};

//ADDING PLUGIN
CourseSchema.plugin(mongoose_delete,
    {
        overrideMethods: 'all',
        deletedAt: true,
    });
CourseSchema.plugin(AutoIncrement, { inc_field: '_id' });
module.exports = mongoose.model('Course', CourseSchema);

const Handlebars = require('handlebars');

module.exports = {
    sum: (a, b) => a + b,
    sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default';

        const icons = {
            default: 'fa-solid fa-sort',
            desc: 'fa-solid fa-arrow-down-short-wide',
            asc: 'fa-solid fa-arrow-down-wide-short',
        }

        const types = {
            default: 'desc',
            desc: 'asc',
            asc: 'desc',
        }

        const icon = icons[sortType];
        const type = types[sortType];

        const href = Handlebars.escapeExpression(`?_sort&column=${field}&type=${type}`);
        const output = `<a href="${href}">
                        <i class="${icon}"></i>
                    </a>`;
        return new Handlebars.SafeString(output);
    },
}
const express = require('express');
const { engine } = require('express-handlebars');
const morgan = require('morgan');
const methodOverride = require('method-override');
const path = require('path');
const SortMiddlewares = require('./app/middlewares/SortMiddlewares');


const app = express();
const port = 3000;


const route = require('./routes');
const db = require('./config/db');

//db connect
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('combined'));
app.use(methodOverride('_method'));

//Custom middlewares
app.use(SortMiddlewares);

// Cấu hình engine template
app.engine('hbs', engine({
    extname: '.hbs',
    helpers: {
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
            return `<a href="?_sort&column=${field}&type=${type}">
                        <i class="${icon}"></i>
                    </a>`
        },
    },
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Home, search, contact

//Router init
route(app);

app.listen(port, () => {
    console.log(`App nghe trên cổng ${port}`);
});

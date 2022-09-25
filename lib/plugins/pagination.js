const HapiPagination = require("hapi-pagination");
// const package = require(path.resolve('./package.json'))
const options = {
    query: {
        page: {
            name: 'the_page' // The page parameter will now be called the_page
        },
        limit: {
            name: 'per_page', // The limit will now be called per_page
            default: 10       // The default value will be 10
        }
    }
};

module.exports = {
    plugin: HapiPagination,
    options,
};

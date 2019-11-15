const camelCased = (str) => {
    return str.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
    });
};

const splitJoin = (str, split, join) => {
    return str.split(" ").join("_");
};

module.exports = {
    camelCased,
    splitJoin
}
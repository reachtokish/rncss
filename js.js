const myStyle = `
body {
    transform: translateX(50px) translateY(50px);
    background-color: red;
}
a {
    color: red;
}
`

var parse = require('css').parse;
var parsed = parse(myStyle);
console.dir(parsed.stylesheet.rules[0]);
const express = require("express");
const css = require("css");
var bodyParser = require('body-parser');

const app = express();

app.set('views', __dirname + '/public');
app.set('view engine', 'ejs');

app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.render('index');
});

const camelCased = (str) => {
    return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); })
}

app.post('/convert', (req, res) => {
    
    const cssString = req.body.css;
    const parsed = css.parse(cssString);
    const rules = parsed.stylesheet.rules;
    let str = "";

    for([ruleIndex, rule] of rules.entries()) {
        const declarations = rule.declarations;
        str += JSON.stringify(rule.selectors[0].split(" ").join("_").replace(".","").replace("#",""));
        str += ":";
        for([declarationIndex, declaration] of declarations.entries()) {
            if(declarationIndex === 0) {
                str += "{"
            }
            str += JSON.stringify(camelCased(declaration.property.split(" ").join("_")));
            str += ":";
            str += JSON.stringify(declaration.value);
            if(declarationIndex !== declarations.length - 1) {
                str += ",";
            }
            else {
                if(ruleIndex !== rules.length - 1) {
                    str += "},";
                }
                else {
                    str += "}";
                }
            }
        }
    }
    
    
    res.json(JSON.stringify(str));
})

app.listen(8080, () => {
    console.log("App listening on PORT 8080");
});
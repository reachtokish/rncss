const express = require("express");
const css = require("css");
const bodyParser = require('body-parser');
const camelCased = require('./utils').camelCased;
const splitJoin = require('./utils').splitJoin;
var cors = require('cors');

const app = express();

app.set('views', __dirname + '/public');
app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.render('index');
});

app.use(cors());

app.post('/convert', (req, res) => {
    try {
        const cssString = req.body.css;
        const parsed = css.parse(cssString);
        const { rules } = parsed.stylesheet;
        let str = "";

        for([ruleIndex, rule] of rules.entries()) {
            const { declarations } = rule;
            str += JSON.stringify(splitJoin(rule.selectors[0], " ", "_").replace(".","").replace("#",""));
            str += ":";

            for([declarationIndex, declaration] of declarations.entries()) {
                if(declarationIndex === 0) {
                    str += "{"
                }
                str += JSON.stringify(camelCased(splitJoin(declaration.property, " ", "_")));
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
        
        
        res.json({
            status: 200,
            message: "Generated successfully",
            data: JSON.stringify(str)
        });
    }
    catch {
        res.json({
            status: 500,
            message: "Error in server",
            data: null
        });
    }
})

app.listen(8080, () => {
    console.log("App listening on PORT 8080");
});
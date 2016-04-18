# search-parser
SearchParser takes in regex patterns and matches them to a string input.

##installation:
```sh
npm install --save search-parser
```

##usage:
```js
var SearchParser = require('search-parser');
var patterns = [
    {
        param: 'id',
        pattern: /^[0-9]$/
    },
    {
        pattern: /^(.+?)\s(.+\s)?(.+)|(.*)$/i,
        parse: function (result) {
            return {
                firstName: result[0]
                lastName: result[1] || result[2]
            } 
        }
    }
}

var sp = new SearchParser(patterns);

sp.match('234567');   // returns {id: '234567'}
sp.match('bar');      // returns {lastName: 'bar'}
sp.match('foo bar');  // returns {firstName: 'foo', lastName: 'bar'}
```

##regex handling:

Patterns should be passed as regex literals, to avoid having to escape characters that serve as regex operators.

Schema patterns without custom parse functions should use non-capturing subgroups to avoid returning

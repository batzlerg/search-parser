/**
 * SearchParser
 * @param {Array} patterns  Enumerates params and the patterns that match them
 * @param {boolean} options.returnAllMatches  If true return all matches (not just first)
 */

'use strict';

module.exports = function SearchParser(patterns, options) {
    this.patterns = patterns;
    this.returnAllMatches = options ? options.returnAllMatches : false;
    /**
     * Run regex match against supplied search input
     * @param  {string} input
     * @return {Object}       Match result, with supplied params as keys
     *                        and matched strings as values
     */
    this.match = function (input) {
        var matches = {};

        if (input.length) {
            this.patterns.some(function (obj) {
                var inputMatch;
                var matchIsEmpty;
                var matchResult;

                if (obj.hasOwnProperty('parse')) {
                    inputMatch = input.match(obj.pattern);
                    matchIsEmpty = inputMatch[0] === ""; // empty str at [0] means no match
                    matchResult = obj.parse(matchIsEmpty ? {} : inputMatch);

                    Object.keys(matchResult).forEach(function (k) {
                        matches[k] = matchResult[k];
                    });

                    return !matchIsEmpty && !this.returnAllMatches; // break out of Array.some
                } else {
                    matchResult = obj.pattern.exec(input) || [];

                    if (matchResult.length) {
                        matches[obj.param] = matchResult[0];
                        return !this.returnAllMatches; // break out of Array.some
                    }
                }
            }.bind(this));
        }
        return matches;
    };
};

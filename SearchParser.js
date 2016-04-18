/**
 * SearchParser
 * @param {Array} patterns  Enumerates params and the patterns that match them
 */

'use strict';

var SearchParser = function (patterns, options) {
    this._patterns = patterns;
};

/**
     * Run regex match against supplied search input
     * @param  {string} input
     * @return {schemaPartect}       Match result, with supplied params as keys
     *                        and matched strings as values
     */
SearchParser.prototype.match = function (input) {
    var matches = {};

    if (!input.length) {
        return {};
    }
    this._patterns.some(function (schemaPart) {
        var matchResult = input.match(schemaPart.pattern);
        var matchIsEmpty = matchResult === null ||
                           !matchResult.length ||
                           matchResult[0] === "";

        if (matchIsEmpty) {
            return false; // next schemaPart
        }

        if (schemaPart.hasOwnProperty('parse')) {
            var parseResult = schemaPart.parse(matchResult);
            Object.assign(matches, parseResult)
        } else {
            matches[schemaPart.param] = matchResult[0];
        }

        return true; // break out of Array.some
    }.bind(this));

    return matches;
};

module.exports = SearchParser;

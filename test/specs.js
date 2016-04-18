"use strict";
var SearchParser = require('../SearchParser');
var expect = require('chai').expect;

describe("search-parser", function () {
    var testPatterns;
    var searchParser;
    
    beforeEach(function () {
        testPatterns = [
            {
                param: 'param1',
                pattern: /^([a-z]_[0-9]{1,5})$/i
            },
            {
                param: 'param2',
                pattern: /^([a-z]_[0-9]{6,}(?:,\s*[a-z]_[0-9]{6,})*)$/i
            },
            {
                param: 'param3',
                pattern: /^([0-9]{6,}(?:,\s*[0-9]{6,})*)$/i
            },
            {
                pattern: /^(.+?)\s(.+\s)?(.+)|(.*)$/i,
                parse: function (result) {
                    return {
                        subParam1: result[1],
                        subParam2: result[3] || result[4]
                    };
                }
            }
        ];
        searchParser = new SearchParser(testPatterns);
    });

    describe("match", function () {
        it("should execute simple regexes against string input", function () {
            expect(searchParser.match('f_9585')).to.include({param1: 'f_9585'});
            expect(searchParser.match('f_9582346')).to.include({param2: 'f_9582346'});
            expect(searchParser.match('1234567, 12345678')).to.include({
                param3: '1234567, 12345678'
            });
        });
        it("should use custom parse functions when provided", function () {
            expect(searchParser.match('first middle last')).to.include({
                subParam1: 'first',
                subParam2: 'last'
            });
            expect(searchParser.match('last')).to.include({subParam2: 'last'});
            expect(searchParser.match('asdfasdfasdf')).to.not.have.property('param4');
        });
    });
});

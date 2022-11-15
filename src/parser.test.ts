import {
    describe, it,
    expect,
} from 'vitest'

import Parser from './parser'

describe('Hint Parser Tests', () => {

    const test = (hint: string, expected: string[], variables: Variables = {}) => () => expect(
        (new Parser)
            .parse(hint, variables)
            .sort()
    ).to.deep.equal(expected.sort())


    it('Tests Raw Hint Passing', test('red blue', ['red','blue']))

    it('Tests Single Expansion', test('foo-(bip|bap)-bar', ['foo-bip-bar','foo-bap-bar']))

    it('Tests Multi Expansion', test('(one|first)-(two|second)', ['one-two','one-second','first-two','first-second']))

    it('Tests Nested Expansion', test('left-(leftish-(inner|inside)|rightish)-right', [
        'left-leftish-inner-right',
        'left-leftish-inside-right',
        'left-rightish-right',
    ]))

    it('Tests Optional Params', test('foo(-bar)?', ['foo','foo-bar']))

    it('Expands Variables', test(
        'foo-$colors-bar',
        ['foo-red-bar','foo-blue-bar'],
        { colors: ['red','blue'] }
    ))

    it('Allows Defining Inline Variables', test('colors=blue|red foo-$colors', ['foo-blue','foo-red']))

    it('Inline Variables Are Processed', test('colors=gr(a|e)y foo-$colors', ['foo-gray','foo-grey']))

    it('Overwrites Variables', test(
        'colors=$colors|gray foo-$colors',
        ['foo-red','foo-blue','foo-gray'],
        { colors: ['red','blue'] }
    ))

    it('Variables Overwrites With Options', test(
        'colors=$colors|gr(a|e)y foo-$colors',
        ['foo-red','foo-blue','foo-gray', 'foo-grey'],
        { colors: ['red','blue'] }
    ))

    it('Sequential Variable Overwrites', test(
        'colors=red|orange foo-$colors colors=yellow|green bar-$colors colors=$colors|blue baz-$colors',
        ['foo-red','foo-orange','bar-yellow','bar-green','baz-yellow','baz-green','baz-blue']
    ))

})

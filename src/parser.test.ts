import {
    describe, it,
    expect,
} from 'vitest'

import Parser from './parser'

describe('Hint Parser Tests', () => {

    const test = (hint: string, expected: string[]) => () => expect(
        (new Parser)
            .parse(hint)
            .sort()
    ).to.deep.equal(expected.sort())


    it('Tests Raw Hint Passing', test('red blue', ['red','blue']))

    it('Tests Single Expansion', test('foo-(bip|bap)-bar', ['foo-bip-bar','foo-bap-bar']))

    it('Tests Multi Expansion', test('(one|two)-(a|b)', ['one-a','one-b','two-a','two-b']))

    it('Tests Nested Expansion', test('foo-(bip|ba(p|r))-boo', [
        'foo-bip-boo',
        'foo-bap-boo',
        'foo-bar-boo',
    ]))

    it('Tests Optional Params', test('foo(-bar)?', ['foo','foo-bar']))

})

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

    it('Tests Multi Expansion', test('(one|first)-(two|second)', ['one-two','one-second','first-two','first-second']))

    it('Tests Nested Expansion', test('left-(leftish-(inner|inside)|rightish)-right', [
        'left-leftish-inner-right',
        'left-leftish-inside-right',
        'left-rightish-right',
    ]))

})

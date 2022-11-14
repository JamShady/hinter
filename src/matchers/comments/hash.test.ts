import {
    describe, it,
    expect,
} from 'vitest'

import TestClass from './hash'

describe('Hash Comment Tests', () => {

    const test = (sourceCode: SourceCode, expected: string[], keywords: Keywords = ['hint']) => () => expect(
        (new TestClass)
            .matches(sourceCode, keywords)
            .map(({ hint }) => hint)
    ).to.deep.equal(expected)

    it('Tests Default Hint', test(`# hint foo bar`,[
        'foo bar',
    ]))

    it('Tests Custom Hint', test('# parse foo bar baz', [
        'foo bar baz',
    ], ['parse']))

    it('Ignores Preceding Code', test('() => {} # hint bip bap', [
        'bip bap'
    ]))

    it('Matches Over Multi-Line', test(`
        this is one line 
        this is another # hint foo bar
        and then we get one more
    `, ['foo bar']))

    it('Matches Multiple Entries Over Multi-Line', test(`
        this is first line # hint line-one
        this is second
        this is third # hint line-two
    `, ['line-one', 'line-two']))

    it('Ignores Noise Prior To Keywords', test(`
        this is source code # noise hint one
        this is more code
        this is even moar codes # hint two moar
    `, ['two moar']))

})

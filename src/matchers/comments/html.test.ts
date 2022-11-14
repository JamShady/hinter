import {
    describe, it,
    expect,
} from 'vitest'

import TestClass from './html'

describe('HTML Comment Tests', () => {

    const matches = (sourceCode: SourceCode, keywords: Keywords = ['hint']) => (new TestClass).matches(sourceCode, keywords)

    const test = (sourceCode: SourceCode, expected: string[], keywords: Keywords = ['hint']) => () => expect(
        matches(sourceCode, keywords)
            .map(({ hint }) => hint)
    ).to.deep.equal(expected)

    it('Tests Default Hint', test(`<!-- hint foo bar -->`,[
        'foo bar',
    ]))

    it('Tests Custom Hint', test('<!-- parse foo bar baz -->', [
        'foo bar baz',
    ], ['parse']))

    it('Ignores Preceding Code', test('() => {} <!-- hint bip bap -->', [
        'bip bap'
    ]))

    it('Matches Over Multi-Line', test(`
        this is one line
        <!-- hint foo bar -->
        and then we get one more
    `, ['foo bar']))

    it('Matches Hint Over Multi-Line', test(`
        <!--
            hint one two
        -->
    `, ['one two']))

    it('Matches Multiple Entries Over Multi-Line', test(`
        this is first line <!-- hint line-one -->
        this is second
        this is third <!-- hint line-two -->
    `, ['line-one', 'line-two']))

    it('Ignores Matches With Noise Prior To Keywords', test(`
        this is source code <!-- noise hint one -->
        this is more code
        this is even more codes <!-- hint two more -->
    `, ['two more']))

    it('Ignores Comments Before Keyword On New Line', test(`
        <!--
            this is some comment
            hint one two
        -->
    `, ['one two']))

    it('Does Not Include Current Content Within curr match', () => {
        const m = matches(`<!--
            text-bold
            hint foo bar
            bip bap
        -->`, ['hint'])

        expect(m).to.be.an('array').that.has.length(1)

        const n = m.shift() as HintMatch
        expect(n).to.have.property('curr')
        expect(n.curr).to.not.contain('text-bold')
    })

})

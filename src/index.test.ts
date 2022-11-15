import {
    describe, it,
    expect,
} from 'vitest'

import transform from './index'


describe('Tests Hinter', () => {

    it('Tests A Wall Of Code', () => {
        const source = `
            this is some random writings
            this will test eol // hint eol-(one|two)
            and hash # hint hash-(a|b|c)-$colors
            <!--
                hint html-(foo|bar)
            -->
            finally /* hint doc(-block)? */
        `
        const variables = {
            colors: ['red','blue']
        }

        const keywords = ['key', 'word']
        keywords.forEach((keyword, index) => {
            const parsed = transform(
                source.replaceAll('hint', keyword),
                variables,
                // test both trigger formats, for code coverage
                index % 2
                    ? keyword
                    : [keyword]
            )

            const expectations = [
                'eol-one','eol-two',
                'hash-a-red', 'hash-a-blue', 'hash-b-red', 'hash-b-blue', 'hash-c-red', 'hash-c-blue',
                'html-foo', 'html-bar',
                'doc', 'doc-block',
            ]
            expectations.forEach(expected => expect(parsed).to.contain(expected))
        })
    })

})

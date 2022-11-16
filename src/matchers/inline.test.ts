import {
    describe, it,
    expect,
} from 'vitest'

import TestClass from './inline'

describe('Inline Code Search', () => {

    const test = (sourceCode: SourceCode, expected: string[], variables: Variables = {}) => () => expect(
        (new TestClass)
            .matches(sourceCode, ['hint'], variables)
            .map(({ hint }) => hint)
            .sort()
    ).to.deep.equal(expected.sort())

    it('Checks For Regular Variables', test('this is some foo-${color}-bar codes', [
        'foo-$colors-bar',
    ], { colors: [] }))

    it('Ignores Duplicates', test('pre foo-${color}-bar mid foo-${color}-bar aft', [
        'foo-$colors-bar',
    ], { colors: [] }))

    it('Preserves Modifiers', test('pre hover:focus:foo-${color}-bar mid foo-${color}-bar aft', [
        'foo-$colors-bar',
        'hover:focus:foo-$colors-bar',
    ], { colors: [] }))

    it('Preserve Definable Params', test('pre foo-[${color}] aft', [
        'foo-[$colors]'
    ], { colors: [] }))

    it('Replaces Multiple Variables', test('pre ${trigger}:foo-${color}-bar aft', [
        '$trigger:foo-$colors-bar',
    ], { colors: [], trigger: [] }))

    it('Only Replaces Known Variables', test('pre ${trigger}:foo-${color}-bar aft', [
        '${trigger}:foo-$colors-bar',
    ], { colors: [] }))

    it('Supports Nested Variables', test('pre foo-${some.color}-bar aft', [
        'foo-$colors-bar',
    ], { colors: [] }))

})
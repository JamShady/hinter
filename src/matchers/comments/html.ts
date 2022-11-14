import base from './multiline'

/**
 * Matches HTML comments, i.e. <!-- these ones -->
 */
export default class extends base implements Matcher {

    public matches(sourceCode: SourceCode, keywords: Keywords) {
        return super.matches(sourceCode, keywords, '<!-{2,}', '-{2,}>')
    }

}

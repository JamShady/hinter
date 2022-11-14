import base from './abstract'

/**
 * Matches End-of-Line comments, i.e. // these comments
 */
export default class extends base implements Matcher {

    public matches(sourceCode: SourceCode, keywords: Keywords) {
        return super.matches(sourceCode, keywords, '//')
    }

}

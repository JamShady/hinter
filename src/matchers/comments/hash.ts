import base from './abstract'

/**
 * Matches Hash comments, i.e. # these comments
 */
export default class extends base implements Matcher {

    public matches(sourceCode: SourceCode, keywords: Keywords) {
        return super.matches(sourceCode, keywords, '#')
    }

}

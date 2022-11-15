export default class {
    /**
     * 'foo bar' => ['foo','bar']
     */
    protected hints: (hint: string) => string[];
    /**
     * foo(-bar)? => foo(-bar|)
     */
    protected optional: (hint: string) => string;
    /**
     * foo-(bip|bap)-bar => ['foo-bip-bar', 'foo-bap-bar']
     */
    protected expand: (hint: string) => string[];
    /**
     * Generates a callback to replace all the variables within a hint, i.e. given colors=blue|red
     * foo-$colors-bar => foo-(blue|red)-bar
     */
    protected replace: (hint: string, variables: Variables) => string;
    /**
     * Generates a callback to process each hint, respecting variable assignment and expansion
     */
    protected processWith: (variables: Variables) => (hint: string) => string[];
    /**
     * Parses a hint into an array of classes
     */
    parse: (hint: string, variables?: Variables) => string[];
}

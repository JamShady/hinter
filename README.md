# Hinter
CSS management tools, e.g. [PurgeCSS](https://purgecss.com/) and [Tailwind CSS](https://tailwindcss.com/)
need some clues to help them out.

Tailwind CSS does [very simple regex matching](https://tailwindcss.com/docs/content-configuration#class-detection-in-depth) on all source-code files to match anything
that *could* possibly be a class name. It's **not** able to parse [dynamic class names](https://tailwindcss.com/docs/content-configuration#dynamic-class-names).

That's no fun.

So this utility can be used as a pre-processor to transform *hints* within your source code to produce
an expanded list of class names that the CSS management tool can then pick up on, hopefully providing the best of both worlds.

## Usage

### Installation
```javascript
npm install -D https://github.com/JamShady/hinter.git
```

### Parsing
```typescript
import hinter from 'hinter'

const transformed = hinter(
    sourceCode: string,
    variables: { [key:string]: string[] },
    triggers: string|string[] = 'hint'
)
```

### TailwindCss
In your `tailwind.config.js` file, add
```javascript
module.exports = {
  content: {
    transform: sourceCode => hinter(sourceCode, variables, triggers),
  },
```

## Implementation

Hints are added to your source code by way of comments, with a keyword prefix (which defaults to 'hint')

The following are supported:
* End-Of-Line comments, i.e. `some source code // hint ...`
* Hash comments, i.e. `some source code # hint ...`
* HTML comments, i.e. `<!-- hint ... -->`
  * You can also use it in a multi-line context, i.e.
  ```html
    <!--
        this preamble will be ignored
        hint ...
    -->
  ```
* DocBlocks, i.e. `/* hint ... */`
  * You can also use it within a larger block, i.e.
  ```javascript
  /**
   * this preamble will be ignored
   * hint ...
   **/
  ```

## Hint Format

The hints are just a series of class names that need to be parsed out

You can provide combinations options, i.e. `foo-(bip|bap)-bar` which yields `foo-bip-bar foo-bap-bar`

You can use multiple options, every permutation will be generated,
i.e. `(top|left)-(padding|margin)` yields `top-padding top-margin left-padding left-margin`

You can even nest options, i.e. `foo-(bip|ba(p|r))` yields `foo-bip foo-bap foo-bar`

Optionals can also be, optional? `foo(-bar)?` yields `foo foo-bar`

And you can use variables, i.e. `(left|right)-$property` yields `left-margin left-padding right-margin right-padding` (where the variable `$property` has been defined as `margin|property` or `[margin,property]` as a passed in property)

You can define variables inline, i.e. `color=red|blue text-$color` yields `text-red text-blue`

Inline variables are also processed, i.e. `color=gr(a|e)y text-$color` yields `text-gray text-grey`

## Auto-Detection

The hinter will also try to intelligently pick up variable references within your code-base, presuming the variables to be named in plurality, and the usage as singular, i.e. given the variables `{ colors: ['red','blue'] }`,
the hinter will replace occurrences of `text-${color}` with `text-red text-blue`.

It'll even match for sub-variables, i.e. `text-${user.color}` will also yield the same result.

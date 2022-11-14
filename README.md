# Hinter
CSS management tools, e.g. [PurgeCSS](https://purgecss.com/) and [Tailwind CSS](https://tailwindcss.com/)
need some clues to help them out.

Tailwind CSS does [very simple regex matching](https://tailwindcss.com/docs/content-configuration#class-detection-in-depth) on all source-code files to match anything
that *could* possibly be a class name. It's **not** able to parse [dynamic class names](https://tailwindcss.com/docs/content-configuration#dynamic-class-names).

That's no fun.

So this utility can be used as a pre-processor to transform *hints* within your source code to produce
an expanded list of class names that the CSS management tool can then pick up on, hopefully providing the best of both worlds.

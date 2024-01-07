[Marked]: https://github.com/markedjs/marked/
[this md's source]: /article_1.md
[Directives syntax]: https://talk.commonmark.org/t/generic-directives-plugins-syntax/444


Marked - Markdown Parser
========================

[Marked] lets you convert [this md's source] into HTML.
Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML.
This demo page will let you type anything you like and see how it gets converted.  Live.  No more waiting around.

How To Use The Demo
-------------------

1. Type in stuff on the left.
2. See the live updates on the right.

That's it.  Pretty simple.  There's also a drop-down option above to switch between various views:

- **Preview:**  A live display of the generated HTML as it would render in a browser.
- **HTML Source:**  The generated HTML before your browser makes it pretty.
- **Lexer Data:**  What [marked] uses internally, in case you like gory stuff like this.
- **Quick Reference:**  A brief run-down of how to format things using markdown.

Why Markdown?
-------------

It's easy.  It's not overly bloated, unlike HTML.  Also, as the creator of [markdown] says,

<div id="div1">

> The overriding design goal for Markdown's
> formatting syntax is to make it as readable
> as possible. The idea is that a
> Markdown-formatted document should be
> publishable as-is, as plain text, without
> looking like it's been marked up with tags
> or formatting instructions.

</div>

Ready to start writing?  Either start changing stuff on the left or [clear everything](/?text=) with a simple click.


A Description List:
:   Topic 1   :  Description 1
: **Topic 2** : *Description 2*


:::div{#temptable1}

| aaaa | bbbb | cccc |
|-- | --| -- |
| 1111 | 22222 | 3333 |
| 111d1 | 22222e | 3333f |

:::


# Example

:::main{#foo .bar class="baz" .qux}

[Directives syntax]

::hr{.border-muted}

You can use :i[CSS] (Cascading Style Sheets) to style your :abbr[HTML]{title="HyperText Markup Language"}.

:::


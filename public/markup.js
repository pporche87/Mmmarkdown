const markupTextValue = `# An h1 header

Paragraphs are seperated by a blank line.

2nd paragraph. _Italic_, **bold**, and
\`monospace\`. Itemized lists
look like:

- this one
- that one
- the other one

> Block quotes are
> written like so.
>
> They can span multiple paragraphs,
> if you like.`

const previewTextValue = `
	<h1>An h1 header</h1>
	<p>Paragraphs are seperated by a blank line.</p>
	<p>2nd paragraph. <em>Italic</em>, <strong>bold</strong>, and monospace. Itemized lists look like: </p>
	<br>
	<ul>
		<li>this one</li>
		<li>that one</li>
		<li>the other one</li>
	</ul>
	<br>
	<blockquote class="block-quote">
		<p>Block quotes are written like so.</p>
		<br>
		<p>The can span multiple paragraphs, if you like.</p>
	</blockquote>
`

document.addEventListener('DOMContentLoaded', () => {
  const markup = document.querySelector('textarea')
  markup.innerHTML = markupTextValue
  const preview = document.querySelector('.right')
  preview.innerHTML = previewTextValue
})

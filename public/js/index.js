document.addEventListener('DOMContentLoaded', () => {
  const markdownTextarea = document.querySelector('.text-area.left')
  const outputTextarea = document.querySelector('.text-area.right')

  markdownTextarea.addEventListener('keyup', (event) => {
    outputTextarea.innerHTML = marked(event.target.value)
  })

})

// event handler on change execute function

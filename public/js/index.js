$(document).ready(() => {
  initializeTextArea()
  initializeSaveButton()
  cookieCheck()
  newFile()
  renderFileFromSidebar()
  deleteFile()
})

const initializeTextArea = () => {
  const editor = $('.text-area.editor')

  editor.keyup(populatePreview)
}

const countWords = () => {
  let wordCount = $('.text-area.editor').val()
  wordCount = wordCount.replace(/(^\s*)|(\s*$)/gi,'')
  wordCount = wordCount.replace(/[ ]{2,}/gi,' ')
  wordCount = wordCount.replace(/\n /,'\n')
  $('#word-count').html(`${wordCount.split(' ').length} words`)
}

const populatePreview = () => {
  const editor = $('.text-area.editor')
  const preview = $('.text-area.preview')

  preview.html(marked(editor.val()))
  countWords()
}

const initializeSaveButton = () => {
  $('#save-button').click(() => {
    saveFile()
  })
}

const newFile = () => {
  $('.new-file').click(() => {
    const newFileName = prompt('Name your markdown file')

    $('.menu h4').html(newFileName)
    $('.text-area.editor').val('')
    $('.render-list').append(`<li class="document"><h4>${newFileName}<span><i class="fa fa-trash"></i></span></h4></li>`)

    deleteFile()
    populatePreview()
  })
}

const renderFileFromSidebar = () => {
  $('ul.render-list li h4').click((event) => {
    const fileToRenderName = event.target.innerText

    fetchFileFromCookie(fileToRenderName)
  })
}

const saveFile = () => {
  const port = 3000
  const url = `http://127.0.0.1:${port}/markdowns/saveFile`
  const readmeFile = {
    fileName: $('.menu h4').text(),
    fileText: $('.text-area.editor').val()
  }
  alert(`Save file: ${readmeFile.fileName}`)
  Cookies.set('fileName', readmeFile.fileName, { expires: 30 })
  postToServer(url, readmeFile)
}

const deleteFile = () => {
  $('ul.render-list li span').click((event) => {
    event.stopPropagation()
    const fileName = event.target.parentElement.parentElement.innerText
    const liToDelete = event.target.parentElement.parentElement.parentElement
    const port = 3000
    const url = `http://127.0.0.1:${port}/markdowns/${fileName}/delete`
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(result => {
        if (result.status === 200) {
          liToDelete.remove()
          $('.menu h4').text('')
          $('.text-area.editor').val('')
          populatePreview()
        } else {
          console.log('Error') // eslint-disable-line no-console
        }
      })
  })
  Cookies.set('ExampleFile.md')
}

const postToServer = (url, readmeFile) => {
  fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(readmeFile)
  })
    .then(() => {
      console.log(`${readmeFile.fileName} was saved to the server.`) // eslint-disable-line no-console
    })
    .catch((error) => {
      console.log(`There was an error saving ${readmeFile.fileName} to the server. Error: ${error}`) // eslint-disable-line no-console
    })
}

const fetchFileFromCookie = (fileName) => {
  $('.menu h4').text(fileName)
  const port = 3000
  const url = `http://127.0.0.1:${port}/markdowns/${fileName}`
  fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(fileContent => fileContent.json())
    .then((fileContent) => {
      const markdownText = $('.text-area.editor')

      markdownText.text(fileContent.fileText)
      populatePreview()
    })
    .catch((error) => {
      console.log(`There was an error fetching the file content from the file. ${error}`) // eslint-disable-line no-console
      throw error
    })
}

const cookieCheck = () => {
  if (Cookies.get().fileName) {
    fetchFileFromCookie(Cookies.get().fileName)
  } else {
    fetchFileFromCookie('ExampleFile.md')
  }
}

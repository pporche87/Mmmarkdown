$(document).ready(() => {
  initializeTextArea()
  initializeSaveButton()
  cookieCheck()
})

const initializeTextArea = () => {
  const editor = $('.text-area.editor')

  editor.keyup(populatePreview)
}

const populatePreview = () => {
  const editor = $('.text-area.editor')
  const preview = $('.text-area.preview')

  preview.html(marked(editor.val()))
}

const initializeSaveButton = () => {
  $('#save-button').click(() => {
    saveFile()
  })
}

const saveFile = () => {
  const port = 3000
  const url = `http://127.0.0.1:${port}/saveFile`
  const readmeFile = {
    fileName: $('.menu h4').text(),
    fileText: $('.text-area.editor').val()
  }
  Cookies.set('fileName', readmeFile.fileName)
  postToServer(url, readmeFile)
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
      console.log(`${readmeFile.fileName} was saved to the server.`)
    })
    .catch((error) => {
      console.log(`There was an error saving ${readmeFile.fileName} to the server. Error: ${error}`)
    })
}

const fetchFileFromCookie = (fileName) => {
  const port = 3000
  const url = `http://127.0.0.1:${port}/${fileName}`
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
      console.log(`There was an error fetching the file content from the file. ${error}`)
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

import { initAddCommentListener } from './initListeners.js'
import { renderComments } from './renderComments.js'
import { fetchComments } from './api.js'
import { updateComments } from './comments.js'

document.querySelector('.comments').innerHTML =
    'Пожалуйста подождите, идет загрузка...'
fetchComments().then((data) => {
    updateComments(data)
    renderComments()
})

initAddCommentListener(renderComments)

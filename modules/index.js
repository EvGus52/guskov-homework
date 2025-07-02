import { fetchComments } from './api.js'
import { updateComments } from './comments.js'
import { renderComments } from './renderComments.js'

export const fetchAndRenderComments = (isFirstLoading) => {
    if (isFirstLoading) {
        document.querySelector('.container').innerHTML =
            '<p>Пожалуйста подождите, идет загрузка...</p>'
    }
    fetchComments().then((data) => {
        updateComments(data)
        renderComments()
    })
}
fetchAndRenderComments(true)

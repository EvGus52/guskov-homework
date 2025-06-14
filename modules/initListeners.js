import { comments, updateComments } from './comments.js'
import { sanitize } from './sanitizeHtml.js'
import { renderComments } from './renderComments.js'
import { addComment } from './api.js'

export const initLikeListeners = (renderComments) => {
    const likeButtons = document.querySelectorAll('.like-button')

    for (const likeButton of likeButtons) {
        likeButton.addEventListener('click', (e) => {
            e.stopPropagation()

            const index = likeButton.dataset.index
            const comment = comments[index]

            comment.likes = comment.isLiked
                ? comment.likes - 1
                : comment.likes + 1
            comment.isLiked = !comment.isLiked

            renderComments()
        })
    }
}

export const initReplyListeners = () => {
    const commentsElements = document.querySelectorAll('.comment')
    const inputText = document.querySelector('.add-form-text')

    for (const commentElement of commentsElements) {
        commentElement.addEventListener('click', () => {
            const currentComment = comments[commentElement.dataset.index]
            inputText.value = `ᐊ ${currentComment.name}: ${currentComment.text} ᐅ`
        })
    }
}

export const initAddCommentListener = () => {
    const buttonEl = document.querySelector('.add-form-button')
    const inputName = document.querySelector('.add-form-name')
    const inputText = document.querySelector('.add-form-text')

    buttonEl.addEventListener('click', () => {
        if (inputName.value.trim() === '') {
            inputName.style.backgroundColor = '#ffdddd'
            alert('Имя не может быть пустым')
            return
        }
        if (inputText.value.trim() === '') {
            inputText.style.backgroundColor = '#ffdddd'
            alert('Комментарий не может быть пустым')
            return
        }

        addComment(sanitize(inputText.value), sanitize(inputName.value)).then(
            (data) => {
                updateComments(data)
                renderComments()
                inputName.value = ''
                inputText.value = ''
            },
        )
    })
}

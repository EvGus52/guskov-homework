import { comments, updateComments } from './comments.js'
import { sanitize } from './sanitizeHtml.js'
import { renderComments } from './renderComments.js'
import { addComment } from './api.js'
import { delay } from './delayFunction.js'

export const initLikeListeners = (renderComments) => {
    const likeButtons = document.querySelectorAll('.like-button')

    for (const likeButton of likeButtons) {
        likeButton.addEventListener('click', (e) => {
            e.stopPropagation()

            const index = likeButton.dataset.index
            const comment = comments[index]
            likeButton.disabled = true
            likeButton.classList.add('loading-like')
            delay(2000).then(() => {
                comment.likes = comment.isLiked
                    ? comment.likes - 1
                    : comment.likes + 1
                comment.isLiked = !comment.isLiked
                comment.isLikeLoading = false
                renderComments()
            })
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
        document.querySelector('.add-form').style.display = 'none'
        document.querySelector('.comment-loading').style.display = 'block'

        addComment(sanitize(inputText.value), sanitize(inputName.value)).then(
            (data) => {
                document.querySelector('.comment-loading').style.display =
                    'none'
                document.querySelector('.add-form').style.display = 'flex'
                updateComments(data)
                renderComments()
                inputName.value = ''
                inputText.value = ''
            },
        )
    })
}

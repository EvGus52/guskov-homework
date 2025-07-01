import { comments } from './comments.js'
import { initLikeListeners, initReplyListeners } from './initListeners.js'

export const renderComments = () => {
    const container = document.querySelector('.container')
    const commentsHtml = comments
        .map((comment, index) => {
            return `
      <li class="comment" data-index="${index}">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.date.toLocaleDateString()}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button data-index=${index} class="like-button ${comment.isLiked ? '-active-like' : ''}"></button>
            </div>
          </div>
        </li>
      `
        })
        .join('')

    const addCommentsHtml = `
            <div class="add-form">
                <input
                    type="text"
                    class="add-form-name"
                    placeholder="Введите ваше имя"
                />
                <textarea
                    type="textarea"
                    class="add-form-text"
                    placeholder="Введите ваш коментарий"
                    rows="4"
                ></textarea>
                <div class="add-form-row">
                    <button class="add-form-button">Написать</button>
                </div>
            </div>
            <div class="comment-loading">Комментарий добавляется...</div>`

    const linkToLoginTest = `<p>для отправки комментариев, <span class="link-login">авторизуйтесь</span></p>`

    const baseHtml = `
    <ul class="comments">${commentsHtml}</ul>
    ${linkToLoginTest}
    `

    container.innerHTML = baseHtml

    initLikeListeners(renderComments)
    initReplyListeners()
}

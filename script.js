const inputName = document.querySelector('.add-form-name')
const inputText = document.querySelector('.add-form-text')
const sanitize = (value) => {
    return value.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

const comments = [
    {
        name: 'Глеб Фокин',
        date: new Date(),
        text: 'Это будет первый комментарий на этой странице',
        likes: 3,
        isLiked: false,
    },
    {
        name: 'Варвара Н.',
        date: new Date(),
        text: 'Мне нравится как оформлена эта страница! ❤',
        likes: 75,
        isLiked: true,
    },
]

const renderComments = () => {
    const list = document.querySelector('.comments')
    list.innerHTML = comments
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

    const commentsElements = document.querySelectorAll('.comment')

    for (const commentElement of commentsElements) {
        commentElement.addEventListener('click', () => {
            const currentComment = comments[commentElement.dataset.index]
            inputText.value = `ᐊ ${currentComment.name}: ${currentComment.text} ᐅ`
        })
    }
}

renderComments()

const buttonEl = document.querySelector('.add-form-button')

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

    const newComment = {
        name: sanitize(inputName.value),
        date: new Date(),
        text: sanitize(inputText.value),
        likes: 0,
        isLiked: false,
    }

    comments.push(newComment)
    renderComments()

    inputName.value = ''
    inputText.value = ''
})

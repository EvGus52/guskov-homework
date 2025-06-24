const host = 'https://wedev-api.sky.pro/api/v1/Evgen-Guskov'
export const fetchComments = () => {
    return fetch(host + '/comments')
        .then((response) => {
            return response.json()
        })
        .then((responseData) => {
            return responseData.comments.map((comment) => ({
                name: comment.author.name,
                date: new Date(comment.date),
                text: comment.text,
                likes: comment.likes,
                isLiked: false,
            }))
        })
}

export const addComment = (text, name) => {
    return fetch(host + '/comments', {
        method: 'POST',
        body: JSON.stringify({
            text,
            name,
            forceError: true,
        }),
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error('server error')
            }

            if (response.status === 400) {
                throw new Error('user error')
            }

            if (response.status === 201) {
                return response.json()
            }
        })
        .then(() => {
            return fetchComments()
        })
}

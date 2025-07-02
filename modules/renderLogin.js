import { login, setToken, setName } from './api.js'
import { fetchAndRenderComments } from './index.js'
import { renderRegistration } from './renderRegistration.js'
export const renderLogin = () => {
    const container = document.querySelector('.container')
    const loginHtml = `
<section class="auth-form">
        <h2>Авторизация</h2>
        <form id="loginForm">
            <div class="form-group">
                <label for="username">Логин:</label>
                <input type="text" id="login" name="username" required>
            </div>
            <div class="form-group">
                <label for="password">Пароль:</label>
                <input type="password" id="password" name="password" required>
            </div>
            <div class="auth-buttons">
                <button type="button" class="login-btn ">Войти</button>
                <button type="button" class="register-btn" id="registerBtn">Зарегистрироваться</button>
            </div>
        </form>
    </section>
`
    container.innerHTML = loginHtml

    document.querySelector('.register-btn').addEventListener('click', () => {
        renderRegistration()
    })

    const loginEl = document.querySelector('#login')
    const passwordEl = document.querySelector('#password')
    const submitButtonEl = document.querySelector('.login-btn')

    submitButtonEl.addEventListener('click', () => {
        login(loginEl.value, passwordEl.value)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setToken(data.user.token)
                setName(data.user.name)
                fetchAndRenderComments()
            })
    })
}

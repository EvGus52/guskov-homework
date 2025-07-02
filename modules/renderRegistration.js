import { setToken, setName, registration } from './api.js'
import { fetchAndRenderComments } from './index.js'
import { renderLogin } from './renderLogin.js'
export const renderRegistration = () => {
    const container = document.querySelector('.container')
    const registrationHtml = `
<section class="auth-form">
        <h2>Форма регистрации</h2>
        <form id="loginForm">
        <div class="form-group">
                <label for="user-name">Ваше имя:</label>
                <input type="text" id="name" name="user-name" required>
            </div>
            <div class="form-group">
                <label for="login">Логин:</label>
                <input type="text" id="login" name="login" required>
            </div>
            <div class="form-group">
                <label for="password">Пароль:</label>
                <input type="password" id="password" name="password" required>
            </div>
            <div class="auth-buttons">
                <button type="button" class="register-btn" id="registerBtn">Зарегистрироваться</button>
                <button type="button" class="login-btn">Войти</button>
            </div>
        </form>
    </section>
`
    container.innerHTML = registrationHtml
    document.querySelector('.login-btn').addEventListener('click', () => {
        renderLogin()
    })
    const loginEl = document.querySelector('#login')
    const nameEl = document.querySelector('#name')
    const passwordEl = document.querySelector('#password')
    const submitButtonEl = document.querySelector('.register-btn')

    submitButtonEl.addEventListener('click', () => {
        registration(loginEl.value, nameEl.value, passwordEl.value)
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

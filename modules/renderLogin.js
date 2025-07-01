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
            <div class="buttons">
                <button type="submit" class="login-btn">Войти</button>
                <button type="button" class="register-btn" id="registerBtn">Зарегистрироваться</button>
            </div>
        </form>
    </section>
`
}

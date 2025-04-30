import './app.css'
import './reload.js'

if (
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
) {
  document.body.classList.add('dark')
  document.querySelector('#logo').src = './img/logo-dark.svg'
  document.querySelector('link[rel=icon]').href = './img/favicon-dark.png'
}

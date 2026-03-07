import './app.css'
import './reload.js'

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')

function updateTheme() {
  document.body.classList.toggle('dark', prefersDark.matches)
  document.querySelector('#logo').src = prefersDark.matches ? './img/logo-dark.svg' : './img/logo-light.svg'
  document.querySelector('link[rel=icon]').href = prefersDark.matches ? './img/favicon-dark.png' : './img/favicon-light.png'
}

document.addEventListener('DOMContentLoaded', updateTheme)

prefersDark.addEventListener('change', updateTheme)

import { describe, test, expect, beforeEach, vi } from 'vitest'
import theme from '../src/theme.js'

describe('theme', () => {
  let listeners = {}
  let matchMediaMock

  beforeEach(() => {
    document.body.innerHTML = `
      <img id="logo" />
      <link rel="icon" />
    `

    listeners = {}

    matchMediaMock = {
      matches: false,
      addEventListener: vi.fn((event, cb) => {
        listeners[event] = cb
      })
    }

    window.matchMedia = vi.fn(() => matchMediaMock)
  })

  test('applies light theme on DOMContentLoaded when system is light', () => {
    theme.init()

    document.dispatchEvent(new Event('DOMContentLoaded'))

    const logo = document.querySelector('#logo')
    const favicon = document.querySelector('link[rel=icon]')

    expect(document.body.classList.contains('dark')).toBe(false)
    expect(logo.getAttribute('src')).toBe('./img/logo-light.svg')
    expect(favicon.getAttribute('href')).toBe('./img/favicon-light.png')
  })

  test('applies dark theme when system prefers dark', () => {
    matchMediaMock.matches = true

    theme.init()

    document.dispatchEvent(new Event('DOMContentLoaded'))

    const logo = document.querySelector('#logo')
    const favicon = document.querySelector('link[rel=icon]')

    expect(document.body.classList.contains('dark')).toBe(true)
    expect(logo.getAttribute('src')).toBe('./img/logo-dark.svg')
    expect(favicon.getAttribute('href')).toBe('./img/favicon-dark.png')
  })

  test('updates theme when system preference changes', () => {
    theme.init()

    document.dispatchEvent(new Event('DOMContentLoaded'))

    const logo = document.querySelector('#logo')
    const favicon = document.querySelector('link[rel=icon]')

    matchMediaMock.matches = true
    listeners.change()

    expect(document.body.classList.contains('dark')).toBe(true)
    expect(logo.getAttribute('src')).toBe('./img/logo-dark.svg')
    expect(favicon.getAttribute('href')).toBe('./img/favicon-dark.png')
  })

  test('does not throw if logo or favicon are missing', () => {
    document.body.innerHTML = ''

    theme.init()

    expect(() => {
      document.dispatchEvent(new Event('DOMContentLoaded'))
    }).not.toThrow()
  })
})

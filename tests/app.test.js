import { describe, test, expect, beforeEach, vi } from 'vitest'
import { mount, unmount, flushSync } from 'svelte'
import App from '../src/App.svelte'

describe('App', () => {
  let listeners
  let matchMediaMock

  beforeEach(() => {
    document.body.innerHTML = ''
    document.head.innerHTML = ''

    listeners = {}

    matchMediaMock = {
      matches: false,
      addEventListener: vi.fn((event, cb) => {
        listeners[event] = cb
      }),
      removeEventListener: vi.fn()
    }

    window.matchMedia = vi.fn(() => matchMediaMock)
  })

  test('renders light assets and swaps to dark on system change', () => {
    const app = mount(App, { target: document.body })
    flushSync()

    expect(document.querySelector('#logo').getAttribute('src')).toBe(
      'img/logo-light.svg'
    )
    expect(document.querySelector('link[rel=icon]').getAttribute('href')).toBe(
      'img/favicon-light.png'
    )

    matchMediaMock.matches = true
    listeners.change(new Event('change'))
    flushSync()

    expect(document.querySelector('#logo').getAttribute('src')).toBe(
      'img/logo-dark.svg'
    )
    expect(document.querySelector('link[rel=icon]').getAttribute('href')).toBe(
      'img/favicon-dark.png'
    )

    unmount(app)
  })
})

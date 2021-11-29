import { Controller } from 'stimulus'

/*
 * Make labels and other elements fire click event when Enter or
 * Spacebar are pressed while focused.
 */
export default class extends Controller {
  connect () {
    this._keydown = this._keydown.bind(this)

    this.element.addEventListener('keydown', this._keydown)
  }

  disconnect () {
    this.element.removeEventListener(this._keydown)
  }

  _keydown (event) {
    switch (event.keyCode) {
      case 13:
      case 32:
        break;
      default:
        return
    }

    this.element.click()
  }
}

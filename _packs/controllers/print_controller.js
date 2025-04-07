import { Controller } from 'stimulus'

export default class extends Controller {
  print (event) {
    event.preventDefault();
    event.stopPropagation();

    window.print();
  }
}

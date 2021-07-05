import { Controller } from 'stimulus'
import { Liquid } from 'liquidjs'

const lunr = require("lunr")
const commonmark = require('commonmark')

export default class extends Controller {
  static targets = [ 'q' ]

  get q () {
    if (!this.hasQTarget) return
    if (!this.qTarget.value.trim().length === 0) return

    return this.qTarget.value.trim().replace(':', '').toLowerCase()
  }

  connect () {
    this.params = new URLSearchParams(window.location.search)

    if (this.params.has(this.qTarget.name)) {
      this.qTarget.value = this.params.get(this.qTarget.name)
      this.search()
    }
  }

  async search (event) {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }

    this.formDisable = true

    const q = this.q
    if (q) {
      await this.fetch()

      if (!window.index) return
    } else {
      return
    }

    const main = document.querySelector('#results')
    const count = document.querySelector('[data-search-target="count"]')
    const breadcrumb = document.querySelector('[data-search-target="breadcrumb"]')
    const results = window.index.search(q).map(r => window.data.find(a => a.id == r.ref))
    const request = await fetch('/assets/templates/results.html')
    const template = await request.text()

    const match = new RegExp(`(?<q>${q})`, 'ig')

    // TODO: Pagination
    for (const i in results) {
      // Find the first paragraph with a match or return the first
      // paragraph by default.  Discard the full content.
      const ps = results[i].content.split("\n")
      const p = (ps.find(p => p.match(match)) || ps[0])

      results[i].title = results[i].title.replaceAll(match, "<mark>$<q></mark>")
      results[i].content = this.markdown(p, q)
    }

    const html = await this.engine.parseAndRender(template, { q, results })
    const title = `Keywords - Search results - ${q}`

    document.title = title

    if (count) count.innerText = `${results.length} results found`
    if (breadcrumb) breadcrumb.innerText = q

    main.innerHTML = html
    this.formDisable = false
  }

  async fetch () {
    if (this.fetching) return

    this.fetching = true
    let response

    if (!window.data) {
      response = await fetch('/data.json')
      const data = await response.json()
      window.data = data
    }

    if (!window.index) {
      response = await fetch('/idx.json')
      const idx = await response.json()
      window.index = lunr.Index.load(idx)
    }

    this.fetching = false
  }

  set formDisable (disable) {
    this.element.elements.forEach(x => x.disabled = disable)
  }

  /*
   * Liquid renderer
   *
   * @return Liquid
   */
  get engine () {
    if (!window.liquid) window.liquid = new Liquid()

    return window.liquid
  }

  async site () {
    if (!window.site) {
      const data = await fetch('assets/data/site.json')
      window.site = await data.json()
    }

    return window.site
  }

  markdown (string, highlight = undefined) {
    if (!this._reader) this._reader = new commonmark.Parser({ smart: true })
    if (!this._writer) this._writer = new commonmark.HtmlRenderer()

    const tree = this._reader.parse(string)

    if (highlight) {
      const walker = tree.walker()
      const match = new RegExp(`(?<highlight>${highlight})`, 'gi')
      let event
      let node

      // We have to walk every text node and replace their text with a
      // new node containing the highlight text.
      while ((event = walker.next())) {
        if (!event.entering) continue
        console.log(event.node)
        if (event.node.type !== 'text') continue
        if (!event.node.literal.match(match)) continue

        node = new commonmark.Node('custom_inline')
        node.onEnter = event.node.literal.replaceAll(match, `<mark>${highlight}</mark>`)

        event.node.insertBefore(node)
        event.node.unlink()
      }
    }

    return this._writer.render(tree)
  }
}

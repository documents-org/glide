import { warn } from '../utils/log'
import { exist } from '../utils/dom'
import { define } from '../utils/object'
import { isString } from '../utils/unit'
import { NO_SLIDES_ERROR } from '../errors'

const TRACK_SELECTOR = '[data-glide-el="track"]'

export default function (Glide, Components) {
  const Html = {
    /**
     * Setup slider HTML nodes.
     *
     * @param {Glide} glide
     */
    mount () {
      this.root = Glide.selector
      this.track = this.root.querySelector(TRACK_SELECTOR)
      const slides = Array.prototype.slice.call(this.wrapper.children).filter((slide) => {
        return !slide.classList.contains(Glide.settings.classes.slide.clone)
      })
      if (slides.length > 0) {
        this.slides = slides
      } else {
        throw new Error(NO_SLIDES_ERROR)
      }
    }
  }

  define(Html, 'root', {
    /**
     * Gets node of the glide main element.
     *
     * @return {Object}
     */
    get () {
      return Html._r
    },

    /**
     * Sets node of the glide main element.
     *
     * @return {Object}
     */
    set (r) {
      if (isString(r)) {
        r = document.querySelector(r)
      }

      if (exist(r)) {
        Html._r = r
      } else {
        warn('Root element must be a existing Html node')
      }
    }
  })

  define(Html, 'track', {
    /**
     * Gets node of the glide track with slides.
     *
     * @return {Object}
     */
    get () {
      return Html._t
    },

    /**
     * Sets node of the glide track with slides.
     *
     * @return {Object}
     */
    set (t) {
      if (exist(t)) {
        Html._t = t
      } else {
        warn(`Could not find track element. Please use ${TRACK_SELECTOR} attribute.`)
      }
    }
  })

  define(Html, 'wrapper', {
    /**
     * Gets node of the slides wrapper.
     *
     * @return {Object}
     */
    get () {
      return Html.track.children[0]
    }
  })

  return Html
}

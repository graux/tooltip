import classNames from 'classnames'

import './style.scss'

export default {
  name: 'tooltip',
  abstract: true,

  props: {
    type: String,
    size: {
      type: String,
      default: 'medium',
      validator: function (value) {
        return ['small', 'medium', 'large'].includes(value)
      }
    },
    always: Boolean,
    noAnimate: Boolean,
    rounded: Boolean,
    label: {
      type: String,
      default: ''
    },
    placement: {
      type: String,
      default: 'bottom'
    }
  },

  render: function () {
    var children = this.$slots.default
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) {return c.tag})
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    var rawChild = children[0]

    rawChild.data.attrs = rawChild.data.attrs || {}
    Object.assign(rawChild.data.attrs, {
      'aria-label': this.label
    })

    var typeKey = 'tooltip--' + this.type
    var sizeKey = 'tooltip--' + this.size
    rawChild.data.class = Array.isArray(rawChild.data.class) ? rawChild.data.class : [rawChild.data.class]
    rawChild.data.class.push(classNames(
      'tooltip',
      'tooltip--' + this.placement,
      {
        typeKey: this.type,
        sizeKey: this.size,
        'tooltip--rounded': this.rounded,
        'tooltip--always': this.always,
        'tooltip--no-animate': this.noAnimate
      }
    ))

    return rawChild
  },

  watch: {
    label: function (val) {
      this.$el.setAttribute('aria-label', val)
    }
  }
}

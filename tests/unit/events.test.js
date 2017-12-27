import EventsBinder from '../../src/core/event/events-binder'

let events = null
let event = 'click'
let callback = jest.fn()
let element = document.createElement('div')

describe('EventsBinder should', () => {
  beforeEach(() => {
    events = new EventsBinder()
  })

  test('create and remove event listener from element', () => {
    let addFn = jest.fn()
    let rmFn = jest.fn()

    element.addEventListener = addFn
    element.removeEventListener = rmFn

    events.on(event, element, callback)
    expect(addFn).toHaveBeenCalledWith(event, callback)

    events.off(event, element)
    expect(rmFn).toHaveBeenCalledWith(event, callback)
  })

  test('store created listeners when binding with `on`', () => {
    events.on(event, element, callback)

    expect(events.listeners).toHaveProperty(event)
    expect(events.listeners[event]).toBe(callback)
  })

  test('remove previously stored listeners when unbinding with `off`', () => {
    events.on(event, element, callback)
    events.off(event, element)

    expect(events.listeners).not.toHaveProperty(event)
  })
})
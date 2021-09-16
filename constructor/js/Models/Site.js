export class Site {
    constructor(selector, callback) {
        this.$el = document.querySelector(selector)
        this.callback = callback
    }

    init(model) {
        this.$el.innerHTML = ''
        this.$el.append(model.createHTML())
    }
}
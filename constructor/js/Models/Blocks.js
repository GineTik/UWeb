import {stringStyleToObject, styleStringToArray, css} from './../untils.js'

export class Block {
    constructor(content='block', options={}) {
        this.content = content
        this.options = options


        let styles = this.#getStandartStyle()
        if (this.options.styles != null && typeof this.options.styles == 'string') {
            this.options.styles = stringStyleToObject(this.options.styles)
        }
        
        this.setStyle(Object.assign({}, styles, this.options.styles))
    }
    #getStandartStyle() {
        return {
            display: 'auto',
            width: 'auto',
            height: 'auto',
            margin: ['0', '0', '0', '0'],
            padding: ['0', '0', '0', '0'],
            background: 'transparent',
            color: '#000000',
        }
    }

    createHTML() {
        throw new Error('метод #createHTML должен быть реализован!')
    }

    getHTML() {
        return this.elem
    }

    setStyle(styles) {
        if(styles != null) {
            styles = styleStringToArray(styles)
            this.options.styles = styleStringToArray(styles)

            if (this.elem != null) {
                let s = css(Object.assign({}, styles))
                for(let key in s) {
                    this.elem.style[key] = s[key]
                }
            }
        }
    }


    callback = {
        click: function(event) {
            if (event.target == this.elem) {
                if (Block.selected != null) {
                    Block.selected.elem.style['outline'] = '0';
                }
                this.elem.style['outline'] = this.options.outlineStyle ?? '1px solid blue'
                Block.selected = this;

                if(this.options.click_callback != null) {
                    this.options.click_callback(this);
                }
            }
        }
    }
}

class TextBlock extends Block {
    constructor(content='text', options={}) {
        super(content, options)
    }

    createHTML() {
        this.elem = document.createElement(this.options.tag ?? 'span')
        this.elem.innerHTML = this.content
        if(this.options != {} && this.options.styles != null) {
            this.setStyle(this.options.styles)
        }
        this.elem.onclick = this.callback.click.bind(this)
        
        return this.getHTML()
    }
}
class BoxBlock extends Block {
    constructor(content=[], options={}) {
        if(!Array.isArray(content)) {
            super([content], options)
        } else {
            super(content, options)
        }
    }

    createHTML() {
        this.elem = document.createElement('div')
        if(this.options != {} && this.options.styles != null) {
            this.setStyle(this.options.styles)
        }
        for (var i = 0; i < this.content.length; i++) {
            this.elem.append(this.content[i].createHTML());
        }
        this.elem.onclick = this.callback.click.bind(this)

        return this.getHTML()
    }

    addChild(block) {
        this.content.push(block)
    }
}

class LinkBlock extends Block {
    constructor(content='Ссылка', options={}) {
        options.href = options.href ?? '#';
        super(content, options)
    }

    createHTML() {
        this.elem = document.createElement('a')
        this.elem.innerHTML = this.content
        if(this.options != {} && this.options.styles != null) {
            this.setStyle(this.options.styles)
        }
        this.elem.href = this.options.href
        this.elem.target = '_blank'
        this.elem.onclick = this.callback.click.bind(this)

        return this.getHTML()
    }
}

export var blocks = {
    TextBlock,
    BoxBlock,
    LinkBlock
}
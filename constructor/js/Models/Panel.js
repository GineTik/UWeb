import {blocks, Block} from './Blocks.js'
import {styleStringToArray} from './../untils.js'

export default class Panel {
    constructor(selector) {
        this.$panel = document.querySelector(selector)
        this.$form = document.getElementById('autocreatepanel');
        this.$form.addEventListener('submit', this.callback.submit)
    }

    setPanelForm(block) {
        this.$form.innerHTML = ''
        if (block != null) {
            this.$form.innerHTML += this.elements.form(block)
        } else {
            document.getElementById('removeBlockButton').style.display = 'none'
        }
    }

    elements = {
        form: function(block) {
            let form = `
            <button type='submit' class='btn btn-outline-primary mb-3 w-100'>сохранить</button>
                <div class="style-element">
                    <h5>margin</h5>
                    <div class="form-group d-flex">
                        <input type="text" class="form-control form-control-sm border-standart" name="margin" value="${block.options.styles.margin[0]}">
                        <input type="text" class="form-control form-control-sm border-standart" name="margin" value="${block.options.styles.margin[1]}">
                        <input type="text" class="form-control form-control-sm border-standart" name="margin" value="${block.options.styles.margin[2]}">
                        <input type="text" class="form-control form-control-sm border-standart" name="margin" value="${block.options.styles.margin[3]}">
                    </div>
                </div>
                <div class="style-element">
                    <h5>padding</h5>
                    <div class="form-group d-flex">
                        <input type="text" class="form-control form-control-sm border-standart" name="padding" value="${block.options.styles.padding[0]}">
                        <input type="text" class="form-control form-control-sm border-standart" name="padding" value="${block.options.styles.padding[1]}">
                        <input type="text" class="form-control form-control-sm border-standart" name="padding" value="${block.options.styles.padding[2]}">
                        <input type="text" class="form-control form-control-sm border-standart" name="padding" value="${block.options.styles.padding[3]}">
                    </div>
                </div>
                <div class="style-element">
                    <div class="border-standart w-100 d-flex justify-content-between align-items-center">
                        <h5>background</h5>
                        <input type="color" name="background" value="${block.options.styles.background}">
                    </div>
                </div>
            `

            if (!(block instanceof blocks.BoxBlock)) {
                form += `
                    <div class="style-element">
                        <div class="border-standart w-100 d-flex justify-content-between align-items-center">
                            <h5>color text</h5>
                            <input type="color" name="color" value="${block.options.styles.color}">
                        </div>
                    </div>
                `
            }

            return form
        }
    }
    
    

    callback = {
        submit: function(e) {
            e.preventDefault()
        
            let styles = {}
            let lastIndex = e.target.elements.length

            for (let i = 1; i < lastIndex; i++) {
                if (styles[e.target.elements[i].name] == null) 
                    styles[e.target.elements[i].name] = ''

                styles[e.target.elements[i].name] += e.target.elements[i].value + ' ';
            }
            for (let key in styles) {
                styles[key] = styles[key].slice(0, -1)
            }
            
            Block.selected.setStyle(styles)
        }
    }
}
import { blocks } from "./Models/Blocks.js";

export function css(styles) {
    let copy = Object.assign({}, styles)
    for(let key in copy) {
        if (copy[key] instanceof Array) {
            copy[key] = copy[key].join(' ')
        }
    }
    return copy
}


export function stringStyleToObject(styleString) {
    if (styleString != null && typeof styleString == 'string') {
        let stylesArr = styleString.replace(/\;\s*$/, '').split(';').map(item => item = item.split(':'))
        let styles = {}
        for(let i = 0; i < stylesArr.length; i++) {
            stylesArr[i][1] = stylesArr[i][1].replace(/^\s/, '').split(' ')
            styles[stylesArr[i][0].replace(/^\s/, '')] = stylesArr[i][1]
        }
        return styles
    } else {
        return styleString ?? {}
    }
}

export function styleArrayToString(styles) {
    let copy = Object.assign({}, styles)
    for(let key in copy) {
        if (copy[key] instanceof Array) {
            copy[key] = copy[key].join(' ')
        }
    }
    return copy 
} 
export function styleStringToArray(styles) {
    let copy = Object.assign({}, styles)
    for(let key in copy) {
        if(!(copy[key] instanceof Array)) {
            copy[key] = copy[key].split(' ')
        }
    }
    return copy 
} 


// функция которая превращает элемент и его детей в клас блока
export function ElementToBlock(elem) {
    return addChildren(elem, window.model);
}

// функция которая превращает только передаваемый элемент в клас блока 
export function getBlockFrom(elem) {
    let options = Object.assign({}, elem.dataset)
    options.click_callback = window.panelManipulation
    return new blocks[elem.dataset.class](elem.dataset.content,options) 
}

function addChildren(elem, parent) {

    var block = getBlockFrom(elem)
    block.parent = parent

    
        // console.log(elem, elem.children, elem.dataset.class);
    var children = []
    for(let i = 0; i < elem.children.length; i++) {
        children.push(addChildren(elem.children[i], block))
    }

    if(children.length > 0) {
        block.content = children;
    }

    return block;
}
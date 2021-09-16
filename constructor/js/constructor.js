import {blocks, Block} from './Models/Blocks.js'
import Panel from './Models/Panel.js'
import {Site} from './Models/Site.js'
import {ElementToBlock, getBlockFrom} from './untils.js'

window.model = new blocks.BoxBlock([], {
    styles: {
        'min-width': '100%',
        'min-height': '100%'
    },
    outlineStyle: '0',
    click_callback: function() {
        document.querySelector('#autocreatepanel').innerHTML = ''
        document.getElementById('addBlockButton').style.display = 'block'
        document.getElementById('removeBlockButton').style.display = 'none'
    }
})

function removeBlock() {
    console.log(Block.selected);

    let children = Block.selected.parent.content
    for (let index = 0; index < children.length; index++) {
        if (Block.selected == children[index]) {
            children.splice(index, 1)
        }
    }

    console.log(children);
    Block.selected = null
    panel.setPanelForm(null)
    site.init(model)
}

window.panelManipulation = panelManipulation
function panelManipulation(block) {
    if (Block.selected instanceof blocks.BoxBlock) {
        document.getElementById('addBlockButton').style.display = 'block'
    } else {
        document.getElementById('addBlockButton').style.display = 'none'
    }
    document.getElementById('removeBlockButton').style.display = 'block'

    panel.setPanelForm(block)
}

function addBlock(event) {
    if(Block.selected != null && Block.selected instanceof blocks.BoxBlock) {
        Block.selected.addChild(ElementToBlock(event.target))
    } else {
        model.content.push(ElementToBlock(event.target))
    }
    site.init(model)
    document.getElementById('closeBtn-elements').click()
}

let site, panel;
window.onload = function() {
    document.getElementById('removeBlockButton').style.display = 'none'
    document.getElementById('removeBlockButton').onclick = removeBlock

    site = new Site("#site", addBlock)
    site.init(model)

    panel = new Panel('#autocreatepanel')
    
    document.querySelectorAll('.element').forEach($el => {
        $el.addEventListener('click', addBlock)
    })
}




























// import ElementsManager from "./Models/ElementsManager.js";


// window.onload = function() {
//     var em = new ElementsManager(window.frames[0].document);
//     document.querySelectorAll('.element').forEach((e) => {
//         e.onclick = function() {
//             var attributes = {};
//             if(e.dataset.href != null) {
//                 attributes.href = e.dataset.href;
//             }
//             var element = em.createElement(e.dataset.tag, e.innerHTML, attributes);
            
//             console.log(element);
//             em.add(element);
//             console.log(em);
//         }
//     });
// }
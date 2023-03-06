function makeItHTML(markdown) {

    // let bindings = Object.keys(classMap)
    //     .map(key => ({
    //         type: 'output',
    //         regex: new RegExp(`<${key}(.*)>`, 'g'),
    //         replace: `<${key} class="${classMap[key]}" $1>`
    //     }));
    d = document.createElement("div")
    md = new showdown.Converter({
        //extensions: [...bindings]
    })
    ht = md.makeHtml(markdown)
    mdht = document.createElement("div")
    mdht.innerHTML = ht
    d.appendChild(mdht)
    d.appendChild(document.createElement("br"))
    return d
}
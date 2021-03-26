this.document.addEventListener("DOMContentLoaded", () =>{ //mads please help :) skal der stå "this."
//Dette vil være main
    let para = this.document.createElement("P");
    para.innerText = "This is a paragraph.";
    this.document.body.appendChild(para);
    //let svg = SVGAElement() undersøg dette
    console.log("Hej");
});

import { addImageSection, addTextSection, addTitleSection } = './utils/helpers.js'

class Renderer {
    constructor(parsedXmlJson){
    
    }
}

class HtmlRenderer extends Renderer {
    constructor(parsedXmlJson, options){
        super(parsedXmlJson);
    }
}

HtmlRenderer.prototype.renderStyle = function (styleContent) {
        var styleElement = document.createElement("style");
        styleElement.type = "text/css";
        styleElement.innerHTML = styleContent;
        return styleElement;
};
    
HtmlRenderer.prototype.renderStyles = function (styles) {
        var styleText = "";
        this.processStyles(styles);
        for (var _i = 0, styles_4 = styles; _i < styles_4.length; _i++) {
            var style = styles_4[_i];
            for (var _a = 0, _b = style.styles; _a < _b.length; _a++) {
                var subStyle = _b[_a];
                var selector = "";
                if (style.target == subStyle.target)
                    selector += style.target + "." + style.id;
                else if (style.target)
                    selector += style.target + "." + style.id + " " + subStyle.target;
                else
                    selector += "." + style.id + " " + subStyle.target;
                if (style.isDefault && style.target)
                    selector = "." + this.className + " " + style.target + ", " + selector;
                styleText += this.styleToString(selector, subStyle.values);
            }
        }
        return this.renderStyle(styleText);
};
    
HtmlRenderer.prototype.renderElement = function (elem, parent) {
        switch (elem.domType) {
            case dom_1.DomType.Paragraph:
                return this.renderParagraph(elem);
            case dom_1.DomType.Run:
                return this.renderRun(elem);
            case dom_1.DomType.Table:
                return this.renderTable(elem);
            case dom_1.DomType.Row:
                return this.renderTableRow(elem);
            case dom_1.DomType.Cell:
                return this.renderTableCell(elem);
            case dom_1.DomType.Hyperlink:
                return this.renderHyperlink(elem);
            case dom_1.DomType.Drawing:
                return this.renderDrawing(elem);
            case dom_1.DomType.Image:
                return this.renderImage(elem);
        }
        return null;
  };

  HtmlRenderer.prototype.renderChildren = function (elem, target = document.createDocumentFragment()) {
        var _this = this;
        var result = null;
        if (elem.children != null)
            result = elem.children.map(function (x) { return _this.renderElement(x, elem); }).filter(function (x) { return x != null; });
        if (target && result)
            result.forEach(function (x) { return target.appendChild(x); });
      
        return result;
    };

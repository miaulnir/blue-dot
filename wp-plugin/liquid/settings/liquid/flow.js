jQuery("#hw-item-4444 a").on("click", function(){
    var range = getSelection().getRangeAt(0), 
    rootNode = range.commonAncestorContainer,
    startNode = range.startContainer,
    endNode = range.endContainer,
    startOffset = range.startOffset,
    endOffset = range.endOffset,
    pastStartNode = false,
    reachedEndNode = false,
    textNodes = [];
    
    function getTextNodes(node) {
        if(node){
            var val = node.nodeValue;
            if(node == startNode && node == endNode && node !== rootNode) {
                if(val) textNodes.push(val);
                    pastStartNode = reachedEndNode = true;
                    node.parentNode.innerHTML = node.parentNode.textContent.replace(/,[ \t\l\f]*[\n\r]*/g, ",<br>").replace(/[\.]+\s[ \t\l\f]*[\n\r]*/g, ".<br><br>").replace(/[\?]+\s[ \t\l\f]*[\n\r]*/g, "?<br><br>").replace(/[\!]+\s[ \t\l\f]*[\n\r]*/g, "!<br><br>");
            }else if(node == startNode) {
                if(val) textNodes.push(val);
                    pastStartNode = true;
										node.parentNode.innerHTML = node.parentNode.textContent.replace(/,[ \t\l\f]*[\n\r]*/g, ",<br>").replace(/[\.]+\s[ \t\l\f]*[\n\r]*/g, ".<br><br>").replace(/[\?]+\s[ \t\l\f]*[\n\r]*/g, "?<br><br>").replace(/[\!]+\s[ \t\l\f]*[\n\r]*/g, "!<br><br>");
            }else if(node == endNode) {
                if(val) textNodes.push(val);
                    reachedEndNode = true;
                    node.parentNode.innerHTML = node.parentNode.textContent.replace(/,[ \t\l\f]*[\n\r]*/g, ",<br>").replace(/[\.]+\s[ \t\l\f]*[\n\r]*/g, ".<br><br>").replace(/[\?]+\s[ \t\l\f]*[\n\r]*/g, "?<br><br>").replace(/[\!]+\s[ \t\l\f]*[\n\r]*/g, "!<br><br>");
            }else if(node.nodeType == 3) {
                if(val && pastStartNode && !reachedEndNode && !/^\s*$/.test(val)) {
                    textNodes.push(val);
                   node.parentNode.innerHTML = node.parentNode.textContent.replace(/,[ \t\l\f]*[\n\r]*/g, ",<br>").replace(/[\.]+\s[ \t\l\f]*[\n\r]*/g, ".<br><br>").replace(/[\?]+\s[ \t\l\f]*[\n\r]*/g, "?<br><br>").replace(/[\!]+\s[ \t\l\f]*[\n\r]*/g, "!<br><br>");     
                }
            }
        }
        for(var i = 0, len = node.childNodes.length; !reachedEndNode && i < len; ++i) {
            getTextNodes(node.childNodes[i]);
        }
    }
  
    getTextNodes(rootNode);
    return textNodes; 
});
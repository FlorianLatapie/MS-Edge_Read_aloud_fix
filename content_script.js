function walk(rootNode) {
    addAttributes(rootNode);

    var walker = document.createTreeWalker(
        rootNode,
        NodeFilter.SHOW_TEXT,
        null,
        false
    ),
        node;

    while (node = walker.nextNode()) {
        handleText(node);
    }
}

function handleText(textNode) {
    textNode.nodeValue = replaceText(textNode.nodeValue);
}

function replaceText(v) {
    // goat project : https://github.com/codebox/homoglyph/blob/master/raw_data/chars.txt
    
    v = v.replaceAll("(H/F)", "");

    // v = v.replaceAll("->", "➡️");
    v = v.replaceAll("-->", "--˃");
    v = v.replaceAll("->", "→"); // silent
    v = v.replaceAll("=>", "⇒"); // silent

    v = v.replaceAll(">", "˃"); 
    v = v.replaceAll("<", "˂");     
    // v = v.replaceAll("/", "／"); // silent
    // v = v.replaceAll("/", "∕"); // says "division slash"
    // v = v.replaceAll("/", "⁄"); // says "forward slash"
    // v = v.replaceAll("/", "⧸"); // says "big solidus"
    // v = v.replaceAll("/", "⫽"); // says "double solidus operator"
    v = v.replaceAll("/", "᜵"); // U+1735 silent
   

    v = v.replaceAll("&&", "∧"); // says "and"
    v = v.replaceAll("||", "∨"); // says "or"

    v = v.replaceAll("&", "＆"); // U+FF06 silent

    // v = v.replaceAll("{", "｛"); // U+FF5B silent
    v = v.replaceAll("{", "⦃");     // U+2983 silent
    // v = v.replaceAll("}", "｝"); // U+FF5D silent
    v = v.replaceAll("}", "⦄");     // U+2984 silent

    v = v.replaceAll("_", "ߺ"); 
    
    // v = v.replaceAll("*", "★"); // \bigstar silent
    // v = v.replaceAll("*", "⋆"); // \star says "star operator"
    // v = v.replaceAll("*", "☆"); // U+2606 silent 
    // v = v.replaceAll("*", "⭐️"); // U+2B50 says "white medium star"
    // v = v.replaceAll("*", "★"); // U+2605 silent
    v = v.replaceAll("*", "✱"); // U+2731 silent  

    return v;
}

function isForbiddenNode(node) {
    return node.isContentEditable ||
        !(node instanceof Element) || 
        (node.parentNode && node.parentNode.isContentEditable) ||
        (node.tagName && (node.tagName.toLowerCase() == "textarea" || node.tagName.toLowerCase() == "input"));
}

function observerCallback(mutations) {
    var i, node;

    mutations.forEach(function (mutation) {
        for (i = 0; i < mutation.addedNodes.length; i++) {
            node = mutation.addedNodes[i];
            if (isForbiddenNode(node)) {
                continue;
            } else if (node.nodeType === Node.TEXT_NODE) {
                handleText(node);
            } else {
                walk(node);
            }
        }
    });
}

function walkAndObserve(doc) {
    var docTitle = doc.getElementsByTagName('title')[0],
        observerConfig = {
            characterData: true,
            childList: true,
            subtree: true
        },
        bodyObserver, titleObserver;

    walk(doc.body);
    doc.title = replaceText(doc.title);

    bodyObserver = new MutationObserver(observerCallback);
    bodyObserver.observe(doc.body, observerConfig);

    if (docTitle) {
        titleObserver = new MutationObserver(observerCallback);
        titleObserver.observe(docTitle, observerConfig);
    }
}

function addAttributes(rootNode) {
    if (!rootNode){
        console.log("rootNode is null");
        console.log(rootNode);
        console.error("rootNode is null");
        console.error(rootNode);
        return;
    }
    const makeHiddenClassNames = [
        'gutter', 
        "chat-metrics", 
        "footer-terms", 
        "col-lg-4 side-content", 
        "field field--name-field-reference field--type-string field--label-visually_hidden",
        "blue-cube"
    ];
    makeHiddenClassNames.forEach(className => {
        const classList = rootNode.getElementsByClassName(className);
        for (let i = 0; i < classList.length; i++) {
            classList[i].setAttribute('aria-hidden', 'true');
        }
    });

    const commentClassNames = ['hljs-comment', 'comment'];
    
    commentClassNames.forEach(className => {
        const commentClass = rootNode.getElementsByClassName(className);
        for (let i = 0; i < commentClass.length; i++) {
            let original_html = commentClass[i].innerHTML;
            const original_html_len = original_html.length;
    
            let new_html = replaceText(original_html.trim().substring(2).replaceAll("*/", ""));
            const new_html_len = new_html.length;
            commentClass[i].innerHTML = " ".repeat(original_html_len - new_html_len) + new_html;
        }
    });
}

// main
walkAndObserve(document);

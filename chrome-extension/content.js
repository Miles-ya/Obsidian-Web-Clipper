(() => {
    const selection = window.getSelection().toString().trim();
    const title = document.title;
    const url = window.location.href;
    const content = document.body.innerText;

    const data = {
        title: title,
        url: url,
        selection: selection,
        content: content
    };

    chrome.runtime.sendMessage({ action: "sendData", data: data });
})();
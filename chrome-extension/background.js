chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "save-to-obsidian",
        title: "Save to Obsidian",
        contexts: ["page", "selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "save-to-obsidian") {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['content.js']
        });
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "sendData") {
        console.log("Forwarding data to local server:", request.data);
        fetch("http://127.0.0.1:3000/clip", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request.data),
        })
        .then(response => response.json())
        .then(data => {
            console.log("Server response:", data);
            // Optional: Show a notification to the user
        })
        .catch(error => {
            console.error("Error sending data to server:", error);
            // Optional: Show an error notification
        });
    }
});

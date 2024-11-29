chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ theme: 'system' });
});

chrome.runtime.onStartup.addListener(() => {
    chrome.storage.sync.set({ theme: 'system' });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getTheme') {
        chrome.storage.sync.get("theme", (data) => {
            sendResponse({ theme: data.theme || 'system' });
        });
        return true;
    }
});

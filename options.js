const themeSelector = document.getElementById('themeSelector');
const applyButton = document.getElementById('applyButton');

chrome.storage.sync.get('theme', (data) => {
    const theme = data.theme || 'system';
    themeSelector.value = theme;
});

themeSelector.addEventListener('change', (event) => {
    const selectedTheme = event.target.value;
    chrome.storage.sync.set({ theme: selectedTheme }, () => {
        console.log(`主题设置为: ${selectedTheme}`);
    });
});

applyButton.addEventListener('click', () => {
    const selectedTheme = themeSelector.value;
    chrome.storage.sync.set({ theme: selectedTheme }, () => {
        console.log(`主题设置已保存: ${selectedTheme}`);

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.reload(tabs[0].id);
        });
    });
});

chrome.action.onClicked.addListener(
    (tab) => {
        if (tab.url.includes('youtube.com/shorts/')){
            chrome.tabs.create({ url: tab.url.replace('shorts/', 'watch?v=') });
        }
    }
);


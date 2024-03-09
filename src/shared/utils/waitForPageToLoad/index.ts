export const waitForPageToLoad = (tabId: number) => {
    return new Promise<void>(r => {
        chrome.tabs.get(tabId, function (tab) {
            if (tab.status === 'complete') {
                r();
            } else {
                const onTabUpdate = (tabId: number, changeInfo: chrome.tabs.TabChangeInfo) => {
                    if (changeInfo.status === 'complete') {
                        chrome.tabs.onUpdated.removeListener(onTabUpdate);

                        r();
                    }
                }
                chrome.tabs.onUpdated.addListener(onTabUpdate);
            }
        });
    })
}
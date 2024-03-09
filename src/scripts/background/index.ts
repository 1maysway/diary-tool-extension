import {
  listenMessages,
  APP_STORAGE_PATHS,
  defaultLogins,
  defaultSettings, defaultStands, SelectedData,
} from '../../shared';

listenMessages('background');

chrome.runtime.onInstalled.addListener((details) => {
  if ('install' == details.reason) {
    chrome.storage.local.set({
      [APP_STORAGE_PATHS.settings]: defaultSettings,
      [APP_STORAGE_PATHS.logins]: defaultLogins,
      [APP_STORAGE_PATHS.stands]: defaultStands,
    });
  }
});

const onTabRemoved = async (closedTabId: number) => {
  const storedData = await chrome.storage.local.get(APP_STORAGE_PATHS.selectedData);
  const selectedData: SelectedData | undefined = storedData[APP_STORAGE_PATHS.selectedData];

  if (closedTabId === selectedData?.workTabId) {
    chrome.storage.local.remove([
      APP_STORAGE_PATHS.selectedData,
      APP_STORAGE_PATHS.hasEnteredLogin,
    ]);
  }
};

chrome.tabs.onRemoved.addListener(onTabRemoved);

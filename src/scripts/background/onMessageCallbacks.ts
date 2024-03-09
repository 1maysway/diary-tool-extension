import {
  APP_STORAGE_PATHS,
  LoginData,
  Stand,
  sendMessagePage,
  AppSettingsValues,
  delay,
  COOKIE_KEYS, appHref, VisualActionProps, SelectedData
} from '../../shared';
import {AUTH_STATUSES} from '../content/config/enums';
import {clearCookiesForAuth} from "../../shared/utils/clearCookiesForAuth";
import {waitForPageToLoad} from "../../shared/utils/waitForPageToLoad";


async function idle() {
  const storedData = await chrome.storage.local
    .get([
      APP_STORAGE_PATHS.logins, APP_STORAGE_PATHS.stands,
      APP_STORAGE_PATHS.selectedData, APP_STORAGE_PATHS.settings,
      APP_STORAGE_PATHS.hasEnteredLogin, APP_STORAGE_PATHS.visualActionProps,
    ]);

  const selectedData: SelectedData = storedData[APP_STORAGE_PATHS.selectedData];

  if (!selectedData) {
    return;
  }

  const logins: LoginData[] = storedData[APP_STORAGE_PATHS.logins];
  const stands: Stand[] = storedData[APP_STORAGE_PATHS.stands];
  const settings: AppSettingsValues = storedData[APP_STORAGE_PATHS.settings];
  const hasEnteredLogin: boolean | undefined = storedData[APP_STORAGE_PATHS.hasEnteredLogin];
  const visualActionProps: VisualActionProps = storedData[APP_STORAGE_PATHS.visualActionProps];

  const selectedLogin = logins.find(login => login.id === selectedData.loginId);
  const selectedStand = stands.find(stand => stand.id === selectedData.standId);

  if (this?.sender.tab.id === selectedData.workTabId) {
    const url = new URL(this?.sender.url);

    if (!url.hostname.includes('login') && hasEnteredLogin) {
      const authToken = url.searchParams.get('token') || (await chrome.cookies.get({
        name: 'aupd_token',
        url: 'https://mos.ru',
      }))?.value;

      console.log('token', authToken);

      const selectedStandUrl = settings.useDiaryUrl ? selectedStand.diaryUrl : selectedStand.url;
      const standCallbackUrl = new URL(settings.useDiaryUrl ? selectedStand.diaryUrl + selectedStand.diaryMainPath : selectedStand.url + selectedStand.mainPath);

      console.log('urls', standCallbackUrl, url);

      if (authToken) {
        chrome.tabs.remove(selectedData.workTabId);

        await clearCookiesForAuth(selectedStand);

        const selectedLoginStand = selectedLogin.stands.find(stand => stand.id === selectedData.standId);
        selectedLoginStand.authToken = authToken;

        chrome.storage.local.set({
          [APP_STORAGE_PATHS.logins]: logins,
        });

        const isCallbackStand = selectedData.customData.callbackUrl === selectedStandUrl;

        const baseCookie = {
          value: authToken,
          expirationDate: Date.now() + 1000 * 60 * 60 * 24 * 365,
        };

        if (isCallbackStand) {
          await chrome.cookies.set({
            ...baseCookie,
            name: 'aupd_token',
            url: settings.useDiaryUrl ? selectedStand.diaryUrl : selectedStand.url,
          });
        }

        await chrome.cookies.set({
          ...baseCookie,
          name: 'auth_token',
          url: selectedData.customData.callbackUrl,
        });

        const callbackUrl = new URL(isCallbackStand ? standCallbackUrl : selectedData.customData.callbackUrl);
        const newTab = await chrome.tabs.create({});

        if (isCallbackStand && !settings.useDiaryUrl && newTab.id) {
          await chrome.storage.local.set({
            [APP_STORAGE_PATHS.selectedData]: {
              ...selectedData,
              workTabId: newTab.id,
            },
          });

          await chrome.tabs.update(newTab.id, {
            url: callbackUrl.href,
          });

          await waitForPageToLoad(newTab.id);

          await chrome.storage.local.remove([
            APP_STORAGE_PATHS.selectedData,
            APP_STORAGE_PATHS.hasEnteredLogin,
            APP_STORAGE_PATHS.visualActionProps
          ]);

          await sendMessagePage('content', 'rewriteStoredUser', {}, selectedStand);
        } else {
          await chrome.tabs.update(newTab.id, {
            url: callbackUrl.href,
          });
        }

        return;
      }
    }

    if (hasEnteredLogin) {
      return;
    }

    const res =
        await sendMessagePage('content', 'start', {}, selectedLogin, visualActionProps);

    console.log('start res', res)

    switch (res) {
      case AUTH_STATUSES.weHaveBadNews:
      case AUTH_STATUSES.noSuchLogin: {
        chrome.storage.local.remove([
          APP_STORAGE_PATHS.selectedData,
          APP_STORAGE_PATHS.hasEnteredLogin,
          APP_STORAGE_PATHS.visualActionProps
        ]);
        break;
      }
      case AUTH_STATUSES.runningAuth: {
        chrome.storage.local.set({
          [APP_STORAGE_PATHS.hasEnteredLogin]: true,
        });
        break;
      }
      default: {}
    }
  }
}

async function isWorkTab(): Promise<VisualActionProps | null> {
  const storedData = await chrome.storage.local.get([
      APP_STORAGE_PATHS.selectedData, APP_STORAGE_PATHS.visualActionProps
  ]);
  const selectedData: SelectedData | undefined = storedData[APP_STORAGE_PATHS.selectedData];

  if (selectedData && (selectedData.workTabId === this?.sender?.tab?.id)) {
    return storedData[APP_STORAGE_PATHS.visualActionProps];
  }

  return null;
}

async function initAuth(selectedData: Omit<SelectedData, 'workTabId'>, visualActionProps: VisualActionProps) {
  const storedData = await chrome.storage.local.get([
      APP_STORAGE_PATHS.logins, APP_STORAGE_PATHS.stands, APP_STORAGE_PATHS.settings,
  ]);
  const logins: LoginData[] = storedData[APP_STORAGE_PATHS.logins];
  const stands: Stand[] = storedData[APP_STORAGE_PATHS.stands];
  const settings: AppSettingsValues = storedData[APP_STORAGE_PATHS.settings];

  const selectedLogin = logins.find(login => login.id === selectedData.loginId);
  const selectedStand = stands.find(stand => stand.id === selectedData.standId);

  const selectedLoginStand = selectedLogin.stands.find(stand => stand.id === selectedData.standId);

  const selectedStandUrl = settings.useDiaryUrl ? selectedStand.diaryUrl : selectedStand.url;
  const lastCallbackUrl = (await chrome.cookies.get({
    name: COOKIE_KEYS.lastCallbackUrl,
    url: appHref,
  }))?.value;

  const isCallbackStand = Boolean(selectedData.customData.callbackUrl === selectedStandUrl);

  if (![
    lastCallbackUrl,
    selectedStand?.diaryUrl,
    selectedStand?.url
  ].includes(selectedData.customData.callbackUrl)) {
    await chrome.cookies.set({
      name: COOKIE_KEYS.lastCallbackUrl,
      value: selectedData.customData.callbackUrl,
      url: appHref,
    });
  }

  await clearCookiesForAuth(selectedStand);

  await chrome.storage.local.set({
    [APP_STORAGE_PATHS.visualActionProps]: visualActionProps
  });

  if (selectedData.customData.keepAliveToken && selectedLoginStand.authToken) {
    const baseCookie = {
      value: selectedLoginStand.authToken,
      expirationDate: Date.now() + 1000 * 60 * 60 * 24 * 365,
    };

    if (isCallbackStand) {
      await chrome.cookies.set({
        ...baseCookie,
        name: 'aupd_token',
        url: settings.useDiaryUrl ? selectedStand.diaryUrl : selectedStand.url,
      });
    }

    await chrome.cookies.set({
      ...baseCookie,
      name: 'auth_token',
      url: selectedData.customData.callbackUrl,
    });

    const standCallbackUrl = settings.useDiaryUrl ? selectedStand.diaryUrl + selectedStand.diaryMainPath : selectedStand.url + selectedStand.mainPath;
    const callbackUrl = new URL(isCallbackStand ? standCallbackUrl : selectedData.customData.callbackUrl);

    const newTab = await chrome.tabs.create({});

    if (isCallbackStand && !settings.useDiaryUrl && newTab.id) {
      await chrome.storage.local.set({
        [APP_STORAGE_PATHS.selectedData]: {
          ...selectedData,
          workTabId: newTab.id
        }
      });

      await chrome.tabs.update(newTab.id, {
        url: callbackUrl.href,
      });

      await waitForPageToLoad(newTab.id);

      await chrome.storage.local.remove([
        APP_STORAGE_PATHS.selectedData,
        APP_STORAGE_PATHS.visualActionProps
      ]);

      await sendMessagePage('content', 'rewriteStoredUser', {}, selectedStand);
    } else {
      await chrome.tabs.update(newTab.id, {
        url: callbackUrl.href,
      });
    }
  } else {
    const boPath = '/sps/oauth/ae';
    const boParams = [
      'response_type=code',
      'access_type=offline',
      `client_id=${selectedStand.clientId}`,
      'scope=openid+profile+birthday+contacts+snils+blitz_user_rights+blitz_change_password',
      `redirect_uri=${selectedStand.url}${selectedStand.authCallbackPath}`,
    ].join('&');

    const boUrl = encodeURIComponent([boPath, boParams].join('?'));
    const loginTechUrl = `${selectedStand.authHost}/sps/login/methods/password?bo=${boUrl}`;

    const newTab = await chrome.tabs.create({});

    newTab.id && selectedLogin && selectedStand && await chrome.storage.local.set({
      [APP_STORAGE_PATHS.selectedData]: {
        ...selectedData,
        workTabId: newTab.id,
      } as SelectedData,
    });

    await chrome.tabs.update(newTab.id, {
      url: loginTechUrl,
    });
  }
}
export default {
  idle,
  isWorkTab,
  initAuth,
};

import {removeCookies, Stand} from "../../config";


export const clearCookiesForAuth = async (selectedStand: Stand) => {
    const diaryCookiesToRemove = ['auth_token'];
    const mosCookiesToRemove = ['aupd_token'];

    selectedStand && await removeCookies(diaryCookiesToRemove, selectedStand.diaryUrl);
    await removeCookies(mosCookiesToRemove, 'https://mos.ru');

    selectedStand && await removeCookies((await chrome.cookies.getAll({
        url: selectedStand.authHost,
    })).map(cookie => cookie.name), selectedStand.authHost);
};

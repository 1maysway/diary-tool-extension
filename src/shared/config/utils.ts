export const removeCookies = (keys: string[], url: string) => {
  const removeCookiesPromises = keys.map((cookie) => {
    return chrome.cookies.remove({
      name: cookie,
      url,
    });
  });

  return Promise.allSettled(removeCookiesPromises);
};

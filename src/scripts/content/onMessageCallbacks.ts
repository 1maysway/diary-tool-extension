import {AUTH_STATUSES} from './config/enums';
import {LoginData, Stand, VisualActionProps} from '../../shared';
import {getNode} from './config/utils';
import {getBlockWithContent} from "../initialContent/utils";

async function start(login: LoginData, visualActionProps: VisualActionProps): Promise<AUTH_STATUSES> {
  console.log('CONTENT START')

  if (!location.pathname.includes('/sps/login')) {
    return AUTH_STATUSES.skippingPage;
  }

  if (document.body.innerHTML.includes('Такой учетной записи нет') || document.body.innerHTML.includes('некорректный логин или пароль')) {
    return AUTH_STATUSES.noSuchLogin;
  }

  const loginInputNode: HTMLInputElement = await getNode('#login');
  const passwordInputNode: HTMLInputElement = await getNode('#password');
  const submitButtonNode: HTMLButtonElement = await getNode('#bind');

  if (loginInputNode && passwordInputNode && submitButtonNode) {
    loginInputNode.value = login.login;
    passwordInputNode.value = login.password;
    const intervalId = setInterval(() => {
      if ('loading' === document.readyState) {
        return clearInterval(intervalId);
      }
      submitButtonNode.click();
    }, 300);
    return AUTH_STATUSES.runningAuth;
  }

  const changeButtonNode: HTMLButtonElement = (await getNode('.loginMus__mus-change-button')) || await getNode('.hasAccount__button');

  if (changeButtonNode) {
    changeButtonNode.click();
    return AUTH_STATUSES.changingLogin;
  }

  return AUTH_STATUSES.weHaveBadNews;
}

async function rewriteStoredUser(stand: Stand) {
  const userData = await fetch(stand.url + stand.userInfoPath).then(res => res.text());
  localStorage.setItem('user_data', userData);
  location.reload();
}

export default {
  start,
  rewriteStoredUser,
};

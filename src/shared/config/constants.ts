import {AppSettingsValues, AppSettingsViews, LoginData, Stand} from './types';
import { v4 as uuidv4 } from 'uuid';

export const defaultStands: Stand[] = [
  {
    url: 'https://school-dev.mos.ru',
    clientId: 'etd.1313.ru',
    authHost: 'https://login-tech.mos.ru',
    id: 'dev',
    authCallbackPath: '/v3/auth/sudir/callback',
    mainPath: '/choice',
    diaryUrl: 'https://dnevnik-dev-k8s.mos.ru',
    diaryMainPath: '/diary',
    userInfoPath: '/v3/userinfo',
  },
  {
    url: 'https://school-test.mos.ru',
    clientId: 'school-test.mos.ru',
    authHost: 'https://login-tech.mos.ru',
    id: 'test',
    authCallbackPath: '/v3/auth/sudir/callback',
    mainPath: '/choice',
    diaryUrl: 'https://dnevnik-test.mos.ru',
    diaryMainPath: '/diary',
    userInfoPath: '/v3/userinfo',
  },
  // {
  //   url: 'https://school.mos.ru',
  //   clientId: 'dnevnik.mos.ru',
  //   authHost: 'https://login.mos.ru',
  //   id: 'prod',
  //   authCallbackPath: '/v3/auth/sudir/callback',
  //   mainPath: '/choice',
  //   diaryUrl: 'https://dnevnik.mos.ru',
  //   diaryMainPath: '/diary',
  //   userInfoPath: '/v3/userinfo',
  // },
];

export const defaultLogins: LoginData[] = [
  {
    login: '183-966-930 33',
    password: 'La78pE2x',
    name: 'Геворкян Соня Суверенная',
    stands: [
      {
        id: 'dev',
      },
      {
        id: 'test',
      },
    ],
    id: uuidv4(),
    createdMs: Date.now(),
  },
  {
    login: '580-370-825 94',
    password: 'uK3Ewds4',
    name: 'Геворкян Елена',
    stands: [
      {
        id: 'dev',
      },
      {
        id: 'test',
      },
    ],
    id: uuidv4(),
    createdMs: Date.now(),
  },
  // {
  //   login: '000-998-006 88',
  //   password: 'r5AEbB9L',
  //   name: 'Архипова Инна',
  //   stands: [
  //     {
  //       id: 'prod',
  //     },
  //   ],
  //   id: uuidv4(),
  //   createdMs: Date.now(),
  // },
  {
    login: '202-334-194 05',
    password: 'tG57F7qB',
    name: 'Бондаренко Дарья Дмитриевна',
    stands: [
      {
        id: 'dev',
      },
    ],
    id: uuidv4(),
    createdMs: Date.now(),
  },
  {
    login: '189-366-806 36',
    password: 'tT5qD8fW',
    name: 'Маслов Ленька',
    stands: [
      {
        id: 'dev',
      },
    ],
    id: uuidv4(),
    createdMs: Date.now(),
  },
];

export const defaultSettings: AppSettingsValues = {
  keepAliveToken: true,
  useDiaryUrl: false,
};

export const appSettingsViews: AppSettingsViews = {
  keepAliveToken: {
    title: 'Использовать сохранённый токен',
    type: 'boolean',
    description: 'Использовать по умолчанию сохранённый с последней авторизации токен',
  },
  useDiaryUrl: {
    title: 'Использовать URL дневника',
    description: 'Использовать URL дневника в качестве адреса стэнда',
    type: 'boolean',
  },
};

export const appTag = 'DIARY-TOOL-EXTENSION';
export const appHref = 'https://mesh-ext.ru';

export const urlRegex = /^(?:(?:https?|ftp):\/\/)?(?:localhost|(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}|(?:\d{1,3}\.){3}\d{1,3})(?::\d+)?(?:\/[\w\d%_.~+]*)*(?:\?[;&a-z\d%_.~+=-]*)?(?:\#[a-z\d_.-]*)?(?<!\/)$/i;

export type LoginData = {
  login: string,
  password: string,
  name: string,
  warning?: string,
  stands: {
    id: Stand['id'],
    authToken?: string,
  }[],
  id: string,
  createdMs: number,
};

export type SelectedData = {
  loginId: string,
  standId: string,
  workTabId: number,
  customData: {
    callbackUrl: string,
    keepAliveToken: boolean,
  },
};

export type AppSettingsValues = {
  keepAliveToken: boolean,
  useDiaryUrl: boolean,
};

export type AppSettingsViews = {
  [key in keyof AppSettingsValues]: {
    description?: string,
    title: string,
    type: AppSettingsValues[key] extends boolean ? 'boolean' : AppSettingsValues[key] extends string ? 'string' : 'number',
  }
}

export type Stand = {
  url: string,
  clientId: string,
  authHost: string, 
  id: string,
  authCallbackPath: string,
  mainPath: string,
  diaryUrl: string,
  diaryMainPath: string,
  userInfoPath: string,
};

export type VisualActionProps = {
  loaderUrl: string,
  fact: string,
};

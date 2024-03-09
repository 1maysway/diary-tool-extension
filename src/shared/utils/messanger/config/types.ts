export type EndPointName = 'popup' | 'background' | 'content';

export type Keyof<T> = T extends infer A ? keyof A : never;

export type Message = {
  action: string,
  args: unknown[],
  endPoint: EndPointName,
};

export type SendMessagePageOptions = {
  tabId?: number,
};

export type SendMessageExtOptions = {};

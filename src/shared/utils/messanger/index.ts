'use strict';
import {
  EndPointName,
  Keyof, Message, SendMessageExtOptions, SendMessagePageOptions,
} from './config/types';
import popupCallbacks from '../../../popup/src/ext/onMessageCallbacks';
import contentCallbacks from '../../../scripts/content/onMessageCallbacks';
import backgroundCallbacks from '../../../scripts/background/onMessageCallbacks';
import {getCurrentTab} from '../getCurrentTab';


const pageEndPoints = {
  content: contentCallbacks,
};

const extEndPoints = {
  background: backgroundCallbacks,
  popup: popupCallbacks,
};

const wholeEndPoints = {
  ...pageEndPoints,
  ...extEndPoints,
};

type SendMessagePageEndpoints = typeof pageEndPoints;
export const sendMessagePage =
    async <C extends Keyof<SendMessagePageEndpoints>, K extends Keyof<SendMessagePageEndpoints[C]>> (
      endPoint: C,
      callback: K,
      options: SendMessagePageOptions,
      ...args: SendMessagePageEndpoints[C][K] extends ((...args: infer P) => unknown) ? P : never[]
    ): Promise<Awaited<SendMessagePageEndpoints[C][K] extends ((...args: unknown[]) => infer R) ? R : never[]> | null> => {
      const message: Message = {
        action: callback,
        args,
        endPoint,
      };

      const tabId = options.tabId || (await getCurrentTab()).id;

      return new Promise((r) => {
        chrome.tabs.sendMessage(tabId, message, (res) => {
          r(res);
        });
      }).catch(() => null) as Promise<Awaited<SendMessagePageEndpoints[C][K] extends ((...args: unknown[]) => infer R) ? R : never[]> | null>;
    };

type SendMessageExtEndpoints = typeof extEndPoints;
export const sendMessageExt =
    async <C extends Keyof<SendMessageExtEndpoints>, K extends Keyof<SendMessageExtEndpoints[C]>>(
      endPoint: C,
      callback: K,
      options: SendMessageExtOptions,
      ...args: SendMessageExtEndpoints[C][K] extends ((...args: infer P) => unknown) ? P : never[]
    ): Promise<Awaited<SendMessageExtEndpoints[C][K] extends ((...args: unknown[]) => infer R) ? R : never[]> | null> => {
      const message: Message = {
        action: callback,
        args,
        endPoint,
      };

      return chrome.runtime.sendMessage(message).catch(() => null) as
          Promise<Awaited<SendMessageExtEndpoints[C][K] extends ((...args: unknown[]) => infer R) ? R : never[]> | null>;
    };

export const listenMessages = (endPoint: EndPointName) => {
  chrome.runtime.onMessage.addListener((message: Message, sender, sendResponse) => {
    if (message.endPoint === endPoint) {
      const func = wholeEndPoints[message.endPoint][message.action];
      if (func) {
        func.apply({sender}, message.args).then((res) => {
          sendResponse(res || null);
        });
        // return isAsync(func);
      } else {
        sendResponse(null);
      }
      return true;
    }
  });
};

export default {
  sendMessagePage,
  sendMessageExt,
  listenMessages,
};
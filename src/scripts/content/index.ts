import {listenMessages, sendMessageExt} from '../../shared';


console.log('CONTENT');

listenMessages('content');

sendMessageExt('background', 'idle', {});

import './style.module.scss';
import { sendMessageExt } from '../../shared';
import {getBlock, getBlockWithContent} from './utils';


console.log('INITIAL CONTENT')
const init = async () => {
  const visualActionProps = await sendMessageExt('background', 'isWorkTab', {});

  if (visualActionProps) {
    const block = getBlockWithContent(visualActionProps);
    document.body.appendChild(block);
  }
};

init();
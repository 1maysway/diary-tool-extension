import styles from "./style.module.scss";
import {VisualActionProps} from "../../shared";


export const getBlock = (zIndex = 2147483647) => {
    const block =  document.createElement('div');
    block.className = styles.block;
    block.style.zIndex = zIndex.toString();

    return block;
};

export const getBlockWithContent = (visualActionProps: VisualActionProps) => {
    const { loaderUrl, fact } = visualActionProps;

    const block =  getBlock();

    const gif = document.createElement('img');
    gif.className = styles.gif;
    gif.src = loaderUrl;

    const title = document.createElement('h1');
    title.className = styles.title;
    title.innerText = 'А ты знал, что';

    const factElement = document.createElement('p');
    factElement.className = styles.fact;
    factElement.innerText = fact;

    block.appendChild(gif);
    block.appendChild(title);
    block.appendChild(factElement);

    return block;
};
import './style.scss';
import listTpl from './parts/list.art';
import { runtime, dateFormat } from '../../helper/index';

runtime.useFileter(dateFormat);

const list = document.getElementById('list');
const html = listTpl({ time: 1493791254254, list: [1, 2] });
list.innerHTML = html;

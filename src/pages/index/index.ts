import './style.scss';
import listTpl from './parts/list.art';
import { runtime, dateFormat } from '../../helper/index';

runtime.useFileter(dateFormat);

const list = document.getElementById('list');
const html = listTpl({ time: Date.now() });
list.innerHTML = html;

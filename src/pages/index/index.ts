import './style.scss';
import timeTpl from './parts/time.art';
import { runtime, dateFormat } from '@/helper/index';

// 添加模板过滤器
runtime.dateFormat = dateFormat;

function render(tmp: template, data: any): void {
  this.innerHTML = tmp(data);
}

const list = document.getElementById('time');

setInterval(function() {
  render.call(list, timeTpl, { time: Date.now() });
}, 1000)
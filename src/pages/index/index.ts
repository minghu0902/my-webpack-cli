import './style.scss';
import timeTpl from './parts/time.art';
import { runtime, dateFormat } from '@/helper/index';

// 添加模板过滤器
runtime.dateFormat = dateFormat;

function render(tmp: template, data: any): void {
  this.innerHTML = tmp(data);
}

const list = document.getElementById('time');

function init() {
  let count = 0;  
  function loop() {
    count++;
    if (count % 10 === 0) render.call(list, timeTpl, { time: Date.now() });
    window.requestAnimationFrame(loop); 
  }
  loop();
}

init();


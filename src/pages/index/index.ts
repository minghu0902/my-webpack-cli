import './style'

console.log(2)

document.body.onclick = function() {
  console.log(this);
  this.style.backgroundColor = 'red';
}
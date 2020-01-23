let i = 0;
let colorArray = [];
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
let coef = 1;
localStorage.setItem('canvasSize', 'rgb(110, 153, 146)');
const cSize = localStorage.getItem('canvasSize');

export function openToolPal() {
  if (i === 0) {
    document.querySelector('#palette').style.display = 'flex';
    document.querySelector('#color').style.background = 'rgb(110, 153, 146)';
    i = 1;
  } else if (i === 1) {
    document.querySelector('#palette').style.display = 'none';
    document.querySelector('#color').style.background = 'white';
    i = 0;
  }
}

export function choosColor(color) {
  document.querySelector('#curColor').style.backgroundColor = color;
  if (color === 'black') {
    document.querySelector('#curColor').style.color = 'white';
  } else if (color !== 'black') {
    document.querySelector('#curColor').style.color = 'black';
  }
  colorArray.push(color);
  document.querySelector('#prevColor').style.backgroundColor = colorArray[colorArray.length - 2];
  if (colorArray[colorArray.length - 2] === 'black') {
    document.querySelector('#prevColor').style.color = 'white';
  } else if (colorArray[colorArray.length - 2] !== 'black') {
    document.querySelector('#prevColor').style.color = 'black';
  }
}

export function pencilOn() {
  let painting = false;
  let position;
  let startLocation;
  let snapshot;
  let lineW;
  coef = localStorage.getItem('KOEF');

  document.querySelector('#size5').addEventListener('click', () => {
    coef = localStorage.getItem('KOEF');
    if(coef == 1) {
      lineW = 5;
    } else if(coef == 16) {
      lineW = 5 * coef;
    } else {
      lineW = coef;
    }
    
    document.querySelector('#pencilSizeShow').innerHTML = '5 px';
  })
  
  document.querySelector('#size10').addEventListener('click', () => {  
    coef = localStorage.getItem('KOEF');
    if(coef == 1) {
      lineW = 10;
    } else if(coef == 16) {
      lineW = 10 * coef;
    } else {
      lineW = coef;
    }
    document.querySelector('#pencilSizeShow').innerHTML = '10 px';
  })
  
  document.querySelector('#size30').addEventListener('click', () => {
    coef = localStorage.getItem('KOEF');
    if(coef == 1) {
      lineW = 30;
    } else if(coef == 16) {
      lineW = 30 * coef;
    } else {
      lineW = coef;
    }
    document.querySelector('#pencilSizeShow').innerHTML = '30 px';
  })

  if(lineW == undefined) {
    if(coef == 1 || coef == undefined) {
      lineW = 10;
    } else {
      lineW = coef;
    }
    document.querySelector('#pencilSizeShow').innerHTML = '10 px';
  }

  document.querySelector('#pix4').addEventListener('click', () => {
    localStorage.setItem('KOEF', '128');
    localStorage.setItem('setSize', '1');
    document.querySelector('#pix4').style.background = cSize;
    document.querySelector('#pix32').style.background = 'white';
    document.querySelector('#pix512').style.background = 'white';
  })
  
  document.querySelector('#pix32').addEventListener('click', () => {  
    localStorage.setItem('KOEF', '16');
    localStorage.setItem('setSize', '2');
    document.querySelector('#pix4').style.background = 'white';
    document.querySelector('#pix32').style.background = cSize;
    document.querySelector('#pix512').style.background = 'white';
  })
  
  document.querySelector('#pix512').addEventListener('click', () => {
    localStorage.setItem('KOEF', '1');
    localStorage.setItem('setSize', '3');
    document.querySelector('#pix4').style.background = 'white';
    document.querySelector('#pix32').style.background = 'white';
    document.querySelector('#pix512').style.background = cSize;
  })

  canvas.addEventListener('mousedown', startPositionPen, false);
  canvas.addEventListener('mouseup', endPositionPen, false);
  canvas.addEventListener('mousemove', drawPen, false);

  function takeSnapshot() {
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

  function restoreSnapshot() {
    ctx.putImageData(snapshot, 0, 0);
  }

  function getCoord(e) {
    let xx = e.clientX - canvas.getBoundingClientRect().left;
    let yy = e.clientY - canvas.getBoundingClientRect().top;
    return {x: xx, y: yy};
  }

  function drawLin(position) {
    ctx.beginPath();
    ctx.moveTo(startLocation.x, startLocation.y);
    ctx.lineTo(position.x, position.y);
    ctx.stroke();
  }

  function startPositionPen(e) {
    painting = true;
    if (document.querySelector('#stroke').style.background === 'rgb(110, 153, 146)') {
      startLocation = getCoord(e);
      takeSnapshot();
    } else {
      drawPen(e);
    } 
  }
  
  function endPositionPen(e) {
    painting = false;
    if (document.querySelector('#stroke').style.background === 'rgb(110, 153, 146)') {
      restoreSnapshot();
      position = getCoord(e);
      drawLin(position);
    } else {
    ctx.beginPath();
    }
  }
      
  function drawPen(e) {
    if (!painting) return;
    if (document.querySelector('#stroke').style.background === 'rgb(110, 153, 146)') {
      ctx.lineWidth = lineW;
      ctx.lineCap = 'square';
      ctx.strokeStyle = localStorage.getItem('color');
      restoreSnapshot();
      position = getCoord(e);
      drawLin(position);
    } else {
    ctx.lineWidth = lineW;
    ctx.lineCap = 'square';
    ctx.strokeStyle = localStorage.getItem('color');
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.moveTo(e.offsetX, e.offsetY);
    }
  }
}

export function fillCol() {
  if (document.querySelector('#paint').style.background === 'rgb(110, 153, 146)') {
    ctx.fillStyle = localStorage.getItem('color');
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

export function backPen() {
  pencilOn(10);
  document.querySelector('#pencil').style.background = 'rgb(110, 153, 146)';
  document.querySelector('#stroke').style.background = 'white';
  document.querySelector('#paint').style.background = 'white';
  document.querySelector('#eraser').style.background = 'white';
}

export function clear() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = 'black';
}
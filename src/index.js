import openTool from './header'
import { openToolPal, choosColor, pencilOn, fillCol, backPen, clear } from './drawing'
import { keyboard, clickText, clearText } from './keyboard';
import start from './canvasSize'

const fileButOpen = document.querySelector('.button');
let i = 0;
let k = 0;
let l = 0;
let n = 0;
let canv = 0;
const reader = new FileReader();
const canvas = document.querySelector('#canvas');
const ctxOne = document.querySelector('#canvasFirst').getContext('2d');
const ctxTwo = document.querySelector('#canvasSecond').getContext('2d');
const ctxThree = document.querySelector('#canvasThird').getContext('2d');
const ctx = canvas.getContext('2d');

fileButOpen.addEventListener('click', () => {
  openTool();
})

document.querySelector('#color').addEventListener('click', () => {
  openToolPal();
  if (document.querySelector('#pencil').style.background === 'rgb(110, 153, 146)') {
    document.querySelector('#pencil').style.background = 'rgb(110, 153, 146)'
  } else {
    document.querySelector('#pencil').style.background = 'white'
  };
  if (document.querySelector('#stroke').style.background === 'rgb(110, 153, 146)') {
    document.querySelector('#stroke').style.background = 'rgb(110, 153, 146)'
  } else {
  document.querySelector('#stroke').style.background = 'white';
  }
  if (document.querySelector('#paint').style.background === 'rgb(110, 153, 146)') {
    document.querySelector('#paint').style.background = 'rgb(110, 153, 146)'
  } else {
  document.querySelector('#paint').style.background = 'white';
  }
  document.querySelector('#eraser').style.background = 'white';
})

document.querySelector('#palette').addEventListener('click', (event) => {
  const color = event.target.id;
  localStorage.setItem('color', `${color}`);
  console.log(color);
   if (['black', 'white', 'red', 'blue', 'yellow', 'green'].includes(color)) {
      choosColor(color);
  }
})

document.querySelector('#pencil').addEventListener('click', () => {
  const remCol = localStorage.getItem('colorH');
  localStorage.setItem('color', `${remCol}`);
  start();
  pencilOn();
  document.querySelector('#pencil').style.background = 'rgb(110, 153, 146)';
  document.querySelector('#stroke').style.background = 'white';
  document.querySelector('#paint').style.background = 'white';
  document.querySelector('#eraser').style.background = 'white';
  document.querySelector('#text').style.background = 'white';
  document.querySelector('#keyboard').style.display = 'none';
  document.querySelector('#textInCanvas').style.display = 'none';
})

document.querySelector('#eraser').addEventListener('click', () => {
  const remembColor = localStorage.getItem('color');
  localStorage.setItem('colorH', `${remembColor}`);
  localStorage.setItem('color', 'white');
  document.querySelector('#palette').onclick = () =>{
    backPen();
  }
  pencilOn();
  start();
  document.querySelector('#pencil').style.background = 'white';
  document.querySelector('#stroke').style.background = 'white';
  document.querySelector('#paint').style.background = 'white';
  document.querySelector('#eraser').style.background = 'rgb(110, 153, 146)';
  document.querySelector('#color').style.background = 'white';
  document.querySelector('#text').style.background = 'white';
  document.querySelector('#keyboard').style.display = 'none';
  document.querySelector('#textInCanvas').style.display = 'none';
})

document.querySelector('#paint').addEventListener('click', () => {
  document.querySelector('#canvas').addEventListener('click', () => {
    return fillCol();
  });
  document.querySelector('#pencil').style.background = 'white';
  document.querySelector('#stroke').style.background = 'white';
  document.querySelector('#paint').style.background = 'rgb(110, 153, 146)';
  document.querySelector('#eraser').style.background = 'white';
  document.querySelector('#text').style.background = 'white';
  document.querySelector('#keyboard').style.display = 'none';
  document.querySelector('#textInCanvas').style.display = 'none';
})

document.querySelector('#stroke').addEventListener('click', () => {
  pencilOn();
  start();
  document.querySelector('#pencil').style.background = 'white';
  document.querySelector('#stroke').style.background = 'rgb(110, 153, 146)';
  document.querySelector('#paint').style.background = 'white';
  document.querySelector('#eraser').style.background = 'white';
  document.querySelector('#text').style.background = 'white';
  document.querySelector('#keyboard').style.display = 'none';
  document.querySelector('#textInCanvas').style.display = 'none';
})

document.querySelector('#clear').addEventListener('click', () => {
  clear();
  const clearCanvas = JSON.stringify({ image: "data:image/png;base64,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BAUMgGDpIhMgQIAAAQPADxAgQIAAgaCAARAsXWQCBAgQIGAA+AECBAgQIBAUMACCpYtMgAABAgQMAD9AgAABAgSCAgZAsHSRCRAgQICAAeAHCBAgQIBAUMAACJYuMgECBAgQMAD8AAECBAgQCAoYAMHSRSZAgAABAgaAHyBAgAABAkEBAyBYusgECBAgQMAA8AMECBAgQCAoYAAESxeZAAECBAgYAH6AAAECBAgEBQyAYOkiEyBAgAABA8APECBAgACBoIABECxdZAIECBAgYAD4AQIECBAgEBQwAIKli0yAAAECBAwAP0CAAAECBIICBkCwdJEJECBAgIAB4AcIECBAgEBQwAAIli4yAQIECBAwAPwAAQIECBAIChgAwdJFJkCAAAECBoAfIECAAAECQQEDIFi6yAQIECBAwADwAwQIECBAIChgAARLF5kAAQIECBgAfoAAAQIECAQFDIBg6SITIECAAAEDwA8QIECAAIGggAEQLF1kAgQIECBgAPgBAgQIECAQFDAAgqWLTIAAAQIEDAA/QIAAAQIEggIGQLB0kQkQIECAgAHgBwgQIECAQFDAAAiWLjIBAgQIEDAA/AABAgQIEAgKGADB0kUmQIAAAQIGgB8gQIAAAQJBAQMgWLrIBAgQIEDAAPADBAgQIEAgKGAABEsXmQABAgQIGAB+gAABAgQIBAUMgGDpIhMgQIAAAQPADxAgQIAAgaCAARAsXWQCBAgQIGAA+AECBAgQIBAUMACCpYtMgAABAgQMAD9AgAABAgSCAgZAsHSRCRAgQICAAeAHCBAgQIBAUMAACJYuMgECBAgQMAD8AAECBAgQCAoYAMHSRSZAgAABAgaAHyBAgAABAkEBAyBYusgECBAgQMAA8AMECBAgQCAoYAAESxeZAAECBAgYAH6AAAECBAgEBQyAYOkiEyBAgAABA8APECBAgACBoIABECxdZAIECBAgYAD4AQIECBAgEBQwAIKli0yAAAECBAwAP0CAAAECBIICBkCwdJEJECBAgIAB4AcIECBAgEBQwAAIli4yAQIECBAwAPwAAQIECBAIChgAwdJFJkCAAAECBoAfIECAAAECQQEDIFi6yAQIECBAwADwAwQIECBAIChgAARLF5kAAQIECBgAfoAAAQIECAQFDIBg6SITIECAAAEDwA8QIECAAIGggAEQLF1kAgQIECBgAPgBAgQIECAQFDAAgqWLTIAAAQIEDAA/QIAAAQIEggIGQLB0kQkQIECAgAHgBwgQIECAQFDAAAiWLjIBAgQIEDAA/AABAgQIEAgKGADB0kUmQIAAAQIGgB8gQIAAAQJBAQMgWLrIBAgQIEDAAPADBAgQIEAgKGAABEsXmQABAgQIGAB+gAABAgQIBAUMgGDpIhMgQIAAAQPADxAgQIAAgaCAARAsXWQCBAgQIGAA+AECBAgQIBAUMACCpYtMgAABAgQMAD9AgAABAgSCAgZAsHSRCRAgQICAAeAHCBAgQIBAUMAACJYuMgECBAgQMAD8AAECBAgQCAoYAMHSRSZAgAABAgaAHyBAgAABAkEBAyBYusgECBAgQMAA8AMECBAgQCAoYAAESxeZAAECBAgYAH6AAAECBAgEBQyAYOkiEyBAgAABA8APECBAgACBoIABECxdZAIECBAgYAD4AQIECBAgEBQwAIKli0yAAAECBAwAP0CAAAECBIICBkCwdJEJECBAgIAB4AcIECBAgEBQwAAIli4yAQIECBAwAPwAAQIECBAIChgAwdJFJkCAAAECBoAfIECAAAECQQEDIFi6yAQIECBAwADwAwQIECBAIChgAARLF5kAAQIECBgAfoAAAQIECAQFDIBg6SITIECAAAEDwA8QIECAAIGggAEQLF1kAgQIECBgAPgBAgQIECAQFDAAgqWLTIAAAQIEDAA/QIAAAQIEggIGQLB0kQkQIECAgAHgBwgQIECAQFDAAAiWLjIBAgQIEDAA/AABAgQIEAgKGADB0kUmQIAAAQIGgB8gQIAAAQJBAQMgWLrIBAgQIEDAAPADBAgQIEAgKGAABEsXmQABAgQIGAB+gAABAgQIBAUMgGDpIhMgQIAAAQPADxAgQIAAgaCAARAsXWQCBAgQIGAA+AECBAgQIBAUMACCpYtMgAABAgQMAD9AgAABAgSCAgZAsHSRCRAgQICAAeAHCBAgQIBAUMAACJYuMgECBAgQMAD8AAECBAgQCAoYAMHSRSZAgAABAgaAHyBAgAABAkEBAyBYusgECBAgQMAA8AMECBAgQCAoYAAESxeZAAECBAgYAH6AAAECBAgEBQyAYOkiEyBAgAABA8APECBAgACBoIABECxdZAIECBAgYAD4AQIECBAgEBQwAIKli0yAAAECBAwAP0CAAAECBIICBkCwdJEJECBAgIAB4AcIECBAgEBQwAAIli4yAQIECBAwAPwAAQIECBAIChgAwdJFJkCAAAECBoAfIECAAAECQQEDIFi6yAQIECBAwADwAwQIECBAIChgAARLF5kAAQIECBgAfoAAAQIECAQFDIBg6SITIECAAAEDwA8QIECAAIGggAEQLF1kAgQIECBgAPgBAgQIECAQFDAAgqWLTIAAAQIEDAA/QIAAAQIEggIGQLB0kQkQIECAgAHgBwgQIECAQFDAAAiWLjIBAgQIEHjRb/pqFkszTAAAAABJRU5ErkJggg==",
    date: 1579455506711});
  localStorage.setItem('canvasOne', `${clearCanvas}`);
  localStorage.setItem('canvasTwo', `${clearCanvas}`);
  localStorage.setItem('canvasThree', `${clearCanvas}`);
  document.querySelector('#file--open').style.display = 'none';
})

document.querySelector('#save').addEventListener('click', () => {
  const canvasContents = canvas.toDataURL();
  const data = { image: canvasContents, date: Date.now() };
  const string = JSON.stringify(data);

  const file = new Blob([string], {
    type: 'application/json'
  });
  
  const a = document.createElement('a');
  a.href = URL.createObjectURL(file);
  a.download = 'data.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  document.querySelector('#file--open').style.display = 'none';
})

document.querySelector('#saveAsImage').addEventListener('click', () => {
  var dataURL = canvas.toDataURL("image/jpeg");
  var link = document.createElement("a");
  document.body.appendChild(link);
  link.href = dataURL;
  link.download = "my-image-name.jpg";
  link.click();
  document.body.removeChild(link);
  document.querySelector('#file--open').style.display = 'none';
})

document.getElementById('load').addEventListener('change', function () {
  if (this.files[0]) {
    reader.readAsText(this.files[0]);
  }
  document.querySelector('#file--open').style.display = 'none';
});

reader.onload = function () {
  const data = JSON.parse(reader.result);
  const image = new Image();
  image.onload = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0);
  }
  image.src = data.image;
}

document.querySelector('#text').addEventListener('click', () => {
  start();
  if (i === 0) {
  document.querySelector('#stroke').style.background = 'white';
  document.querySelector('#pencil').style.background = 'white';
  document.querySelector('#text').style.background = 'rgb(110, 153, 146)';
  document.querySelector('#paint').style.background = 'white';
  document.querySelector('#eraser').style.background = 'white';
  document.querySelector('#keyboard').style.display = 'flex';
  document.querySelector('#textInCanvas').style.display = 'block';
  document.addEventListener('keydown', (event) => {
    if (document.querySelector('#text').style.background !== 'white') {
      keyboard(event.key);
      }
    })
  document.querySelector('#keyboard').addEventListener('click', (event) => {
    if (document.querySelector('#text').style.background !== 'white') {
    clickText(event.target.innerHTML);
    }
  })
  i = 1;
} else if (i === 1) {
  document.querySelector('#stroke').style.background = 'white';
  document.querySelector('#pencil').style.background = 'white';
  document.querySelector('#text').style.background = 'white';
  document.querySelector('#paint').style.background = 'white';
  document.querySelector('#eraser').style.background = 'white';
  document.querySelector('#keyboard').style.display = 'none';
  document.querySelector('#textInCanvas').style.display = 'none';
  clearText();
  i = 0;
}
})

document.querySelector('#canvasFirst').addEventListener('click', () => {
  canv = 1;
  document.querySelector('#animationSave').addEventListener('click', () => {
    if (canv === 1) {
      const canvasContents = canvas.toDataURL();
      let data = { image: canvasContents, date: Date.now() };
      const string = JSON.stringify(data);
      localStorage.setItem('canvasOne', string);
      const dataD = JSON.parse(localStorage.getItem('canvasOne'));
      const image = new Image();
      image.onload = function () {
        ctxOne.clearRect(0, 0, document.querySelector('#canvasFirst').width, document.querySelector('#canvasFirst').height);
        if (k === 0) {
          ctxOne.scale(0.3, 0.3);
          k = 1;
        }
        ctxOne.drawImage(image, 0, 0);
      }
      image.src = dataD.image;
    }
  })

  const dataD = JSON.parse(localStorage.getItem('canvasOne'));
  const image = new Image();
  image.onload = function () {
    ctx.clearRect(0, 0, document.querySelector('#canvas').width, document.querySelector('#canvas').height);
    ctx.drawImage(image, 0, 0);
  }
  image.src = dataD.image;


  document.querySelector('#canvasFirst').style.border = '5px solid black';
  document.querySelector('#canvasSecond').style.border = '1px solid black';
  document.querySelector('#canvasThird').style.border = '1px solid black';
})

document.querySelector('#canvasSecond').addEventListener('click', () => {
  canv = 3;
  document.querySelector('#animationSave').addEventListener('click', () => {
    if (canv === 3) {
    const canvasContents = canvas.toDataURL();
    let data = { image: canvasContents, date: Date.now() };
    const string = JSON.stringify(data);
    localStorage.setItem('canvasTwo', string);
    const dataD = JSON.parse(localStorage.getItem('canvasTwo'));
    const image = new Image();
    image.onload = function () {
      ctxTwo.clearRect(0, 0, document.querySelector('#canvasSecond').width, document.querySelector('#canvasSecond').height);
      if (l === 0) {
        ctxTwo.scale(0.3, 0.3);
        l = 1;
      }
      ctxTwo.drawImage(image, 0, 0);
    }
    image.src = dataD.image;
  }
  })

  const dataD = JSON.parse(localStorage.getItem('canvasTwo'));
  const image = new Image();
  image.onload = function () {
    ctx.clearRect(0, 0, document.querySelector('#canvas').width, document.querySelector('#canvas').height);
    ctx.drawImage(image, 0, 0);
  }
  image.src = dataD.image;

  document.querySelector('#canvasFirst').style.border = '1px solid black';
  document.querySelector('#canvasSecond').style.border = '5px solid black';
  document.querySelector('#canvasThird').style.border = '1px solid black';
})

document.querySelector('#canvasThird').addEventListener('click', () => {
  canv = 5;
  document.querySelector('#animationSave').addEventListener('click', () => {
    if (canv === 5) {
    const canvasContents = canvas.toDataURL();
    let data = { image: canvasContents, date: Date.now() };
    const string = JSON.stringify(data);
    localStorage.setItem('canvasThree', string)
    const dataD = JSON.parse(localStorage.getItem('canvasThree'));
    const image = new Image();
    image.onload = function () {
      ctxThree.clearRect(0, 0, document.querySelector('#canvasThird').width, document.querySelector('#canvasThird').height);
      if (n === 0) {
        ctxThree.scale(0.3, 0.3);
        n = 1;
      }
      ctxThree.drawImage(image, 0, 0);
    }
    image.src = dataD.image;
  }
  })

  const dataD = JSON.parse(localStorage.getItem('canvasThree'));
  const image = new Image();
  image.onload = function () {
    ctx.clearRect(0, 0, document.querySelector('#canvas').width, document.querySelector('#canvas').height);
    ctx.drawImage(image, 0, 0);
  }
  image.src = dataD.image;

  document.querySelector('#canvasFirst').style.border = '1px solid black';
  document.querySelector('#canvasSecond').style.border = '1px solid black';
  document.querySelector('#canvasThird').style.border = '5px solid black';
})

document.querySelector('#animationPlay').addEventListener('click', () => {
  const dataD = JSON.parse(localStorage.getItem('canvasOne'));
  const image = new Image();
  image.onload = function () {
    ctx.clearRect(0, 0, document.querySelector('#canvas').width, document.querySelector('#canvas').height);
    ctx.drawImage(image, 0, 0);
  }
  image.src = dataD.image;

  setInterval(function(){
  const dataD = JSON.parse(localStorage.getItem('canvasTwo'));
  const image = new Image();
  image.onload = function () {
    ctx.clearRect(0, 0, document.querySelector('#canvas').width, document.querySelector('#canvas').height);
    ctx.drawImage(image, 0, 0);
  }
  image.src = dataD.image;
}, 1000);

  setInterval(function(){
  const dataD = JSON.parse(localStorage.getItem('canvasThree'));
  const image = new Image();
  image.onload = function () {
    ctx.clearRect(0, 0, document.querySelector('#canvas').width, document.querySelector('#canvas').height);
    ctx.drawImage(image, 0, 0);
  }
  image.src = dataD.image;
}, 2000);
});

document.querySelector('#animationStop').addEventListener('click', () => {
  location.reload();
});
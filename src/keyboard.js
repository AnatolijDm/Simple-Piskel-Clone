import { pencilOn } from './drawing';

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
let i = 0;
let j = 0;
let text = ''; 

export function keyboard(key) {
    text = text + key;
    if (event.key === 'Backspace') {
        text = text.slice(0, -10);
        document.querySelector('#textInCanvas').innerHTML = text;
    } else if (event.key === 'Enter') {
        eraser();
        return;
    }  else if (key === 'Shift') {
        text = text.slice(0, -5);
    } else if (key === 'Control') {
        text = text.slice(0, -7);
    } else if (key === 'Alt') {
        text = text.slice(0, -3);
    } else if (key === 'Tab') {
        text = text.slice(0, -3);
        text = text + ' ' + ' ' + ' ';
    } else if (key === 'CapsLock') {
        text = text.slice(0, -8);
    }
    document.querySelector('#textInCanvas').innerHTML = text;
}

export function clickText(key) {
    text = text + key;
    if (key === 'backspace') {
            text = text.slice(0, -10);
            document.querySelector('#textInCanvas').innerHTML = text;
    } else if (key === 'enter') {
        eraser();
        return;
    } else if (key === 'tab') {
        text = text.slice(0, -3);
        text = text + ' ' + ' ' + ' ';
        document.querySelector('#textInCanvas').innerHTML = text;
    } else if (key === 'capslock' || key === 'CAPSLOCK') {
        if(j === 0) {
        console.log(key);
        key = key.toUpperCase();
        console.log(key);
        text = text.slice(0, -8);
        document.querySelector('#capslock').style.color = '#0d472f';
        j = 1;
        } else {
            key = key.toLowerCase();
            text = text.slice(0, -8);
            document.querySelector('#capslock').style.color = 'white';
            j = 0;
        }
    } else if (key === 'space') {
        text = text.slice(0, -5);
        text = text + ' ';
        document.querySelector('#textInCanvas').innerHTML = text;
    } else if (key === 'shift') {
        text = text.slice(0, -5);
    } else if (key === 'ctr') {
        text = text.slice(0, -3);
    } else if (key === 'alt') {
        text = text.slice(0, -3);
    }
    document.querySelector('#textInCanvas').innerHTML = text;
}

function eraser() {
    text = text.slice(0, -5);
    ctx.font = "30px Arial";
    ctx.fillStyle = localStorage.getItem('color');
    ctx.fillText(`${text}`, 10, 40);
    document.querySelector('#textInCanvas').style.display = 'none';
    text = '';

    const remCol = localStorage.getItem('colorH');
    localStorage.setItem('color', `${remCol}`);
    pencilOn(10);
    document.querySelector('#pencil').style.background = 'rgb(110, 153, 146)';
    document.querySelector('#stroke').style.background = 'white';
    document.querySelector('#paint').style.background = 'white';
    document.querySelector('#eraser').style.background = 'white';
    document.querySelector('#text').style.background = 'white';
    document.querySelector('#keyboard').style.display = 'none';
    document.querySelector('#textInCanvas').style.display = 'none';
}

export function clearText() {
    text = '';
    document.querySelector('#textInCanvas').innerHTML = text;
}
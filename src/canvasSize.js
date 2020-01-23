export default function start() {
    const setSize = localStorage.getItem('setSize');
    if(setSize == 1) {
      document.querySelector('#pix4').style.background = 'rgb(110, 153, 146)';
      document.querySelector('#pix32').style.background = 'white';
      document.querySelector('#pix512').style.background = 'white';
    } else if (setSize == 2) {
      document.querySelector('#pix4').style.background = 'white';
      document.querySelector('#pix32').style.background = 'rgb(110, 153, 146)';
      document.querySelector('#pix512').style.background = 'white';
    } else if(setSize == 3){
      document.querySelector('#pix4').style.background = 'white';
      document.querySelector('#pix32').style.background = 'white';
      document.querySelector('#pix512').style.background = 'rgb(110, 153, 146)';
    } else {
      document.querySelector('#pix4').style.background = 'white';
      document.querySelector('#pix32').style.background = 'white';
      document.querySelector('#pix512').style.background = 'white';
    }
  }
let i = 0;

export default function openTool() {
  if (i === 0) {
    document.querySelector('#file--open').style.display = 'block';
    i = 1;
  } else if (i === 1) {
    document.querySelector('#file--open').style.display = 'none';
    i = 0;
  }
}


import domtoimage from 'dom-to-image';

const clipboard = new ClipboardJS('#copy');

clipboard.on('success', function (e) {
  e.clearSelection();
});

const body = document.querySelector('body');
const display = document.querySelector('.display');
const coooooooolors = document.querySelector('#coooooooolors');
const colors = document.querySelectorAll('input[type="color"]');
const direction = document.querySelector('#direction');
const main = document.querySelector('main');
const code = document.querySelector('code');
const copy = document.querySelector('#copy');
const random = document.querySelector('#random');
const download = document.querySelector('#download');
const click = document.querySelector('#click');

direction.value = localStorage.getItem('direction') || direction.value;

colors[0].value = localStorage.getItem('color1') || colors[0].value;

colors[1].value = localStorage.getItem('color2') || colors[1].value;

setBackground();

function setBackground() {
  let background = `linear-gradient(${direction.value},${colors[0].value},${colors[1].value})`;

  localStorage.setItem('direction', direction.value);

  localStorage.setItem('color1', colors[0].value);
  localStorage.setItem('color2', colors[1].value);

  body.style.background = background;
  display.style.background = background;

  coooooooolors.style.background = background;
  coooooooolors.style.webkitBackgroundClip = 'text';
  coooooooolors.style.color = 'transparent';

  random.style.background = background;
  download.style.fill = colors[0].value;

  copy.style.borderColor = colors[1].value;
  direction.style.borderColor = colors[0].value;

  copy.addEventListener('click', () => {
    copy.innerText = 'Copied';
    copy.disabled = true;

    copy.style.background = background;
    copy.style.webkitBackgroundClip = 'text';
    copy.style.color = 'transparent';
    copy.style.borderColor = colors[0].value;

    setTimeout(() => {
      copy.innerText = 'Copy Code';
      copy.disabled = false;
      copy.style.background = 'transparent';
      copy.style.color = '#232323';
      copy.style.borderColor = colors[1].value;
    }, 1000);
  });

  code.innerText = `background: ${background}`;
}

colors.forEach((item) => {
  item.addEventListener('input', setBackground);
});

direction.addEventListener('input', setBackground);

function randomCode() {
  const characters = '0123456789ABCDEF';
  let hexCode = '#';
  const directions = ['to right', 'to top', 'to bottom', 'to left'];

  for (let a = 0; a < 2; a++) {
    for (let i = 0; i < 6; i++) {
      const index = Math.floor(Math.random() * characters.length);
      hexCode += characters[index];
    }
    colors[a].value = hexCode;
    hexCode = '#';
  }
  const mode = Math.floor(Math.random() * directions.length);
  direction.value = directions[mode];
  setBackground();
}

random.addEventListener('click', randomCode);

function takePhoto() {
  main.style.display = 'none';

  domtoimage.toJpeg(document.body, { quality: 1 }).then(function (dataUrl) {
    const link = document.createElement('a');
    link.download = 'GradientQuest.jpeg';
    link.href = dataUrl;
    link.click();
    main.style.display = 'flex';
  });
}

click.addEventListener('click', takePhoto);

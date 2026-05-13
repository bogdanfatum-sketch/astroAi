const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const startCameraBtn = document.getElementById('startCameraBtn');
const captureBtn = document.getElementById('captureBtn');
const astroForm = document.getElementById('astroForm');

let mediaStream;

function fillNumberSelect(id, from, to, pad = 0) {
  const el = document.getElementById(id);
  for (let n = from; n <= to; n += 1) {
    const opt = document.createElement('option');
    opt.value = String(n);
    opt.textContent = pad ? String(n).padStart(pad, '0') : String(n);
    el.appendChild(opt);
  }
}

fillNumberSelect('day', 1, 31);
fillNumberSelect('month', 1, 12);
fillNumberSelect('year', 1940, new Date().getFullYear());
fillNumberSelect('hour', 0, 23, 2);
fillNumberSelect('minute', 0, 59, 2);

startCameraBtn.addEventListener('click', async () => {
  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({
      video: { width: 1280, height: 960 },
      audio: false,
    });
    video.srcObject = mediaStream;
    captureBtn.disabled = false;
  } catch (err) {
    alert('Не вдалося отримати доступ до камери. Перевірте дозволи браузера.');
    console.error(err);
  }
});

captureBtn.addEventListener('click', () => {
  if (!mediaStream) return;
  const ctx = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
});

astroForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = {
    day: document.getElementById('day').value,
    month: document.getElementById('month').value,
    year: document.getElementById('year').value,
    hour: document.getElementById('hour').value,
    minute: document.getElementById('minute').value,
    birthPlace: document.getElementById('birthPlace').value,
  };

  console.log('AstroAi input data:', formData);
  alert('Дані прийнято. Далі підключимо обробку AstroAi.');
});

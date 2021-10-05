/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-useless-escape */
/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-use-before-define */
/* eslint-disable comma-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable linebreak-style */
export default class Messanger {
  constructor(element) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }
    this.element = element;
    this.input = this.element.querySelector('.input-text');
    this.messageContainer = this.element.querySelector('.message-container');
    this.element.querySelector('.input-form').addEventListener('submit', this.addMessage.bind(this));
    this.successHandler = this.successHandler.bind(this);
    this.errorHandler = this.errorHandler.bind(this);
    this.coordsModal = this.element.querySelector('.coords-modal');
    this.coordsModal.addEventListener('submit', this.checkModal.bind(this));
    this.modalInput = this.element.querySelector('.modal-input');
    this.checkCoordsMessage = this.element.querySelector('.check-coords-input');
    this.coordsModal.querySelector('.modal-cancel').addEventListener('click', this.closeModal.bind(this));
    this.loadData();
  }

  addMessage(e) {
    e.preventDefault();

    const geoOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.successHandler, this.errorHandler, geoOptions);
    }
  }

  successHandler(position) {
    const {
      latitude,
      longitude
    } = position.coords;
    this.coords = `[${latitude.toFixed(5)}, ${longitude.toFixed(5)}]`;
    this.drawMessage();
  }

  errorHandler(e) {
    if (e.code === 1) {
      console.log('Нет разрешения на использование геолокации');
    } else if (e.code === 2) {
      console.log('Один внутренний источник позиции вернул внутреннюю ошибку.');
    } else if (e.code === 3) {
      console.log('Очень долго получаем геолокацию');
    }
    this.coordsModal.classList.remove('hidden');
  }

  drawMessage() {
    const messageDiv = `
    <div class='message-item'>
    <div class='message-content'>${this.input.value}</div>
    <div class='message-coords'>${this.coords}</div>
    <div class='message-time'>${getCurrentTime()}</div>
    </div>`;
    this.input.value = '';

    this.messageContainer.insertAdjacentHTML('beforeend', messageDiv);
    this.saveData();
  }

  checkModal(e) {
    e.preventDefault();
    if (!this.checkCoordsInput(this.modalInput.value)) {
      this.checkCoordsMessage.classList.remove('hidden');
      return;
    }
    this.checkCoordsMessage.classList.add('hidden');
    this.coords = this.modalInput.value;
    this.drawMessage();
    this.coordsModal.classList.add('hidden');
  }

  closeModal(e) {
    e.preventDefault();
    this.modalInput.value = '';
    this.coordsModal.classList.add('hidden');
  }

  checkCoordsInput(coords) {
    return /^\[?\-?\d{1,2}\.\d{1,5}\,\s?\-?\d{1,2}\.\d{1,5}\]?/.test(coords);
  }

  saveData() {
    localStorage.setItem('message-data', JSON.stringify(this.element.querySelector('.message-container').innerHTML));
  }

  loadData() {
    try {
      this.element.querySelector('.message-container').innerHTML = JSON.parse(localStorage.getItem('message-data'));
    } catch (error) {
      console.log('Не удалось загрузить данные');
    }
  }
}

function getCurrentTime() {
  const now = new Date();
  const year = now.getFullYear();
  let month = now.getMonth() + 1;
  if (month < 10) month = `${0}${month}`;
  const day = now.getDate();
  let hour = now.getHours();
  if (hour < 10) hour = `${0}${hour}`;
  let minutes = now.getMinutes();
  if (minutes < 10) minutes = `${0}${minutes}`;
  return `${day}.${month}.${year} ${hour}:${minutes}`;
}

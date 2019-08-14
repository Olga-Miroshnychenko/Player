class VideoPlayer {
    constructor(settings) {
        this._settings = Object.assign(VideoPlayer.DefaultSettings, settings);
    }

    init() {
        if (!this._settings.videoUrl) return console.error('Provide video Url');
        if (!this._settings.videoPlayerContainer) return console.error('Please provide video player container');

        // Создаем разметку для video
        this._addTemplate();
        // Найти все элементы управления
        this._setElements();
        // Установить обработчики событий
        this._setEvents();
    }

    toggle() {
        const method = this._video.paused ? 'play' : 'pause';
        this._toggleBtn.textContent = this._video.paused ? '❚ ❚' : '►';
        this._video[method]();
    }
    _videoProgressHandler() {
        const percent = (this._video.currentTime / this._video.duration) * 100;
        this._progress.style.flexBasis = `${percent}%`;
    }
    _peremotka(event) {
        this._video.currentTime = (event.offsetX / this._progressContainer.offsetWidth) * this._video.duration;
    }
    //Перемотка вперед на 2 сек.
    _skipNext() {
        this._video.currentTime += 2;
    }
    //Перемотка назад на 2 сек.
    _skipPrev() {
        this._video.currentTime -= 2;
    }
    //Регулировка звука
    _setvolume() {
        this._video.volume = (event.offsetX / this._progressContainer1.offsetWidth);
    }
    //Регулировка скорости воспроизведения
    _setSpeed() {
        this._video.playbackRate = (event.offsetX / this._progressContainer1.offsetWidth);
    }

    _addTemplate() {
        const template = this._createVideoTemplate();
        const container = document.querySelector(this._settings.videoPlayerContainer);
        container ? container.insertAdjacentHTML('afterbegin', template) : console.error('Video container was not found');
    }
    _setElements() {
        this._videoContainer = document.querySelector(this._settings.videoPlayerContainer);
        this._video = this._videoContainer.querySelector('video');
        this._toggleBtn = this._videoContainer.querySelector('.toggle');
        this._progress = this._videoContainer.querySelector('.progress__filled');
        this._progressContainer = this._videoContainer.querySelector('.progress');
        //Элемент управления звуком
        this._progressContainer1 = this._videoContainer.querySelector('.volume');
        //Элемент управления скоростью воспроизведения
        this._progressContainer2 = this._videoContainer.querySelector('.speed');
        //Элемент управление перемоткой вперед
        this._progressContainer3 = this._videoContainer.querySelector('.prev');
        //Элемент управление перемоткой назад
        this._progressContainer4 = this._videoContainer.querySelector('.next');

    }
    _setEvents() {
        this._video.addEventListener('click', () => this.toggle());
        this._toggleBtn.addEventListener('click', () => this.toggle());
        this._video.addEventListener('timeupdate', () => this._videoProgressHandler());
        this._progressContainer.addEventListener('click', (e) => this._peremotka(e));
        //Событие - регулирование звука
        this._progressContainer1.addEventListener('click', () => this._setvolume());
        //Событие - скорость воспроизведенния
        this._progressContainer2.addEventListener('click', () => this._setSpeed());
        //Событие -перемотка вперед по клику
        this._progressContainer3.addEventListener('click', () => this._skipPrev());
        //Событие -перемотка назад по клику
        this._progressContainer4.addEventListener('click', () => this._skipNext());

    }

    _createVideoTemplate() {
        return `
        <div class="player">
            <video class="player__video viewer" src="${this._settings.videoUrl}"> </video>
            <div class="player__controls">
              <div class="progress">
              <div class="progress__filled"></div>
              </div>
              <button class="player__button toggle" title="Toggle Play">►</button>
              <input type="range" name="volume" class="player__slider volume" min=0 max="1" step="0.05" value="${this._settings.volume}">
              <input type="range" name="playbackRate" class="player__slider speed" min="0.5" max="2" step="0.1" value="${this._settings.playbackRate}">
              <button  data-skip="${this._settings.skipPrev}" class="player__button prev">«${this._settings.skipPrev}s</button>
              <button data-skip="${this._settings.skipNext}" class="player__button next">${this._settings.skipNext}s »</button>
            </div>
      </div>
        `;
    }


    static get DefaultSettings() {
        return {
            videoUrl: '',
            videoPlayerContainer: 'body',
            playbackRate: 1,
            volume: 1,
            skipNext: 1,
            skipPrev: -1
        }
    }


}
const playerInstance = new VideoPlayer({
    videoUrl: 'video/mov_bbb.mp4'
});

playerInstance.init();

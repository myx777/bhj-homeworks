class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.timerStatus = container.querySelector('.status__timer');
    // this.timer = this.timer.bind(this);// нужно при использовании декларации функции timer
    this.reset();

    this.registerEvents();

    this.intervalTimer = setInterval(this.timer, 1000);//запуск таймера
  }
 
  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
    this.timerStatus.textContent = this.wordElement.textContent.length; 
  }

  registerEvents() {
    /*
      TODO:
      Написать обработчик события, который откликается
      на каждый введённый символ.
      В случае правильного ввода слова вызываем this.success()
      При неправильном вводе символа - this.fail();
      DOM-элемент текущего символа находится в свойстве this.currentSymbol.
     */
    
    document.addEventListener("keydown", (event) => {//назначаю обработчик на клаву
      if(event.key.toUpperCase() === this.currentSymbol.textContent.toUpperCase()) {//проверяю совпадение нажатой кнопки и заданного символа из слова
      this.success();
      } else {
      this.fail();
      }
    }); 
  }

  timer = () => {//если использованить через function declaration, то надо добавлять bind 
    this.timerStatus.textContent -= 1; //уменьшаем на 1 секунду таймер прикаждом вызове функции
    if(this.timerStatus.textContent < 0){
      this.fail();
      this.setNewWord();
      this.timerStatus.textContent = this.wordElement.textContent.length;
    }
  }

  success() {
    if(this.currentSymbol.classList.contains("symbol_current")) this.currentSymbol.classList.remove("symbol_current");
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol !== null) {
      this.currentSymbol.classList.add('symbol_current');
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    }
    this.setNewWord();
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      alert('Вы проиграли!');
      this.reset();
    }
    this.setNewWord();
  }

  setNewWord() {
    const word = this.getWord();
    this.renderWord(word);
  }

  getWord() {
    const words = [
        'bob',
        'awesome',
        'netology',
        'hello',
        'kitty',
        'rock',
        'youtube',
        'popcorn',
        'cinema',
        'love',
        'javascript'
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
          
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

new Game(document.getElementById('game'))


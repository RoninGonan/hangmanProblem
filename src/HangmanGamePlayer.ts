import HangmanGameManager, { HangmanResult } from './HangmanGameManager'
import { PriorityQueue } from './PriorityQueue';

export default class HangmanGamePlayer {
  constructor(private hangmanGame: HangmanGameManager, private words: string[]) {
    this.guessedLetters = new Set<string>();
  }

  private positionsGuessedSoFar: number[];
  private guessedLetters: Set<string>;

  public playGame() {
    // And the positions guessed so far (not being used in this implementation)
    this.parsePositionsGuessed();

    // And the word length (not being used in this implementation)
    const wordLength = this.hangmanGame.wordLength

    // START DUMMY IMPLEMENTATION
    // This is a very 'dumb' player who just guessed a, b, c, ... until win or lose
    // TODO: Replace this implementation!!
    const mostCommon = ['e', 't', 'a', 'i', 'o', 'n', 's', 'h', 'r']
    const remaining = ['y', 'b', 'c', 'd', 'f', 'g', 'j', 'k', 'l', 'm', 'p', 'q', 'u', 'v', 'w', 'x', 'z']

    let result: HangmanResult
    let nextGuessOptions = mostCommon;
    do {
      if (this.positionsGuessedSoFar.length === 0 && nextGuessOptions.length === 0) {
        nextGuessOptions = remaining
      }
      let nextGuess = nextGuessOptions.shift();

      result = this.hangmanGame.guessCharacter(nextGuess)
      if (result === HangmanResult.No) {
        continue;
      }

      this.guessedLetters.add(nextGuess);

      this.parsePositionsGuessed();
      nextGuessOptions = this.prepareNextGuessOptions();
    } while (result !== HangmanResult.Won && result !== HangmanResult.Lost)
    console.log(`Finished the game! I ${HangmanResult[result]} and it only took me ${this.hangmanGame.totalFailedGuesses} failed guesses :)`);
  }

  private parsePositionsGuessed() {
    let positionsGuessed = [];
    this.hangmanGame.positionsGuessedSoFar.forEach((el, index) => {
      if (el !== '_') {
        positionsGuessed.push(index);
      }
    });
    this.positionsGuessedSoFar = positionsGuessed;
  }

  private prepareNextGuessOptions(): string[] {
    let newWords: string[] = [];
    let newOptions: { [id: string]: number } = {};
    let optionsPriority = new PriorityQueue<string>();

    for (let word of this.words) {
      if (!this.isWordPossible(word)) { continue; }

      newWords.push(word);

      for (let c of word) {
        if (this.guessedLetters.has(c)) { continue; }
        if (!newOptions[c]) { 
          newOptions[c] = 1;
        } else {
          newOptions[c]++;
        }
      }
    }

    for (let key of Object.keys(newOptions)) {
      optionsPriority.enqueue(key, newOptions[key]);
    }
    let sortedOptions = [];
    while (!optionsPriority.isEmpty()) {
      sortedOptions.push(optionsPriority.dequeue().value);
    }
    return sortedOptions;
  }

  private isWordPossible(word: string): boolean {
    let possible = true;
    for (let index of this.positionsGuessedSoFar) {
      let letter = this.hangmanGame.positionsGuessedSoFar[index];
      if (word[index] !== letter) {
        possible = false;
      }
    }
    return possible;
  }
}
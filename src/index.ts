import Phaser from 'phaser';

import { HelloWorldScene } from '~/scenes/HelloWorldScene';

const gameTitle = 'Hello World';
const backgroundColor = '#18216D';

class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

let game = null;

export const start = (options: any): void => {
  if (game !== null) return;
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.CANVAS,
    title: gameTitle,
    width: options.width * window.devicePixelRatio, // The canvas width
    height: options.height * window.devicePixelRatio, // The canvas  height
    parent: options.parent,
    backgroundColor: backgroundColor,
    scene: HelloWorldScene,
    scale: {
      parent: options.parent,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      mode: Phaser.Scale.ENVELOP,
      width: options.width, // The width of the game
      height: options.height, // The height of the game
    },
  };

  game = new Game(config);
};

export const stop = (): void => {
  if (game === null) return;
  game.destroy(true);
  game = null;
};

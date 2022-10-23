import Phaser from 'phaser';

export class HelloWorldScene extends Phaser.Scene {
  create() {
    this.add.text(100, 100, 'Hello World', { fill: '#0f0' });
  }
}

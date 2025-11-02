let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 750 },
      debug: false,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: "game-container",
    width: 800,
    height: 600,
  },
  scene: [MenuScene, GameScene, GameOverScene],
};

let game = new Phaser.Game(config);

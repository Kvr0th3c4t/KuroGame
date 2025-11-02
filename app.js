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
  scene: [MenuScene, GameScene, GameOverScene],
};

let game = new Phaser.Game(config);

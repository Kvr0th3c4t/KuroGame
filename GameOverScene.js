class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameOverScene" });
  }

  init(data) {
    this.finalScore = data.score || 0;
  }

  preload() {
    this.load.image("GObackground", "assets/gameOver.jpeg");
  }

  create() {
    const background = this.add.image(0, 0, "GObackground").setOrigin(0, 0);
    background.setScale(0.6);

    this.add.rectangle(400, 300, 800, 600, 0x000000, 0.5);

    this.add
      .text(400, 150, "GAME OVER", {
        fontSize: "72px",
        fill: "#DC143C",
        fontStyle: "bold",
        fontFamily: "Metamorphous",
        stroke: "#000000",
        strokeThickness: 8,
      })
      .setOrigin(0.5);

    this.add
      .text(400, 250, `Puntos: ${this.finalScore}`, {
        fontSize: "56px",
        fill: "#FFD700",
        fontFamily: "Metamorphous",
        stroke: "#000000",
        strokeThickness: 6,
      })
      .setOrigin(0.5);

    const retryButton = this.add
      .text(400, 370, "REINTENTAR", {
        fontSize: "40px",
        fill: "#00FF7F",
        fontFamily: "Metamorphous",
        stroke: "#000000",
        strokeThickness: 4,
      })
      .setOrigin(0.5);

    retryButton.setInteractive({ useHandCursor: true });

    retryButton.on("pointerover", () => {
      retryButton.setScale(1.1);
      retryButton.setFill("#FFD700");
    });

    retryButton.on("pointerout", () => {
      retryButton.setScale(1);
      retryButton.setFill("#00FF7F");
    });

    retryButton.on("pointerdown", () => {
      this.scene.start("GameScene");
    });

    const menuButton = this.add
      .text(400, 470, "MENÚ", {
        fontSize: "40px",
        fill: "#9370DB",
        fontFamily: "Metamorphous",
        stroke: "#000000",
        strokeThickness: 4,
      })
      .setOrigin(0.5);

    menuButton.setInteractive({ useHandCursor: true });

    menuButton.on("pointerover", () => {
      menuButton.setScale(1.1);
      menuButton.setFill("#FF69B4");
    });

    menuButton.on("pointerout", () => {
      menuButton.setScale(1);
      menuButton.setFill("#9370DB");
    });

    menuButton.on("pointerdown", () => {
      this.scene.start("MenuScene");
    });
  }
}

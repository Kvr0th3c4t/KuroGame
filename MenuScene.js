class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MenuScene" });
  }
  preload() {
    this.load.image("background", "assets/fondoMenu.png");
  }

  create() {
    const background = this.add.image(0, 0, "background").setOrigin(0, 0);
    background.setScale(0.6);

    this.add.rectangle(400, 300, 800, 600, 0x000000, 0.4);

    this.add
      .text(400, 300, "Kuro", {
        fontSize: "72px",
        fill: "#9370DB",
        fontStyle: "bold",
        fontFamily: "Metamorphous",
        stroke: "#000000",
        strokeThickness: 6,
      })
      .setOrigin(0.5);

    const playButton = this.add
      .text(400, 450, "JUGAR", {
        fontSize: "48px",
        fill: "#FFD700",
        fontFamily: "Metamorphous",
        stroke: "#000000",
        strokeThickness: 4,
      })
      .setOrigin(0.5);

    playButton.setInteractive({ useHandCursor: true });

    playButton.on("pointerover", () => {
      playButton.setScale(1.1);
      playButton.setFill("#FF69B4");
    });

    playButton.on("pointerout", () => {
      playButton.setScale(1);
      playButton.setFill("#FFD700");
    });

    playButton.on("pointerdown", () => {
      this.scene.start("GameScene");
    });

    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.start("GameScene");
    });
  }
}

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });

    this.configuracionesTop = [
      { y: 90, scale: 1.25 },
      { y: 125, scale: 1.75 },
      { y: 145, scale: 2 },
    ];

    this.configuracionesBottom = [
      { y: 455, scale: 1.25 },
      { y: 425, scale: 1.75 },
      { y: 410, scale: 2 },
    ];
  }

  preload() {
    this.load.image("background1", "assets/Luna/1.png");
    this.load.image("background2", "assets/Luna/2.png");
    this.load.image("background3", "assets/Luna/3.png");
    this.load.image("background4", "assets/Luna/4.png");
    this.load.image("background5", "assets/Luna/5.png");
    this.load.image("background6", "assets/Luna/6.png");
    this.load.image("topObstacle", "assets/Obstaculos/lampara.png");
    this.load.image("bottomObstacle", "assets/Obstaculos/castillo.png");
    this.load.image("road", "assets/road.png");
    this.load.spritesheet("cat", "assets/cat.png", {
      frameWidth: 48,
      frameHeight: 64,
    });
  }

  create() {
    this.score = 0;
    this.proximoEsTop = true;
    this.juegoIniciado = false;

    const background1 = this.add.image(0, 0, "background1").setOrigin(0, 0);
    const background2 = this.add.image(0, 0, "background2").setOrigin(0, 0);
    const background3 = this.add.image(0, 0, "background3").setOrigin(0, 0);
    const background4 = this.add.image(0, 0, "background4").setOrigin(0, 0);
    const background5 = this.add.image(0, 0, "background5").setOrigin(0, 0);
    const background6 = this.add.image(0, 0, "background6").setOrigin(0, 0);

    this.cat = this.physics.add.sprite(150, 300, "cat");
    this.cat.setScale(1.4);
    this.cat.flipX = true;
    this.cat.body.setSize(
      this.cat.displayWidth * 0.65,
      this.cat.displayHeight * 0.4
    );
    this.cat.body.setOffset(this.cat.width * 0.1, this.cat.height * 0.3);

    this.anims.create({
      key: "fly",
      frames: this.anims.generateFrameNumbers("cat", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });

    this.cat.anims.play("fly", true);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.physics.pause();

    this.textoInicio = this.add
      .text(400, 300, "TOCA PARA EMPEZAR", {
        fontSize: "32px",
        fill: "#FFD700",
        fontFamily: "Metamorphous",
        stroke: "#000000",
        strokeThickness: 6,
      })
      .setOrigin(0.5);

    this.input.on("pointerdown", () => {
      if (!this.juegoIniciado) {
        this.iniciarJuego();
      } else {
        this.cat.setVelocityY(-275);
      }
    });

    this.scoreText = this.add.text(16, 16, "Puntos: 0", {
      fontSize: "32px",
      fill: "#FFD700",
      fontFamily: "Metamorphous",
      stroke: "#000000",
      strokeThickness: 4,
    });

    this.topObstacles = this.physics.add.group();
    this.bottomObstacles = this.physics.add.group();

    this.crearObstaculoEstatico(500);
    this.crearObstaculoEstatico(700);
    this.crearObstaculoEstatico(900);

    const roads = this.physics.add.staticGroup();
    const road = roads.create(400, 600, "road").setScale(2).refreshBody();

    this.colliderSuelo = this.physics.add.collider(this.cat, roads);
    this.overlapTop = this.physics.add.overlap(
      this.cat,
      this.topObstacles,
      this.gameOver,
      null,
      this
    );
    this.overlapBottom = this.physics.add.overlap(
      this.cat,
      this.bottomObstacles,
      this.gameOver,
      null,
      this
    );
  }

  crearObstaculoEstatico(posX) {
    if (this.proximoEsTop) {
      const config = Phaser.Utils.Array.GetRandom(this.configuracionesTop);
      const top = this.topObstacles.create(posX, config.y, "topObstacle");
      top.setScale(1.5, config.scale);
      top.body.allowGravity = false;
      top.setVelocityX(0);
      top.body.setSize(top.displayWidth * 0.25);
      top.body.setOffset(top.width * 0.325, top.height * -0.2);
    } else {
      const config = Phaser.Utils.Array.GetRandom(this.configuracionesBottom);
      const bottom = this.bottomObstacles.create(
        posX,
        config.y,
        "bottomObstacle"
      );
      bottom.setScale(1.5, config.scale);
      bottom.body.allowGravity = false;
      bottom.setVelocityX(0);
      bottom.body.setSize(
        bottom.displayWidth * 0.3,
        bottom.displayHeight * 0.7
      );
      bottom.body.setOffset(bottom.width * 0.28, bottom.height * 0.09);
    }

    this.proximoEsTop = !this.proximoEsTop;
  }

  iniciarJuego() {
    this.juegoIniciado = true;
    this.physics.resume();
    this.textoInicio.destroy();
    this.cat.setVelocityY(-275);

    this.topObstacles.children.entries.forEach((obstacle) => {
      obstacle.setVelocityX(-200);
    });

    this.bottomObstacles.children.entries.forEach((obstacle) => {
      obstacle.setVelocityX(-200);
    });

    this.obstacleTimer = this.time.addEvent({
      delay: 900,
      callback: () => this.crearObstaculo(900),
      loop: true,
    });
  }

  crearObstaculo(posX) {
    if (this.proximoEsTop) {
      const config = Phaser.Utils.Array.GetRandom(this.configuracionesTop);
      const top = this.topObstacles.create(posX, config.y, "topObstacle");
      top.setScale(1.5, config.scale);
      top.body.allowGravity = false;
      top.setVelocityX(-200);
      top.body.setSize(top.displayWidth * 0.25);
      top.body.setOffset(top.width * 0.325, top.height * -0.2);
    } else {
      const config = Phaser.Utils.Array.GetRandom(this.configuracionesBottom);
      const bottom = this.bottomObstacles.create(
        posX,
        config.y,
        "bottomObstacle"
      );
      bottom.setScale(1.5, config.scale);
      bottom.body.allowGravity = false;
      bottom.setVelocityX(-200);
      bottom.body.setSize(
        bottom.displayWidth * 0.3,
        bottom.displayHeight * 0.7
      );
      bottom.body.setOffset(bottom.width * 0.28, bottom.height * 0.09);
    }

    this.proximoEsTop = !this.proximoEsTop;
  }

  update() {
    if (!this.juegoIniciado) {
      return;
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
      this.cat.setVelocityY(-275);
    }

    if (this.cat.y < this.cat.displayHeight / 8) {
      this.cat.y = this.cat.displayHeight / 4;
      this.cat.setVelocityY(100);
    }

    this.topObstacles.children.entries.forEach((obstacle) => {
      if (obstacle.x + obstacle.displayWidth < this.cat.x && !obstacle.scored) {
        obstacle.scored = true;
        this.score++;
        this.scoreText.setText("Puntos: " + this.score);
      }

      if (obstacle.x < -100) {
        obstacle.destroy();
      }
    });

    this.bottomObstacles.children.entries.forEach((obstacle) => {
      if (obstacle.x + obstacle.displayWidth < this.cat.x && !obstacle.scored) {
        obstacle.scored = true;
        this.score++;
        this.scoreText.setText("Puntos: " + this.score);
      }

      if (obstacle.x < -100) {
        obstacle.destroy();
      }
    });
  }

  gameOver() {
    if (this.obstacleTimer) {
      this.obstacleTimer.remove();
    }
    this.physics.world.removeCollider(this.colliderSuelo);
    this.physics.world.removeCollider(this.overlapTop);
    this.physics.world.removeCollider(this.overlapBottom);
    this.cat.setTint(0xff0000);

    this.topObstacles.children.entries.forEach((obstacle) => {
      obstacle.body.setVelocityX(0);
    });

    this.bottomObstacles.children.entries.forEach((obstacle) => {
      obstacle.body.setVelocityX(0);
    });

    this.cat.setVelocityY(-250);
    this.cat.setVelocityX(100);

    this.tweens.add({
      targets: this.cat,
      angle: 360,
      duration: 1000,
      repeat: -1,
      ease: "Linear",
    });

    this.time.delayedCall(500, () => {
      const textoMuerte = this.add
        .text(400, 300, "MORICIÓN", {
          fontSize: "72px",
          fill: "#DC143C",
          fontStyle: "bold",
          fontFamily: "Metamorphous",
          stroke: "#000000",
          strokeThickness: 8,
        })
        .setOrigin(0.5)
        .setAlpha(0);

      this.tweens.add({
        targets: textoMuerte,
        alpha: 1,
        scale: { from: 0.5, to: 1 },
        duration: 500,
        ease: "Back.easeOut",
      });

      this.time.delayedCall(2000, () => {
        this.scene.start("GameOverScene", { score: this.score });
      });
    });
  }
}

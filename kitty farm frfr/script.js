// | |_(_) | ___ _ __ ___   __ _ _ __
// | __| | |/ _ \ '_ ` _ \ / _` | '_ \
// | |_| | |  __/ | | | | | (_| | |_) |
//  \__|_|_|\___|_| |_| |_|\__,_| .__/
//                              |_|
const canvas = document.getElementById("gameCanvas2");
const ctx = canvas.getContext("2d");
const tileSize = 64;

var player = {
  x: 9,
  y: 4,
};
var prey1 = {};
var prey2 = {};
var prey3 = {};

// https://stackoverflow.com/a/27162245 for dynamically creating "variables" (is dynamically create properties on le object dirtPlot
// but uising it as varble)
// making da top row of dirt plotz
var dirtPlot = {};
for (var i = 0; i < 5; i++) {
  dirtPlot[i] = { x: 2 + i, y: 2 };
}
// making da middle row of dirt plotz
var dirtPlot = {};
for (var i = 0; i < 5; i++) {
  dirtPlot[i + 5] = { x: 2 + i, y: 5 };
}
// making da bottom row of dirt plotz
var dirtPlot = {};
for (var i = 0; i < 5; i++) {
  dirtPlot[i + 10] = { x: 2 + i, y: 7 };
}

// legend
//10 - grass
//11 - dirtTile
//12 - player
//13 - barrier
//14 - sprout
var onFarm = true;
var map = [
  [13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13],
  [13, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13],
  [13, 10, 11, 11, 11, 11, 11, 10, 10, 10, 10, 13],
  [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13],
  [10, 10, 10, 10, 10, 10, 10, 10, 10, 12, 10, 13],
  [13, 10, 11, 11, 11, 11, 11, 10, 10, 10, 10, 13],
  [13, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13],
  [13, 10, 11, 11, 11, 11, 11, 10, 10, 10, 10, 13],
  [13, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13],
  [13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13],
];

map.tileSize = tileSize;
map.barrier = image("barrier.png");
map.player = image("player.png");
map.dirtTile = image("dirtTile.png");
map.sprout = image("sprout.png");

const tileMap = {
  tileSize: tileSize,
  barrier: image("barrier.png"),
  player: image("player.png"),
  dirtTile: image("dirtTile.png"),
  sprout: image("sprout.png"),
  draw: function (canvas, ctx) {
    setCanvasSize(canvas);
    clearCanvas(canvas, ctx);
    drawMap(ctx);
  },
};
function image(fileName) {
  const img = new Image();
  img.src = `images/${fileName}`;
  return img;
}

function drawMap(ctx) {
  for (let row = 0; row < map.length; row++) {
    for (let column = 0; column < map[row].length; column++) {
      const tile = map[row][column];
      let image = null;
      //this switch statement needs to get Yeeted and Revamped sooner or later with all the new thangs
      switch (tile) {
        case 11:
          image = tileMap.dirtTile;
          break;
        case 12:
          image = tileMap.player;
          break;
        case 13:
          image = tileMap.barrier;
          break;
        case 14:
          image = tileMap.sprout;
          break;
      }

      if (image != null)
        ctx.drawImage(
          image,
          column * tileSize,
          row * tileSize,
          tileSize,
          tileSize
        );

      // outlines in yellow
      ctx.strokeStyle = "yellow";
      ctx.strokeRect(column * tileSize, row * tileSize, tileSize, tileSize);
    }
  }
}
function clearCanvas(canvas, ctx) {
  ctx.fillStyle = "rgb(133, 179, 84, 0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function setCanvasSize(canvas) {
  canvas.height = map.length * tileSize;
  canvas.width = map[0].length * tileSize;
}

// _ __ ___   _____   _____ _ __ ___   ___ _ __ | |_
// | '_ ` _ \ / _ \ \ / / _ \ '_ ` _ \ / _ \ '_ \| __|
// | | | | | | (_) \ V /  __/ | | | | |  __/ | | | |_
// |_| |_| |_|\___/ \_/ \___|_| |_| |_|\___|_| |_|\__|

function moveObject(newX, newY, obj) {
  if (newY >= 0 && newY < map.length) {
    if (newX >= 0 && newX < map[newY].length) {
      var newTileType = map[newY][newX];
      if (newTileType !== 13 && newTileType !== 11) {
        map[obj.y][obj.x] = 10;
        obj.x = newX;
        obj.y = newY;
        map[obj.y][obj.x] = 12;
        drawMap(ctx);
      }
    } else if (obj == player) {
      if (onFarm) {
        onFarm = false;
        map = [
          [13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13],
          [13, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13],
          [13, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13],
          [13, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
          [13, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
          [13, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13],
          [13, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13],
          [13, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13],
          [13, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13],
          [13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13],
        ];
        map[player.y][11] = 12;
        player.x = 11;
        document.getElementById("gameCanvas2").style.backgroundImage =
          'url("images/huntingGroundsBackground.png")';
      } else {
        onFarm = true;
        map = [
          [13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13],
          [13, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13],
          [13, 10, 11, 11, 11, 11, 11, 10, 10, 10, 10, 13],
          [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13],
          [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13],
          [13, 10, 11, 11, 11, 11, 11, 10, 10, 10, 10, 13],
          [13, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13],
          [13, 10, 11, 11, 11, 11, 11, 10, 10, 10, 10, 13],
          [13, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13],
          [13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13],
        ];
        map[player.y][0] = 12;
        player.x = 0;
        document.getElementById("gameCanvas2").style.backgroundImage =
          'url("images/farmBackground.png")';
      }
      drawMap(ctx);
    }
  }
}

document.body.onkeydown = function (event) {
  var newX = player.x,
    newY = player.y;

  if (event.keyCode === 37 || event.keyCode === 65) {
    // left arrow or a
    newX += -1;
  } else if (event.keyCode === 38 || event.keyCode === 87) {
    // up arrow or w
    newY += -1;
  } else if (event.keyCode === 39 || event.keyCode === 68) {
    // right arrow or d
    newX += 1;
  } else if (event.keyCode === 40 || event.keyCode === 83) {
    // down arrow or s
    newY += 1;
  }

  moveObject(newX, newY, player);
};

// _ __ | | __ _ _ __ | |_
// | '_ \| |/ _` | '_ \| __|
// | |_) | | (_| | | | | |_
// | .__/|_|\__,_|_| |_|\__|
// |_|
// if (dirtPlot[interacted].grown) {

// } else {

// }

//    __ _  __ _ _ __ ___   ___
//    / _` |/ _` | '_ ` _ \ / _ \
//   | (_| | (_| | | | | | |  __/
//    \__, |\__,_|_| |_| |_|\___|
//    |___/

// at the bottom so all the called variables n stuff r actually set </3
// hey wtf ? i dont need to update 60 frames a second lmfao just whenevr smth else gets udpated
setInterval(gameLoop, 1000 / 60);

function gameLoop() {
  tileMap.draw(canvas, ctx);
}

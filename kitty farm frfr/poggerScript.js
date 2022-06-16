// | |_(_) | ___ _ __ ___   __ _ _ __
// | __| | |/ _ \ '_ ` _ \ / _` | '_ \
// | |_| | |  __/ | | | | | (_| | |_) |
//  \__|_|_|\___|_| |_| |_|\__,_| .__/
//                              |_|
const canvas = document.getElementById("gameCanvas2");
const ctx = canvas.getContext("2d");
const tileSize = 64;

const img = new Image();
img.src = "./images/titleScreen.png";
img.onload = () => {
  ctx.drawImage(img, 0, 0);
};

var chatLog = ["welcome to kitty farm! press enter to interact with stuff :3"];
var money = 0;
var hasWon = false;
var player = {
  x: 9,
  y: 4,
};
var prey1 = {};
var prey2 = {};
var prey3 = {};

// dirt list for later when we're searching for the right dirt tile whne we uhhhh interact wiht it
var dirtList = [
  { x: 2, y: 2, grown: true, secondsLeft: 0 },
  { x: 3, y: 2, grown: true, secondsLeft: 0 },
  { x: 4, y: 2, grown: true, secondsLeft: 0 },
  { x: 5, y: 2, grown: true, secondsLeft: 0 },
  { x: 6, y: 2, grown: true, secondsLeft: 0 },
  { x: 2, y: 5, grown: true, secondsLeft: 0 },
  { x: 3, y: 5, grown: true, secondsLeft: 0 },
  { x: 4, y: 5, grown: true, secondsLeft: 0 },
  { x: 5, y: 5, grown: true, secondsLeft: 0 },
  { x: 6, y: 5, grown: true, secondsLeft: 0 },
  { x: 2, y: 7, grown: true, secondsLeft: 0 },
  { x: 3, y: 7, grown: true, secondsLeft: 0 },
  { x: 4, y: 7, grown: true, secondsLeft: 0 },
  { x: 5, y: 7, grown: true, secondsLeft: 0 },
  { x: 6, y: 7, grown: true, secondsLeft: 0 },
];

// legend
// 10 - grass (blank)
// 11 - dirtTile
// 12 - player
// 13 - barrier
// 20 - left sprout
// 21 - middle sprout
// 22 - right sprout
// 23 - left bush
// 24 - middle bush
// 25 - right bush
var onFarm = true;
var map = [
  [13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13],
  [13, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13],
  [13, 10, 23, 24, 24, 24, 25, 10, 10, 10, 10, 13],
  [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13],
  [10, 10, 10, 10, 10, 10, 10, 10, 10, 12, 10, 13],
  [13, 10, 23, 24, 24, 24, 25, 10, 10, 10, 10, 13],
  [13, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13],
  [13, 10, 23, 24, 24, 24, 25, 10, 10, 10, 10, 13],
  [13, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13],
  [13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13],
];
var farmMap = [
  [13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13],
  [13, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13],
  [13, 10, 23, 24, 24, 24, 25, 10, 10, 10, 10, 13],
  [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13],
  [10, 10, 10, 10, 10, 10, 10, 10, 10, 12, 10, 13],
  [13, 10, 23, 24, 24, 24, 25, 10, 10, 10, 10, 13],
  [13, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13],
  [13, 10, 23, 24, 24, 24, 25, 10, 10, 10, 10, 13],
  [13, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 13],
  [13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13],
];

// map.tileSize = tileSize;
// map.barrier = image("barrier.png");
// map.player = image("player.png");
// map.dirtTile = image("dirtTile.png");
// map.sprout = image("sprout.png");
//huh... aren't both the map and tilemap redundant ?
const tileMap = {
  tileSize: tileSize,
  barrier: image("barrier.png"),
  player: image("player.png"),
  dirtTile: image("dirtTile.png"),
  leftSprout: image("leftSprout.png"),
  middleSprout: image("middleSprout.png"),
  rightSprout: image("rightSprout.png"),
  leftStrawberryBush: image("leftStrawberryBush.png"),
  middleStrawberryBush: image("middleStrawberryBush.png"),
  rightStrawberryBush: image("rightStrawberryBush.png"),
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
        case 20:
          image = tileMap.leftSprout;
          break;
        case 21:
          image = tileMap.middleSprout;
          break;
        case 22:
          image = tileMap.rightSprout;
          break;
        case 23:
          image = tileMap.leftStrawberryBush;
          break;
        case 24:
          image = tileMap.middleStrawberryBush;
          break;
        case 25:
          image = tileMap.rightStrawberryBush;
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
// |_| |_| |_|\___/ \_/ \___|_| |_| |_|\___|_| |_|\__| and interaction

function moveObject(newX, newY, obj) {
  if (newY >= 0 && newY < map.length) {
    if (newX >= 0 && newX < map[newY].length) {
      var newTileType = map[newY][newX];
      if (newTileType < 20 && newTileType != 13) {
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
  tileMap.draw(canvas, ctx);
}
function interactWithObject(currentXPos, currentYPos, direction) {
  switch (direction) {
    case "left":
      //remember! y before x here, since the y is measured by it's number in the map's list
      if (map[currentYPos][currentXPos - 1] >= 20) {
        //this 14 is the babie sprout 15 is suppsoed to be the grown bush
        // i stuff em in an or check bc they both go to the plant check function anyways </3
        interactWithPlant(identifyDirtPlot(currentYPos, currentXPos - 1));
      }
      break;
    case "up":
      if (map[currentYPos - 1][currentXPos] >= 20) {
        interactWithPlant(identifyDirtPlot(currentYPos - 1, currentXPos));
      }
      break;
    case "right":
      if (map[currentYPos][currentXPos + 1] >= 20) {
        interactWithPlant(identifyDirtPlot(currentYPos, currentXPos + 1));
      }
      break;
    case "down":
      if (map[currentYPos + 1][currentXPos] >= 20) {
        interactWithPlant(identifyDirtPlot(currentYPos + 1, currentXPos));
      }
      break;
  }
}
document.body.onkeydown = function (event) {
  var newX = player.x,
    newY = player.y;

  if (event.keyCode === 37 || event.keyCode === 65) {
    // left arrow or a
    player.direction = "left";
    newX += -1;
  } else if (event.keyCode === 38 || event.keyCode === 87) {
    // up arrow or w
    player.direction = "up";
    newY += -1;
  } else if (event.keyCode === 39 || event.keyCode === 68) {
    // right arrow or d
    player.direction = "right";
    newX += 1;
  } else if (event.keyCode === 40 || event.keyCode === 83) {
    // down arrow or s
    player.direction = "down";
    newY += 1;
  } else if (event.keyCode === 13) {
    interactWithObject(player.x, player.y, player.direction);
  }

  console.log(player.direction);
  moveObject(newX, newY, player);
};

// _ __ | | __ _ _ __ | |_
// | '_ \| |/ _` | '_ \| __|
// | |_) | | (_| | | | | |_
// | .__/|_|\__,_|_| |_|\__|
// |_|

function identifyDirtPlot(x, y) {
  for (var i = 0; i < dirtList.length; i++) {
    if (dirtList[i].y == y) {
      if (dirtList[i].x == x) {
        console.log(dirtList[i]);
        return dirtList[i];
      }
    }
  }
}

function interactWithPlant(target) {
  console.log(
    "Target at x pos: " +
      target.x +
      " and y pos " +
      target.y +
      " and grown? " +
      target.grown
  );
  if (target.grown) {
    money += 30;
    document.getElementById("moneyz").innerHTML = "moneyz: " + money;
    addToChat(
      "You got 30 moneyz from the strawberry bush! It will be 30 seconds until it regrows."
    );
    if (!hasWon) {
      if (money >= 500) {
        addToChat(
          "You've gotten " +
            money +
            " moneyz and won! Congrats! You can keep playing :3"
        );
      }
    }
    //change the sprite of the thing. maybe change the *sprite* on the tilemap, while the dirtPlot object keeps its x and y
    //coords and therefore still keeps track of the thing. like how when it was bugged my player appeared to be in one spot
    //but was actually in the other
    target.grown = false;
    target.secondsLeft = 30;
    setTimeout(function () {
      target.grown = true;
      switch (farmMap[target.y][target.x]) {
        case 20:
          farmMap[target.y][target.x] = 23;
          break;
        case 21:
          farmMap[target.y][target.x] = 24;
          break;
        case 22:
          farmMap[target.y][target.x] = 25;
          break;
      }
    }, 1000 * 30);
  } else {
    addToChat(
      "Please be patient for little plant... only needs " +
        target.secondsLeft +
        " more seconds!"
    );
  }
}

function addToChat(text) {
  chatLog.push(text);
  if (chatLog.length >= 7) {
    delete chatLog[0];
  }
  document.getElementById("log").innerHTML = chatLog.join("<br></br>");
}

setInterval(function () {
  for (var i = 0; i < 15; i++) {
    dirtList[i].secondsLeft - 1;
  }
}, 1000);

drawMap(ctx);
tileMap.draw(canvas, ctx);
moveObject(player.x, player.y, player);
addToChat();

//vars i need... dirtplot interacted, grown property, haswon, money, secondsleft
// grown and seconds left r attached to

//    __ _  __ _ _ __ ___   ___
//    / _` |/ _` | '_ ` _ \ / _ \
//   | (_| | (_| | | | | | |  __/
//    \__, |\__,_|_| |_| |_|\___|
//    |___/

// at the bottom so all the called variables n stuff r actually set </3
// hey wtf ? i dont need to update 60 frames a second lmfao just whenevr smth else gets udpated
// setInterval(gameLoop, 1000 / 60);

// function gameLoop() {
//   tileMap.draw(canvas, ctx);
// }

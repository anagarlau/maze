
 let c = document.getElementById('canvas');
 let ctx = c.getContext('2d')
 let tile = 50
 //make map

 let map = [[1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 2]    
          ];
  //collision box as new array to be populated when the map is draw with object and status

 let collBox = [];
 let mapLength = map[0].length;
 let mapHeight = map.length;
 
 //obstacle tiles
 let myTile = new Image()
myTile.src = 'assets/tile1.png'

//the kitchen floor
let floor = new Image()
floor.src = 'assets/kitchen.jpg'
//mouse
let mouse = new Image();
mouse.src = 'assets/mouse2.jpg'

//cat
let cat = new Image()
cat.src = 'assets/cat.png'
//sound 
let miau = new Audio()
miau.src = 'assets/miau.wav'

let victoryMiau = new Audio();
victoryMiau.src = 'assets/Nyan_cat.mp3'

//2 iesirea
function drawMap(m){
for (let i=0; i < m.length; i++){
    collBox.push([]) //empty array into map
    for (let j=0; j < m[i].length; j++){
        if(m[i][j] === 1){
        ctx.beginPath();
        // ctx.fillStyle = "#000"; 
        // ctx.fillRect(j*tile, i*tile, tile, tile) 
        
        ctx.drawImage(myTile, j*tile, i*tile, tile, tile);
      
      }else if(m[i][j] === 2){
        
        ctx.beginPath();
        
        // ctx.fillStyle = "pink"; 
        // ctx.fillRect(j*tile, i*tile, tile, tile)    
         
        ctx.drawImage(mouse, j*tile, i*tile, tile, tile)
        
      }else{
        ctx.beginPath();
        ctx.drawImage(floor,j*tile, i*tile, tile, tile)
      }
      collBox[i].push({x:j*tile, y:i*tile, status: m[i][j] === 1 ? 1 : (m[i][j] === 2 ? 2 : 0)})
     }
   }
}

function drawPlayer(x,y){
        ctx.beginPath();
        // ctx.fillStyle = "red"; 
        // ctx.fillRect(x, y, tile, tile) 
        ctx.drawImage(cat, x, y, tile, tile)
}


//object for player

let player = {
    x: 0,
    y: 0,
    newX: 0,
    newY: 0
}

//move Player acc to col and row
function move(x,y){
  ctx.clearRect(0,0, mapLength*tile, mapHeight*tile); //clear canvas in PX!
  drawMap(map); //redraw Map
  drawPlayer(x,y); //drawPlayer
 
  player.x = player.newX;
  player.y = player.newY 
  //to save the values when you move
}

//using collBox iteration if 1 2 or 0
function checkCollision(){
for (let i=0; i< mapHeight; i++){
  for (let j=0; j< mapLength; j++){
   console.log(collBox[i][j.status])
    let b = collBox[i][j]
    if (player.newX === b.x && player.newY === b.y){
      if(b.status === 1){
        miau.play()
        console.log('Hit rock')
      }else if(b.status === 2){
        console.log('WIN')
        
        move(player.newX, player.newY)
       
        document.querySelector('.winner-game').style.display = 'block';
         victoryMiau.play()
      }else {
        move(player.newX, player.newY);}
       }
    else if(player.newX < 0 || player.newX >= mapLength*tile || player.newY < 0 || player.newY >= mapHeight*tile){
      console.log('hit wall')
    }
  }
}
}


 
//PRESS IN WINDOW
window.addEventListener('keydown', function(event){
if (event.keyCode === 38) {player.newX = player.x ; player.newY = player.y - tile; console.log('UP')}
if (event.keyCode === 37) {player.newX = player.x - tile; player.newY = player.y; console.log('LEFT')}
if (event.keyCode === 39) {player.newX = player.x + tile; player.newY = player.y;console.log('RIGHT')}
if (event.keyCode === 40) {player.newX = player.x ; player.newY = player.y + tile; console.log('DOWN')}
checkCollision()

//add collision check+sound
} )

window.onload = function(){
    drawMap(map)
    drawPlayer(0,0)
    console.log(collBox)
}

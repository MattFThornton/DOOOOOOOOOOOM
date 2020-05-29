//connect this script to an html document with a 700px x 700px canvas with the id "canvas"

const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.strokeStyle = "black";
let mapCoords = []
let x = 350;
let y = 350;
let fov = 700/360;
function random(){
  return Math.floor(Math.random() * 700);
}
function drawMap(){

  let i = 0;
  while (i < 7){
    mapCoords.push([random(),random(),random(),random()]);
    // creates map(7 lines)
    ctx.beginPath();
    ctx.moveTo(mapCoords[i][0],mapCoords[i][1]);
    ctx.lineTo(mapCoords[i][2],mapCoords[i][3]);
    ctx.stroke();
    i++;
  }
  //creates player(circle)
  ctx.beginPath();
  ctx.arc(x,y,5,0,2*Math.PI);
  ctx.fill();

  return mapCoords;
}
function updateMap(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let i = 0;
  while (i < 7){
    // updates map(7 lines)
    ctx.beginPath();
    ctx.moveTo(mapCoords[i][0],mapCoords[i][1]);
    ctx.lineTo(mapCoords[i][2],mapCoords[i][3]);
    ctx.stroke();
    i++;
  }
  //creates player(circle)
  ctx.beginPath();
  ctx.arc(x,y,5,0,2*Math.PI);
  ctx.fill();
}
function createRays(){
i = 0;
newx = x;
newy = y + 700;
 while (i < 700){
   console.log(newx);
  newx += -y;
  newy += -x;

  newx = newx * Math.cos(fov  * Math.PI / 180) + newy * Math.sin(fov * Math.PI / 180);
  newy = -newx * Math.sin(fov  * Math.PI / 180) + newy * Math.cos(fov * Math.PI / 180);
  newx += y;
  newy += x;
  console.log(newx);
  ctx.moveTo(x,y);
  ctx.lineTo(newx, newy);
  ctx.stroke();
  i += 1;
}
  ctx.moveTo(x,y);
  ctx.lineTo(x, 0);
  ctx.stroke();
}
//drawMap();
createRays();
// setInterval(updateMap, 1000);

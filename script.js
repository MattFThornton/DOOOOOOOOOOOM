const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.strokeStyle = "black";
const canvas2 = document.getElementById("canvas2");
let ctx2 = canvas2.getContext("2d");
let mapCoords = []
let x = 443;
let y = 443;
let num = 2000;
const fov = 60/num * Math.PI / 180;
let turn = 0 * Math.PI / 180; //turns camera x degrees clockwise
let distances = [];
let facing = 0;
let distance = 0;
const angle = 60;
let count = 0;
//controls
document.addEventListener("keydown", event => {
  if (event.isComposing || event.keyCode === 37) {
    turn += -0.025;
    //left
  }
  if (event.isComposing || event.keyCode === 38) {
    y += -5;
    //forward
  }
  if (event.isComposing || event.keyCode === 39) {
    turn += 0.025;
    //right
  }
  if (event.isComposing || event.keyCode === 40) {
    y += 5;
    //back
  }
  if (event.isComposing || event.keyCode === 65) {
    x += -5;
    //left
  }
  if (event.isComposing || event.keyCode === 68) {
     x += 5;
    //left
  }
});
function random(){
  return Math.floor(Math.random() * 700);
}
function drawMap(){
  let i = 0;
  mapCoords.push([699,699,0,699]);
  mapCoords.push([699,0,699,699]);
  mapCoords.push([0,699,699,699]);
  mapCoords.push([699,699,699,0]);
  mapCoords.push([0,200,330,200]);
  mapCoords.push([330,0,330,400]);
  mapCoords.push([0,400,330,400]);
  mapCoords.push([370,200,700,200]);
  mapCoords.push([370.00001,0,370,200]);
  mapCoords.push([0,50,700,50]);
  mapCoords.push([225,700,225,0]);
  mapCoords.push([650,0,650,200]);
  mapCoords.push([650,300,700,300]);
  mapCoords.push([650,300,650,500]);
  mapCoords.push([650,500,700,500]);
  while (i < mapCoords.length){
    //mapCoords.push([random(),random(),random(),random()]);
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

  i = 0;
  while (i < mapCoords.length){
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
  createRays();
  render();
}
function createRays(){
  count = 0;
  distances = [];
  i = 0;
  //sets length of lines
  let newx = 395;
  let newy = 395;

  let tempfov = fov;
  tempfov += turn;
   while (i < num){
    //resets max-length
    newx = 395;
    newy = 395;
    let bruhx = newx * Math.cos(tempfov) - newy * Math.sin(tempfov);
    let bruhy = newy * Math.sin(tempfov) + newx * Math.cos(tempfov);
    tempfov += fov;
    //console.log(bruhx +","+ bruhy);
    bruhx += x;
    bruhy += y;
    horizonx = bruhx;
    horizony = bruhy;
    let m = (y-bruhy)/(x-bruhx);
    let b = y - (m*x);
    n=0;
    while(n<mapCoords.length){
      let mapm = (mapCoords[n][1]-mapCoords[n][3]) / (mapCoords[n][0]-mapCoords[n][2]) ;
      let mapb = mapCoords[n][3] - (mapm*mapCoords[n][2]);
      //mapm * x + mapb =   m * x + b
      let tempm = m - mapm;
      let tempb = mapb - b;
      let finalx = tempb/tempm;
      let finaly = m*finalx+b;
      if (mapCoords[n][2] === mapCoords[n][0]){
        mapCoords[n][0]+= 0.00000001;
      }
      if(mapCoords[n][2] > mapCoords[n][0] ){
        x1 = mapCoords[n][2];
        x2 = mapCoords[n][0];
      } else{
        x1 = mapCoords[n][0];
        x2 = mapCoords[n][2];
        }
      if (finalx <= x1 && finalx >= x2){
        let finalLen = Math.sqrt(Math.pow((finalx-x), 2) + Math.pow((finaly-y), 2));
        let length = Math.sqrt(Math.pow((bruhx-x), 2) + Math.pow((bruhy-y), 2));
        if(finalLen < length){
          let change = Math.sqrt(Math.pow((bruhx-finalx), 2) + Math.pow((bruhy-finaly), 2));
          if (change<length){
            bruhx = finalx;
            bruhy = finaly;
            distance = Math.sqrt(Math.pow((bruhx-x), 2) + Math.pow((bruhy-y), 2));
            distance = Math.pow(distance, 2)/1000;
            if (distance<1){
              distance = 1;
            }
            count += distance;
          }
        }
      }
      n++;
    }
    if (horizonx === bruhx && horizony === bruhy){
      for(u=0;u<distance;u++){
      distances.push(558);
      }
    } else{
      for(u=0;u<distance;u++){
        let abr = fov;
        let radangle = (angle * Math.PI / 180)/2 - (abr * i);
        let tempdist = Math.sqrt(Math.pow((bruhx-x), 2) + Math.pow((bruhy-y), 2));
        distances.push(tempdist * Math.cos(radangle));
        //distances.push(Math.sqrt(Math.pow((bruhx-x), 2) + Math.pow((bruhy-y), 2)));
      }
    }
    if(i === num/2){
      facingrise = (y-bruhy);
      facingrun = (x-bruhx);
    }
    ctx.moveTo(x, y);
    ctx.lineTo(bruhx, bruhy);
    i += 1;
   }
    ctx.stroke();
}
function render(){
  ctx2.clearRect(0, 0, canvas.width, canvas.height);
  i = 0;
  let xspacing = 700/distances.length; //sets density of lines
  while (i <= distances.length){
    //c = String((distances[i] - 50)/5);
    c = String(200 - (distances[i] * 0.35));
    ctx2.strokeStyle = `rgb(${c}, ${c}, ${c})`;
    ctx2.beginPath();
    let lineheight = Math.sqrt(Math.pow((100+(distances[i])* 0.75-600), 2));
    ctx2.moveTo(i * xspacing, 500+(lineheight/4),2);
    ctx2.lineTo(i * xspacing, 100+(distances[i])* 0.75);
    ctx2.stroke();
    if (distances.length < 9000){
      i++;
    } else{
      i += 10;
    }

  }

}
drawMap();
createRays();
render();
setInterval(updateMap, 32.6666666667);

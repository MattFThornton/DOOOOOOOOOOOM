const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.strokeStyle = "black";
let x = 350;
let y = 350;
let bruhx = 700;
let bruhy = 700;
let mapCoords = [[617,275,215,669],];
update();
function update(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();

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
    let finalLen = Math.sqrt(Math.pow((finalx-x), 2) + Math.pow((finaly-y), 2));
    let length = Math.sqrt(Math.pow((bruhx-x), 2) + Math.pow((bruhy-y), 2));
    console.log(length);
    console.log(finalLen);
    if(finalLen < length){
      bruhx = finalx;
      bruhy = finaly;
    }
    n++;
  }

  ctx.moveTo(x, y);
  ctx.lineTo(bruhx, bruhy); //443.917, 443.917S
  ctx.moveTo(mapCoords[0][0],mapCoords[0][1]);
  ctx.lineTo(mapCoords[0][2],mapCoords[0][3]);
  ctx.stroke();
}

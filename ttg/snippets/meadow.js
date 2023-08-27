function setup(){	
	cnv1 = document.getElementById("cnv1");
	ctx1 = cnv1.getContext("2d");
	cnv1.addEventListener('mousedown',cnv1_click)
	cur1 = 0;
	
	cnv2 = document.getElementById("cnv2");
	ctx2 = cnv2.getContext("2d");
	cnv2.addEventListener('mousedown',cnv2_click)
	M2 = [[-1,-1,-1,1,-1],
       [-1,-1,-1,-1,2],
       [-1,-1,0,-1,-1],
       [2,-1,-1,1,-1],
       [2,0,-1,-1,-1]];
	
	beehive = new Image();
	beehive.onload = cnv1_draw;
	beehive.src = 'snippets/res/beehive.png';
	
	flowers = new Image();
	flowers.onload = cnv2_draw;
	flowers.src = 'snippets/res/flowers.png';
}

function cnv1_click(event){
	cur1 = Math.floor(event.offsetX/200)
	cnv1_draw()
}

function cnv1_draw(){
	ctx = ctx1;
	ctx.font = "30px Segoe UI"
	ctx.textAlign = "center"
	ctx.textBaseline = "middle"
	ctx.lineWidth = 2;
	ctx.fillStyle = "#111318";
	ctx.strokeStyle = "#937341";
	ctx.clearRect(0, 0, cnv1.width, cnv1.height)
	ctx.beginPath();
  	ctx.rect(5,5,190,190)
  	ctx.rect(205,5,190,190)
  	ctx.rect(405,5,190,190)
  	ctx.fill()
	ctx.stroke()
	ctx.fillStyle="#937341"
	ctx.fillText("2 игрока",100,100)
	ctx.fillText("3 игрока",300,100)
	ctx.fillText("4 игрока",500,100)
	let V = [[1,1],[2,2],[3,3],[4,1],[5,2],[6,3],[1,4],[2,4],[3,4],[4,1],[5,2],[6,3]]
	let C = [[0,0],[0,0],[0,0],[0,2],[0,2],[0,2],[1,0],[1,2],[1,3],[1,3],[1,3],[1,3]]
	let F = [[0,0,0,0,0,0,0,0,0,0,0,0],
			[0,0,0,1,1,1,1,1,1,1,1,1],
			[0,0,0,1,1,1,0,0,0,1,1,1]]
	let colors=["yellow","blue","black","white"]
	for(let i = 0;i<12;i++){
		ctx.fillStyle = colors[C[i][F[cur1][i]]]
		ctx.beginPath();
		ctx.rect(i%6*100+5,Math.floor(i/6)*100+205,90,90)
		ctx.fill()
		ctx.drawImage(beehive,i%6*100+5,Math.floor(i/6)*100+205,90,90)
		ctx.fillStyle="black"
		ctx.strokeStyle="white"
		ctx.strokeText(V[i][F[cur1][i]],i%6*100+40,Math.floor(i/6)*100+250)
		ctx.fillText(V[i][F[cur1][i]],i%6*100+40,Math.floor(i/6)*100+250)
		
  }
}

function cnv2_click(event){
	let x =  Math.floor(event.offsetX/80);
	let y =  Math.floor(event.offsetY/80);
	if(M2[x][y]==-1){
		M2[x][y]=Math.floor(Math.random()*3);
		setTimeout(setfl,50,x,y)
	}else{
		M2=[[-1,-1,-1,1,-1],
       [-1,-1,-1,-1,2],
       [-1,-1,0,-1,-1],
       [2,-1,-1,1,-1],
       [2,0,-1,-1,-1]];
	}
  cnv2_draw();
}

function cnv2_draw(){
	ctx = ctx2;
	ctx.clearRect(0, 0, cnv2.width, cnv2.height)
	ctx.fillStyle="#12C412"
	for(let i = 0; i < 5; i++)
    for(let j = 0; j < 5; j++){
		ctx.beginPath()
		ctx.rect(i*80,j*80,75,75)
		ctx.fill()
		ctx.drawImage(flowers,0,M2[i][j]*75,75,75,i*80,j*80,75,75)
    }
}

function setfl(x,y){
  let P=[[0,5,4,6,6,6,6],
         [5,1,3,6,6,6,6],
         [4,3,2,6,6,6,6],
         [6,6,6,3,6,6,6],
         [6,6,6,6,4,6,6],
         [6,6,6,6,6,5,6],
         [6,6,6,6,6,6,6]]
  if(x>1)if(M2[x-1][y]==-1&&M2[x-2][y]!=-1){
    M2[x-1][y]=P[M2[x][y]][M2[x-2][y]]
    setTimeout(setfl,100,x-1,y)
  }
  if(x<3)if(M2[x+1][y]==-1&&M2[x+2][y]!=-1){
    M2[x+1][y]=P[M2[x][y]][M2[x+2][y]]
    setTimeout(setfl,100,x+1,y)
  }
  if(y>1)if(M2[x][y-1]==-1&&M2[x][y-2]!=-1){
    M2[x][y-1]=P[M2[x][y]][M2[x][y-2]]
    setTimeout(setfl,100,x,y-1)
  }
  if(y<3)if(M2[x][y+1]==-1&&M2[x][y+2]!=-1){
    M2[x][y+1]=P[M2[x][y]][M2[x][y+2]]
    setTimeout(setfl,100,x,y+1)
  }
  cnv2_draw();
}



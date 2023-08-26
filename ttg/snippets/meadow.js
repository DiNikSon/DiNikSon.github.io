function setup(){	
	cnv1 = document.getElementById("cnv1");
	ctx1 = cnv1.getContext("2d");
	cnv1.addEventListener('mousedown',cnv1_click)
	cur1 = 0;
	beehive = new Image();
	beehive.onload = cnv1_draw;
	beehive.src = 'snippets/res/beehive.png';
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

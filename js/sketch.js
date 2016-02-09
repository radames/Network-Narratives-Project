var nParam = 5;
var sliders = [];

function setup() {
  // create canvas
  createCanvas(windowWidth, windowHeight);
  textSize(15)
  noStroke();
  for(var i = 0; i < nParam; i++){
	  sliders[i] = createSlider(0, 100,100);
	  sliders[i].position(20, 30+30*i);
	  sliders[i].changed(slideChange);
	  sliders[i].attribute("name", "sld-"+i);
   }	
  }
  
 function draw() {
	  
	background(255);
	drawBody(width/2, height/2, sliders)

}


function drawBody(px, py, sliders){	
	push();
		translate(px,py);
	
		drawTorso(0,20, sliders[4].value()/100.0);
		drawHead(0,-20, sliders[0].value()/100.0);
		drawLeftArm(10,0,sliders[1].value()/100.0);
		drawRightArm(-10,0,1);
		drawRightLeg(-10,50,1);
		drawLeftLeg(10,50,1);

	pop();
}

function drawHead(px, py, s){
	push();
	
		translate(px,py);
		scale(s)
		fill(255,0,0)
		ellipse(0, 0, 30, 30);
	
	pop();
	
}

function drawLeftArm(px, py, s){
	push();
		ellipseMode(CORNER);	
		translate(px,py);
		scale(s)
		fill(200,0,0)
		ellipse(0, -10, 50, 20);
		push();
			ellipseMode(CORNER);
			translate(45,0);
			rotate(radians(-45));		
			scale(s);
			ellipse(0, -10, 50, 20);
			
		pop();
	pop();
}

function drawRightArm(px, py, s){
	push();
		ellipseMode(CORNER);	
		translate(px,py);
		rotate(PI);
		scale(s)
		fill(200,0,0)
		ellipse(0, -10, 50, 20);
		push();
			ellipseMode(CORNER);
			translate(45,0);
			rotate(radians(-45));		
			ellipse(0, -10, 50, 20);
		pop();
	pop();
}

function drawRightLeg(px, py, s){
	push();
		ellipseMode(CORNER);	
		translate(px,py);
		rotate(2*PI/3);
		scale(s)
		fill(200,0,0)
		ellipse(0, -10, 50, 20);
		push();
			ellipseMode(CORNER);
			translate(45,0);
			rotate(radians(-45));		
			ellipse(0, -10, 50, 20);
		pop();
	pop();
}

function drawLeftLeg(px, py, s){
	push();
		ellipseMode(CORNER);	
		translate(px,py);
		rotate(PI/4);
		scale(s)
		fill(200,0,0)
		ellipse(0, -10, 50, 20);
		push();
			ellipseMode(CORNER);
			translate(45,0);
			rotate(radians(45));		
			ellipse(0, -10, 50, 20);
		pop();
	pop();
}

function drawTorso(px, py, s){
	push();
		rectMode(CENTER);	
		translate(px,py);
		rotate(PI);
		scale(s);
		fill(100,0,0);
		rect(0,0,40,60);
	pop();
}



function slideChange(e) {
	switch(e.target.name){
		case "sld-0":
			sliders[0].elt.value = 100-map(sliders[0].value(), 0, 100, 0, sliders[1].value());
			break;
		case "sld-1":
			break;
	}

};



	

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
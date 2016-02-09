var nParam = 5;
var sliders = [];

function setup() {
  // create canvas
  createCanvas(windowWidth, windowHeight);
  textSize(15)
  noStroke();
  for(var i = 0; i < nParam; i++){
	  sliders[i] = createSlider(0, 100,random(100));
	  sliders[i].position(20, 30+35*i);
	  sliders[i].changed(slideChange);
	  sliders[i].attribute("name", "sld-"+i);
  }
  for(var i = 0; i < nParam; i++){
	  sliders[i].elt.dispatchEvent(new Event('change'));
  }
	
	textFont("Helvetica");
	textSize(15);

  }
  
 function draw() {
	  
	background(255);
	fill(0);
	textAlign(LEFT,TOP);
	text("Intelligence", 160, 30 + 35*0);
	text("Strength", 160, 30 + 35*1);
	text("Speed", 160, 30 + 35*2);
	text("Stamina", 160, 30 + 35*3);
	text("Empathy", 160, 30 + 35*4);

	drawBody(width/2, height/2, sliders);

}


function drawBody(px, py, sliders){	
	push();
		translate(px,py);
		drawTorso(0,20, sliders[4].value()/100.0);
		drawHead(0,-20, 1+sliders[0].value()/100.0);
		drawLeftArm(10,0, sliders[1].value()/100.0);
		drawRightArm(-10,0, sliders[1].value()/100.0);
		drawRightLeg(-10,50,sliders[2].value()/100.0);
		drawLeftLeg(10,50,sliders[2].value()/100.0);

	pop();
}

function drawHead(px, py, s){
	push();
	
		translate(px,py);
		scale(s);
		noFill();
		stroke(0);
		ellipse(0, 0, 30, 30);
	
	pop();
	
}

function drawLeftArm(px, py, s){
	push();
		ellipseMode(CORNER);	
		translate(px,py);
		scale(s)
		noFill();
		stroke(0);
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
		noFill();
		stroke(0);
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
		
		noFill();
		stroke(0);
	
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
		noFill();
		stroke(0);
	
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
		noFill();
		stroke(0);
		rect(0,0,40,60);
	pop();
}



function slideChange(e) {
	switch(e.target.name){
		case "sld-0":
			sliders[1].elt.value = 100 - sliders[0].value();
			break;
		case "sld-1":
			sliders[0].elt.value = 100 - sliders[1].value();
			break;
		case "sld-2":
			sliders[3].elt.value = 100 - sliders[2].value();
			break;
		case "sld-3": 
			sliders[2].elt.value = 100 - sliders[3].value();
			break;
		case "sld-4":
			break;
	}

};



	

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
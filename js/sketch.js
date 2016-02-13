'use strict';

var GUI = function() {
	var that = this;
	this.nParam = 5;
	this.sliders = [];
	this.icons = [];
	this.labels = ['Brain', 'Strength', 'Speed', 'Stamina', 'Empathy'];
	this.init = function(x,y){
		this.x = x;
		this.y = y;
		
		this.logo = loadImage("imgs/logo.svg");

		for(var i = 0; i < this.nParam; i++){
			this.sliders[i] = createSlider(0, 100,random(100));
			this.sliders[i].position(this.x, this.y + 40*i);
			this.sliders[i].changed(this.slideChange);
			this.sliders[i].attribute('name', 'sld-' + i);
			this.icons[i] = loadImage('imgs/' + this.labels[i] + '.svg');
		}
		for(i = 0; i < this.nParam; i++){
			this.sliders[i].elt.dispatchEvent(new Event('change'));
		}
		
	};
 	this.getSliders = function(){
		return this.sliders;
	};
	this.draw = function(){
		push();
			textFont('Helvetica');
			textSize(15);	
			fill(0);
			textAlign(LEFT,TOP);
    		imageMode(CENTER);
			for(var i = 0; i < this.nParam; i++){
				text(this.labels[i], this.x + 140, this.y + 40*i);
				push();
					translate(this.x-30, this.y + 40 * i);
					scale(0.2+this.sliders[i].value()/300);
					image(this.icons[i], 0, 0);
				pop();
			}
			push();
				translate(windowWidth-60, 60);
				scale(0.33);
				image(this.logo, 0,0 );
			pop();
		pop();
	};
	this.slideChange = function(e) {
		switch(e.target.name){
			case 'sld-0':
				that.sliders[1].elt.value = 100 - that.sliders[0].value();
				break;
			case 'sld-1':
				that.sliders[0].elt.value = 100 - that.sliders[1].value();
				break;
			case 'sld-2':
				that.sliders[3].elt.value = 100 - that.sliders[2].value();
				break;
			case 'sld-3': 
				that.sliders[2].elt.value = 100 - that.sliders[3].value();
				break;
			case 'sld-4':
				break;
		}
	};
};




var gui;


function setup() {
	// create canvas
	createCanvas(windowWidth, windowHeight);
	textSize(15);
	noStroke();

	gui = new GUI();
	gui.init(70,40);


}
  
 function draw() {
	  
	background(255);

	 
	drawBody(width/2, height/2, gui.getSliders());
	gui.draw();

}


function drawBody(px, py, sliders){	
	push();
		translate(px,py);
		drawTorso(0,20, sliders[4].value()/200.0);
		drawHead(0,-20, 1+sliders[0].value()/200.0);
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
		translate(px,py);
		rotate(-PI/3);
		scale(s);
		stroke(0);
	    line(0, 0, 0, 40);
		fill(255);
		ellipse(0,40, 10,10);
		push();
			translate(0,40);
			rotate(radians(45));
		    line(0, 0, 0, 40);
		pop();
	pop();
}

function drawRightArm(px, py, s){
	push();
		translate(px,py);
		rotate(PI/3);
		scale(s);
		stroke(0);
		fill(255);
	    line(0, 0, 0, 40);
		ellipse(0,40, 10,10);
		push();
			translate(0,40);
			rotate(radians(-45));
		    line(0, 0, 0, 40);
		pop();
	pop();
}

function drawRightLeg(px, py, s){
	push();
		translate(px,py);
		//rotate(PI/5);
		scale(s);
		stroke(0);
		fill(255);
	    line(5,0, 0,60);
	    ellipse(0,60, 10,10);
		push();
			translate(0,60);
			line(0,0,0,60)
		pop();
	pop();
}

function drawLeftLeg(px, py, s){
	push();
		translate(px,py);
		//rotate(PI/5);
		scale(s);
		stroke(0);
	    line(-5,0, 0,60);
	    ellipse(0,60, 10,10);
		push();
			translate(0,60);
			line(0,0,0,60)
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





function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
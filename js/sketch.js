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
		
		this.logo = loadImage('imgs/logo.svg');
		this.selType = createSelect();
		this.locationType = createSelect();

		this.label1 = createSpan('&nbsp;I want to build a&nbsp;');
		this.label2 = createSpan('&nbsp;It lives in&nbsp;');

		//this.label1.style('background-color: rgba(255, 255, 255, 0.9)');
		this.label1.position(this.x, this.y + 200);
		this.label2.position(this.x, this.y + 230);

		this.selType.position(this.x + 130, this.y + 200);
		this.locationType.position(this.x + 130, this.y + 230);
		this.selType.option('Human');
		this.selType.option('Robot');
		this.locationType.option('Burnley');
		this.locationType.option('Hull');
		this.locationType.option('Wigan');

		this.creationName = createInput('');
		this.creationName.position(this.x, this.y + 260);
		this.creationName.attribute('size', '30');
		this.creationName.attribute('maxlength','30');
		this.creationName.attribute('placeholder', 'The name of my creations is');
		
		this.creationInfo = createElement('textarea');
		this.creationInfo.position(this.x, this.y + 290);
		this.creationInfo.attribute('placeholder', 'Write about your creation');
		this.creationInfo.style('resize:none;');
		this.creationInfo.attribute('cols', '28');
		this.creationInfo.attribute('rows', '7');

		this.buttonRec = createButton('Run');

		this.buttonRec.position(this.x, this.y + 400);

		this.buttonSave = createButton('Create');
		this.buttonSave.position(this.x, this.y + 450);

		
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
	this.getType = function(){
		return this.selType.value();
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
				translate(width-60, 60);
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

var Character = function(){
	
	this.init = function(type, px, py){
		this.type = type;
		this.px = px;
		this.py = py;
		this.thick = 3;
		
	};
	this.setX = function(px){
		this.px = px;	
	};
	this.draw = function(params){
		if(this.type === 'human'){
			this.drawHumanBody(this.px, this.py, params);
		}else{
			this.drawRobotBody(this.px, this.py, params);
		}
	};
	this.drawRobotBody = function(px, py, sliders){	
		push();
			translate(px,py);
			this.drawRobotBase(0,40, 0.5 + sliders[2].value()/100.0);
			this.drawRobotTorso(0,0, 0.5 + sliders[4].value()/500.0);
			this.drawRobotHead(0,-25, 0.5 + sliders[0].value()/100.0);
			this.drawRobotLeftArm(20,0, 0.5 + sliders[1].value()/100.0);
			this.drawRobotRightArm(-20,0, 0.5 + sliders[1].value()/100.0);


		pop();
	};
	this.drawHumanBody = function(px, py, sliders){	
		push();
			translate(px,py);
			rotate(atan2(mouseY-height/2, mouseX-width/2)/50);
			this.drawTorso(0,20, 0.5 + sliders[4].value()/500.0);
			this.drawHead(0,-25, 1 + sliders[0].value()/100.0);
			this.drawLeftArm(14,0, 1 + sliders[1].value()/100.0);
			this.drawRightArm(-14,0, 1 + sliders[1].value()/100.0);
			this.drawRightLeg(-12,50, 0.5 + sliders[2].value()/100.0);
			this.drawLeftLeg(12,50, 0.5 + sliders[2].value()/100.0);


		pop();
	};
	this.drawRobotHead = function(px, py, s){
		push();
			strokeWeight(this.thick);

			rectMode(CENTER);
			translate(px,py);
			fill(255);
			stroke(0);
			rect(0, 0, 20*s, 30*s,1);
			push();
				translate(0,-30*s/2-15*s);
				line(0,0,0,15*s);
				fill(255);
				ellipse(0,0,4,4);
			pop();
		pop();
	};
	this.drawRobotLeftArm = function(px, py, s){
		push();	
			strokeWeight(this.thick);

			translate(px,py);
			rotate(atan2(mouseY-height/2, mouseX-width/2));
			stroke(0);
			push();
				translate(-10*s/2,0);
				beginShape();
					vertex(0,0);
					vertex(10*s,0);
					vertex(10*s, 40*s);
					vertex(0, 40*s);
				endShape(CLOSE);
				push();
					translate(0,40*s);
					beginShape();
						vertex(-3,0);
						vertex(13*s,0);
						vertex(13*s, 5*s);
						vertex(-3, 5*s);
					endShape(CLOSE);
				pop();
			pop();
		pop();
	};
	this.drawRobotRightArm = function(px, py, s){
		push();	
			strokeWeight(this.thick);

			translate(px,py);
			rotate(-atan2(mouseY-height/2, mouseX-width/2));
			stroke(0);
			push();
				translate(-10*s/2,0);
				beginShape();
					vertex(0,0);
					vertex(10*s,0);
					vertex(10*s, 40*s);
					vertex(0, 40*s);
				endShape(CLOSE);
				push();
					translate(0,40*s);
					beginShape();
						vertex(-3,0);
						vertex(13*s,0);
						vertex(13*s, 5*s);
						vertex(-3, 5*s);
					endShape(CLOSE);
				pop();
			pop();
		pop();
	};
	this.drawRobotTorso = function (px, py, s){
		push();
			strokeWeight(this.thick);

			translate(px,py);

			//scale(s);
			fill(255);
			stroke(0);
			push();
				translate(-40*s/2,0);
				beginShape();
					vertex(0*s, 70*s);
					vertex(40*s, 70*s);
					vertex(40*s, 0);
					vertex(0, 0);
				endShape(CLOSE);
			pop();
		pop();
	};
	this.drawRobotBase = function (px, py, s){
		push();
			strokeWeight(this.thick);
			translate(px,py);

			//scale(s);
			fill(255);
			stroke(0);
			push();
				translate(-80*s/2,0);
				beginShape();
					vertex(30*s, 0);
					vertex(0, 50*s);
					vertex(80*s, 50*s);
					vertex(50*s, 0);

				endShape(CLOSE);
			
			push();
				translate((80*s%20)/2,50*s);
				for(var i = 0; i <= 80*s; i+=20){
					ellipse(i, 0, 20, 20);
					ellipse(i, 0, 3, 3);
				}
			pop();
			pop();

		pop();
	};


//---------------Human --------
	
	this.drawHead = function(px, py, s){
		push();
			strokeWeight(this.thick);
			translate(px,py);
			fill(255);
			stroke(0);
			ellipse(0, 0, 20*s, 30*s);

		pop();

	};
	this.drawLeftArm = function(px, py, s){
		push();
			strokeWeight(this.thick);
			translate(px,py);
			rotate(atan2(mouseY-height/2, mouseX-width/2));
			stroke(0);
			line(0, 0, 0, 30*s);
			fill(255);
			ellipse(0,30*s, 10,10);
			push();
				translate(0,30*s);
				rotate(atan2(mouseY-height/2, mouseX-width/2));
				line(0, 0, 0, 40*s);
			pop();
		pop();
	};
	this.drawRightArm = function(px, py, s){
		push();
			strokeWeight(this.thick);
			translate(px,py);
			rotate(-atan2(mouseY-height/2, mouseX-width/2));
			stroke(0);
			line(0, 0, 0, 30*s);
			fill(255);
			ellipse(0,30*s, 10,10);
			push();
				translate(0,30*s);
				rotate(radians(45));
				line(0, 0, 0, 40*s);
			pop();
		pop();
	};
	this.drawRightLeg = function(px, py, s){
		push();
			strokeWeight(this.thick);
			translate(px,py);
			rotate(0);
			stroke(0);
			fill(255);
			line(6,0, 0,60*s);
			ellipse(0,60*s, 10,10);
			push();
				translate(0,60*s);
				line(0,0,0,60*s);
			pop();
		pop();
	};
	this.drawLeftLeg = function(px, py, s){
		push();
			strokeWeight(this.thick);
			translate(px,py);
			rotate(0);
			stroke(0);
			fill(255);
			line(-6,0, 0,60*s);
			ellipse(0,60*s, 10,10);
			push();
				translate(0,60*s);
				line(0,0,0,60*s);
			pop();
		pop();
	};
	this.drawTorso = function (px, py, s){
		push();
			strokeWeight(this.thick);
			translate(px,py);

			//scale(s);
			fill(255);
			stroke(0);
			//	rect(0,0,40,60);

			beginShape();
				vertex(-15*s, 40*s);
				vertex(15*s, 40*s);
				vertex(20*s, -40*s);
				vertex(-20*s, -40*s);
			endShape(CLOSE);
		pop();
	};


};


var gui;
var human;
var robot;
var backImg;

function setup() {
	// create canvas
	createCanvas(1024, 768);
	textSize(15);
	noStroke();

	gui = new GUI();
	gui.init(70,40);
	
	human = new Character();
	human.init('human', width/2, height - 250);
	
	robot = new Character();
	robot.init('robot', width/2 + 200, height - 150);

	backImg = loadImage('imgs/Biobackground2.jpg');
}
  
 function draw() {
	  
	background(255);
	image(backImg,0,0);
	human.draw(gui.getSliders());
	robot.draw(gui.getSliders());
	robot.setX(mouseX);
	gui.draw();

}
'use strict';

var Character = function(){
	this.sliders = [];
	this.lastTime = 0;
	
	var that = this;
	this.init = function(px, py, s, data){
		this.scale = s;
		this.px = px;
		this.py = py;
		this.incx = (randomGaussian()>0?-1:1) * 2 * data.sliders[2]/100;
		this.incy = (randomGaussian()>0?-1:1) * 2 * data.sliders[2]/100;
		this.thick = 3;
		this.sliders = data.sliders;
		this.charType = data.charType;
		this.creationName = data.creationName;
		this.creationInfo = data.creationInfo;
		this.locationType = data.locationType;
		this.labelName  = createSpan(this.creationName);
		this.labelName.style('z-index: 2;');
		//this.labelName.addClass('h5');
		this.labelName.style('font-weight: bold;background-color:white;white-space: nowrap;border-radius: 10px 10px 10px 10px;padding:5px;');
		this.labelName.mousePressed(this.labelClicked); // attach listener for


		
	};
	this.labelClicked = function(e){
		
		$('#infoModal .modal-title').html(that.creationName);
		$('#infoModal .info-box').html(that.creationInfo);
		var c = createCanvas(windowWidth, windowHeight);
		
  		c.parent("char-box");
		
		$('#infoModal').modal();
		console.log(e);
	}
	this.setX = function(px){
		this.px = px;	
	};
	this.setY = function(py){
		this.py = py;	
	};
	this.setScale = function(s){
		this.scale = s;
	}
	this.draw = function(){
		if(this.charType === 'Human'){
			this.drawHumanBody(this.px, this.py, this.scale);
		}else{
			this.drawRobotBody(this.px, this.py+50, this.scale);
		}
		this.update();
		
	};
	this.update = function(){
		this.px += this.incx;
		if(this.px > windowWidth){
			this.px = windowWidth;
			this.incx = -this.incx;
		}
		if(this.px < 0 ){
			this.px = 0;
			this.incx = -this.incx;
		}
		
//		this.py += this.incy;
//		if(this.py > windowHeight){
//			this.py = windowHeight;
//			this.incy = -this.incy;
//		}
//		if(this.py < 0 ){
//			this.py = 0;
//			this.incy = -this.incy;
//		}
	};
	this.drawRobotBody = function(px, py, s){	
		push();
			translate(px,py);
			scale(s);
			rotate(atan2(mouseY-windowHeight/2, mouseX-windowWidth/2)/50);
			this.drawRobotBase(0,40, 0.5 + this.sliders[2]/100.0);
			this.drawRobotTorso(0,0, 0.5 + this.sliders[4]/500.0);
			this.drawRobotHead(0,-25, 0.5 + this.sliders[0]/100.0);
			this.drawRobotLeftArm(20,0, 0.5 + this.sliders[1]/100.0);
			this.drawRobotRightArm(-20,0, 0.5 + this.sliders[1]/100.0);
		pop();
		this.drawName(px, py, s);

	};
	this.drawHumanBody = function(px, py, s){	
		push();
			translate(px,py);
			scale(s);
			rotate(atan2(mouseY-windowHeight/2, mouseX-windowWidth/2)/50);
			this.drawTorso(0,20, 0.5 + this.sliders[4]/200.0);
			this.drawHead(0,-25, 1 + this.sliders[0]/100.0);
			this.drawLeftArm(14,0, 1 + this.sliders[1]/100.0);
			this.drawRightArm(-14,0, 1 + this.sliders[1]/100.0);
			this.drawRightLeg(-12,50, 0.5 + this.sliders[2]/100.0);
			this.drawLeftLeg(12,50, 0.5 + this.sliders[2]/100.0);
		pop();
			this.drawName(px, py, s);

	};
	this.drawInfo = function(px,py){
		push();
			translate(px-400/2,py-400/2);
			textFont('Helvetica');
			fill(255,200);
			rect(-20,-20, 400, 500, 10);
			fill(0,0,0);
			textSize(25);
			textStyle(BOLD);
			text(this.creationName, 0, 20);

			textSize(20);
			textStyle(NORMAL);

			text('type: ' + this.charType, 0, 50);
			text('from: ' + this.locationType, 0, 80);
			text(this.creationInfo, 0, 110, 400-40,400);
		pop();
	};
	this.drawName = function(px,py,s){
		this.labelName.style("font-size", (5+s*9) + 'px');
		this.labelName.position(px,py+s*100);	
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
			rotate(atan2(mouseY-windowHeight/2, mouseX-windowWidth/2));
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
			rotate(-atan2(mouseY-windowHeight/2, mouseX-windowWidth/2));
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
			rotate(atan2(mouseY-windowHeight/2, mouseX-windowWidth/2));
			stroke(0);
			push();
				rotate(PI/2);
				ellipseMode(CORNER);
				ellipse(0,-10*s/2, 40,10*s);
			pop();
			fill(255);
			ellipse(0,40, 10,10);
			push();
				translate(0,40);
				rotate(atan2(mouseY-windowHeight/2, mouseX-windowWidth/2));
				push();
					rotate(PI/2);
					ellipseMode(CORNER);
					ellipse(0,-5*s/2, 45,5*s);
				pop();
			pop();
		pop();
	};
	this.drawRightArm = function(px, py, s){
		push();
			strokeWeight(this.thick);
			translate(px,py);
			rotate(-atan2(mouseY-windowHeight/2, mouseX-windowWidth/2));
			stroke(0);
			push();
				rotate(PI/2);
				ellipseMode(CORNER);
				ellipse(0,-10*s/2, 40,10*s);
			pop();
			fill(255);
			ellipse(0,40, 10,10);
			push();
				translate(0,40);
				rotate(-atan2(mouseY-windowHeight/2, mouseX-windowWidth/2));
				push();
					rotate(PI/2);
					ellipseMode(CORNER);
					ellipse(0,-5*s/2, 45,5*s);
				pop();
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
				vertex(-15*s, 30);
				vertex(15*s, 30);
				vertex(20*s, -30);
				vertex(-20*s, -30);
			endShape(CLOSE);
		pop();
	};


};


var character = [];
var backgroundImg;
var foregroundImg;
var logo;

var state;

function preload(){
	backgroundImg = createImg('../imgs/labBackground.jpg');
	foregroundImg = createImg('../imgs/labForeground.jpg');
	logo = loadImage('../imgs/logo2.svg');

}

function setup() {
	// create canvas
	var c = createCanvas(windowWidth, windowHeight);
	c.style('z-index: 0;');
	c.position(0,0);
	textSize(15);
	noStroke();
	
  //img = createImg('http://p5js.org/img/asterisk-01.png');

	backgroundImg.size(windowWidth, -1);
	foregroundImg.size(windowWidth, -1);

	backgroundImg.style('z-index: -1;');
	foregroundImg.style('z-index: 1;');

	backgroundImg.position(0,0);
	foregroundImg.position(0,0);

	state = 'init';
	foregroundImg.drop(dropFiles);
}

 function draw() {
  clear();
	 if(state === 'init'){
		
		character.forEach(function(c){
			c.draw();
		});
		image(logo, windowWidth*(1-0.16), 15, 0.15 * windowWidth , 0.15 * logo.height *( windowWidth / logo.width));

	}else if(state === 'saved'){
		
		state = 'idle';

	}else if(state === 'idle'){
		//image(backgroundImg,0,0);
		//image(foregroundImg,0,100);
	}
	 

}

function dropFiles(file) {
	
	if(file.subtype  === 'json'){
		var data = JSON.parse(atob(file.data.split(',')[1]));
		var newChar = new Character();
		newChar.init(random(windowWidth), random(350, backgroundImg.height - 350), 0.1 + backgroundImg.height/backgroundImg.elt.naturalHeight, data);
		character.push(newChar);

	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	//respositioning afer window resized
	backgroundImg.size(windowWidth, -1);
	foregroundImg.size(windowWidth, -1);
	backgroundImg.position(0,0);
	foregroundImg.position(0,0);
	
	character.forEach(function(c){
			c.setY(random(350, backgroundImg.height - 350));
			c.setScale(0.1 + backgroundImg.height/backgroundImg.elt.naturalHeight);
	});
	
}
function keyTyped(){
	if(key == 'f'){
		var fs = fullScreen();
		fullScreen(!fs);		
	}
}
'use strict';

var Character = function(p){
	this.c = p; //canvas to draw
	this.sliders = [];
	this.lastTime = 0;
    this.toFilter = true;

	var that = this;
	this.init = function(px, py, s, data){
		this.init(px, py, s, data, false);
	};
    this.toggleFilter = function(){
	  this.toFilter = !this.toFilter;
	};
	this.init = function(px, py, s, data, isStatic){
		this.isStatic = isStatic;
		this.data = data;
		this.scale = s;
		this.px = px;
		this.py = py;
		this.incx = (this.c.randomGaussian()>0?-1:1) * 2 * data.sliders[2]/100;
		this.incy = (this.c.randomGaussian()>0?-1:1) * 2 * data.sliders[2]/100;
		this.thick = 3;
		this.sliders = data.sliders;
		this.charType = data.charType;
		this.creationName = data.creationName;
		this.creationInfo = data.creationInfo;
		this.locationType = data.locationType;
		this.labelName  = this.c.createSpan(this.creationName);
		this.labelName.style('z-index: 3;');
		//this.labelName.addClass('h5');
		this.labelName.style('font-weight: bold;background-color:white;white-space: nowrap;border-radius: 10px 10px 10px 10px;padding:5px;');
		this.labelName.mousePressed(this.labelClicked); // attach listener for
		if(this.isStatic){
			this.labelName.hide();
		}


	};
	this.updateData = function(data){
		this.sliders = data.sliders;
		this.charType = data.charType;
		this.creationName = data.creationName;
		this.creationInfo = data.creationInfo;
		this.locationType = data.locationType;
	};
	this.labelClicked = function(e){

		$('#infoModal .modal-title').html(that.creationName);
		$('#infoModal .info-box').html(that.creationInfo);
		$('#infoModal .modal-city').html(that.locationType);
		$('#infoModal .modal-chartype').html(that.charType);

		//var c = createCanvas(windowWidth, windowHeight);
		littleP5.setCharData(that.data);

		$('#infoModal').modal();
	};
	this.setX = function(px){
		this.px = px;
	};
	this.setY = function(py){
		this.py = py;
	};
	this.setScale = function(s){
		this.scale = s;
	};
	this.draw = function(){
		if(this.charType === 'Human'){
			this.drawHumanBody(this.px, this.py, this.scale);
		}else{
			this.drawRobotBody(this.px, this.py+50, this.scale);
		}

		if(!this.isStatic){
			this.update();
		}

	};
	this.update = function(){
		this.px += this.incx;
	 	var maxDisp = this.c.windowWidth;
	  	var minDisp = 0;
	  
		if(this.toFilter){ //filter human,bots, just set the max min, for their displacements
		  	if(this.charType == 'Human'){
			    maxDisp = this.c.windowWidth/2 - 100;
			    minDisp = 0;
			}else{
			    maxDisp = this.c.windowWidth;
			    minDisp = this.c.windowWidth/2 + 100;
			}
		}
		if(this.px > maxDisp){
			  this.px = maxDisp;
			  this.incx = -this.incx;
		  }
		  if(this.px < minDisp ){
			  this.px = minDisp;
			  this.incx = -this.incx;
		 }
	};
	this.drawRobotBody = function(px, py, s){
		this.c.push();
			this.c.translate(px,py);
			this.c.scale(s);
			this.c.rotate(this.c.atan2(this.c.mouseY-this.c.windowHeight/2,this.c.mouseX-this.c.windowWidth/2)/50);
			this.drawRobotBase(0,40, 0.5 + this.sliders[2]/100.0);
			this.drawRobotTorso(0,0, 0.5 + this.sliders[4]/500.0);
			this.drawRobotHead(0,-25, 0.5 + this.sliders[0]/100.0);
			this.drawRobotLeftArm(20,0, 0.5 + this.sliders[1]/100.0);
			this.drawRobotRightArm(-20,0, 0.5 + this.sliders[1]/100.0);
		this.c.pop();
		if(!this.isStatic){
			this.drawName(px, py, s);
		}

	};
	this.drawHumanBody = function(px, py, s){
		this.c.push();
			this.c.translate(px,py);
			this.c.scale(s);
			this.c.rotate(this.c.atan2(this.c.mouseY-this.c.windowHeight/2, this.c.mouseX-this.c.windowWidth/2)/50);
			this.drawTorso(0,20, 0.5 + this.sliders[4]/200.0);
			this.drawHead(0,-25, 1 + this.sliders[0]/100.0);
			this.drawLeftArm(14,0, 1 + this.sliders[1]/100.0);
			this.drawRightArm(-14,0, 1 + this.sliders[1]/100.0);
			this.drawRightLeg(-12,50, 0.5 + this.sliders[2]/100.0);
			this.drawLeftLeg(12,50, 0.5 + this.sliders[2]/100.0);
		this.c.pop();
		if(!this.isStatic){
			this.drawName(px, py, s);
		}

	};
	this.drawName = function(px,py,s){
		this.labelName.style('font-size', (5+s*9) + 'px');
		this.labelName.position(px,py+s*100);
	};
	this.drawRobotHead = function(px, py, s){
		this.c.push();
			this.c.strokeWeight(this.thick);

			this.c.rectMode(this.c.CENTER);
			this.c.translate(px,py);
			this.c.fill(255);
			this.c.stroke(0);
			this.c.rect(0, 0, 20*s, 30*s,1);
			this.c.push();
				this.c.translate(0,-30*s/2-15*s);
				this.c.line(0,0,0,15*s);
				this.c.fill(255);
				this.c.ellipse(0,0,4,4);
			this.c.pop();
		this.c.pop();
	};
	this.drawRobotLeftArm = function(px, py, s){
		this.c.push();
			this.c.strokeWeight(this.thick);

			this.c.translate(px,py);
			this.c.rotate(this.c.atan2(this.c.mouseY-this.c.windowHeight/2, this.c.mouseX-this.c.windowWidth/2));
			this.c.stroke(0);
			this.c.push();
				this.c.translate(-10*s/2,0);
				this.c.beginShape();
					this.c.vertex(0,0);
					this.c.vertex(10*s,0);
					this.c.vertex(10*s, 40*s);
					this.c.vertex(0, 40*s);
				this.c.endShape(this.c.CLOSE);
				this.c.push();
					this.c.translate(0,40*s);
					this.c.beginShape();
						this.c.vertex(-3,0);
						this.c.vertex(13*s,0);
						this.c.vertex(13*s, 5*s);
						this.c.vertex(-3, 5*s);
					this.c.endShape(this.c.CLOSE);
				this.c.pop();
			this.c.pop();
		this.c.pop();
	};
	this.drawRobotRightArm = function(px, py, s){
		this.c.push();
			this.c.strokeWeight(this.thick);

			this.c.translate(px,py);
			this.c.rotate(-this.c.atan2(this.c.mouseY-this.c.windowHeight/2, this.c.mouseX-this.c.windowWidth/2));
			this.c.stroke(0);
			this.c.push();
				this.c.translate(-10*s/2,0);
				this.c.beginShape();
					this.c.vertex(0,0);
					this.c.vertex(10*s,0);
					this.c.vertex(10*s, 40*s);
					this.c.vertex(0, 40*s);
				this.c.endShape(this.c.CLOSE);
				this.c.push();
					this.c.translate(0,40*s);
					this.c.beginShape();
						this.c.vertex(-3,0);
						this.c.vertex(13*s,0);
						this.c.vertex(13*s, 5*s);
						this.c.vertex(-3, 5*s);
					this.c.endShape(this.c.CLOSE);
				this.c.pop();
			this.c.pop();
		this.c.pop();
	};
	this.drawRobotTorso = function (px, py, s){
		this.c.push();
			this.c.strokeWeight(this.thick);

			this.c.translate(px,py);

			//scale(s);
			this.c.fill(255);
			this.c.stroke(0);
			this.c.push();
				this.c.translate(-40*s/2,0);
				this.c.beginShape();
					this.c.vertex(0*s, 70*s);
					this.c.vertex(40*s, 70*s);
					this.c.vertex(40*s, 0);
					this.c.vertex(0, 0);
				this.c.endShape(this.c.CLOSE);
			this.c.pop();
		this.c.pop();
	};
	this.drawRobotBase = function (px, py, s){
		this.c.push();
			this.c.strokeWeight(this.thick);
			this.c.translate(px,py);

			//scale(s);
			this.c.fill(255);
			this.c.stroke(0);
			this.c.push();
				this.c.translate(-80*s/2,0);
				this.c.beginShape();
					this.c.vertex(30*s, 0);
					this.c.vertex(0, 50*s);
					this.c.vertex(80*s, 50*s);
					this.c.vertex(50*s, 0);

				this.c.endShape(this.c.CLOSE);

			this.c.push();
				this.c.translate((80*s%20)/2,50*s);
				for(var i = 0; i <= 80*s; i+=20){
					this.c.ellipse(i, 0, 20, 20);
					this.c.ellipse(i, 0, 3, 3);
				}
			this.c.pop();
			this.c.pop();

		this.c.pop();
	};


//---------------Human --------

	this.drawHead = function(px, py, s){
		this.c.push();
			this.c.strokeWeight(this.thick);
			this.c.translate(px,py);
			this.c.fill(255);
			this.c.stroke(0);
			this.c.ellipse(0, 0, 20*s, 30*s);

		this.c.pop();

	};
	this.drawLeftArm = function(px, py, s){
		this.c.push();
			this.c.strokeWeight(this.thick);
			this.c.translate(px,py);
			this.c.rotate(this.c.atan2(this.c.mouseY-this.c.windowHeight/2, this.c.mouseX-this.c.windowWidth/2));
			this.c.stroke(0);
			this.c.push();
				this.c.rotate(this.c.PI/2);
				this.c.ellipseMode(this.c.CORNER);
				this.c.ellipse(0,-10*s/2, 40,10*s);
			this.c.pop();
			this.c.fill(255);
			this.c.ellipse(0,40, 10,10);
			this.c.push();
				this.c.translate(0,40);
				this.c.rotate(this.c.atan2(this.c.mouseY-this.c.windowHeight/2, this.c.mouseX-this.c.windowWidth/2));
				this.c.push();
					this.c.rotate(this.c.PI/2);
					this.c.ellipseMode(this.c.CORNER);
					this.c.ellipse(0,-5*s/2, 45,5*s);
				this.c.pop();
			this.c.pop();
		this.c.pop();
	};
	this.drawRightArm = function(px, py, s){
		this.c.push();
			this.c.strokeWeight(this.thick);
			this.c.translate(px,py);
			this.c.rotate(-this.c.atan2(this.c.mouseY-this.c.windowHeight/2, this.c.mouseX-this.c.windowWidth/2));
			this.c.stroke(0);
			this.c.push();
				this.c.rotate(this.c.PI/2);
				this.c.ellipseMode(this.c.CORNER);
				this.c.ellipse(0,-10*s/2, 40,10*s);
			this.c.pop();
			this.c.fill(255);
			this.c.ellipse(0,40, 10,10);
			this.c.push();
				this.c.translate(0,40);
				this.c.rotate(-this.c.atan2(this.c.mouseY-this.c.windowHeight/2, this.c.mouseX-this.c.windowWidth/2));
				this.c.push();
					this.c.rotate(this.c.PI/2);
					this.c.ellipseMode(this.c.CORNER);
					this.c.ellipse(0,-5*s/2, 45,5*s);
				this.c.pop();
			this.c.pop();
		this.c.pop();
	};
	this.drawRightLeg = function(px, py, s){
		this.c.push();
			this.c.strokeWeight(this.thick);
			this.c.translate(px,py);
			this.c.rotate(0);
			this.c.stroke(0);
			this.c.fill(255);
			this.c.line(6,0, 0,60*s);
			this.c.ellipse(0,60*s, 10,10);
			this.c.push();
				this.c.translate(0,60*s);
				this.c.line(0,0,0,60*s);
			this.c.pop();
		this.c.pop();
	};
	this.drawLeftLeg = function(px, py, s){
		this.c.push();
			this.c.strokeWeight(this.thick);
			this.c.translate(px,py);
			this.c.rotate(0);
			this.c.stroke(0);
			this.c.fill(255);
			this.c.line(-6,0, 0,60*s);
			this.c.ellipse(0,60*s, 10,10);
			this.c.push();
				this.c.translate(0,60*s);
				this.c.line(0,0,0,60*s);
			this.c.pop();
		this.c.pop();
	};
	this.drawTorso = function (px, py, s){
		this.c.push();
			this.c.strokeWeight(this.thick);
			this.c.translate(px,py);

			//scale(s);
			this.c.fill(255);
			this.c.stroke(0);
			//	this.c.rect(0,0,40,60);

			this.c.beginShape();
				this.c.vertex(-15*s, 30);
				this.c.vertex(15*s, 30);
				this.c.vertex(20*s, -30);
				this.c.vertex(-20*s, -30);
			this.c.endShape(this.c.CLOSE);
		this.c.pop();
	};


};
var littleSketch = function (p){
	var mainChar;

	p.setup = function (){

		var c = p.createCanvas(100,150);
			c.parent('char-box');
		mainChar = new Character(p);
		var charData = {
					'creationName': '',
					'creationInfo': '',
					'charType': '',
					'locationType': '',
					'sliders': [
					85,
					15,
					12,
					88,
					15
					]
		}; // initial ranndom data
		mainChar.init(c.width/2, c.height/2 - 50, 0.5, charData, true);
	};
	p.draw = function(){
		p.background(255);
		mainChar.draw();
	};

	p.setCharData = function(data) {
		mainChar.updateData(data);
	};


};

var burnleyFiles = ['Arya.json', 'Bam.json', 'Bubble gum.xox.json', 'Captain America.json', 'HRH Queen Elizabeth II.json', 'James Buchanan \'Bucky\' Barnes.json', 'Paul.Spread.json', 'Radical Romantic.json', 'robot199.json', 'silver surfer.json', 'Spud.json', 'Steve Rogers.json', 'super super robot girl.json', 'The Winter Soldier.json', 'U53FUL1D10T.json'];

var STATIC = true;
var mainSketch = function(p){

	var character = [];
	var backgroundImg;
	var foregroundImg;
	var logo;

	var state;
	var fileList = [];
	var dataList =[];
	
	p.preload = function (){
		backgroundImg = p.createImg('../imgs/labBackground.jpg');
		foregroundImg = p.createImg('../imgs/labForeground.jpg');
		logo = p.loadImage('../imgs/logo2.svg');
	    //preloading JSONs
	  	if(STATIC){
			burnleyFiles.forEach(function(fname){
				//var newChar = new Character(p);
				var data = p.loadJSON('../data/Burnley/'+fname);
				dataList.push(data);
				//character.push(newChar);
			});
		}

	};

	p.setup = function (){
		// create canvas
		var c = p.createCanvas(p.windowWidth, p.windowHeight);
		c.style('z-index: 1;');
		c.position(0,0);
		p.textSize(15);
		p.noStroke();

		//img = createImg('http://p5js.org/img/asterisk-01.png');

		backgroundImg.size(p.windowWidth, -1);
		foregroundImg.size(p.windowWidth, -1);

		backgroundImg.style('z-index: 0;');
		foregroundImg.style('z-index: 2;');

		backgroundImg.position(0,0);
		foregroundImg.position(0,0);
		
	  	if(!STATIC){
			foregroundImg.drop(p.dropFiles);
		}
		dataList.forEach(function(data){
		  var newChar = new Character(p);
		  newChar.init(p.random(p.windowWidth), p.random(50, backgroundImg.height - 100), 0.1 + backgroundImg.height/backgroundImg.elt.naturalHeight, data);
		  character.push(newChar);
		});

	};

	p.draw = function() {
		p.clear();
		character.forEach(function(c){
			c.draw();
		});
		p.image(logo, p.windowWidth*(1-0.16), 15, 0.15 * p.windowWidth , 0.15 * logo.height *( p.windowWidth / logo.width));

	};

	p.dropFiles = function (file) {

		if(file.subtype  === 'json'){
			fileList.push(file.name);
			var data = JSON.parse(atob(file.data.split(',')[1]));
			var newChar = new Character(p);
			newChar.init(p.random(p.windowWidth), p.random(350, backgroundImg.height - 350), 0.1 + backgroundImg.height/backgroundImg.elt.naturalHeight, data);
			character.push(newChar);

		}
	};

	p.getfList = function(){
		return fileList;
	};

	p.windowResized = function() {
		p.resizeCanvas(p.windowWidth, p.windowHeight);

		//respositioning afer window resized
		backgroundImg.size(p.windowWidth, -1);
		foregroundImg.size(p.windowWidth, -1);
		backgroundImg.position(0,0);
		foregroundImg.position(0,0);

		character.forEach(function(c){
				c.setY(p.random(50, backgroundImg.height-100));
				c.setScale(0.1 + backgroundImg.height/backgroundImg.elt.naturalHeight);
		});

	};
	p.keyTyped = function(){
		if(p.key == 'f'){
			var fs = p.fullScreen();
			p.fullScreen(!fs);
		}else if(p.key == ' '){
		  	character.forEach(function(c){
				c.toggleFilter();
			});
		}
	};

};

var mainP5 = new p5(mainSketch);
var littleP5 = new p5(littleSketch);

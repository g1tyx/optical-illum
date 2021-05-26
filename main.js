let objectCanvas;
let objectCtx;
let particleCanvas;
let particleCtx;
let uiContainer;
let cursorCanvas;
let cursorCtx;

const width = 1600;
const height = 900;

let w;

// INIT FUNCTIONS

function init() {
	w = new State();
	objectCanvas = document.getElementById("objectCanvas");
	objectCtx = objectCanvas.getContext("2d");
	particleCanvas = document.getElementById("particleCanvas");
	particleCtx = particleCanvas.getContext("2d");
	uiContainer = document.getElementById("uiContainer");
	cursorCanvas = document.getElementById("cursorCanvas");
	cursorCtx = cursorCanvas.getContext("2d");
	
	objectCanvas.addEventListener("mousemove", onMove);
	uiContainer.addEventListener("mousemove", onMove);
	objectCanvas.addEventListener("mousedown", onClick);
	objectCanvas.addEventListener("mouseup", onRelease);
	objectCanvas.addEventListener("wheel", onScroll);
	//cursorCanvas.style.cursor = "none"
	w.mouse = new MouseDebugger()
	w.ui = new Ui(w)
	
	particleCtx.fillStyle = `rgb(5, 5, 5)`;
	particleCtx.fillRect(0, 0, width, height);
	
	initGame();
	setInterval(mainLoop, 50);
	setInterval(cursorLoop, 10);
}

function initGame() {
	load();
}

// MOUSE FUNCTIONS

function onMove(e) {
	const lastLoc = w.mouseLoc;
	const bbox = cursorCanvas.getBoundingClientRect(); 
	w.mouseLoc = new Vector(e.clientX - bbox.left, e.clientY - bbox.top);
	if (w.cursorMode === "select") {
		if (w.selectedObject != null) {
			if (w.selectedObject.distanceToRota(w.clickLoc) < 10) {
				
			}
		}
		for (let obj of w.objects) {
			if (typeof obj.pointIsNear === "function" && obj.pointIsNear(w.mouseLoc)) {
				break;
			}
		}
	}
	if (w.cursorMode === "move") {
		w.selectedObject.translate(w.mouseLoc.subtract(lastLoc));
		w.clearRays = 10;
		w.drawRays = 200;
	}
	if (w.cursorMode === "rotate") {
		w.selectedObject.rotate(w.selectedObject.getCenter().subtract(w.mouseLoc).getTheta()-Math.PI/2);
		w.clearRays = 10;
		w.drawRays = 200;
	}
}

function onClick(e) {
	const bbox = cursorCanvas.getBoundingClientRect(); 
	w.clickLoc = new Vector(e.clientX - bbox.left, e.clientY - bbox.top);
	if (w.selectedObject != null) {
		if (w.selectedObject.distanceToRota(w.clickLoc) < 10) {
			w.cursorMode = "rotate"
		}
		if (w.selectedObject.distanceTo(w.clickLoc) < 10) {
			w.cursorMode = "move"
		}
	}
	if (w.cursorMode === "select") {
		if (w.selectedObject != null) {
			w.selectedObject = null;
			w.uiDisplay = "build";
		}
		let nearestVal = 10;
		let nearestObj = null;
		for (let obj of w.objects) {
			if (obj.selectable) {
				let dist = obj.distanceTo(w.clickLoc);
				if (dist < nearestVal) {
					nearestVal = dist;
					nearestObj = obj;
				}
			}
		}
		if (nearestObj != null) {
			w.selectedObject = nearestObj;
			w.cursorMode = "move"
			w.uiDisplay = "selection";
		}
	}
}

function onScroll(e) {
	if (w.selectedObject == null) {
		return;
	}
	if (w.cursorMode === "select" || w.cursorMode === "move") {
		w.selectedObject.rotate(w.selectedObject.theta + Math.sign(e.deltaY)*Math.PI/20);
		w.clearRays = 10;
		w.drawRays = 200;
	}
}

function onRelease(e) {
	w.cursorMode = "select"
}

function cursorLoop() {
	cursorCtx.clearRect(0, 0, width, height);
	w.mouse.draw(cursorCtx, w);
}

// MAIN FUNCTIONS

function mainLoop() {
	//console.time('mainLoop')
	
	w.counter++
	if (w.counter % 200 == 0) {
		save();
	}
	performLogic();
	performDraw();
	updateUi();
	
	//console.timeEnd('mainLoop')
}

function performLogic() {
	w.objects.forEach(object => object.doLogic());
	w.objects.forEach(object => object.reEmit());
	w.objects = w.objects.filter(object => object.isAlive());
	w.particles.forEach(particle => particle.doLogic(w));
	w.particles = w.particles.filter(particle => particle.isAlive());
	
	w.powerRate = w.perTickCounter.reduce((x,y)=>x+y)/w.perTickCounter.length*20
	if (w.perTickCounter.length > 50) {
		w.perTickCounter.pop();
	}
	w.perTickCounter.unshift(0);
	if (w.powerRate > w.maxPowerRate) {
		w.maxPowerRate = w.powerRate;
	}
	if (w.power > w.maxPower) {
		w.maxPower = w.power;
	}
	if (w.upgrades.useMaxRate) {
		w.totalPower += w.maxPowerRate/50*w.fuckItAllYoloBalancingHack;
		w.power += w.maxPowerRate/50*w.fuckItAllYoloBalancingHack;
	} else {
		w.totalPower += w.perTickCounter[1]*w.fuckItAllYoloBalancingHack;
		w.power += w.perTickCounter[1]*w.fuckItAllYoloBalancingHack;
	}
	if (w.fuckItAllYoloBalancingHack <= 10000){
		w.fuckItAllYoloBalancingHack *= w.fiaybhScaler
	}
}

function performDraw() {
	drawParticles();
	drawEntities();
}

function drawParticles() {
	particleCtx.globalCompositeOperation = "multiply"
	if (w.rayDecaySelect == 0) {
		particleCtx.fillStyle = `rgba(230, 230, 230)`;
	}
	if (w.rayDecaySelect == 1) {
		particleCtx.fillStyle = `rgba(255, 255, 255)`;
	}
	if (w.clearRays > 0) {
		particleCtx.fillStyle = `rgba(128, 128, 128)`;
		w.clearRays--;
	}
	particleCtx.fillRect(0, 0, width, height);
	let ratio = 1000/w.particles.length; // Draw ~1000 light rays max
	if (w.drawRays > 0) {
		if (w.rayDecaySelect == 1) {
			w.drawRays--;
		}
		for (let particle of w.particles) {
			if (Math.random() > ratio) {
				particle.wasDrawn = true;
				continue;
			}
			particle.draw(particleCtx, w);
		}
	}
}

function drawEntities() {
	objectCtx.clearRect(0, 0, width, height);
	w.objects.forEach(object => object.draw(objectCtx));
}

function updateUi() {
	w.ui.update(w);
}

function save() {
	window.localStorage.setItem("state", JSON.stringify(w.toSavable()));	
}

function load() {
	const state = localStorage.getItem('state');
	if (state != null) {
		w.load(JSON.parse(state));
	}
}
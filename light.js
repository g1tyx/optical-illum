class LightEmitter extends BaseObject {
	canRotate = false;
	title = "Light Source"
	description = "Produces light in random directions. Any light rays will be unable to interact with objects until they exit the radius."
	constructor (loc, w) {
		super(loc, w);
	}
	
	drawEntity(ctx) {
		ctx.beginPath();
		ctx.fillStyle = "#FFFFFF";
		if (w.selectedObject == this) {
			ctx.fillStyle = "#00FF00";
		}
		ctx.fillRect(this.loc.x-2, this.loc.y-2, 4, 4);
		ctx.closePath();
		if (w.cursorMode === "move" || w.cursorMode === "rotate") {
			ctx.strokeStyle = "#A02233";
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.setLineDash([4, 3]);
			ctx.lineDashOffset = w.counter;
			ctx.arc(this.loc.x, this.loc.y, 100, 0, 2 * Math.PI)
			ctx.stroke();
			ctx.setLineDash([]);
			ctx.closePath();
		}
	}
	
	doLogic () {
		for (let i = 0; i < 10*w.upgrades.lightEmitter.numRays; i++) {
			const ray = new LightRay(this.loc);
			ray.tti = 100;
			w.particles.push(ray);
			ray.calcPath(w);
		}
	}
}

class LightRay {
	wasDrawn = false;
	endLoc;
	parentSegment;
	ir = 0;
	red = 200;
	green = 200;
	blue = 100;
	uv = 0;
	xray = 0;
	gamma = 0;
	polarization;
	tti = 0;
	
	constructor(loc, theta, life, parentSegment) {
		this.loc = loc
		this.theta = theta == undefined ? Math.random()*Math.PI*2 : theta;
		this.life = life == undefined ? 100 : life;
		this.parentSegment = parentSegment
		if(isNaN(this.theta)){
			throw "Theta is not a number"
		}
	}
	
	copyTo(parentSegment) {
		const newRay = new LightRay(this.endLoc, this.theta, this.life, parentSegment);
		newRay.ir = this.ir;
		newRay.red = this.red;
		newRay.green = this.green;
		newRay.blue = this.blue;
		newRay.uv = this.uv;
		newRay.xray = this.xray;
		newRay.gamma = this.gamma;
		return newRay;
	}
	
	doLogic(w) {
	}
	
	calcPath(w) {
		let rayForever = this.loc.add(new Vector(2000*Math.cos(this.theta), 2000*Math.sin(this.theta)));
		
		let closestT = 1;
		let hitObject = null;
		let hitSegment = null;
		for (const object of w.objects) {
			if (!object.interacts) {
				//if interacts, require getSegments, getType
				continue;
			}
			for (const [p1, p2] of object.getSegments()) {
				if ([p1, p2] === this.parentSegment) {
					continue;
				}
				const {intersect, t, u} = segmentIntersect(this.loc, rayForever, p1, p2);
				if (t === null || u < 0 || u > 1 || t > closestT || t <= 0.00001) {
					continue;
				}
				if (this.tti > 0 && intersect.getDistanceFromPoint(this.loc) < this.tti) {
					continue;
				}
				closestT = t;
				this.endLoc = intersect;
				hitSegment = [p1, p2];
				hitObject = object;
			}
		}
		if (closestT == 1) {
			this.endLoc = rayForever;
			return;
		}
		hitObject.appendToInput(this);
		hitObject.hit(this, hitSegment);
	}
	
	setSource(loc, theta, life, parentSegment) {
		this.loc = loc == undefined ? this.loc : loc
		this.theta = theta == undefined ? this.theta : theta;
		this.life = life == undefined ? this.life : life;
		this.parentSegment = parentSegment == undefined ? this.parentSegment : parentSegment
	}
	
	setRgb(r, g, b, ir, uv, x, gamma) {
		this.red = r;
		this.green = g;
		this.blue = b;
	}
	
	getRgb() {
		return [this.red, this.green, this.blue]
	}
	
	setEnergy(energyArray) {
		this.ir = energyArray[0];
		this.red = energyArray[1];
		this.green = energyArray[2];
		this.blue = energyArray[3];
		this.uv = energyArray[4];
		this.xray = energyArray[5];
		this.gamma = energyArray[6];
	}
	
	getEnergy() {
		return [this.ir, this.red, this.green, this.blue, this.uv, this.xray, this.gamma]
	}
	
	isAlive(w) {
		return !this.wasDrawn;
	}
	
	draw(ctx, w) {
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.globalCompositeOperation = "lighter"
		
		ctx.moveTo(this.loc.x, this.loc.y);
		ctx.lineTo(this.endLoc.x, this.endLoc.y);
		const brightness = this.life/1000
		
		ctx.strokeStyle = `rgba(${this.red}, ${this.green}, ${this.blue}, ${brightness})`;
		ctx.stroke();
		if (w.particles.length < 5000) {
			ctx.lineWidth = 4;
			ctx.strokeStyle = `rgba(${this.ir/3}, 0, 0, ${brightness/2})`;
			ctx.stroke();
			ctx.strokeStyle = `rgba(0, 0, ${this.uv/3}, ${brightness/2})`;
			ctx.stroke();
		}
		ctx.closePath();
		this.wasDrawn = true;
	}
}

class BaseObject {
	interacts = false;
	
	canRotate = true;
	canMove = true;
	
	selectable = true;
	
	alive = true;
	loc;
	theta = 0;
	toReEmit = [];
	recentInput = [[],[],[],[],[],[],[],[],[],[]];
	
	name;
	size;
	focalDist;
	modeIndex;
	
	constructor(loc) {
		this.loc = loc
		this.w = w
	}
		
	draw(ctx) {
		if (this.selectable && w.selectedObject === this) {
			if (this.canRotate) {
				this.drawRotationHandle(ctx);
			}
		}
		this.drawEntity(ctx, w);
	}
	
	drawRotationHandle(ctx) {
		const d1 = this.applyTranslation(new Vector(0,-50));
		const d2 = this.applyTranslation(new Vector(0,-70));
		ctx.beginPath();
		ctx.moveTo(d1.x, d1.y);
		ctx.lineTo(d2.x, d2.y);
		
		ctx.strokeStyle = `rgba(0, 0, 0)`;
		
		ctx.lineWidth = 5;
		ctx.stroke();
		
		ctx.strokeStyle = `rgba(255, 255, 255)`;
		ctx.lineWidth = 1;
		ctx.stroke();
		
		ctx.fillStyle = "#FF00FF";
		ctx.fillRect(d2.x-2, d2.y-2, 4, 4);
		
		ctx.closePath();
	}
	
	drawEntity(ctx) {}
	
	reEmit() {
		for (let ray of this.toReEmit) {
			w.particles.push(ray);
			ray.calcPath(w);
		}
		this.toReEmit = [];
		this.recentInput.unshift([]);
		this.recentInput.pop();
	}
	
	getRayCount() {
		let count = 0;
		for (let i = 1; i < this.recentInput.length; i++) {
			count += this.recentInput[i].length;
		}
		return count/9*20;
	}
	
	appendToInput(ray) {
		this.recentInput[0].push(ray);
	}
	
	doLogic () {
	}
	
	getCenter() {
		return this.loc
	}
	
	distanceTo(loc) {
		return loc.getDistanceFromPoint(this.loc);
	}
	
	distanceToRota(loc) {
		const d = this.applyTranslation(new Vector(0,-70));
		return loc.getDistanceFromPoint(d);
	}
	
	isAlive(w) {
		return this.alive;
	}
	
	kill() {
		if (this.name != null) {
			w.upgrades[this.name].count--;
		}
		this.alive = false;
		w.clearRays = 10;
		w.drawRays = 200;
	}
	
	translateTo(newLoc) {
		if (this.canMove) {
			this.loc = newLoc
		}
	}
	
	translate(newLoc) {
		this.loc = this.loc.add(newLoc);
	}
	
	rotate(newTheta) {
		if (this.canRotate) {
			this.theta = newTheta
		}
	}
	
	applyTranslation(p) {
		return p.rotate(this.theta).add(this.loc);
	}
	
	toSavable() {
		return {
			name: this.name,
			loc: this.loc,
			theta: this.theta,
			modeIndex: this.modeIndex,
		}
	}
}
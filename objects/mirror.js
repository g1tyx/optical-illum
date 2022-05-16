class Wall extends BaseObject {
	interacts = true;
	size;
	constructor(loc, w, size) {
		super(loc, w)
		this.size = size;
	}
	
	getPoints() {
		const points = [new Vector(-this.size/2, 0), new Vector(this.size/2, 0)];
		for (let i = 0; i < points.length; i++) {
			points[i] = this.applyTranslation(points[i]);
		}
		return points;
	}
	
	point(i) {
		return this.getPoints()[i];
	}
	
	drawEntity(ctx) {
		ctx.beginPath();
		ctx.moveTo(this.point(0).x, this.point(0).y);
		ctx.lineTo(this.point(1).x, this.point(1).y);
		
		ctx.strokeStyle = `rgba(200, 200, 200)`;
		if (w.selectedObject == this) {
			ctx.strokeStyle = `rgba(10, 200, 10)`;
		}
		ctx.lineWidth = 2
		ctx.stroke();
		ctx.closePath();
	}
	
	distanceTo(loc) {
		return loc.getDistanceFromVector(this.point(0), this.point(1));
	}
	
	getSegments() {
		return [[this.point(0), this.point(1)]]
	}
	
	hit(incoming, parentSegment) {}
}

class Mirror extends Wall {
	title = "Mirror"
	drawEntity(ctx) {
		ctx.beginPath();
		ctx.moveTo(this.point(0).x, this.point(0).y);
		ctx.lineTo(this.point(1).x, this.point(1).y);
		
		ctx.strokeStyle = `rgba(200, 200, 200)`;
		if (w.selectedObject == this) {
			ctx.strokeStyle = `rgba(10, 200, 10)`;
		}
		ctx.lineWidth = 2
		ctx.stroke();
		ctx.closePath();
	}
	
	hit(incoming, parentSegment) {
		const theta = this.point(0).subtract(this.point(1)).getTheta();
		const thetaDiff = theta - incoming.theta
		const newTheta = theta - (-thetaDiff);
		
		const newLife = incoming.life*w.upgrades.smallMirror.efficiency;
		if (newLife < 1) {
			return;
		}
		const reflect = incoming.copyTo(parentSegment);
		reflect.theta = newTheta;
		reflect.life = newLife;
		this.toReEmit.push(reflect);
	}
}

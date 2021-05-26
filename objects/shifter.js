const shifterImg = document.getElementById("shifterImg");

class RedShifter extends BaseObject {
	interacts = true;
	title = "Red Shifter"
	constructor(loc, w, size) {
		super(loc, w)
	}
	
	getPoints() {
		const points = [
			new Vector(-70, -50),
			new Vector(-70, 50),
			new Vector(70, 50),
			new Vector(70, -50),
		];
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
		ctx.moveTo(...this.point(0).coord());
		ctx.lineTo(...this.point(1).coord());
		ctx.lineTo(...this.point(2).coord());
		ctx.lineTo(...this.point(3).coord());
		ctx.lineTo(...this.point(0).coord());
		
		ctx.strokeStyle = `rgba(200, 200, 200)`;
		if (w.selectedObject == this) {
			ctx.strokeStyle = `rgba(10, 200, 10)`;
		}
		ctx.lineWidth = 2
		ctx.stroke();
		ctx.closePath();
		
		ctx.save();
		ctx.setTransform(1, 0, 0, 1, ...this.loc.coord())
		ctx.rotate(this.theta);
		ctx.drawImage(shifterImg, -70, -50);
		ctx.restore();
	}
	
	distanceTo(loc) {
		return Math.min(loc.getDistanceFromVector(this.point(0), this.point(1)),
			loc.getDistanceFromVector(this.point(1), this.point(2)),
			loc.getDistanceFromVector(this.point(2), this.point(0)));
	}
	
	getSegments() {
		return [
			[this.point(0), this.point(1)],
			[this.point(1), this.point(2)],
			[this.point(2), this.point(3)],
			[this.point(3), this.point(0)],
		]
	}
	
	hit(incoming, parentSegment) {
		if (!parentSegment[0].equals(this.point(2))) {
			return;
		}
		
		
		const newLife = incoming.life*w.upgrades.shifter.efficiency;
		if (newLife < 1) {
			return;
		}
		const reflect = incoming.copyTo([this.point(0), this.point(1)]);
		reflect.loc = incoming.endLoc.add(new Vector(-140,0).rotate(this.theta));
		reflect.theta = this.theta + Math.random()*Math.PI/2 + 3*Math.PI/4
		reflect.life = newLife;
		const energy = incoming.getEnergy();
		energy[1] += energy[0];
		energy.shift();
		energy.push(0);
		reflect.setEnergy(energy);
		this.toReEmit.push(reflect);
	}
}

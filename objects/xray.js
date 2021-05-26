const xrayTubeImg = document.getElementById("xrayTubeImg");

class XrayTube extends BaseObject {
	interacts = true;
	title = "X-Ray Tube"
	constructor(loc, w, size) {
		super(loc, w)
	}
	
	getPoints() {
		const points = [
			new Vector(-40, -31),
			new Vector(-40, 31),
			new Vector(40, 31),
			new Vector(40, -31),
			
			new Vector(40, -13),
			new Vector(40, 13),
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
		
		if (w.cursorMode === "move" || w.cursorMode === "rotate") {
			ctx.strokeStyle = "#A02233";
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.setLineDash([4, 3]);
			ctx.lineDashOffset = w.counter;
			ctx.arc(...this.applyTranslation(new Vector(-8,0)).coord(), 50, 0, 2 * Math.PI)
			ctx.stroke();
			ctx.setLineDash([]);
			ctx.closePath();
		}
		
		if (w.selectedObject == this) {
			ctx.beginPath();
			ctx.moveTo(...this.point(0).coord());
			ctx.lineTo(...this.point(1).coord());
			ctx.lineTo(...this.point(2).coord());
			ctx.lineTo(...this.point(3).coord());
			ctx.lineTo(...this.point(0).coord());
			ctx.strokeStyle = `rgba(10, 200, 10)`;
			ctx.lineWidth = 2
			ctx.stroke();
			ctx.closePath();
		}
		
		ctx.save();
		ctx.setTransform(1, 0, 0, 1, ...this.loc.coord())
		ctx.rotate(this.theta);
		ctx.drawImage(xrayTubeImg, -40, -31);
		ctx.restore();
	}
	
	distanceTo(loc) {
		return Math.min(loc.getDistanceFromVector(this.point(0), this.point(1)),
			loc.getDistanceFromVector(this.point(1), this.point(2)),
			loc.getDistanceFromVector(this.point(2), this.point(0)));
	}
	
	getSegments() {
		return [
			[this.point(4), this.point(5)],
		]
	}
	
	hit(incoming, parentSegment) {		
		const newLife = incoming.life*w.upgrades.smallMirror.efficiency;
		if (newLife < 1) {
			return;
		}
		// TODO: Make one direction input
		
		const reflect = incoming.copyTo(parentSegment);
		reflect.loc = new Vector(-8,0).rotate(this.theta).add(this.loc);
		reflect.theta = Math.random()*Math.PI*2
		reflect.life = newLife;
		const energy = incoming.getEnergy();
		reflect.setEnergy([0,0,0,0,0,energy[5]+energy[4],0]);
		reflect.tti = 100;
		this.toReEmit.push(reflect);
	}
}

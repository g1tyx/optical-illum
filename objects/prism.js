class Prism extends BaseObject {
	indexR = 1.5
	indexG = 1.515
	indexB = 1.53
	interacts = true;
	size;
	title = "Prism"
	constructor(loc, w, size) {
		super(loc, w)
		this.size = size;
	}
	
	getPoints() {
		const points = [
			new Vector(-this.size/2, this.size*Math.sqrt(3)/6),
			new Vector(this.size/2, this.size*Math.sqrt(3)/6),
			new Vector(0, -this.size*Math.sqrt(3)/3),
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
		ctx.lineTo(...this.point(0).coord());
		
		ctx.strokeStyle = `rgba(200, 200, 200)`;
		if (w.selectedObject == this) {
			ctx.strokeStyle = `rgba(10, 200, 10)`;
		}
		ctx.lineWidth = 2
		ctx.stroke();
		ctx.closePath();
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
			[this.point(2), this.point(0)],
		]
	}
	
	hit(incoming, parentSegment) {
		const normal = parentSegment[0].subtract(parentSegment[1]).getNormalTheta();
		const thetaDiff = normal - incoming.theta

		
		for (let i = 0; i < 3; i++) {
			let newTheta;
			let index = [this.indexR, this.indexG, this.indexB][i];
			if (incoming.getRgb()[i] == 0) {
				continue;
			}
			const d = this.distanceTo(incoming.loc);
			if (d > .001) {
				const newDiff = Math.asin(Math.sin(thetaDiff) / index);
				const normalizedDiff = (thetaDiff % (Math.PI*2) + (Math.PI*2))%(Math.PI*2);
				if (normalizedDiff > Math.PI/2 && normalizedDiff < 3*Math.PI/2) {
					newTheta = normal - (Math.PI-newDiff);
				} else {
					newTheta = normal - (newDiff);
				}
			} else {
				const snell = Math.sin(thetaDiff) * index;
				if (Math.abs(snell) <= 1) {
					const newDiff = Math.asin(snell)
					const normalizedDiff = (thetaDiff % (Math.PI*2) + (Math.PI*2))%(Math.PI*2);
					if (normalizedDiff > Math.PI/2 && normalizedDiff < 3*Math.PI/2) {
						newTheta = normal - (Math.PI-newDiff);
					} else {
						newTheta = normal - (newDiff);
					}
				} else {
					const theta = parentSegment[0].subtract(parentSegment[1]).getTheta();
					newTheta = 2*theta - incoming.theta;
				}
			}
			const newLife = incoming.life*w.upgrades.prism.efficiency;
			if (newLife < 1) {
				return;
			}
			const reflect = incoming.copyTo(parentSegment);
			reflect.theta = newTheta;
			reflect.life = newLife;
			const energy = incoming.getEnergy()
			if (i == 0) {
				for (let j = 2; j<7; j++) {
					energy[j]=0;
				}
			} else if (i == 1) {
				for (let j = 0; j<7; j++) {
					if (j != 2) {
						energy[j]=0;
					}
				}
			} else if (i == 2) {
				for (let j = 0; j<3; j++) {
					energy[j]=0;
				}
			}
			reflect.setEnergy(energy);
			this.toReEmit.push(reflect);
		}
	}
}

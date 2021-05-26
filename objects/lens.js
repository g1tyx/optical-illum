class Lens extends Wall {
	toReEmit = [];
	focalDist;
	title = "Lens"
	constructor(loc, w, size, focalDist) {
		super(loc, w, size)
		this.focalDist = focalDist;
	}
	
	drawEntity(ctx) {
		ctx.beginPath();
		if (this.focalDist > 0) {
			const c1 = this.applyTranslation(new Vector(0, this.size/20))
			const c2 = this.applyTranslation(new Vector(0, -this.size/20))
			ctx.moveTo(this.point(0).x, this.point(0).y);
			ctx.quadraticCurveTo(c1.x, c1.y, this.point(1).x, this.point(1).y);
			ctx.quadraticCurveTo(c2.x, c2.y, this.point(0).x, this.point(0).y);
		} else {
			const c1 = new Vector(0, this.size/20).rotate(this.theta)
			const c2 = new Vector(0, -this.size/20).rotate(this.theta)
			const p1 = this.point(0).add(c1);
			const p2 = this.point(0).add(c2);
			const p3 = this.point(1).add(c2);
			const p4 = this.point(1).add(c1);
			
			
			ctx.moveTo(...p1.coord());
			ctx.lineTo(...p2.coord());
			ctx.quadraticCurveTo(...this.loc.coord(), ...p3.coord());
			ctx.lineTo(...p4.coord());
			ctx.quadraticCurveTo(...this.loc.coord(), ...p1.coord());
		}
		
		
		ctx.strokeStyle = `rgba(255, 255, 255, .7)`;
		ctx.fillStyle = `rgba(200, 200, 200, .7)`;
		if (w.selectedObject == this) {
			ctx.strokeStyle = `rgba(10, 200, 10)`;
		}
		ctx.lineWidth = 2
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
		
		// TODO: redraw concave lens;
	}

	hit(incoming, parentSegment) {
		const normal = this.point(0).subtract(this.point(1)).getNormalTheta();
		const normalVect = Vector.getNormalizedVector(normal);

		let focA = this.getCenter().add(normalVect.scale(2*this.focalDist));
		let focA1 = this.point(0).add(normalVect.scale(2*this.focalDist));
		let focB = this.getCenter().subtract(normalVect.scale(2*this.focalDist));
		let focB1 = this.point(0).subtract(normalVect.scale(2*this.focalDist));
		
		if ((incoming.loc.getDistanceFromPoint(focA) > incoming.loc.getDistanceFromPoint(focB)) ^ (this.focalDist < 0)) {
			[focA, focB] = [focB, focA];
			[focA1, focB1] = [focB1, focA1];
		}
		const p1 = segmentIntersect(focA, focA1, incoming.loc, incoming.endLoc).intersect;
		const p2 = segmentIntersect(focB, focB1, this.getCenter(), p1).intersect;
		const p3 = segmentIntersect(focA, focA1, incoming.endLoc, p2).intersect;

		let newTheta;
		if (this.focalDist > 0) {
			newTheta = p2.subtract(incoming.endLoc).getTheta();
		} else {
			newTheta = p3.subtract(incoming.endLoc).getTheta();
		}
		
		const newLife = incoming.life*w.upgrades.convexLens.efficiency;
		if (newLife < 1) {
			return;
		}
		const reflect = incoming.copyTo(parentSegment);
		reflect.theta = newTheta;
		reflect.life = newLife;
		this.toReEmit.push(reflect);
	}
}

class Normalizer extends Wall {
	title = "Normalizer"
	drawEntity(ctx) {
		ctx.beginPath();
		ctx.moveTo(this.point(0).x, this.point(0).y);
		ctx.lineTo(this.point(1).x, this.point(1).y);
		
		ctx.strokeStyle = `rgba(200, 200, 200)`;
		if (w.selectedObject == this) {
			ctx.strokeStyle = `rgba(10, 200, 10)`;
		}
		ctx.lineWidth = 5
		ctx.stroke();
		ctx.strokeStyle = `rgba(0, 0, 0)`;
		ctx.lineWidth = 2
		ctx.stroke();
		ctx.closePath();
	}

	hit(incoming, parentSegment) {
		let newTheta = this.point(0).subtract(this.point(1)).getNormalTheta();
		if (normalizeAngle(newTheta - incoming.theta) > Math.PI/2 && normalizeAngle(newTheta - incoming.theta) < 3*Math.PI/2) {
			newTheta += Math.PI
		}
		
		const newLife = incoming.life*w.upgrades.normalizer.efficiency;
		if (newLife < 1) {
			return;
		}
		const reflect = incoming.copyTo(parentSegment);
		reflect.theta = newTheta;
		reflect.life = newLife;
		this.toReEmit.push(reflect);
	}
}

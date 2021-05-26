//https://stackoverflow.com/questions/563198
function segmentIntersect(p1,p2, q1,q2) {
	const r = p2.subtract(p1);
	const s = q2.subtract(q1);
	
	const rxs = r.cross(s)
	if (rxs === 0) {
		return {intersect: null, t: null, u: null};
	}
	
	const u = (q1.subtract(p1)).cross(r) / rxs;
	const t = (q1.subtract(p1)).cross(s) / rxs;
	const intersect = p1.add(r.scale(t));
	return {intersect, t, u}
}

class Vector {
	constructor(x,y) {
		this.x = x;
		this.y = y;
	}
	
	add(other) {
		return new Vector(this.x+other.x, this.y+other.y);
	}
	
	subtract(other) {
		return new Vector(this.x-other.x, this.y-other.y);
	}
	
	cross(other) {
		return this.x*other.y - other.x*this.y;
	}
	
	dot(other) {
		return this.x*other.x + this.y*other.y;
	}
	
	scale(scalar) {
		return new Vector(this.x*scalar, this.y*scalar);
	}
	
	getTheta() {
		return Math.atan2(this.y, this.x);
	}
	
	getNormalTheta() {
		return Math.atan2(this.x, -this.y);
	}
	
	getMagnitude() {
		return Math.sqrt(this.getMagnitudeSquared());
	}
	
	getMagnitudeSquared() {
		return this.x*this.x + this.y*this.y;
	}

		
	getDistanceFromPoint(point) {
		return this.subtract(point).getMagnitude();
	}
	
	// https://stackoverflow.com/questions/849211/shortest-distance-between-a-point-and-a-line-segment
	getDistanceFromVector(v1, v2) {
		const l2 = v1.subtract(v2).getMagnitudeSquared();
		if (l2 == 0) {
			return this.getDistanceFromPoint(v1);
		}
		const t = Math.max(0, Math.min(1, this.subtract(v1).dot(v2.subtract(v1))/l2));
		const projection = v1.add(v2.subtract(v1).scale(t))
		return this.getDistanceFromPoint(projection);
	}
	
	rotate(theta) {
		const newX = Math.cos(theta)*this.x-Math.sin(theta)*this.y;
		const newY = Math.sin(theta)*this.x+Math.cos(theta)*this.y;
		return new Vector(newX, newY);
	}
	
	coord() {
		return [this.x, this.y];
	}
	
	equals(other) {
		return this.x === other.x && this.y === other.y;
	}
	
	static getNormalizedVector(theta) {
		return new Vector(Math.cos(theta), Math.sin(theta));
	}
}

function normalizeAngle(theta) {
	return (theta % (Math.PI*2) + (Math.PI*2)) % (Math.PI*2)
}
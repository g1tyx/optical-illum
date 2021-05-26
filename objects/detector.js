class Detector extends Wall {
	title = "Detector";
	descriptionA = "An informational panel that describes the photons passing through it."
	description = this.descriptionA
	recentCount = [0];
	recentIr = [0];
	recentR = [0];
	recentG = [0];
	recentB = [0];
	recentUv = [0];
	recentXray = [0];
	recentGamma = [0];
	
	drawEntity(ctx) {
		ctx.beginPath();
		ctx.moveTo(this.point(0).x, this.point(0).y);
		ctx.lineTo(this.point(1).x, this.point(1).y);
		
		ctx.strokeStyle = `rgba(200, 80, 120)`;
		if (w.selectedObject == this) {
			ctx.strokeStyle = `rgba(10, 200, 10)`;
		}
		ctx.lineWidth = 4
		ctx.stroke();
		ctx.closePath();
	}	
	
	doLogic () {
		const count = this.recentCount.reduce((x,y)=>x+y)
		const perSec = count/this.recentCount.length*20
		const ir = this.recentIr.reduce((x,y)=>x+y)/count
		const r = this.recentR.reduce((x,y)=>x+y)/count
		const g = this.recentG.reduce((x,y)=>x+y)/count
		const b = this.recentB.reduce((x,y)=>x+y)/count
		const uv = this.recentUv.reduce((x,y)=>x+y)/count
		const xray = this.recentXray.reduce((x,y)=>x+y)/count
		const gamma = this.recentGamma.reduce((x,y)=>x+y)/count
		this.description = this.descriptionA + "\n\n";
		this.description += `Rays per second: ${perSec.toReadable()}\n`;
		if (count !== 0) {
			this.description += `Average infrared: ${ir.toReadable()}\n`;
			this.description += `Average red: ${r.toReadable()}\n`;
			this.description += `Average green: ${g.toReadable()}\n`;
			this.description += `Average blue: ${b.toReadable()}\n`;
			this.description += `Average ultraviolet: ${uv.toReadable()}\n`;
			this.description += `Average xray: ${xray.toReadable()}\n`;
			this.description += `Average gamma: ${gamma.toReadable()}\n`;
		}
		
		if (this.recentCount.length > 50) {
			this.recentCount.pop();
			this.recentIr.pop();
			this.recentR.pop();
			this.recentG.pop();
			this.recentB.pop();
			this.recentUv.pop();
			this.recentXray.pop();
			this.recentGamma.pop();
		}
		this.recentCount.unshift(0);
		this.recentIr.unshift(0);
		this.recentR.unshift(0);
		this.recentG.unshift(0);
		this.recentB.unshift(0);
		this.recentUv.unshift(0);
		this.recentXray.unshift(0);
		this.recentGamma.unshift(0);
	}
	
	hit(incoming, parentSegment) {
		const energy = incoming.getEnergy();
		this.recentCount[0]++;
		this.recentIr[0]+=energy[0]*incoming.life;
		this.recentR[0]+=energy[1]*incoming.life;
		this.recentG[0]+=energy[2]*incoming.life;
		this.recentB[0]+=energy[3]*incoming.life;
		this.recentUv[0]+=energy[4]*incoming.life;
		this.recentXray[0]+=energy[5]*incoming.life;
		this.recentGamma[0]+=energy[6]*incoming.life;
		
		const reflect = incoming.copyTo(parentSegment);
		this.toReEmit.push(reflect);
	}
}

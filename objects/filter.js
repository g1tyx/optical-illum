class Filter extends Wall {
	modes = ["All Light", "No Light", "Red Only", "Green Only", "Blue Only", "Infrared Only", "Ultraviolet Only", "X-ray Only", "Gamma Rays Only"];
	modeIndex = 0;
	title = "Filter";
	description = "A panel that will only allow certain wavelengths of light through, depending on the mode."
	drawEntity(ctx) {
		ctx.beginPath();
		ctx.moveTo(this.point(0).x, this.point(0).y);
		ctx.lineTo(this.point(1).x, this.point(1).y);
		
		ctx.strokeStyle = `rgba(80, 80, 120)`;
		if (w.selectedObject == this) {
			ctx.strokeStyle = `rgba(10, 200, 10)`;
		}
		ctx.lineWidth = 4
		ctx.stroke();
		ctx.closePath();
	}
	
	modeLeft() {
		this.modeIndex = (this.modeIndex + this.modes.length - 1) % this.modes.length;
	}
	
	modeRight() {
		this.modeIndex = (this.modeIndex + 1) % this.modes.length;
	}
	
	hit(incoming, parentSegment) {
		const reflect = incoming.copyTo(parentSegment);
		let energy = [0,0,0,0,0,0,0]
		switch(this.modeIndex) {
			case 0:
				energy = incoming.getEnergy();
				break;
			case 1:
				return;
			case 2:
				energy[1] = incoming.getEnergy()[1];
				break;
			case 3:
				energy[2] = incoming.getEnergy()[2];
				break;
			case 4:
				energy[3] = incoming.getEnergy()[3];
				break;
			case 5:
				energy[0] = incoming.getEnergy()[0];
				break;
			case 6:
				energy[4] = incoming.getEnergy()[4];
				break;
			case 7:
				energy[5] = incoming.getEnergy()[5];
				break;
			case 8:
				energy[8] = incoming.getEnergy()[8];
				break;
		}
		let count = 0;
		for (let val of energy) {
			count += val;
		}
		if (count === 0) {
			return;
		}
		reflect.setEnergy(energy);
		this.toReEmit.push(reflect);
	}
}

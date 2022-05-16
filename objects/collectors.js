class SolarPanel extends BaseObject {
	interacts = true;
	canRotate = false;
	modes = ["Normal", "Blue Light", "Infrared", "Ultraviolet", "X-ray", "Gamma Rays"];
	modeIndex = 0;
	stored;
	descriptions = ["Currently, it will produce energy off of the red, green, and blue visible light spectrum.",
		"Currently, it will produce energy optimized for blue light. However, red and green wavelength light will prevent the solar panel from working",
		"Currently, it can produce an increased amount of energy from infrared light.",
		"Currently, it will produce a greatly increased amount of energy from ultraviolet light.",
		"Currently, it can produce an exceptional amount of energy from X-Ray radiation.",
		"Currently, it can produce an overwhelming amount of energy from Gamma radiation."]
	title = "Solar Panel"
	descriptionA = "A solar panel which converts incoming light rays into energy. It has various modes which can make use of different light for improved energy generation.\n\n";
	description = this.descriptionA + this.descriptions[this.modeIndex];
	constructor (loc, w) {
		super(loc, w);
		this.canMove = w.debug;
	}
	
	doLogic () {
		if (this.stored > 0) {
			w.perTickCounter[0] += this.stored;
		}
		this.stored = 0;
	}

	drawEntity(ctx, w) {
		ctx.beginPath();
		ctx.rect(this.loc.x-10, this.loc.y-10, 20, 20);
		ctx.fillStyle = "#4444DD";
		if (w.selectedObject == this) {
			ctx.fillStyle = "#00FF00";
		}
		ctx.fill();
		ctx.closePath();
	}

	distanceTo(loc) {
		return loc.getDistanceFromPoint(this.loc);
	}
	
	getSegments() {
		const NE = new Vector(10,10);
		const NW = new Vector(-10,10);
		const SE = new Vector(10,-10);
		const SW = new Vector(-10,-10);
		return [
			[this.loc.add(NE), this.loc.add(NW)],
			[this.loc.add(NW), this.loc.add(SW)],
			[this.loc.add(SW), this.loc.add(SE)],
			[this.loc.add(SE), this.loc.add(NE)],
		]
	}
	
	modeLeft() {
		this.modeIndex = (this.modeIndex + w.upgrades.solarPanel.tier - 1)%w.upgrades.solarPanel.tier;
		this.description = this.descriptionA + this.descriptions[this.modeIndex];
	}
	modeRight() {
		this.modeIndex = (this.modeIndex + 1) % w.upgrades.solarPanel.tier;
		this.description = this.descriptionA + this.descriptions[this.modeIndex];
	}
	
	hit(incoming, parentSegment) {
		const energy = incoming.getEnergy()
		let pow = 0;
		switch(this.modeIndex) {
			case 0:
				pow = (energy[1]+energy[2]+energy[3])/60;
				break;
			case 1:
				pow = 8 * (energy[3]-energy[1]-energy[2])/10;
				break;
			case 2:
				pow = 50*energy[0]/200;
				break;
			case 3:
				pow = 5000*energy[4]/200
				break;
			case 4:
				pow = 500000*energy[5]/200
				break;
			case 5:
				pow = 100000000*energy[6]/200
				break;
		}
		this.stored += pow*incoming.life/100;
	}
}
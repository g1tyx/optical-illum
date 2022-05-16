class State {
	debug = true;
	
	mouseLoc = null;
	clickLoc = null;
	mouse = null;
	
	ui = null;
	
	objects = [];
	particles = [];
	boughtUpgrades = new Set();
	
	counter = 0;
	power = 0;
	maxPower = 0;
	totalPower = 0;
	maxPowerRate = 0;
	perTickCounter = [0];
	powerRate = 0;
	
	cursorMode = "select"; //select, move, rotate
	uiDisplay = "build"; //build, upgrade, stats, settings, selection
	buildPage = 0;
	
	selectedObject = null;
	
	clearRays = 0;
	drawRays = 0;
	
	fuckItAllYoloBalancingHack = 1;
	fiaybhScaler = 1.00001599; // 10x scaling per 2 hours
	
	upgrades = new Upgrades();
	
	rayDecays = ["quick", "persist", "forever"]
	rayDecaySelect = 0;
	
	audios = ["off", "muted", "0%", "off", "disabled", "there's no audio", "dis-enabled", "nil", "none", "nada", "unavailable", "blocked", "stopped", "paused", "false"]
	audioSelect = 0;
	
	showMaxRate = false;
	
	toSavable() {
		return {
			counter: this.counter,
			power: this.power,
			maxPower: this.maxPower,
			totalPower: this.totalPower,
			maxPowerRate: this.maxPowerRate,
			upgrades: this.upgrades,
			boughtUpgrades: Array.from(this.boughtUpgrades),
			objects: this.objects.map(o=>o.toSavable()),
		}
	}
	
	load(s) {
		this.counter = s.counter;
		this.power = s.power;
		this.maxPower = s.maxPower;
		this.totalPower = s.totalPower;
		this.maxPowerRate = s.maxPowerRate;
		this.upgrades = s.upgrades;
		this.boughtUpgrades = new Set(s.boughtUpgrades);
		this.objects = [];
		for (let obj of s.objects) {
			for (let b of BuildUi.buildButtons) {
				if (obj.name != b[0]) {
					continue;
				}
				const createdObj = b[1](new Vector(obj.loc.x, obj.loc.y));
				createdObj.name = obj.name;
				createdObj.theta = obj.theta;
				createdObj.modeIndex = obj.modeIndex;
				this.objects.push(createdObj);
				break;
			}
		}
		
		//bugfix:
		if (this.boughtUpgrades.has("useMaxRate")) {
			this.upgrades.useMaxRate = true;
		}
	}
}
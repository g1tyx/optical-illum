

class Ui {
	children = [];
	constructor(w) {
		idMap.set("uiContainer", {id: "uiContainer", div: document.getElementById("uiContainer"), parent: null, children: []});
		idMap.set("body", {id: "body", div: document.body, parent: null, children: []});
		addTo("uiContainer", newDiv("currencyContainer"));
		addTo("uiContainer", newDiv("navButtons"));
		
		this.children.push(new NavButtonUi(w));
		this.children.push(new BuildUi(w));
		this.children.push(new UpgradeUi(w));
		this.children.push(new StatsUi(w));
		this.children.push(new SettingsUi(w));
		this.children.push(new SelectionUi(w));
		addTo("body", newDiv("theEnd"));
		getDiv("theEnd").addEventListener("click", function(){
			w.win = false;
		});
	}
	
	update(w) {
		let str = w.power.toReadable() + "W (" + w.powerRate.toReadable() + "W/s)"
		if (w.showMaxRate) {
			str += " [" + w.maxPowerRate.toReadable() + "W/s]"
		}
		getDiv("currencyContainer").innerHTML = str;
		for (let child of this.children) {
			child.update(w);
		}
		if (w.win) {
			getDiv("theEnd").style.display = "block";
		} else { 
			getDiv("theEnd").style.display = "none";
			getDiv("theEnd").innerHTML=
`Congratulations!
You managed to obtain an unbelievable amount of power!
It has been about ${Math.floor(w.counter/20/60)} minutes since you started.
You've reached the end of all current content. However, I may continue to develop more after the end of the jam.
In the meantime, click anywhere to return to the game.
`
		}
	}
}

// What the fuck am I doing?
idMap = new Map();

function newDiv(id, ...classes) {
	if (idMap.has(id)) {
		throw "duplicate id";
	}
	const div = document.createElement("div");
	div.id = id;
	idMap.set(id, {id, div, parent: null, children: []});
	for (let clazz of classes) {
		div.classList.add(clazz);
	}
	return id;
}

function getDiv(id) {
	if (!idMap.has(id)) {
		throw "missing id";
	}
	return idMap.get(id).div;
}

function addTo(parentId, childId) {
	parentNode = idMap.get(parentId);
	childNode = idMap.get(childId);
	if (childNode.parent != null) {
		throw "multiple parents";
	}
	parentNode.children.push(childNode);
	childNode.parent = parentNode;
	getDiv(parentId).appendChild(getDiv(childId));
}

function updateDiv(id, style) {
	
}

//hide(id)
class NavButtonUi {
	constructor(w) {
		addTo("navButtons", newDiv("navRow1"));
		addTo("navButtons", newDiv("navRow2"));
		addTo("navRow1", newDiv("buildButton", "navButton"));
		addTo("navRow1", newDiv("upgradesButton", "navButton"));
		addTo("navRow2", newDiv("statsButton", "navButton"));
		addTo("navRow2", newDiv("settingsButton", "navButton"));
		getDiv("buildButton").innerHTML = "Build"
		getDiv("buildButton").addEventListener("click", function(){
			w.uiDisplay = "build";
			if (w.cursorMode == "move") {
				w.selectedObject.kill();
			}
			w.cursorMode = "select";
			w.selectedObject = null;
			w.buildPage = 0;
			getDiv("buildMessages").innerHTML = "";
		});
		getDiv("upgradesButton").innerHTML = "Upgrades"
		getDiv("upgradesButton").addEventListener("click", function(){
			w.uiDisplay = "upgrade";
			if (w.cursorMode == "move") {
				w.selectedObject.kill();
			}
			w.cursorMode = "select";
			w.selectedObject = null;
			getDiv("upgradeMessages").innerHTML = "";
		});
		getDiv("statsButton").innerHTML = "Stats"
		getDiv("statsButton").addEventListener("click", function(){
			w.uiDisplay = "stats";
			if (w.cursorMode == "move") {
				w.selectedObject.kill();
			}
			w.cursorMode = "select";
			w.selectedObject = null;
		});
		getDiv("settingsButton").innerHTML = "Settings"
		getDiv("settingsButton").addEventListener("click", function(){
			w.uiDisplay = "settings";
			if (w.cursorMode == "move") {
				w.selectedObject.kill();
			}
			w.cursorMode = "select";
			w.selectedObject = null;
		});
	}
	
	update(w) {
		const buttons = [getDiv("buildButton"), getDiv("upgradesButton"), getDiv("statsButton"), getDiv("settingsButton")];
		let selected = -1;
		switch(w.uiDisplay){
			case "build":
				selected = 0;
				break;
			case "upgrade":
				selected = 1;
				break;
			case "stats":
				selected = 2;
				break;
			case "settings":
				selected = 3;
				break;
			case "selection":
				selected = -1;
				break;
		}
		for (let i = 0; i < 4; i++) {
			if (i == selected) {
				buttons[i].classList.add("selected")
				buttons[i].classList.remove("unselected")
			} else {
				buttons[i].classList.add("unselected")
				buttons[i].classList.remove("selected")
			}
		}
	}
}
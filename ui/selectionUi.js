class SelectionUi {
	
	SolarSelector
	FilterSelector
	constructor(w) {
		addTo("uiContainer", newDiv("selectionUi"));
		
		addTo("selectionUi", newDiv("selTitle"));
		addTo("selectionUi", newDiv("solarPanelMode"));
		addTo("selectionUi", newDiv("filterMode"));
		addTo("selectionUi", newDiv("selDescription"));
		this.SolarSelector = new SelectorWidget("solarPanelMode", "solarPanelSelector", ()=>{w.selectedObject.modeLeft()}, ()=>{w.selectedObject.modeRight()}, "Solar panel mode: ");
		this.FilterSelector = new SelectorWidget("filterMode", "filterSelector", ()=>{w.selectedObject.modeLeft()}, ()=>{w.selectedObject.modeRight()}, "Filter mode: ");
		addTo("selectionUi", newDiv("irStoreRow"));
		addTo("irStoreRow", newDiv("irStore"));
		addTo("selectionUi", newDiv("uvStoreRow"));
		addTo("uvStoreRow", newDiv("uvStore"));
		addTo("selectionUi", newDiv("selSpacer", "spacer"));
		addTo("selectionUi", newDiv("deleteRow"));
		addTo("deleteRow", newDiv("deleteText"));
		addTo("deleteRow", newDiv("deleteButton"));
		getDiv("deleteText").innerHTML = "Delete"
		getDiv("deleteButton").addEventListener("click", function(){
			w.selectedObject.kill();
			w.cursorMode = "select";
			w.uiDisplay = "build";
			w.selectedObject = null;
		});
	}
	
	update(w) {
		if (w.uiDisplay != "selection") {
			getDiv("selectionUi").style.display = "none";
			return;
		}
		getDiv("selectionUi").style.display = "flex";
		
		getDiv("selTitle").innerHTML = w.selectedObject.title;
		if (w.selectedObject.description != null) {
			getDiv("selDescription").innerHTML = w.selectedObject.description;
		} else { 
			getDiv("selDescription").innerHTML = "";
		}
		
		if (w.selectedObject.title == "Solar Panel") {
			getDiv("solarPanelMode").style.display = "flex";
			this.SolarSelector.update(w.selectedObject.modes[w.selectedObject.modeIndex]);
		} else {
			getDiv("solarPanelMode").style.display = "none";
		}
		if (w.selectedObject.title == "Filter") {
			getDiv("filterMode").style.display = "flex";
			this.FilterSelector.update(w.selectedObject.modes[w.selectedObject.modeIndex]);
		} else {
			getDiv("filterMode").style.display = "none";
		}
		if (w.selectedObject.storedIr != null) {
			getDiv("irStoreRow").style.display = "flex";
			getDiv("irStore").innerHTML = "Stored infrared energy: " + w.selectedObject.storedIr;
		} else {
			getDiv("irStoreRow").style.display = "none";
		}
		if (w.selectedObject.storedUv != null) {
			getDiv("uvStoreRow").style.display = "flex";
			getDiv("uvStore").innerHTML = "Stored ultraviolet energy: " + w.selectedObject.storedUv;
		} else {
			getDiv("uvStoreRow").style.display = "none";
		}
	}
}
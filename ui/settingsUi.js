class SettingsUi {
	rayDecay;
	audio;
	showMaxRate;
	constructor(w) {
		addTo("uiContainer", newDiv("settingsUi"));
		this.rayDecay = new SelectorWidget("settingsUi", "rayDecaySetting", ()=>{w.rayDecaySelect=(w.rayDecaySelect + 2)%3}, ()=>{w.rayDecaySelect=(w.rayDecaySelect + 1)%3}, "Ray afterglow decay ");
		this.audio = new SelectorWidget("settingsUi", "audio", ()=>{w.audioSelect=(w.audioSelect + w.audios.length - 1)%w.audios.length}, ()=>{w.audioSelect=(w.audioSelect + 1)%w.audios.length}, "Sound ");
		this.showMaxRate = new SelectorWidget("settingsUi", "showMaxRate", ()=>{w.showMaxRate = !w.showMaxRate}, ()=>{w.showMaxRate = !w.showMaxRate}, "Show highest rate ");
		addTo("settingsUi", newDiv("setSpacer", "spacer"));
		addTo("settingsUi", newDiv("deleteAllRow"));
		addTo("deleteAllRow", newDiv("deleteAllText"));
		addTo("deleteAllRow", newDiv("deleteAllButton"));
		getDiv("deleteAllText").innerHTML = "Delete All Objects"
		getDiv("deleteAllButton").addEventListener("click", function(){
			for (let obj of w.objects) {
				obj.kill();
			}
			w.cursorMode = "select";
			w.selectedObject = null;
		});
	}
	
	update(w) {
		if (w.uiDisplay != "settings") {
			getDiv("settingsUi").style.display = "none";
			return;
		}
		getDiv("settingsUi").style.display = "flex";
		
		this.rayDecay.update(w.rayDecays[w.rayDecaySelect]);
		this.audio.update(w.audios[w.audioSelect]);
		this.showMaxRate.update(w.showMaxRate);
	}
}
class StatsUi {
	constructor(w) {
		addTo("uiContainer", newDiv("statsUi"));
	}
	
	update(w) {
		if (w.uiDisplay != "stats") {
			getDiv("statsUi").style.display = "none";
			return;
		}
		getDiv("statsUi").style.display = "flex";
		getDiv("statsUi").innerHTML = `Total game ticks: ${w.counter}
Max power: ${w.maxPower.toReadable()}W
Total power: ${w.totalPower.toReadable()}W
Highest power per second: ${w.maxPowerRate.toReadable()}W
Coolest person ever: You`
		
	}
}
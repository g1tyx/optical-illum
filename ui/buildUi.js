class BuildUi {
	// [id, build callback, cost, description.]
	static buildButtons = [
		["lightEmitter", (loc) => new LightEmitter(loc, w, 100), (u)=>`Light Source\nIt produces light. That's what you're trying to get. You should get the light. That would be good.`],
		["solarPanel", (loc) => new SolarPanel(loc, w, 100), (u)=>`Solar Panel\nAn object that collects light and produces power. Can be upgraded to optimize for different types of electromagnetic waves.`],
		["detector", (loc) => new Detector(loc, w, 100), (u)=>`Detector\nAn informational panel that describes the photons passing through it. Does not affect the rays.`],
		["smallMirror", (loc) => new Mirror(loc, w, 100), (u)=>`Small Mirror\nA small reflective panel. Reflects rays out at an equal but opposite angle as of incoming lights. You know how mirrors work. Effective on all electromagnetic waves. \nIneffective against vampires.\n\nCurrent upgrades allows for the mirror to reflect light with ${u.efficiency*100}% of the incoming energy.`],
		["largeMirror", (loc) => new Mirror(loc, w, 200), (u)=>`Large Mirror\nA larger reflective panel. Reflects rays out at an equal but opposite angle as of incoming lights. Effective on all electromagnetic waves.\n\nCurrent upgrades allows for the mirror to reflect light with ${u.efficiency*100}% of the incoming energy.`],
		["convexLens", (loc) => new Lens(loc, w, 200, 80), (u)=>`Convex Lens\nA thin lens which bends light rays towards the center axis. Effective on all electromagnetic waves.\n\nCurrent upgrades allows light to pass through with ${u.efficiency*100}% of the incoming energy.`],
		["concaveLens", (loc) => new Lens(loc, w, 200, -80), (u)=>`Concave Lens\nA thin lens which bends light away from the center axis. Effective on all electromagnetic waves. Can be used with a convex lens to straighten out a beam of light.\n\nCurrent upgrades allows light to pass through with ${u.efficiency*100}% of the incoming energy.`],
		["prism", (loc) => new Prism(loc, w, 60), (u)=>`Glass Prism\nA triangular glass shape. The different index of refraction of different wavelengths allow the prism to seperate red, green, and blue light.\n\nCurrent upgrades allows light to pass through with ${u.efficiency*100}% of the incoming energy.`],
		["normalizer", (loc) => new Normalizer(loc, w, 60), (u)=>`Normalizer\nA material that makes all light that pass through perpendicular to the panel. While compact, light passing through it will lose more energy. \n\nCurrent upgrades allows light to pass through with ${u.efficiency*100}% of the incoming energy.`],
		["filter", (loc) => new Filter(loc, w, 80), (u)=>`Light Filter\nA material that can filter out different kinds of light. Unfiltered light loses no energy.`],
		["shifter", (loc) => new RedShifter(loc, w), (u)=>`Red Shifter\nA machine which will extend the wavelength of incoming light. Converts pure red light into infrared light; green light into red light; etc. \n\nTakes in light on the right side.\n\nIt is ${u.efficiency*100}% efficient.`],
		["energizer", (loc) => new Energizer(loc, w), (u)=>`Blue Shifter\nA machine which will decreases the wavelength of incoming light. Must be powered by infrared light to function. It is unable to produce light with wavelengths shorter than ultraviolet light.\n\nAbsorbs IR light from either the top or bottom.\nTakes in light from the right.\n\nIt is ${u.efficiency*100}% efficient.`],
		["xrayTube", (loc) => new XrayTube(loc, w), (u)=>`X-Ray Tube\nA specialized vacuum tube that converts ultraviolet light into x-rays. Be careful, x-rays are beyond the visible spectrum and require specialized film to see.\n\nIt is ${u.efficiency*100}% efficient.`],
		["gammaCascader", (loc) => new GammaCascader(loc, w), (u)=>`Gamma Ray Cascader\nA complex machine that takes both infrared and ultraviolet light to convert xrays into gamma rays. \n\nAbsorbs UV light from the left.\nAbsorbs IR light from the right.\nTakes in x-rays from the bottom. \n\nIt is ${u.efficiency*100}% efficient.`],
	];
	
	constructor(w) {
		addTo("uiContainer", newDiv("buildUi"));
		addTo("buildUi", newDiv("buildButtons"));
		addTo("buildUi", newDiv("buildArrows"));
		addTo("buildArrows", newDiv("buildLeft", "buildArrow"));
		const pages = Math.ceil(BuildUi.buildButtons.length/12);
		getDiv("buildLeft").addEventListener("click", function(){
			w.buildPage = (w.buildPage+pages-1)%pages;
		});
		for (let i = 0; i < pages; i++) {
			addTo("buildArrows", newDiv("buildPageDot"+i, "pageDot"));
			getDiv("buildPageDot"+i).addEventListener("click", function(){
				w.buildPage = i;
			});
		}
		addTo("buildArrows", newDiv("buildRight", "buildArrow"));
		getDiv("buildRight").addEventListener("click", function(){
			w.buildPage = (w.buildPage+1)%pages;
		});
		addTo("buildUi", newDiv("buildMessages"));
		
		for ( let b of BuildUi.buildButtons ) {
			const id = "buildButton" + b[0]
			addTo("buildButtons", newDiv(id, "buildButton", "unselected"));
			
			addTo(id, newDiv(id+"tint", "buildIcon"));
			addTo(id+"tint", newDiv(id+"icon", "buildIcon"));
			const build = getDiv(id);
			build.addEventListener("click", function(){
				if (!w.upgrades[b[0]].unlocked){
					return;
				}
				if (w.upgrades[b[0]].count >= w.upgrades[b[0]].maxCount){
					return;
				}
				if (w.cursorMode === "move") {
					w.selectedObject.kill();
				}
				w.selectedObject = b[1](w.mouseLoc);
				w.selectedObject.name = b[0]
				w.objects.push(w.selectedObject);
				w.upgrades[b[0]].count++;
				w.cursorMode = "move";
				w.uiDisplay = "selection";
			});
			build.addEventListener("mouseover", function(){
				if (w.upgrades[b[0]].unlocked) {
					getDiv("buildMessages").innerHTML = b[2](w.upgrades[b[0]]) + `\n\nOwned: ${w.upgrades[b[0]].count}\nMaximum: ${w.upgrades[b[0]].maxCount}`;
				} else {
					getDiv("buildMessages").innerHTML = "Locked";
				}
			});
		}
	}
	
	update(w) {
		if (w.uiDisplay != "build") {
			getDiv("buildUi").style.display = "none";
			return;
		}
		getDiv("buildUi").style.display = "flex";
		
		const pages = Math.ceil(BuildUi.buildButtons.length/12);
		for (let i = 0; i < pages; i++) {
			if (i == w.buildPage) {
				getDiv("buildPageDot"+i).style.backgroundImage = 'url("resources/pageDotOn.png")'
			} else {
				getDiv("buildPageDot"+i).style.backgroundImage = 'url("resources/pageDot.png")'
			}
		}
		
		for (let i = 0; i < BuildUi.buildButtons.length; i++) {
			const b = BuildUi.buildButtons[i];
			const id = "buildButton" + b[0];
			const build = getDiv(id);
			if (Math.floor(i/12) !== w.buildPage) {
				build.style.display = "none";
				continue;
			}
			build.style.display = "flex";
			if (!w.upgrades[b[0]].unlocked){
				build.style.backgroundImage = 'url("resources/lockedBuildButton.png")'; 
				continue;
			}
			if (w.upgrades[b[0]].count < w.upgrades[b[0]].maxCount) {
				getDiv(id+"tint").style.backgroundColor = "rgba(0,180,0,.2)"
			} else {
				getDiv(id+"tint").style.backgroundColor = "rgba(0,180,0,0)"
			}
			getDiv(id+"icon").style.backgroundImage = `url("resources/${b[0]}Unlock.png")`; 
			build.style.backgroundImage = 'url("resources/buildButton.png")'; 
		}
	}
}
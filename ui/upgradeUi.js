class UpgradeUi {
	// [id, cost, visibleCallback, upgradeCallback, description]
	upgradeButtons = [
		["lightEmitterRay1", 1e4, (w) => {w.upgrades.lightEmitter.numRays++}, (w) => true, (w)=>`Increases the number of light rays by 100 per second`],
		["lightEmitterRay2", 1e5, (w) => {w.upgrades.lightEmitter.numRays++}, (w) => w.boughtUpgrades.has("lightEmitterRay1"), (w)=>`Increases the number of light rays by 100 per second`],
		["lightEmitterRay3", 1e6, (w) => {w.upgrades.lightEmitter.numRays++}, (w) => w.boughtUpgrades.has("lightEmitterRay2"), (w)=>`Increases the number of light rays by 100 per second`],
		["lightEmitterRay4", 1e7, (w) => {w.upgrades.lightEmitter.numRays++}, (w) => w.boughtUpgrades.has("lightEmitterRay3"), (w)=>`Increases the number of light rays by 100 per second`],
		["lightEmitterRay5", 1e8, (w) => {w.upgrades.lightEmitter.numRays+=5}, (w) => w.boughtUpgrades.has("lightEmitterRay4"), (w)=>`Increases the number of light rays by 500 per second`],
		
		["lightEmitterCount1", 8e4, (w) => {w.upgrades.lightEmitter.maxCount++}, (w) => true, (w)=>`Increase maximum light sources by 1`],
		["lightEmitterCount2", 5e10, (w) => {w.upgrades.lightEmitter.maxCount++}, (w) => w.boughtUpgrades.has("lightEmitterCount1"), (w)=>`Increase maximum light sources by 1`],
		
		["solarPanelCount1", 1e5, (w) => {w.upgrades.solarPanel.maxCount++}, (w) => true, (w)=>`Increase maximum solar panels by 1`],
		["solarPanelCount2", 1e6, (w) => {w.upgrades.solarPanel.maxCount++}, (w) => w.boughtUpgrades.has("solarPanelCount1"), (w)=>`Increase maximum solar panels by 1`],
		["solarPanelCount3", 1e7, (w) => {w.upgrades.solarPanel.maxCount++}, (w) => w.boughtUpgrades.has("solarPanelCount2"), (w)=>`Increase maximum solar panels by 1`],
		
		["smallMirrorUnlock", 100, (w) => {w.upgrades.smallMirror.unlocked = true}, (w) => true, (w)=>`Unlocks small mirrors`],
		["smallMirrorCount1", 4e3, (w) => {w.upgrades.smallMirror.maxCount+=3}, (w) => w.boughtUpgrades.has("smallMirrorUnlock"), (w)=>`Increase maximum small mirrors by 3`],
		["smallMirrorCount2", 7e5, (w) => {w.upgrades.smallMirror.maxCount+=3}, (w) => w.boughtUpgrades.has("smallMirrorCount1"), (w)=>`Increase maximum small mirrors by 3`],
		["smallMirrorCount3", 5e7, (w) => {w.upgrades.smallMirror.maxCount+=6}, (w) => w.boughtUpgrades.has("smallMirrorCount2"), (w)=>`Increase maximum small mirrors by 6`],
		
		["largeMirrorUnlock", 3e3, (w) => {w.upgrades.largeMirror.unlocked = true}, (w) => true, (w)=>`Unlocks large mirrors`],
		["largeMirrorCount1", 9e4, (w) => {w.upgrades.largeMirror.maxCount+=2}, (w) => w.boughtUpgrades.has("largeMirrorUnlock"), (w)=>`Increase maximum large mirrors by 2`],
		["largeMirrorCount2", 1e6, (w) => {w.upgrades.largeMirror.maxCount+=2}, (w) => w.boughtUpgrades.has("largeMirrorCount1"), (w)=>`Increase maximum large mirrors by 2`],
		["largeMirrorCount3", 1e8, (w) => {w.upgrades.largeMirror.maxCount+=5}, (w) => w.boughtUpgrades.has("largeMirrorCount2"), (w)=>`Increase maximum large mirrors by 5`],
		
		["mirrorEffic1", 2e3, (w) => {w.upgrades.smallMirror.efficiency=.6; w.upgrades.smallMirror.efficiency=.6}, (w) => w.boughtUpgrades.has("smallMirrorUnlock")||w.boughtUpgrades.has("largeMirrorUnlock"), (w)=>`Increase mirror efficiency by 10%`],
		["mirrorEffic2", 9e4, (w) => {w.upgrades.smallMirror.efficiency=.7; w.upgrades.smallMirror.efficiency=.7}, (w) => w.boughtUpgrades.has("mirrorEffic1"), (w)=>`Increase mirror efficiency by 10%`],
		["mirrorEffic3", 1e6, (w) => {w.upgrades.smallMirror.efficiency=.8; w.upgrades.smallMirror.efficiency=.8}, (w) => w.boughtUpgrades.has("mirrorEffic2"), (w)=>`Increase mirror efficiency by 10%`],
		["mirrorEffic4", 1e8, (w) => {w.upgrades.smallMirror.efficiency=.9; w.upgrades.smallMirror.efficiency=.9}, (w) => w.boughtUpgrades.has("mirrorEffic3"), (w)=>`Increase mirror efficiency by 10%`],
		
		["lensUnlock", 2e3, (w) => {w.upgrades.convexLens.unlocked = true; w.upgrades.concaveLens.unlocked = true}, (w) => true, (w)=>`Unlocks concave and convex lenses`],
		["lensCount1", 4e3, (w) => {w.upgrades.convexLens.maxCount+=1; w.upgrades.concaveLens.maxCount+=1}, (w) => w.boughtUpgrades.has("lensUnlock"), (w)=>`Increase maximum of both convex and concave lenses by 1`],
		["lensCount2", 2e4, (w) => {w.upgrades.convexLens.maxCount+=1; w.upgrades.concaveLens.maxCount+=1}, (w) => w.boughtUpgrades.has("lensCount1"), (w)=>`Increase maximum of both convex and concave lenses by 1`],
		["lensCount3", 1e8, (w) => {w.upgrades.convexLens.maxCount+=1; w.upgrades.concaveLens.maxCount+=5}, (w) => w.boughtUpgrades.has("lensCount2"), (w)=>`Increase maximum of both convex and concave lenses by 5`],
		["lensEffic1", 2e3, (w) => {w.upgrades.convexLens.efficiency=.8; w.upgrades.concaveLens.efficiency=.8}, (w) => w.boughtUpgrades.has("lensUnlock"), (w)=>`Increase lens efficiency by 10%`],
		["lensEffic2", 4e4, (w) => {w.upgrades.convexLens.efficiency=.9; w.upgrades.concaveLens.efficiency=.9}, (w) => w.boughtUpgrades.has("lensEffic1"), (w)=>`Increase lens efficiency by 10%`],
		["lensEffic3", 1e6, (w) => {w.upgrades.convexLens.efficiency=1; w.upgrades.concaveLens.efficiency=1}, (w) => w.boughtUpgrades.has("lensEffic4"), (w)=>`Makes lenses perfectly effecient`],
		
		["useMaxRate", 4e4, (w) => {w.upgrades.useMaxRate = true}, (w) => w.boughtUpgrades.has("lensUnlock"), (w)=>`Power generated is now the highest achieved power generation. You can now redesign with peace of mind.`],
		
		["prismUnlock", 1e5, (w) => {w.upgrades.prism.unlocked = true}, (w) => w.boughtUpgrades.has("lensUnlock"), (w)=>`Unlocks prisms`],
		["prismCount1", 2e5, (w) => {w.upgrades.prism.maxCount+=1}, (w) => w.boughtUpgrades.has("prismUnlock"), (w)=>`Increase maximum prisms by 1`],
		["prismCount2", 1e6, (w) => {w.upgrades.prism.maxCount+=3}, (w) => w.boughtUpgrades.has("prismCount1"), (w)=>`Increase maximum prisms by 3`],
		["prismEffic1", 1e5, (w) => {w.upgrades.prism.efficiency=.8}, (w) => w.boughtUpgrades.has("prismUnlock"), (w)=>`Increase prism efficiency by 10%`],
		["prismEffic2", 1e6, (w) => {w.upgrades.prism.efficiency=.9}, (w) => w.boughtUpgrades.has("prismEffic1"), (w)=>`Increase prism efficiency by 10%`],
		["prismEffic3", 1e7, (w) => {w.upgrades.prism.efficiency=11}, (w) => w.boughtUpgrades.has("prismEffic4"), (w)=>`Makes prisms perfectly effecient`],
		
		["normalizerUnlock", 1e5, (w) => {w.upgrades.normalizer.unlocked = true}, (w) => w.boughtUpgrades.has("lensUnlock"), (w)=>`Unlocks normalizers`],
		["normalizerCount1", 1e6, (w) => {w.upgrades.normalizer.maxCount+=1}, (w) => w.boughtUpgrades.has("normalizerUnlock"), (w)=>`Increase maximum normalizers by 1`],
		["normalizerCount2", 1e7, (w) => {w.upgrades.normalizer.maxCount+=1}, (w) => w.boughtUpgrades.has("normalizerCount1"), (w)=>`Increase maximum normalizers by 1`],
		["normalizerCount3", 1e8, (w) => {w.upgrades.normalizer.maxCount+=1}, (w) => w.boughtUpgrades.has("normalizerCount2"), (w)=>`Increase maximum normalizers by 1`],
		["normalizerCount4", 1e9, (w) => {w.upgrades.normalizer.maxCount+=1}, (w) => w.boughtUpgrades.has("normalizerCount3"), (w)=>`Increase maximum normalizers by 1`],
		["normalizerEffic1", 2e5, (w) => {w.upgrades.normalizer.efficiency=.3}, (w) => w.boughtUpgrades.has("normalizerUnlock"), (w)=>`Increase normalizer efficiency by 10%`],
		["normalizerEffic2", 1e6, (w) => {w.upgrades.normalizer.efficiency=.4}, (w) => w.boughtUpgrades.has("normalizerEffic1"), (w)=>`Increase normalizer efficiency by 10%`],
		["normalizerEffic3", 4e6, (w) => {w.upgrades.normalizer.efficiency=.5}, (w) => w.boughtUpgrades.has("normalizerEffic2"), (w)=>`Increase normalizer efficiency by 10%`],
		["normalizerEffic4", 8e6, (w) => {w.upgrades.normalizer.efficiency=.6}, (w) => w.boughtUpgrades.has("normalizerEffic3"), (w)=>`Increase normalizer efficiency by 10%`],
		["normalizerEffic5", 1e9, (w) => {w.upgrades.normalizer.efficiency=.7}, (w) => w.boughtUpgrades.has("normalizerEffic4"), (w)=>`Increase normalizer efficiency by 10%`],
		["normalizerEffic6", 9e9, (w) => {w.upgrades.normalizer.efficiency=.8}, (w) => w.boughtUpgrades.has("normalizerEffic5"), (w)=>`Increase normalizer efficiency by 10%`],
		
		["filterUnlock", 2e5, (w) => {w.upgrades.filter.unlocked = true}, (w) => w.boughtUpgrades.has("lensUnlock"), (w)=>`Unlocks filters`],
		["filterCount1", 5e6, (w) => {w.upgrades.filter.maxCount+=3}, (w) => w.boughtUpgrades.has("filterUnlock"), (w)=>`Increase maximum filters by 3`],
		["filterCount2", 5e9, (w) => {w.upgrades.filter.maxCount+=5}, (w) => w.boughtUpgrades.has("filterCount1"), (w)=>`Increase maximum filters by 5`],
		
		["shifterUnlock", 5e5, (w) => {w.upgrades.shifter.unlocked = true}, (w) => w.boughtUpgrades.has("filterUnlock"), (w)=>`Unlocks shifter`],
		["shifterCount1", 3e6, (w) => {w.upgrades.shifter.maxCount+=1}, (w) => w.boughtUpgrades.has("shifterUnlock"), (w)=>`Increase maximum shifters by 1`],
		["shifterCount2", 8e7, (w) => {w.upgrades.shifter.maxCount+=1}, (w) => w.boughtUpgrades.has("shifterCount1"), (w)=>`Increase maximum shifters by 1`],
		["shifterCount3", 8e8, (w) => {w.upgrades.shifter.maxCount+=1}, (w) => w.boughtUpgrades.has("shifterCount2"), (w)=>`Increase maximum shifters by 1`],
		["shifterCount4", 8e9, (w) => {w.upgrades.shifter.maxCount+=1}, (w) => w.boughtUpgrades.has("shifterCount3"), (w)=>`Increase maximum shifters by 1`],
		["shifterEffic1", 5e5, (w) => {w.upgrades.shifter.efficiency=.7}, (w) => w.boughtUpgrades.has("shifterUnlock"), (w)=>`Increase shifter efficiency by 20%`],
		["shifterEffic2", 3e6, (w) => {w.upgrades.shifter.efficiency=.9}, (w) => w.boughtUpgrades.has("shifterEffic1"), (w)=>`Increase shifter efficiency by 20%`],
		["shifterEffic3", 8e8, (w) => {w.upgrades.shifter.efficiency=1}, (w) => w.boughtUpgrades.has("shifterEffic4"), (w)=>`Makes shifters perfectly effecient`],
		
		["energizerUnlock", 4e6, (w) => {w.upgrades.energizer.unlocked = true}, (w) => w.boughtUpgrades.has("filterUnlock"), (w)=>`Unlocks energizer`],
		["energizerCount1", 9e6, (w) => {w.upgrades.energizer.maxCount+=1}, (w) => w.boughtUpgrades.has("energizerUnlock"), (w)=>`Increase maximum energizers by 1`],
		["energizerCount2", 1e8, (w) => {w.upgrades.energizer.maxCount+=1}, (w) => w.boughtUpgrades.has("energizerCount1"), (w)=>`Increase maximum energizers by 1`],
		["energizerEffic1", 4e6, (w) => {w.upgrades.energizer.efficiency=.7}, (w) => w.boughtUpgrades.has("energizerUnlock"), (w)=>`Increase energizer efficiency by 10%`],
		["energizerEffic2", 9e6, (w) => {w.upgrades.energizer.efficiency=.9}, (w) => w.boughtUpgrades.has("energizerEffic1"), (w)=>`Increase energizer efficiency by 10%`],
		["energizerEffic3", 1e8, (w) => {w.upgrades.energizer.efficiency=1}, (w) => w.boughtUpgrades.has("energizerEffic4"), (w)=>`Makes energizers perfectly effecient`],
		
		["xrayTubeUnlock", 2e8, (w) => {w.upgrades.xrayTube.unlocked = true}, (w) => w.boughtUpgrades.has("filterUnlock"), (w)=>`Unlocks x-ray tubes`],
		["xrayTubeCount1", 2e9, (w) => {w.upgrades.xrayTube.maxCount+=1}, (w) => w.boughtUpgrades.has("xrayTubeUnlock"), (w)=>`Increase maximum x-ray tubes by 1`],
		["xrayTubeCount2", 5e10, (w) => {w.upgrades.xrayTube.maxCount+=1}, (w) => w.boughtUpgrades.has("xrayTubeCount1"), (w)=>`Increase maximum x-ray tubes by 1`],
		["xrayTubeEffic1", 2e8, (w) => {w.upgrades.xrayTube.efficiency=.6}, (w) => w.boughtUpgrades.has("xrayTubeUnlock"), (w)=>`Increase x-ray tube efficiency by 10%`],
		["xrayTubeEffic2", 5e8, (w) => {w.upgrades.xrayTube.efficiency=.7}, (w) => w.boughtUpgrades.has("xrayTubeEffic1"), (w)=>`Increase x-ray tube efficiency by 10%`],
		["xrayTubeEffic3", 2e9, (w) => {w.upgrades.xrayTube.efficiency=.7}, (w) => w.boughtUpgrades.has("xrayTubeEffic2"), (w)=>`Increase x-ray tube efficiency by 10%`],
		["xrayTubeEffic4", 8e9, (w) => {w.upgrades.xrayTube.efficiency=.8}, (w) => w.boughtUpgrades.has("xrayTubeEffic3"), (w)=>`Increase x-ray tube efficiency by 10%`],
		["xrayTubeEffic5", 2e10, (w) => {w.upgrades.xrayTube.efficiency=1}, (w) => w.boughtUpgrades.has("xrayTubeEffic4"), (w)=>`Makes x-ray tubes perfectly effecient`],
		
		["gammaCascaderUnlock", 2e10, (w) => {w.upgrades.gammaCascader.unlocked = true}, (w) => w.boughtUpgrades.has("filterUnlock"), (w)=>`Unlocks gamma ray cascader`],
		["gammaCascaderCount1", 1e11, (w) => {w.upgrades.gammaCascader.maxCount+=1}, (w) => w.boughtUpgrades.has("gammaCascaderUnlock"), (w)=>`Increase maximum gamma ray cascaders by 1`],
		["gammaCascaderCount2", 1e11, (w) => {w.upgrades.gammaCascader.maxCount+=1}, (w) => w.boughtUpgrades.has("gammaCascaderCount1"), (w)=>`Increase maximum gamma ray cascaders by 1`],
		["gammaCascaderEffic1", 1e11, (w) => {w.upgrades.gammaCascader.efficiency=.7}, (w) => w.boughtUpgrades.has("gammaCascaderUnlock"), (w)=>`Increase gamma ray cascader efficiency by 20%`],
		["gammaCascaderEffic2", 5e11, (w) => {w.upgrades.gammaCascader.efficiency=.9}, (w) => w.boughtUpgrades.has("gammaCascaderEffic1"), (w)=>`Increase gamma ray cascader efficiency by 20%`],
		["gammaCascaderEffic3", 1e12, (w) => {w.upgrades.gammaCascader.efficiency=1}, (w) => w.boughtUpgrades.has("gammaCascaderEffic4"), (w)=>`Makes gamma ray cascaders perfectly effecient`],
		
		["theEnd", 1e13, (w) => {w.win=true; w.boughtUpgrades.delete("theEnd")}, (w) => w.boughtUpgrades.has("gammaCascaderUnlock"), (w)=>`???`],
	];
	
	constructor(w) {
		addTo("uiContainer", newDiv("upgradeUi"));
		addTo("upgradeUi", newDiv("upgradeButtons"));
		addTo("upgradeUi", newDiv("upgradeMessages"));
		
		for ( let b of this.upgradeButtons ) {
			const id = "upgradeButton" + b[0];
			addTo("upgradeButtons", newDiv(id, "upgradeButton", "unselected"));
			const upgrade = getDiv(id);
			addTo(id, newDiv(id+"tint", "upgradeIcon"));
			addTo(id+"tint", newDiv(id+"icon", "upgradeIcon"));
			getDiv(id+"icon").style.backgroundImage = `url("resources/${b[0]}.png")`; 
			upgrade.addEventListener("click", function(){
				if (w.power < b[1] || w.boughtUpgrades.has(b[0])) {
					return;
				}
				w.power -= b[1];
				w.boughtUpgrades.add(b[0]);
				b[2](w);
				w.fuckItAllYoloBalancingHack = 1;
			});
			
			upgrade.addEventListener("mouseover", function(){
				getDiv("upgradeMessages").innerHTML = b[4](w) + `\n\nCost: ${b[1].toReadable()}W`;
			});
		}
	}
	
	update(w) {
		if (w.uiDisplay != "upgrade") {
			getDiv("upgradeUi").style.display = "none";
			return;
		}
		getDiv("upgradeUi").style.display = "flex";
		for ( let b of this.upgradeButtons ) {
			const id = "upgradeButton" + b[0];
			const upgrade = getDiv(id)
			if (b[3](w) && !w.boughtUpgrades.has(b[0])) {
				upgrade.style.display = "flex";
				upgrade.style.backgroundImage = 'url("resources/upgradeButton.png")'; 
				if (w.power >= b[1]) {
					getDiv(id+"tint").style.backgroundColor = "rgba(0,180,0,.2)"
				} else {
					getDiv(id+"tint").style.backgroundColor = "rgba(0,180,0,0)"
				}
			} else {
				upgrade.style.display = "none";
			}
			
			if (w.boughtUpgrades.has(b[0])) {
				upgrade.style.display = "flex";
				upgrade.style.order = "99";
				upgrade.classList.add("bought")
				upgrade.classList.remove("unselected")
				getDiv(id+"tint").style.backgroundColor = "rgba(0,180,0,0)"
			}
		}
	}
}

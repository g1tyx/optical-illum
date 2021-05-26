class SelectorWidget {

	id
	constructor(parentId, id, leftCallback, rightCallback, label) {
		this.id = id;
		addTo(parentId, newDiv(id, "selectorWidget"));
		addTo(id, newDiv(id+"Label", "selLabel"));
		getDiv(id+"Label").innerHTML = label;
		addTo(id, newDiv(id+"Left", "selLeft"));
		
		getDiv(id+"Left").addEventListener("click", leftCallback);
		addTo(id, newDiv(id+"Center", "selCenter"));
		addTo(id, newDiv(id+"Right", "selRight"));
		getDiv(id+"Right").addEventListener("click", rightCallback);
	}
	
	update(centerValue) {
		getDiv(this.id + "Center").innerHTML = centerValue;
	}
}
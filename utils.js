String.prototype.format = function(params) {
  const names = Object.keys(params);
  const vals = Object.values(params);
  return new Function(...names, `return \`${this}\`;`)(...vals);
}

Number.prototype.toReadable = function() {
	const prefix = ['', 'k', 'M', 'G', 'T', "Plz stop", "ಠ_ಠ"]
	let prefixCount = 0;
	let num = this;
	if (num > 10_000_000_000_000_000_000) {
		return "¯\\\_(ツ)_/¯"
	}
	while (num > 10_000) {
		num /= 1000;
		prefixCount++;
	}
	num = Math.floor(num);
	return num.toLocaleString()+prefix[prefixCount];
}
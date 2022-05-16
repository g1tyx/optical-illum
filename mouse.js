class MouseDebugger extends BaseObject {
	selectable = false;
	
	drawEntity(ctx) {
		return;
		if (w.mouseLoc != null) {
			ctx.beginPath();
			ctx.rect(w.mouseLoc.x-2, w.mouseLoc.y-2, 4, 4);
			ctx.fillStyle = "#0000FF";
			ctx.fill();
			ctx.closePath();
		}
		if (w.clickLoc != null) {
			ctx.beginPath();
			ctx.rect(w.clickLoc.x-2, w.clickLoc.y-2, 4, 4);
			ctx.fillStyle = "#FF00FF";
			ctx.fill();
			ctx.closePath();
		}
	}
	
	kill(){}
}
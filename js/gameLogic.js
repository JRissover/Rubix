/*
 * @author Jason Rissover
 *
 */

var UPS = 60;

var selectedBlock;
var selectedGroup = false;
var selectedAxis = 0;

var mouseX,mouseY;
var lastMX, lastMY;

lightPos = Math.PI/4.0;



function initGame(){

	time = Date.now();
	updateID = setInterval( update , 1000/UPS );
}

function update(){
	var oldTime = time;
    time = Date.now();
    var dt = time - oldTime;

    directionalLight.position.set(20*Math.sin(lightPos),20,20*Math.cos(lightPos));
    lightPos+= 0.001/dt;
    if(lightPos > 2*Math.PI){
    	lightPos-=2*Math.PI;
    }

	updateCamera(dt);
}

function mouseMove(event) {
	mouseX =  ( event.clientX / window.innerWidth ) * 2 - 1;
	mouseY = -( event.clientY / window.innerHeight) * 2 + 1;
	var mouseDX = lastMX-mouseX;
	var mouseDY = lastMY-mouseY;

	if(drag){
		if(selectedAxis=="y"){
			selectedGroup.rotation.y -= mouseDX*cameraOffSet/5.0;

		}
		else if(selectedAxis=="x"){
			if(camera.position.z>0){
				selectedGroup.rotation.x += mouseDY*cameraOffSet/5.0;
			}
			else{
				selectedGroup.rotation.x -= mouseDY*cameraOffSet/5.0;
			}
		}
		else if(selectedAxis=="z"){
			if(camera.position.x>0){
				selectedGroup.rotation.z -= mouseDY*cameraOffSet/5.0;
			}
			else{
				selectedGroup.rotation.z += mouseDY*cameraOffSet/5.0;
			}

		}
		else if(selectedBlock){
			if(Math.abs(mouseDX) >  Math.abs(mouseDY)){
				selectedGroup = new THREE.Object3D();
				for(var i=0; i<blocks.length; i++){
					if(blocks[i].position.y > selectedBlock.position.y-0.5 && blocks[i].position.y < selectedBlock.position.y+0.5){
						selectedGroup.add(blocks[i]);
					}
				}
				scene.add(selectedGroup);
				selectedAxis ="y";
			}
			else{
				selectedGroup = new THREE.Object3D();

				if(Math.abs(camera.position.x) > Math.abs(camera.position.z)){
					for(var i=0; i<blocks.length; i++){
						if(blocks[i].position.z > selectedBlock.position.z-0.5 && blocks[i].position.z < selectedBlock.position.z+0.5){
							selectedGroup.add(blocks[i]);
						}
					}
					scene.add(selectedGroup);
					selectedAxis ="z";
				}
				else{
					for(var i=0; i<blocks.length; i++){
						if(blocks[i].position.x > selectedBlock.position.x-0.5 && blocks[i].position.x < selectedBlock.position.x+0.5){
							selectedGroup.add(blocks[i]);
						}
					}
					scene.add(selectedGroup);
					selectedAxis ="x";
				}
			}
		}
	}

	lastMX = mouseX;
	lastMY = mouseY;
	
}
function mouseDown(event) {

	drag = true;

	mouseX =  ( event.clientX / window.innerWidth ) * 2 - 1;
	mouseY = -( event.clientY / window.innerHeight) * 2 + 1;
	
	
	var vector = new THREE.Vector3(mouseX, mouseY, 1);
	projector.unprojectVector( vector, camera );

	var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() , 0,500 );

	var intersects = raycaster.intersectObjects(blocks,false);
	if ( intersects.length > 0 ) {
		selectedBlock = intersects[0].object;
	}
	lastMX = mouseX;
	lastMY = mouseY;
}
function mouseUp(event) {
	drag = false;
	if(selectedGroup){
		if(selectedAxis=="y"){
			if(selectedGroup.rotation.y > 3*Math.PI/4.0 ){
				selectedGroup.rotation.y = Math.PI;
			}
			else if(selectedGroup.rotation.y < -3*Math.PI/4.0){
				selectedGroup.rotation.y = -Math.PI;
			}
			else if(selectedGroup.rotation.y > Math.PI/4.0 ){
				selectedGroup.rotation.y = 1.57;
			}
			else if(selectedGroup.rotation.y < -Math.PI/4.0){
				selectedGroup.rotation.y = -1.57;
			}
			else{
				selectedGroup.rotation.y = 0;
			}
		}
		else if(selectedAxis=="x"){
			if(selectedGroup.rotation.x > 3*Math.PI/4.0 ){
				selectedGroup.rotation.x = Math.PI;
			}
			else if(selectedGroup.rotation.x < -3*Math.PI/4.0){
				selectedGroup.rotation.x = -Math.PI;
			}
			else if(selectedGroup.rotation.x > Math.PI/4.0 ){
				selectedGroup.rotation.x = 1.57;
			}
			else if(selectedGroup.rotation.x < -Math.PI/4.0){
				selectedGroup.rotation.x = -1.57;
			}
			else{
				selectedGroup.rotation.x = 0;
			}
		}
		else if(selectedAxis=="z"){
			if(selectedGroup.rotation.z > 3*Math.PI/4.0 ){
				selectedGroup.rotation.z = Math.PI;
			}
			else if(selectedGroup.rotation.z < -3*Math.PI/4.0){
				selectedGroup.rotation.z = -Math.PI;
			}
			else if(selectedGroup.rotation.z > Math.PI/4.0 ){
				selectedGroup.rotation.z = 1.57;
			}
			else if(selectedGroup.rotation.z < -Math.PI/4.0){
				selectedGroup.rotation.z = -1.57;
			}
			else{
				selectedGroup.rotation.z = 0;
			}
		}
		
		selectedGroup.updateMatrixWorld();
		for(var i =0; i < selectedGroup.children.length;i++){
			THREE.SceneUtils.detach( selectedGroup.children[0], selectedGroup, scene );
			i--;
		}
	}
	selectedGroup = false;
	selectedAxis =false;

}
function mouseWheelHandler(e) {
	var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
	if(delta> 0) {
		cameraOffSet -= .5;
	}
	else{
		cameraOffSet += .5;
	}
}

function randomize(){
	var steps=Math.random()*40;
	for(var i =0; i < steps; i ++){
		rotate(Math.floor((Math.random()*3)),Math.floor((Math.random()*3))-1,Math.floor((Math.random()*5))-2);
	}
}
function rotate(axis,row,amount){

	var group = new THREE.Object3D();

	if(axis=="x" || axis==0){
		for(var i=0; i<blocks.length; i++){
			if(blocks[i].position.x > row-0.5 && blocks[i].position.x < row+0.5){
				group.add(blocks[i]);
			}
		}
		group.rotation.x += amount*Math.PI/2.0;
	}
	else if(axis=="y" ||axis==1){
		for(var i=0; i<blocks.length; i++){
			if(blocks[i].position.y > row-0.5 && blocks[i].position.y < row+0.5){
				group.add(blocks[i]);
			}
		}
		group.rotation.y += amount*Math.PI/2.0;
	}
	else if(axis=="z" ||axis==2){
		for(var i=0; i<blocks.length; i++){
			if(blocks[i].position.z > row-0.5 && blocks[i].position.z < row+0.5){
				group.add(blocks[i]);
			}
		}
		group.rotation.z += amount*Math.PI/2.0;
	}

	

	group.updateMatrixWorld();
	for(var i =0; i < group.children.length;i++){
		THREE.SceneUtils.detach( group.children[0], group, scene );
		i--;
	}
}



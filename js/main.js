if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var container;

var camera, scene, renderer, projector;
var directionalLight;

//controls
var left = false;
var right = false;
var up = false;
var down = false;

//camera stuff
var cameraOffSet = 6;
var xV = 0;
var yV = 0;
var xPos = 0.785;
var yPos =3;


init();
animate();

function init() {

	container = document.createElement( 'div' );
	//container.style.cursor = "none";
	document.body.appendChild( container );
	
	camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 100);
	camera.up = new THREE.Vector3(0,1,0);
	camera.lookAt(new THREE.Vector3(0,0,0));
	scene = new THREE.Scene();
	
	
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor( 0xFFFFFF, 1 );
	renderer.shadowMapEnabled = true;

	container.appendChild( renderer.domElement );
	window.addEventListener( 'resize', onWindowResize, false );

	container.addEventListener("mousewheel", mouseWheelHandler , false);
	// Firefox version
	container.addEventListener("DOMMouseScroll", mouseWheelHandler, false);

	//document.onmousedown = mouseDown;
	//document.onmouseup = mouseUp;
	//document.onmousemove = mouseMove;

	var ambientLight = new THREE.AmbientLight(0x222222);
	scene.add(ambientLight);

	// directional lighting
	directionalLight = new THREE.DirectionalLight(0xffffff);
	directionalLight.position.set(10,20,10);
	scene.add(directionalLight);
	directionalLight.castShadow = true;
	directionalLight.shadowDarkness = 0.5;
	//directionalLight.shadowCameraVisible = true;
	directionalLight.shadowCameraNear    =  5;
	directionalLight.shadowCameraFar    =  50;
	directionalLight.shadowCameraRight    =  8;
	directionalLight.shadowCameraLeft     = -8;
	directionalLight.shadowCameraTop      =  8;
	directionalLight.shadowCameraBottom   = -8;
	directionalLight.shadowMapWidth = 2048;
	directionalLight.shadowMapHeight = 2048;
	console.log(directionalLight);


	var floor = new THREE.Mesh( 
		new THREE.PlaneGeometry( 20 , 20 ), 
		new THREE.MeshPhongMaterial( {color: 0xffffff} ) );
	scene.add( floor );
	floor.position.set(0,-2,0);
	floor.rotation.set(-1.57,0,0);
	floor.receiveShadow = true;

	projector = new THREE.Projector();


	initCube();
	initGame();
}

var drag = false;



function onWindowResize( event ) {

	//uniforms.resolution.value.x = window.innerWidth;
	//uniforms.resolution.value.y = window.innerHeight;

	renderer.setSize( window.innerWidth, window.innerHeight );

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

}

function animate() {
	
	//updateShip();
	
	requestAnimationFrame( animate );
	render();
}
function render() {
	renderer.render(scene, camera);
}
function updateCamera(dt){
	if(left){
		xV+=0.005;
	}
	if(right){
		xV-=0.005;
	}
	if(up){
		yV+=0.01;
	}
	if(down){
		yV-=0.01;
	}

	xPos += xV;
	yPos += yV;

	if(yPos > 5){
		yPos = 5;
	}
	if(yPos < -5){
		yPos = -5;
	}

	var xFinal = cameraOffSet*Math.cos(xPos);
	var zFinal = cameraOffSet*Math.sin(xPos);

	camera.position.set( xFinal, yPos, zFinal );
	camera.lookAt(new THREE.Vector3(0,0,0));
   
	xV*=0.9;
	yV*=0.9;
}
$(document).mousedown(function(evt){
	mouseDown(evt);
});
$(document).mousemove(function(evt){
	mouseMove(evt);
});
$(document).mouseup(function(evt){
	mouseUp(evt);
});

$(document).keyup(function(evt) {
	
	switch (evt.keyCode) 
	{ 
		case 82://r
			randomize();
			break;
		case 87://w
			up = false;
			break;
		case 65://a
			left = false;
			break;
		case 83://s
			down = false;
			break;
		case 68://d
			right = false;
			break;
		case 32://space
			console.log(cameraOffSet);

			break;
		default:
			console.log(evt.keyCode);
			break;
	}
});
$(document).keydown(function(evt) {
	
	switch (evt.keyCode) 
	{ 
		case 87://w
			up = true;
			break;
		case 65://a
			left = true;
			break;
		case 83://s
			down = true;
			break;
		case 68://d
			right = true;
			break;
		
		default:
			//console.log(evt.keyCode);
			break;
	}
});

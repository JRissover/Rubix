
var cube;
var blocks=[];
var stickers=[];

function initCube(){


	var geometry;
	var material;
	var temp;

	cube=[];
	for(var i =0; i < 3; i++){
		cube[i]=[];
		for(var j =0; j < 3; j++){
			cube[i][j]=[];
			for(var k =0; k < 3; k++){
				if(i==1 && k==1 && j==1){
					//the middle
				}
				else{
					geometry = new THREE.CubeGeometry( 0.99,0.99,0.99  );
					material = new THREE.MeshPhongMaterial( {
						specular: '#ffffff',
				        color: '#000000',
				        emissive: '#000000',
				        shininess: 100 
					} );
					var temp = new THREE.Mesh( geometry, material );
					scene.add( temp );
					blocks.push(temp);
					cube[i][j][k]= temp;
					temp.position.set(-1+i,-1+j,-1+k);
					temp.castShadow = true;
				}
			}
		}
	}

	for(var i =0; i < 3; i++){
		for(var j =0; j < 3; j++){
			geometry = new THREE.PlaneGeometry( 0.95,0.95  );
			material = new THREE.MeshPhongMaterial( {
				specular: '#ffffff',
		        color: '#aa0000',
		        emissive: '#440000',
		        shininess: 100 ,
		        side: THREE.DoubleSide
			} );
			var temp = new THREE.Mesh( geometry, material );
			temp.position.set(0,0,0.5);
			cube[i][j][2].add(temp);
		}
	}
	for(var i =0; i < 3; i++){
		for(var j =0; j < 3; j++){
			geometry = new THREE.PlaneGeometry( 0.95,0.95  );
			material = new THREE.MeshPhongMaterial( {
				specular: '#ffffff',
		        color: '#00aa00',
		        emissive: '#004400',
		        shininess: 100 ,
		        side: THREE.DoubleSide
			} );
			var temp = new THREE.Mesh( geometry, material );
			temp.position.set(0,0,-.5);
			cube[i][j][0].add(temp);
		}
	}
	for(var i =0; i < 3; i++){
		for(var j =0; j < 3; j++){
			geometry = new THREE.PlaneGeometry( 0.95,0.95  );
			material = new THREE.MeshPhongMaterial( {
				specular: '#ffffff',
		        color: '#0000aa',
		        emissive: '#000044',
		        shininess: 100 ,
		        side: THREE.DoubleSide
			} );
			var temp = new THREE.Mesh( geometry, material );
			temp.rotation.set(0,1.57,0);
			temp.position.set(.5,0,0);
			cube[2][j][i].add(temp);
		}
	}
	for(var i =0; i < 3; i++){
		for(var j =0; j < 3; j++){
			geometry = new THREE.PlaneGeometry( 0.95,0.95 );
			material = new THREE.MeshPhongMaterial( {
				specular: '#ffffff',
		        color: '#aaaa00',
		        emissive: '#444400',
		        shininess: 100 ,
		        side: THREE.DoubleSide
			} );
			var temp = new THREE.Mesh( geometry, material );
			temp.rotation.set(0,1.57,0);
			temp.position.set(-.5,0,0);
			cube[0][j][i].add(temp);
		}
	}
	for(var i =0; i < 3; i++){
		for(var j =0; j < 3; j++){
			geometry = new THREE.PlaneGeometry( 0.95,0.95 );
			material = new THREE.MeshPhongMaterial( {
				specular: '#ffffff',
		        color: '#aaaaaa',
		        emissive: '#444444',
		        shininess: 100 ,
		        side: THREE.DoubleSide
			} );
			var temp = new THREE.Mesh( geometry, material );
			temp.rotation.set(1.57,0,0);
			temp.position.set(0,.5,0);
			cube[i][2][j].add(temp);
		}
	}
	for(var i =0; i < 3; i++){
		for(var j =0; j < 3; j++){
			geometry = new THREE.PlaneGeometry( 0.95,0.95 );
			material = new THREE.MeshPhongMaterial( {
				specular: '#ffffff',
		        color: '#aa5500',
		        emissive: '#442200',
		        shininess: 100 ,
		        side: THREE.DoubleSide
			} );
			var temp = new THREE.Mesh( geometry, material );
			temp.rotation.set(1.57,0,0);
			temp.position.set(0,-.5,0);
			cube[i][0][j].add(temp);
		}
	}

}
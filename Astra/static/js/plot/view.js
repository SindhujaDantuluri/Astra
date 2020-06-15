var camera, scene, renderer;
var dot;
var inc;
var started = false;
var img = new THREE.TextureLoader().load("\\static\\ps_smoke.png");

// Register server event
var sse = new EventSource('/stream')
sse.onmessage = function(e) {
	if(started) {
		data = JSON.parse(e.data);
		
		scene.remove.apply(scene, scene.children);
		var dotGeometry = new THREE.Geometry();
		data.forEach(function(d) {		
			dotGeometry.vertices.push(new THREE.Vector3(d[0], d[1], d[2]));
			dotGeometry.colors.push(new THREE.Color(d[3], d[4], d[5]));
		});

		var dotMaterial = new THREE.PointsMaterial({
				vertexColors: true,
				size: 1,
				sizeAttenuation: false,
				map: img,
				transparent: false
		});
		
		dot = new THREE.Points(dotGeometry, dotMaterial);
		dot.sizeAttenuation = false;
		scene.add(dot);
	}
}

init();
animate();

function circle(pos, angle) {
	let cpos = camera.position;
	let radius = cpos.distanceTo(pos);
	let npos = cpos;

	/*
	let phi = Math.atan2(cpos.y, cpos.x) + angle.x;
	let theta = Math.acos(cpos.z / radius) + angle.x;

	let sint = Math.sin(theta);
	let cost = Math.cos(theta);
	let sinp = Math.sin(phi);
	let cosp = Math.cos(phi);

	let npos = new THREE.Vector3(radius * sint * cost, radius * sint * sinp, radius * cosp);
	console.log(cpos.z,sint,cost,sinp,cosp,npos.length());
	*/
	/*
	// z-axis
	let npos = new THREE.Vector3(radius * Math.cos(angle.z), radius * Math.sin(angle.z), cpos.z);
	// x-axis
	npos.y += radius * Math.cos(angle.x);
	npos.z += radius * Math.sin(angle.x);

	console.log(npos, radius)*/

	return npos;
}

function init() {
	var pc = document.getElementById("pointcloud");
	while(pc == null)
		pc = document.getElementById("pointcloud");

	scene = new THREE.Scene();

	// Main
	/*
	for(let i = 0; i < 100; i++) {
		var dotGeometry = new THREE.Geometry();
		dotGeometry.vertices.push(new THREE.Vector3((Math.random() * 200) - 100, (Math.random() * 200) - 100, (Math.random() * -200)));

		var dotMaterial = new THREE.PointsMaterial({color: 'rgb('+Math.floor(Math.random() * 255)+","+Math.floor(Math.random() * 255)+","+Math.floor(Math.random() * 255)+')',size: 5, sizeAttenuation: false});
		dot = new THREE.Points(dotGeometry, dotMaterial);
		scene.add(dot);
	}
	*/

	renderer = new THREE.WebGLRenderer({ canvas: pc, antialias: true });
	var rsize = renderer.getSize();
	camera = new THREE.PerspectiveCamera(70, rsize.x / rsize.y, 0.01, 2000);

	controls = new THREE.OrbitControls(camera, renderer.domElement);

	inc = 0;
	started = true;

	camera.position.set(0,0,20);
}

function animate() {
	requestAnimationFrame(animate);

	// Live Part
	/*
	inc += Math.PI / 1000;
	if(inc > (Math.PI * 2))
		inc = 0;
	pos = circle(new THREE.Vector3(0, 0, 0), new THREE.Vector3(inc, 0, 0));

	camera.position.set(pos.x, pos.y, pos.z);
	camera.lookAt(new THREE.Vector3(0,0,0));*/
	controls.update()
	renderer.render(scene, camera);
}
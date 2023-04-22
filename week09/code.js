﻿import * as THREE from'../three/three.module.js';
					
// Our Javascript will go here.

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const pyramidgeometry = new THREE.CylinderGeometry( 0, 0.8, 2, 4 );
const pyramidmaterial = new THREE.MeshLambertMaterial({color: 0xf3fff2});
const pyramidmesh=new THREE.Mesh(pyramidgeometry, pyramidmaterial);
pyramidmesh.position.set(0, 2, -10);
scene.add(pyramidmesh);

const boxgeometry=new THREE.BoxGeometry(1, 1, 1);
const boxmaterial=new THREE.MeshNormalMaterial({color: 0xFF0000, transparent: true, opacity: 1});
const boxmesh=new THREE.Mesh(boxgeometry, boxmaterial);
boxmesh.position.set(-0.9, 0, -6);
scene.add(boxmesh);

var lightOne=new THREE.AmbientLight(0xffffff, 0.5);
scene.add(lightOne);

var lightTwo=new THREE.PointLight(0xffffff, 0.5);
scene.add(lightTwo);

lightTwo.position.set(25, 0, -25)

//напівсферичне освітлення
var lightThree = new THREE.HemisphereLight(0xfffff, 0x080820, 1);
scene.add(lightThree);

const texture = new THREE.TextureLoader().load('/assets/plants.jpg');

var planegeometry=new THREE.PlaneGeometry(10, 10);
var planematerial=new THREE.MeshBasicMaterial({color:0x00ff00, map:texture});
var planemesh=new THREE.Mesh(planegeometry, planematerial);
planemesh.position.set(70, -20, -40);
planemesh.scale.set(10, 10, 10);
scene.add(planemesh);

const spheregeometry=new THREE.SphereGeometry(0.5);
const spherematerial=new THREE.LineBasicMaterial({color: 0x888888});
const spheremesh=new THREE.Line(spheregeometry, spherematerial);
spheremesh.position.set(0.9, 0, -6);
scene.add(spheremesh);

const circlegeometry=new THREE.CircleBufferGeometry(0.5);
const circlematerial=new THREE.MeshStandardMaterial({color: 0x098877,roughness: 90.0,metalness: 0.2});
const circlemesh=new THREE.Mesh(circlegeometry, circlematerial);
circlemesh.position.set(2, 0, -6);
circlemesh.rotation.set(0, 0.5, 0);
scene.add(circlemesh);

camera.position.z = 7;
camera.position.x = 2;

var delta=0;
renderer.setClearColor (0x555555);
renderer.clear();

let angle = 0, radius = 7;

function animate() {
		requestAnimationFrame( animate );
		renderer.render( scene, camera );
		lightTwo.position.x = radius * Math.cos(angle) + 5;
		lightTwo.position.y = radius * Math.sin(angle);
		
		boxmesh.rotation.x += 0.01;
		boxmesh.rotation.y += 0.01;
		camera.position.x = radius * Math.cos(angle) + 2;
		camera.position.y = radius * Math.sin(angle);
		angle += Math.PI/180;

		delta+=0.1;
		planegeometry.vertices[0].z=-25+Math.sin(delta)*50;
		planegeometry.verticesNeedUpdate=true;
}
animate();

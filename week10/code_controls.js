﻿﻿//import * as THREE from '../three/three.module.js';
import * as THREE from 'three';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FlyControls } from 'three/addons/controls/FlyControls.js';
import { MapControls } from 'three/addons/controls/MapControls.js';

var renderer, cube, lightTwo, scene, camera, controls;

function init()
{
		// Our Javascript will go here.
		
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		
		renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );

		window.addEventListener('resize', function() {
			 renderer.setSize( window.innerWidth, window.innerHeight );
			 camera.aspect = window.innerWidth / window.innerHeight;
			 camera.updateProjectionMatrix();
		 });

		if (document.getElementById( 'OrbitControls' ).checked)
			{
				controls = new OrbitControls( camera, renderer.domElement );
				controls.autoRotate = true;
				controls.autoRotateSpeed = 5;
			}
		
		if (document.getElementById( 'FlyControls' ).checked)
			{
				controls = new FlyControls( camera, renderer.domElement );
				controls.autoForward = true;
				//сontrols.movementSpeed = -0.5;
				сontrols.rollSpeed = -0.05;
			}

		if (document.getElementById( 'MapControls' ).checked)
			{
				controls = new MapControls( camera, renderer.domElement );
				controls.enableDamping = true;		
			}

		var loader = new THREE.TextureLoader();
		
		const boxgeometry = new THREE.BoxGeometry( 1, 1, 1 );
		
		const boxmaterials = [
						new THREE.MeshBasicMaterial( { map: loader.load(  '../assets/cube1.png' ) } ),
						new THREE.MeshBasicMaterial( { map: loader.load(  '../assets/cube2.png' ) } ),
						new THREE.MeshBasicMaterial( { map: loader.load(  '../assets/cube3.png' ) } ),
						new THREE.MeshBasicMaterial( { map: loader.load(  '../assets/cube4.png' ) } ),
						new THREE.MeshBasicMaterial( { map: loader.load(  '../assets/cube5.png' ) } ),
						new THREE.MeshBasicMaterial( { map: loader.load(  '../assets/cube6.png' ) } ),
						
		];
		/*		
		const boxmaterials = [
						new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff } ),
						new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff } ),
						new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff } ),
						new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff } ),
						new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff } ),
						new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff } )
		];
		*/
		
		cube = new THREE.Mesh( boxgeometry, boxmaterials );
		scene.add( cube );
		
		const cylgeometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
		const cylmaterial = new THREE.MeshLambertMaterial( {color: 0xffff00} );
		const cylinder = new THREE.Mesh( cylgeometry, cylmaterial );
		scene.add( cylinder );
		cylinder.position.z=-25;
		cylinder.position.x=5;
		
		var lightOne=new THREE.AmbientLight(0xffffff, 0.5);
		scene.add(lightOne);
		
		lightTwo=new THREE.PointLight(0xffffff, 0.5);
		scene.add(lightTwo);
		
		lightTwo.position.set(25, 0, -25)
		
		//напівсферичне освітлення
		var lightThree = new THREE.HemisphereLight(0xfffff, 0x080820, 1);
		scene.add(lightThree);
		
		//const texture = loader.load(  '../assets/birds.mp4'  );
		const video = document.getElementById( 'video' );
		video.play();
		const texture = new THREE.VideoTexture( video );
		

		var planegeometry=new THREE.PlaneGeometry(16, 9);
		var planematerial=new THREE.MeshBasicMaterial({color:0xffffff, map: texture});
		var planemesh=new THREE.Mesh(planegeometry, planematerial);
		planemesh.position.set(70, -20, -100);
		planemesh.scale.set(10, 10, 10);
		scene.add(planemesh);
		
		const video2 = document.getElementById( 'video2' );
		video2.play();
		const texture2 = new THREE.VideoTexture( video2 );
		//const beach = loader.load(  '../assets/videoplayback.mp4'  );
		//cylmaterial.map = beach;
		//cylmaterial.map = texture2;
		
		cube.scale.set(3,3,3);
		cube.position.x = cube.position.x - 1;
		
		camera.position.z = 7;
		camera.position.x = 2;
		
		if (document.getElementById( 'OrbitControls' ).checked)
			controls.update();
		
		renderer.setClearColor (0x555555);
		renderer.clear();

		const modelloader = new GLTFLoader();
		
		modelloader.load( '../assets/birch_tree_-_low_poly.glb', function ( gltf ) {
					scene.add(gltf.scene);
					gltf.scene.position.set(-5,2,0);
					gltf.scene.scale.set(2,2,2);
		}, function ( xhr ) {
				console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		}, function ( error ) {
				console.error(error);
		} );

		modelloader.load( '/assets/tree/scene.gltf', function ( gltf ) {
					scene.add(gltf.scene);
					gltf.scene.position.set(-5,-2,0);
					gltf.scene.scale.set(0.01,0.01,0.01);
		}, function ( xhr ) {
				console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		}, function ( error ) {
				console.error(error);
		} );

}

let angle = 0, radius = 47;

const timer = new THREE.Clock();

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	lightTwo.position.x = radius * Math.cos(angle) + 5;
	lightTwo.position.y = radius * Math.sin(angle);
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
/*	
	camera.position.x = radius * Math.cos(angle) + 2;
	camera.position.y = radius * Math.sin(angle);
*/
	if (document.getElementById( 'OrbitControls' ).checked || document.getElementById( 'MapControls' ).checked)
			controls.update();
	if (document.getElementById( 'FlyControls' ).checked)
			controls.update(timer.getDelta());
	angle += Math.PI/180;
}


			
const startButton = document.getElementById( 'press' );

startButton.addEventListener( 'click', function () {
		//startButton.style.display="none";
		document.querySelector("fieldset").style.display="none";
		init();
		animate();
} );

//init();
//animate();
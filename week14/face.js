import * as THREE from 'three';
import { MindARThree } from 'mindar-face-three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

window.addEventListener("DOMContentLoaded", async() => {

      const mindarThree = new MindARThree({
            container: document.body,
      });

      const {renderer, scene, camera} = mindarThree;

      const anchor = mindarThree.addAnchor(1);

      const geometry = new THREE.SphereGeometry( 0.1, 32, 16 );
      const material = new THREE.MeshBasicMaterial( {color: 0x00ffff, transparent: true, opacity: 0.5} );
      const sphere = new THREE.Mesh( geometry, material );

      anchor.group.add(sphere);

      const anchor2 = mindarThree.addAnchor(10);

      var lightOne=new THREE.AmbientLight(0xffffff, 1);
            scene.add(lightOne);

            const light = new THREE.HemisphereLight( 0xffffbb, 0xcccccc, 1 );
            scene.add( light );

            // Instantiate a loader
            const loader = new GLTFLoader();

            // Load a glTF resource
            loader.load(
                  // resource URL
                  '../assets/train.glb',
                  // called when the resource is loaded
                  function ( gltf ) {
                        //gltf.scene.scale.set(0.1,0.1,0.1);
                       // gltf.scene.position.z=-6;
                        gltf.scene.rotation.y=+Math.PI/4;
                        //scene.add( );
                        anchor.group.add(gltf.scene);
                        //console.log(gltf);
                  },
                  // called while loading is progressing
                  function ( xhr ) {
                        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
                  },
                  // called when loading has errors
                  function ( error ) {
                        console.log( 'An error happened' );
                  }
            );
          
      //anchor.group.add(sphere);

      await mindarThree.start();

      renderer.setAnimationLoop(() => {
              renderer.render(scene, camera);
      });
});     
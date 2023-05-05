import * as THREE from 'three';
import { MindARThree } from 'mindar-face-three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

window.addEventListener("DOMContentLoaded", async() => {

      const mindarThree = new MindARThree({
            container: document.body,
      });


      const {renderer, scene, camera} = mindarThree;

      

      await mindarThree.start();

      const video = document.querySelector("video");
      console.log(video);
      video.style.visibility = "hidden";

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
                  '../assets/hard_hat.glb',
                  // called when the resource is loaded
                  function ( gltf ) {
                        gltf.scene.scale.set(0.025,0.025,0.025);
                        gltf.scene.position.y=-0.1;
                        gltf.scene.position.z=-0.2;
                        //gltf.scene.position.x=-1.5;
                        gltf.scene.rotation.x=Math.PI/10;
                        //scene.add( );
                        anchor2.group.add(gltf.scene);

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
          
      const texture = new THREE.TextureLoader().load('../assets/my_face.png');

      const faceMesh = mindarThree.addFaceMesh();
      faceMesh.material.map = texture;
      faceMesh.material.transparent = true;
      faceMesh.material.needsUpdate = true;
      //faceMesh.material.wireframe = true;
      scene.add(faceMesh);
      
      renderer.setAnimationLoop(() => {
              renderer.render(scene, camera);
      });
});     
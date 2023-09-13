import * as THREE from "three";
import { OrbitControl } from "three/examples/jsm/controls/OrbitControls";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import Canvas from "./Canvas";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import whale from '@/assets/Whale.glb'

import html2canvas from "html2canvas";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  preserveDrawingBuffer: true,
});

const captureContainer = document.getElementById("three-capture");
renderer.setSize(captureContainer.clientWidth, captureContainer.clientHeight);

captureContainer.appendChild(renderer.domElement);

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

camera.position.z = 5;

const loader = new GLTFLoader();

loader.load( whale, function ( gltf ) {
  scene.add( gltf.scene );
}, undefined, function ( error ) {
  console.error( error );
} );

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

function animate() {
  requestAnimationFrame(animate);

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();

const button2 = document.querySelector("#three-capture-button");
button2.onclick = () => {
  // // 3d 오브젝트만 캡처
  // var dataURL = renderer.domElement.toDataURL();
  // var link = document.createElement("a");
  // link.download = "demo.png";
  // link.href = dataURL;
  // link.target = "_blank";
  // link.click();

  // 글자까지 캡처
  html2canvas(document.querySelector("#three-capture")).then((canvas) => {
    console.log(canvas);
    let el = document.getElementById("three-target");
    el.href = canvas.toDataURL("image/jpeg");
    el.download = "cube.jpg";
    el.click();
  });
};

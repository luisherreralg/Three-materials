import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import { CubeTextureLoader } from "three";

/**
 * * DEBUG
 */
const gui = new dat.GUI();

/**
 * * Textures
 */
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const albedoTexture = textureLoader.load("/textures/door/color.jpg");
const aoTexture = textureLoader.load("/textures/door/ambientOcclusion.jpg");
const heightTexture = textureLoader.load("/textures/door/height.jpg");
const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const normalTexture = textureLoader.load("/textures/door/normal.jpg");
const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

const matcapTexture = textureLoader.load("/textures/matcaps/8.png");
const gradientTexture = textureLoader.load("/textures/gradients/5.jpg");

const environmentMapTexture = cubeTextureLoader.load([
  "/textures/environmentMaps/0/px.jpg", // positive x
  "/textures/environmentMaps/0/nx.jpg", // negative x
  "/textures/environmentMaps/0/py.jpg", // positive y
  "/textures/environmentMaps/0/ny.jpg", // negative y
  "/textures/environmentMaps/0/pz.jpg", // positive z
  "/textures/environmentMaps/0/nz.jpg", // negative z
]);

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * * Object
 */
// const material = new THREE.MeshBasicMaterial();
// material.map = albedoTexture;
// material.color.set("green");
// material.opacity = 0.5;
// material.transparent = true;
// material.alphaMap = alphaTexture;
// material.side = THREE.DoubleSide;

const material5 = new THREE.MeshNormalMaterial();

const material3 = new THREE.MeshMatcapMaterial();
material3.matcap = matcapTexture;

// const material = new THREE.MeshDepthMaterial();

// const material = new THREE.MeshLambertMaterial();

// const material = new THREE.MeshPhongMaterial();
// material.shininess = 1000;
// material.specular = new THREE.Color("red");

// // Esto habría que ponerlo en la parte de texturas
// // Pero lo pongo por aquí para que se vea lo que hay que poner
gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false;
const material4 = new THREE.MeshToonMaterial();
material4.gradientMap = gradientTexture;

const material2 = new THREE.MeshStandardMaterial();
material2.map = albedoTexture;
material2.aoMap = aoTexture;
material2.aoMapIntensity = 1;
material2.displacementMap = heightTexture;
material2.displacementScale = 0.05;
// Hay que dejar estas propiedades por defecto
material2.metalness = 0;
material2.roughness = 1;

material2.metalnessMap = metalnessTexture;
material2.roughnessMap = roughnessTexture;
material2.normalMap = normalTexture;
// Se puede parametrizar las normales
material2.normalScale.set(0.5, 0.5);
material2.transparent = true;
material2.alphaMap = alphaTexture;

const material = new THREE.MeshStandardMaterial();
material.metalness = 1;
material.roughness = 0;
material.envMap = environmentMapTexture;

const grupo1Folder = gui.addFolder("Grupo1");
grupo1Folder.add(material, "metalness").min(0).max(1).step(0.0001);
grupo1Folder.add(material, "roughness").min(0).max(1).step(0.0001);
grupo1Folder.add(material, "aoMapIntensity").min(0).max(10).step(0.0001);
grupo1Folder.add(material, "displacementScale").min(0).max(1).step(0.0001);

const grupo2Folder = gui.addFolder("Grupo2");
grupo2Folder.add(material2, "metalness").min(0).max(1).step(0.0001);
grupo2Folder.add(material2, "metalness").min(0).max(1).step(0.0001);
grupo2Folder.add(material2, "roughness").min(0).max(1).step(0.0001);
grupo2Folder.add(material2, "aoMapIntensity").min(0).max(10).step(0.0001);
grupo2Folder.add(material2, "displacementScale").min(0).max(1).step(0.0001);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);
sphere.position.x = -1.5;
sphere.position.y = 1.2;
sphere.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
);

const sphere2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 64, 64),
  material2
);
sphere2.position.x = -1.5;
sphere2.position.y = -1.2;
sphere2.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(sphere2.geometry.attributes.uv.array, 2)
);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);
plane.position.y = 1.2;
plane.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
);
const plane2 = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1, 100, 100),
  material2
);
plane2.position.y = -1.2;
plane2.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(plane2.geometry.attributes.uv.array, 2)
);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  material
);
torus.position.x = +1.5;
torus.position.y = 1.2;
torus.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
);

const torus2 = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  material2
);
torus2.position.x = +1.5;
torus2.position.y = -1.2;
torus2.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(torus2.geometry.attributes.uv.array, 2)
);

const sphere3 = new THREE.Mesh(new THREE.SphereGeometry(0.5), material3);

const sphere4 = new THREE.Mesh(new THREE.SphereGeometry(0.5), material4);
sphere4.position.x = 1.5;

const sphere5 = new THREE.Mesh(new THREE.SphereGeometry(0.5), material5);
sphere5.position.x = -1.5;

scene.add(
  sphere,
  sphere2,
  sphere3,
  sphere4,
  sphere5,
  plane,
  plane2,
  torus,
  torus2
);
/**
 * * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);

camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update object
  sphere.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.1 * elapsedTime;
  plane.rotation.x = 0.1 * elapsedTime;
  torus.rotation.x = 0.1 * elapsedTime;

  sphere2.rotation.y = 0.1 * elapsedTime;
  plane2.rotation.y = 0.1 * elapsedTime;
  torus2.rotation.y = 0.1 * elapsedTime;

  sphere2.rotation.x = 0.1 * elapsedTime;
  plane2.rotation.x = 0.1 * elapsedTime;
  torus2.rotation.x = 0.1 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

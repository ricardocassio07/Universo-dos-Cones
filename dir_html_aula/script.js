import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js";

// cena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

// câmera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(4, 3, 6);

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// controles
const controls = new OrbitControls(camera, renderer.domElement);

// luz (ESSENCIAL)
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// cone
const cone = new THREE.Mesh(
  new THREE.ConeGeometry(1, 2, 64),
  new THREE.MeshStandardMaterial({ color: 0x00ffcc })
);
scene.add(cone);

// base
const base = new THREE.Mesh(
  new THREE.CircleGeometry(1, 64),
  new THREE.MeshStandardMaterial({ color: 0xffcc00 })
);

base.rotation.x = -Math.PI / 2;
base.position.y = -1;
scene.add(base);

// UI
const slider = document.getElementById("slider");
const text = document.getElementById("text");
const reset = document.getElementById("reset");

// animação
function animate() {
  requestAnimationFrame(animate);

  const t = Number(slider.value);

  cone.rotation.y += 0.01;

  cone.position.y = t * 2;
  base.position.y = -1 - t * 2;

  if (t < 0.3) text.innerText = "Cone sólido";
  else if (t < 0.7) text.innerText = "Desmontando...";
  else text.innerText = "Planificação aproximada";

  controls.update();
  renderer.render(scene, camera);
}

animate();

// reset
reset.addEventListener("click", () => {
  slider.value = 0;
});

// resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
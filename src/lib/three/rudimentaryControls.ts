import * as THREE from "three";
import { getRandomBetween } from "@/lib/utils/numbers.ts";
import { throttle } from "radash";

import type { WebGLRenderer } from "three";

let renderer: WebGLRenderer;
let requestId: number;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(65);

export const generateRandomHexColor = () => new THREE.Color("#000000".replace(/0/g, () => (~~(Math.random() * 16)).toString(16)));

for (let i = 0; i < 2000; i++) {
  const material = new THREE.MeshPhongMaterial({ color: generateRandomHexColor(), flatShading: true });

  const box = new THREE.BoxGeometry(getRandomBetween(1, 5), getRandomBetween(1,5), getRandomBetween(1,5));
  const torus = new THREE.TorusGeometry(getRandomBetween(0.1, 6.0), Math.random());
  const cylinder = new THREE.CylinderGeometry(getRandomBetween(1, 5), getRandomBetween(1, 5), getRandomBetween(1, 5));
  const sphere = new THREE.SphereGeometry(getRandomBetween(0.1, 6.0));

  let mesh: THREE.Mesh;

  switch (i % 4) {
    case 0:
      mesh = new THREE.Mesh(box, material);
      break;
    case 1:
      mesh = new THREE.Mesh(torus, material)
      break;
    case 2:
      mesh = new THREE.Mesh(sphere, material)
      break;
    default:
      mesh = new THREE.Mesh(cylinder, material)
      break;
  }

  mesh.position.x = Math.random() * 1100 - 500;
  mesh.position.y = 0;
  mesh.position.z = Math.random() * 1100 - 1000;
  mesh.rotation.set(Math.random(), Math.random(), Math.random());

  mesh.updateMatrix();
  scene.add(mesh);
}

const dirLight1 = new THREE.DirectionalLight( 0xffffff, 3 );
dirLight1.position.set( 1, 1, 1 );
scene.add( dirLight1 );

const dirLight2 = new THREE.DirectionalLight( 0x002288, 3 );
dirLight2.position.set( - 1, - 1, - 1 );
scene.add( dirLight2 );

const ambientLight = new THREE.AmbientLight( 0x2c2c2c );
scene.add( ambientLight );

export function cameraSlide(x: number, y: number, z: number) {
  camera.position.set(x, y, z);
  camera.updateProjectionMatrix();
}

export function cameraRotate(x: number, y: number, z: number) {
  camera.rotation.set(x, y, z);
  camera.updateProjectionMatrix();
}

function animate() {
  requestId = requestAnimationFrame(animate);;
  renderer.render(scene, camera);
}

export function createScene(el: HTMLCanvasElement) {
  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el, alpha: true });

  const handleResize = throttle({ interval: 150 }, () => {
    const width = el.clientWidth;
    const height = el.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
  });

  const resizeObserver = new ResizeObserver(() => handleResize());

  resizeObserver.observe(el);
  handleResize();
  animate();

  return () => { resizeObserver.disconnect(); };
}

export function stopScene() {
  cancelAnimationFrame(requestId);
}

import * as THREE from "three";
import { getRandomBetween } from "@/lib/utils/numbers.ts";
import { throttle } from "radash";

import type { WebGLRenderer } from "three";

let renderer: WebGLRenderer;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(65, 1, 0.1, 1000);
camera.position.z = 4.4;

const geometry = new THREE.TorusGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0xFF9F1C, wireframe: true });

const toruses = [
  new THREE.Mesh(geometry, material),
  new THREE.Mesh(geometry, material),
  new THREE.Mesh(geometry, material),
];

toruses.forEach((torus, index) => {
  torus.material = torus.material.clone();

  if (index === 0) {
    torus.position.x = -3.2;
  } else if (index === 1) {
    torus.position.x = 0;
    torus.material.color.setHex(0x2EC4B6);
  } else {
    torus.position.x = 3.2;
    torus.material.color.setHex(0xE71D36);
  }

  scene.add(torus);
})

let requestId: number;

const animate = () => {
  requestId = requestAnimationFrame(animate);

  toruses.forEach((torus, index) => {
    torus.rotation.x += getRandomBetween(0.003, 0.006) + (index / 1000);
    torus.rotation.y -= getRandomBetween(0.003, 0.006) + (index / 1000);
  })

  renderer.render(scene, camera);
}

export const createScene = (el: HTMLCanvasElement) => {
  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el, alpha: true });

  const handleResize = throttle({ interval: 150 }, () => {
    const width = el.clientWidth;
    const height = el.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
  });

  // Create a ResizeObserver to watch the canvas element
  const resizeObserver = new ResizeObserver(() => {
    handleResize();
  });

  resizeObserver.observe(el);

  handleResize(); // Initial size
  animate();

  // Return cleanup function
  return () => {
    resizeObserver.disconnect();
  };
};

export const stopScene = () => {
  geometry.dispose();
  cancelAnimationFrame(requestId);
}

import * as THREE from "three";

import type { Object3D, WebGLRenderer } from "three";
import {throttle} from "radash";

let renderer: WebGLRenderer;
let requestId: number;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75);
camera.near = 0.1;
camera.far = 1000;

const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

let pitchObject: Object3D;
let yawObject: Object3D;

function animate() {
  requestId = requestAnimationFrame(animate);;
  renderer.render(scene, camera);
}

function createReferenceObjects() {
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshToonMaterial({ color: 0xff0000 })
  );
  const cubeEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(cube.geometry),
    new THREE.LineBasicMaterial({ color: 'black' })
  );
  cube.add(cubeEdges);
  cube.position.set(0, 0.5, -5);

  const cylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(1, 1, 1, 32),
    new THREE.MeshToonMaterial({ color: 0xb148db })
  );
  const cylinderEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(cylinder.geometry),
    new THREE.LineBasicMaterial({ color: 'black' })
  );
  cylinder.add(cylinderEdges);
  cylinder.position.set(4, 0.5, -5);

  const cone = new THREE.Mesh(
    new THREE.ConeGeometry(1, 2, 3, 1),
    new THREE.MeshToonMaterial({ color: 0xf7ee7f })
  );
  const coneEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(cone.geometry),
    new THREE.LineBasicMaterial({ color: 'black' })
  )
  cone.add(coneEdges);
  cone.position.set(-4, 1, -5)

  scene.add(cube, cylinder, cone);
}

function createWalls() {
  const wallMaterial = new THREE.MeshBasicMaterial({ color: 0x386150 });

  type WallCoords = { posX: number, posY: number, posZ: number, lenX: number, lenY: number, lenZ: number };

  const WALL_HEIGHT = 5;
  const WALL_WIDTH = 0.2;
  const WALL_LENGTH = 20;

  const walls: WallCoords[] = [
    { posX: 0, posY: 2.5, posZ: -10, lenX: WALL_LENGTH - 0.1, lenY: WALL_HEIGHT, lenZ: WALL_WIDTH }, // N
    { posX: 0, posY: 2.5, posZ: 10, lenX: WALL_LENGTH - 0.1, lenY: WALL_HEIGHT, lenZ: WALL_WIDTH },  // S
    { posX: 10.1, posY: 2.5, posZ: 0, lenX: WALL_WIDTH, lenY: WALL_HEIGHT, lenZ: WALL_LENGTH - 0.1 },  // E
    { posX: -10.1, posY: 2.5, posZ: 0, lenX: WALL_WIDTH, lenY: WALL_HEIGHT, lenZ: WALL_LENGTH - 0.1 }, // W
  ];

  walls.forEach((wall) => {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(wall.lenX, wall.lenY, wall.lenZ),
      wallMaterial
    );
    const wallEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(mesh.geometry),
      new THREE.LineBasicMaterial({ color: 'black' })
    );
    mesh.add(wallEdges);

    mesh.position.set(wall.posX, wall.posY, wall.posZ);
    scene.add(mesh);
  });
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

  pitchObject = new THREE.Object3D();
  pitchObject.add(camera);

  yawObject = new THREE.Object3D();
  yawObject.position.y = 1.6; // Roughly sets to eye height
  yawObject.add(pitchObject);

  scene.background = new THREE.Color(0x333333);
  scene.add(yawObject);

  scene.add(new THREE.AmbientLight(0x404040, 0.5)); // Dimmer ambient light

  const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
  mainLight.position.set(5, 10, 5);
  mainLight.castShadow = true; // Enable shadows
  scene.add(mainLight);

  const fillLight = new THREE.PointLight(0x3366ff, 0.5);
  fillLight.position.set(-5, 3, 5);
  scene.add(fillLight);

  const floorGeometry = new THREE.PlaneGeometry(50, 50, 100, 100);
  floorGeometry.rotateX(-Math.PI / 2);
  scene.add(new THREE.Mesh(floorGeometry, new THREE.MeshBasicMaterial({ color: 0x272635 })));

  createReferenceObjects();
  createWalls();

  animate();

  return () => { resizeObserver.disconnect(); };
}

export function stopScene() {
  cancelAnimationFrame(requestId);
}



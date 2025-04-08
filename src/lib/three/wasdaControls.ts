import * as THREE from "three";

import type { Object3D, WebGLRenderer } from "three";
import {throttle} from "radash";

const MOVEMENT_SPEED = 250.0;
const MOVEMENT_FRICTION = 0.5; // Every frame, decelerate by this factor

let renderer: WebGLRenderer;
let requestId: number;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60);
camera.near = 0.1;
camera.far = 1000;

let movingForward = false;
let movingBackward = false;
let movingLeft = false;
let movingRight = false;

// Used for framerate-independent movement calculations
let previousTime = performance.now();

const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

let pitchObject: Object3D;
let yawObject: Object3D;

function animate() {
  requestId = requestAnimationFrame(animate);

  const time = performance.now();
  const timeDelta = (time - previousTime) / 1000;

  // Apply friction to movement each frame
  velocity.x *= MOVEMENT_FRICTION;
  velocity.z *= MOVEMENT_FRICTION;

  direction.z = Number(movingForward) - Number(movingBackward);
  direction.x = Number(movingLeft) - Number(movingRight);
  direction.normalize();

  if (movingForward || movingBackward) {
    velocity.z -= direction.z * MOVEMENT_SPEED * timeDelta;
  }

  if (movingLeft || movingRight) {
    velocity.x -= direction.x * MOVEMENT_SPEED * timeDelta;
  }

  yawObject.translateX(velocity.x * timeDelta);
  yawObject.translateY(velocity.y * timeDelta);
  yawObject.translateZ(velocity.z * timeDelta);

  // Very bad ground collision detection
  if (yawObject.position.y < 1.6) {
    velocity.y = 0;
    yawObject.position.y = 1.6;
  }

  // On the next animation frame, resets the value of previousTime to get the framerate delta
  previousTime = time;
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

function createLights() {
  const ambientLight = new THREE.AmbientLight(0x404040, 0.3);

  const mainLight = new THREE.DirectionalLight(0xffffff, 0.7);
  mainLight.position.set(5, 10, 5);

  const fillLight = new THREE.PointLight(0x3366ff, 1);
  fillLight.position.set(-5, 5, 5);

  scene.add(ambientLight, mainLight, fillLight);
}

function createFloor() {
  const floorGeometry = new THREE.PlaneGeometry(50, 50, 100, 100);
  floorGeometry.rotateX(-Math.PI / 2);
  scene.add(new THREE.Mesh(floorGeometry, new THREE.MeshBasicMaterial({ color: 0x272635 })));
}

function createPitchYawObjects() {
  pitchObject = new THREE.Object3D();
  pitchObject.add(camera);

  yawObject = new THREE.Object3D();
  yawObject.position.y = 1.6; // Roughly set to eye height
  yawObject.add(pitchObject);

  scene.add(yawObject);
}

let isPointerLocked = false;

function onMouseMove(event: MouseEvent) {
  if (!isPointerLocked) return;

  const movementX = event?.movementX || 0;
  const movementY = event?.movementY || 0;

  yawObject.rotation.y -= movementX * 0.002;
  pitchObject.rotation.x -= movementY * 0.002;

  const halfPi = Math.PI / 2; // 90deg
  // Constrain pitch to prevent weird viewing angles. Clamps to between 90deg and -90deg, meaning up and down.
  pitchObject.rotation.x = Math.max(-halfPi, Math.min(halfPi, pitchObject.rotation.x));
}

function onKeyDown(event: KeyboardEvent) {
  if (!isPointerLocked) return;

  switch (event.code) {
    case 'KeyW':
    case 'ArrowUp':
      movingForward = true;
      break;
    case 'KeyA':
    case 'ArrowLeft':
      movingLeft = true;
      break;
    case 'KeyS':
    case 'ArrowDown':
      movingBackward = true;
      break;
    case 'KeyD':
    case 'ArrowRight':
      movingRight = true;
      break;
  }
}

function onKeyUp(event: KeyboardEvent) {
  if (!isPointerLocked) return;

  switch (event.code) {
    case 'KeyW':
    case 'ArrowUp':
      movingForward = false;
      break;
    case 'KeyA':
    case 'ArrowLeft':
      movingLeft = false;
      break;
    case 'KeyS':
    case 'ArrowDown':
      movingBackward = false;
      break;
    case 'KeyD':
    case 'ArrowRight':
      movingRight = false;
      break;
  }
}

function onPointerLockChange() {
  isPointerLocked = document?.pointerLockElement !== null;
}

function createEventListeners() {
  document.addEventListener('mousemove', onMouseMove, false);
  document.addEventListener('keydown', onKeyDown, false);
  document.addEventListener('keyup', onKeyUp, false);
  document.addEventListener('pointerlockchange', onPointerLockChange, false);
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

  scene.background = new THREE.Color(0x333333);

  createPitchYawObjects();
  createLights();
  createFloor();
  createReferenceObjects();
  createWalls();

  createEventListeners();

  animate();

  return () => { resizeObserver.disconnect(); };
}

export function stopScene() {
  cancelAnimationFrame(requestId);

  document.removeEventListener('mousemove', onMouseMove, false);
  document.removeEventListener('keydown', onKeyDown, false);
  document.removeEventListener('keyup', onKeyUp, false);
  document.removeEventListener('pointerlockchange', onPointerLockChange, false);
}



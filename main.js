import { Bodies, Body, Engine, Events, Render, Runner, World } from "matter-js";
import { FRUITS } from "./fruits";

const engine = Engine.create();
const runner = Runner.create();
const render = Render.create({
  engine: engine,
  element: document.body,
  options: {
    wireframes: false,
    background: "#F7F4C8",
    width: 680,
    height: 730,
  },
});

const world = engine.world;

const leftWall = Bodies.rectangle(15, 350, 30, 740, {
  isStatic: true,
  render: { fillStyle: "#E6B143" },
});

const rightWall = Bodies.rectangle(665, 350, 30, 740, {
  isStatic: true,
  render: { fillStyle: "#E6B143" },
});

const ground = Bodies.rectangle(310, 720, 740, 60, {
  isStatic: true,
  render: { fillStyle: "#E6B143" },
});

const topLine = Bodies.rectangle(310, 130, 740, 2, {
  isStatic: true,
  isSensor: true,
  render: { fillStyle: "E6B143" },
});

World.add(world, [leftWall, rightWall, ground, topLine]);

Render.run(render);
Runner.run(runner, engine);

let currentBody = null;
let currentFruit = null;
let disableAction = false;

function addFruit() {
  const index = Math.floor(Math.random() * 5);
  const fruit = FRUITS[index];

  const body = Bodies.circle(300, 50, fruit.radius, {
    index,
    isSleeping: true,
    render: {
      sprite: { texture: `${fruit.name}.png` },
    },
    restitution: 0.2,
  });

  currentBody = body;
  currentFruit = fruit;

  World.add(world, body);
}

window.onkeydown = (event) => {
  if (disableAction) {
    return;
  }
  switch (event.keyCode) {
    case 39:
      if (currentBody.position.x + currentFruit.radius < 645) {
        Body.setPosition(currentBody, {
          x: currentBody.position.x + 10,
          y: currentBody.position.y,
        });
      }
      break;
    case 37:
      if (currentBody.position.x - currentFruit.radius > 35) {
        Body.setPosition(currentBody, {
          x: currentBody.position.x - 10,
          y: currentBody.position.y,
        });
      }
      break;
    case 40:
      currentBody.isSleeping = false;
      disableAction = true;

      setTimeout(() => {
        addFruit();
        disableAction = false;
      }, 1000);
      break;
  }
};

Events.on(engine, "collisionStart", (event) => {
  event.pairs.forEach((collision) => {
    if (collision.bodyA.index === collision.bodyB.index) {
      const index = collision.bodyA.index;

      if (index === FRUITS.length - 1) {
        return;
      }

      World.remove(world, [collision.bodyA, collision.bodyB]);

      const newFruit = FRUITS[index + 1];

      const newBody = Bodies.circle(
        collision.collision.supports[0].x,
        collision.collision.supports[0].y,
        newFruit.radius,
        {
          render: {
            sprite: { texture: `${newFruit.name}.png` },
          },
          index: index + 1,
        }
      );

      World.add(world, newBody);
    }
  });
});

addFruit();

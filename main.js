import { Bodies, Engine, Render, Runner, World } from "matter-js";
import { FRUITS } from "./fruits";

const engine = Engine.create();
const render = Render.create({
  engine,
  element: document.body,
  options: {
    wireframes: false,
    background: "#F7F4C8",
    width: 680,
    height: 750,
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
  render: { fillStyle: "E6B143" },
});

World.add(world, [leftWall, ground, topLine, rightWall]);

Render.run(render);
Runner.run(engine);

function addFruit() {
  const index = Math.floor(Math.random() * 5);
  const fruit = FRUITS[index];

  const body = Bodies.circle(300, 50, fruit.radius, {
    index: index,
    isSleeping: true,
    render: {
      sprite: { texture: `${fruit.name}.png` },
    },
    restitution: 0.2,
  });

  World.add(world, body);
}

addFruit();

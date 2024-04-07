import { Bodies, Engine, Render, Runner, World } from "matter-js";

const engine = Engine.create();
const render = Render.create({
  engine,
  element: document.body,
  options: {
    wireframes: false,
    background: "#F7F4C8",
    width: 620,
    height: 750,
  },
});

const world = engine.world;

const leftWall = Bodies.rectangle(15, 350, 30, 740, {
  isStatic: true,
  render: { fillStyle: "#E6B143" },
});

const rightWall = Bodies.rectangle(605, 350, 30, 740, {
  isStatic: true,
  render: { fillStyle: "#E6B143" },
});

const ground = Bodies.rectangle(310, 720, 620, 60, {
  isStatic: true,
  render: { fillStyle: "#E6B143" },
});

const topLine = Bodies.rectangle(310, 130, 620, 2, {
  isStatic: true,
  render: { fillStyle: "E6B143" },
});

World.add(world, [leftWall, ground, topLine, rightWall]);

Render.run(render);
Runner.run(engine);

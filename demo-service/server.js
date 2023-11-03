const os = require("os");
const fastify = require("fastify")({
  logger: true,
});
const { v4: uuidv4 } = require("uuid");
fastify.register(require("@fastify/jwt"), {
  secret: "supersecret",
});
fastify.get("/10", (request, reply) => {
  const timeoutFunction = () => {
    const mock_json = require("./mock-data-1000.json");
    reply.send({
      ID: uuidv4(),
      DATA: mock_json,
    });
  };

  setTimeout(timeoutFunction, 100);
});



fastify.get("/hello", (request, reply) => {
  reply.send({
    ID: uuidv4(),
    message: "Hello World",
  });
});

fastify.get("/hello10ms", (request, reply) => {
  const timeoutFunction = () => {
    reply.send({
      ID: uuidv4(),
      message: "Hello World",
    });
  };

  setTimeout(timeoutFunction, 10);
});

fastify.get("/hello50ms", (request, reply) => {
  const timeoutFunction = () => {
    reply.send({
      ID: uuidv4(),
      message: "Hello World",
    });
  };

  setTimeout(timeoutFunction, 50);
});

fastify.get("/hello100ms", (request, reply) => {
  const timeoutFunction = () => {
    reply.send({
      ID: uuidv4(),
      message: "Hello World",
    });
  };

  setTimeout(timeoutFunction, 100);
});

fastify.get("/hello250ms", (request, reply) => {
  const timeoutFunction = () => {
    reply.send({
      ID: uuidv4(),
      message: "Hello World",
    });
  };

  setTimeout(timeoutFunction, 250);
});

fastify.get("/", (request, reply) => {
  reply.send({
    HOST: os.hostname(),
    ID: uuidv4(),
  });
});
fastify.get("/token", (req, reply) => {
  const token = fastify.jwt.sign({ HOST: os.hostname() });
  reply.send({ token });
});
fastify.get("/datamock", async (req, reply) => {
  try {
    await req.jwtVerify();
    let mock_json = require("./mock-data-1000.json");
    let mock_data = [];
    for (let i = 0; i < 100; i++) {
      await mock_data.push(mock_json);
    }
    reply.send({
      HOST: os.hostname(),
      ID: uuidv4(),
      DATA: mock_data,
    });
  } catch (e) {
    console.log(e);
    reply.status(e.statusCode).send({ Error: e.message });
  }
});
fastify.get("/mock", async (req, reply) => {
  let mock_json = require("./mock-data-1000.json");
  reply.send({
    HOST: os.hostname(),
    ID: uuidv4(),
    DATA: mock_json,
  });
});
fastify.get("/mock5mb", async (req, reply) => {
  let mock_json = require("./mock-data-1000.json");
  let mock_data = [];
  for (let i = 0; i < 33; i++) {
    await mock_data.push(mock_json);
  }
  reply.send({
    HOST: os.hostname(),
    ID: uuidv4(),
    DATA: mock_data,
  });
});

fastify.get("/mock15mb", async (req, reply) => {
  let mock_json = require("./mock-data-1000.json");
  let mock_data = [];
  for (let i = 0; i < 100; i++) {
    await mock_data.push(mock_json);
  }
  reply.send({
    HOST: os.hostname(),
    ID: uuidv4(),
    DATA: mock_data,
  });
});


fastify.listen({ port: 3000, host: "0.0.0.0" }, (err) => {
  if (err) throw err;
});

const { app, express, httpServer } = require("./room");
const morgan = require("morgan");
const cors = require("cors");
const { connect } = require("./Model/database");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const authRouter = require("./Routes/authRouter");
const genRouter = require("./Routes/genRouter");
const chatRouter = require("./Routes/chatRouter");

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api", authRouter);
app.use("/chat", chatRouter);
app.use(genRouter);

httpServer.listen(PORT, async () => {
  await connect();
  console.log(`listening on port ${PORT}...`);
});

import express from "express";
import { handler } from "./svelte/build/handler.js";

const app = express();
const port = 3000;

// Demo route
app.get("/expressroute", (req, res) => {
    res.send("This is an express route!");
});

app.use(handler);

app.listen(port, () => {
    console.log(`Server is runnig on port ${port}`);
});

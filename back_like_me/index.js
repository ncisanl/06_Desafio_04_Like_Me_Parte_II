import express from "express";
import cors from "cors";
import { likeModel } from "./models/likeme.model.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/posts", async (req, res) => {
  try {
    const posts = await likeModel.getPosts();
    return res.json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/posts", async (req, res) => {
  const { titulo, img, descripcion, likes } = req.body;

  if (!titulo || !img || !descripcion) {
    return res.status(400).json({
      message: "Falta ingresar " + setWarningMessage(titulo, img, descripcion),
    });
  }

  try {
    const newPosts = await likeModel.postPosts(titulo, img, descripcion, likes);
    return res.json(newPosts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

function setWarningMessage(titulo, img, descripcion) {
  if (!titulo) {
    return "título";
  }

  if (!img) {
    return "URL de imagen";
  }

  if (!descripcion) {
    return "descripción";
  }
}

app.listen(3000, () =>
  console.log("Servidor levantado con éxito! --> http://localhost:3000/"),
);

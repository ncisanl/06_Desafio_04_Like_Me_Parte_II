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
  const { titulo, img, descripcion } = req.body;

  if (!titulo || !img || !descripcion) {
    return res.status(400).json({
      message: "Falta ingresar " + setWarningMessage(titulo, img, descripcion),
    });
  }

  try {
    const newPosts = await likeModel.postPosts(titulo, img, descripcion);
    return res.json(newPosts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/posts/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletePost = await likeModel.deletePosts(id);

    if (!deletePost) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.json({ message: "Post eliminado" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/posts/like/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const updatePost = await likeModel.updatePosts(id);

    if (!updatePost) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.json({ message: "Post actualizado" });
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

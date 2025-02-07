import { pool } from "../database/connection.js";

const getPosts = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  return rows;
};

const postPosts = async (titulo, img, descripcion) => {
  const query =
    "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, 0) RETURNING *";
  const { rows } = await pool.query(query, [titulo, img, descripcion]);
  return rows[0];
};

const deletePosts = async (id) => {
  const query = "DELETE FROM posts WHERE id = $1 RETURNING *";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

const updatePosts = async (id) => {
  const query = "UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

export const likeModel = {
  getPosts,
  postPosts,
  deletePosts,
  updatePosts,
};

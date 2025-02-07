import { pool } from "../database/connection.js";

const getPosts = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  return rows;
};

const postPosts = async (titulo, img, descripcion, likes) => {
  const { rowCount } = await pool.query({
    text: "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4)",
    values: [titulo, img, descripcion, likes],
  });

  console.log("Posts agregado", rowCount);
  return rowCount;
};

export const likeModel = {
  getPosts,
  postPosts,
};

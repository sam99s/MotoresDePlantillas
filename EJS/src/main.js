const express = require("express");

const productos = [];

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("inicio", { productos });
});

app.get("/productos", (req, res) => {
  res.render("productos", { productos });
});

app.post("/productos", (req, res) => {
  const { title, price, thumbnail } = req.body;

  if (title === "" || price === "" || thumbnail === "") {
    return res.redirect("/");
  }

  const producto = { title, price, thumbnail };
  if (productos.length === 0) {
    producto["id"] = 1;
  } else {
    producto["id"] = productos[productos.length - 1].id + 1;
  }

  productos.push(producto);

  res.redirect("/");
});

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Server on http://localhost:${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));

const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));

const productos = [];

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("cargarDatos");
});

app.get("/productos", (req, res) => {
  res.render("datosProductos.pug", {
    productos,
  });
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


const server = app.listen(PORT, () => {
    console.log(`Server on http://localhost:${server.address().port}`);
  });
server.on("error", (error) => console.log(`Error en servidor ${error}`));

const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));

const productos = [];

app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "index.hbs",
  })
);

app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("cargarDatos.hbs");
});

app.post("/productos", (req, res) => {
  // ok
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

app.get("/productos", (req, res) => {
  res.render("datosProductos.hbs", {
    productos,
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server on http://localhost:${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
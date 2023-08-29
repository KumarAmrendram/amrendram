const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const blogData = require("./public/db/blogData.json");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.get("/blogs", (req, res) => {
  res.render("partials/blogs", { blogs: blogData });
});

app.get("/blog/:blogName", (req, res) => {
  let flag = 1;
  for (let i = 0; i < blogData.length; i++) {
    if (blogData[i].name === req.params.blogName) {
      flag = 1;
      res.status(200).render("partials/blog", { blog: blogData[i] });
      //   res.status(200).send({ blogData });
      return;
    } else {
      flag = 0;
    }
  }
  if (flag === 0) {
    res.send("Error 404: Not Found ");
  }
});

app.get("*", (req, res) => {
  res.render("partials/damn");
});

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

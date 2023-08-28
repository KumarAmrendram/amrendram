const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const blogData = require("./public/db/blogData.json");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", absoluteViewsPath);
app.use(cors());

app.get("/", (req, res) => {
  res.render("index", { blogs: blogData });
});

app.get("/blog/:blogName", (req, res) => {
  const requestedBlogName = req.params.blogName.toLowerCase(); // Convert to lowercase
  let foundBlog = null;

  for (let i = 0; i < blogData.length; i++) {
    const blogName = blogData[i].name.toLowerCase(); // Convert to lowercase
    if (blogName === requestedBlogName) {
      foundBlog = blogData[i];
      break; // Exit the loop as soon as a match is found
    }
  }

  if (foundBlog) {
    res.status(200).render("blog.ejs", { blog: foundBlog });
  } else {
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

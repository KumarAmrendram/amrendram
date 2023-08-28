const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const blogData = require("./public/db/blogData.json");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.get("/", (req, res) => {
  res.render("index", { blogs: blogData });
});

app.get("/:blogName", (req, res) => {
    const requestedBlogName = req.params.blogName;
    let foundBlog = null;
  
    // Find the blog in blogData based on the requested name
    for (const blog of blogData) {
      if (blog.name === requestedBlogName) {
        foundBlog = blog;
        break;
      }
    }
  
    if (foundBlog) {
      // Render the "blog" view and pass the foundBlog data to it
      res.render("./", { blogs: foundBlog });
    } else {
      res.status(404).send("Error 404: Not Found");
    }
  });
  

app.get("*", (req, res) => {
  res.render("partials/damn");
});

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 

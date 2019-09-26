import express from "express";
import helmet from "helmet";
import morgan from "morgan";

const articlesInfo = {
  "learn-react": {
    upvotes: 0,
    comments: []
  },
  "learn-node": {
    upvotes: 0,
    comments: []
  },
  "my-thoughts-on-resumes": {
    upvotes: 0,
    comments: []
  }
};

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/api/articles/:name/upvote", (req, res) => {
  const articleName = req.params.name;
  articlesInfo[articleName].upvotes += 1;

  res
    .status(200)
    .send(
      `${articleName} now has ${articlesInfo[articleName].upvotes} upvotes!`
    );
});

app.post("/api/articles/:name/add-comment", (req, res) => {
  const { username, text } = req.body;
  const articleName = req.params.name;

  articlesInfo[articleName].comments.push({ username, text });
  res.status(200).send(articlesInfo[articleName]);
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));

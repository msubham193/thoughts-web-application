const Post = require("../models/postModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("../utils/cloudinary");

//*CREATION OF A POST:::::

exports.createPost = catchAsyncError(async (req, res, next) => {
  // console.log(req.body);
  const { title, content, category, image } = req.body;
  try {
    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        upload_preset: "thoughts",
      });

      if (uploadRes) {
        const post = await Post.create({
          title,
          content,
          category,
          name: req.user.name,
          image: uploadRes.secure_url,
          author: req.user.id,
          avatar: req.user.avatar,
        });

        res.status(200).json({
          success: true,
          post,
        });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
});

//*Like Post:::
exports.likePost = catchAsyncError(async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.user._id)) {
      await post.updateOne({ $push: { likes: req.user.id } });

      const updatedPost = await Post.findById(req.params.id);
      return res.status(200).json({
        success: true,
        post: updatedPost,
      });
    } else {
      await post.updateOne({ $pull: { likes: req.user.id } });

      const updatedPost = await Post.findById(req.params.id);
      return res.status(200).json({
        success: true,
        post: updatedPost,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

//GET ALL TITLES
exports.getAllTitle = catchAsyncError(async (req, res, next) => {
  const posts = await Post.find();
  let titles = [];
  for (let i = 0; i < posts.length; i++) {
    titles.push({ title: posts[i].title, id: posts[i].id });
  }
  res.status(200).json({ success: true, title: titles });
});

//*GET ALL POST

exports.getAllPost = catchAsyncError(async (req, res, next) => {
  // const posts = await Post.find();
  const apiFeature = new ApiFeatures(Post.find(), req.query)
    .search()
    .searchByCategory();

  const posts = await apiFeature.query;
  const postsCnt = posts.length;

  res.status(200).json({ success: true, posts, postsCnt });
});

exports.getSinglePost = catchAsyncError(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  res.status(200).json({ success: true, post });
});

//UPDATE A POST::
exports.updatePost = catchAsyncError(async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({ success: true, post });
});

//DELETE A POST::
exports.deletePost = catchAsyncError(async (req, res, next) => {
  const doc = await Post.findByIdAndRemove(req.params.id);

  res.status(200).json({ success: true, post: doc });
});

//Comment a post:

exports.commentPost = catchAsyncError(async (req, res, next) => {
  const { comment } = req.body;

  const review = {
    user: req.user.id,
    name: req.user.name,
    avatar: req.user.avatar,
    comment,
  };

  const post = await Post.findById(req.params.id);

  const isReviewed = post.comments.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    post.comments.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.comment = comment;
      }
    });
  } else {
    post.comments.push(review);
    post.comments = post.comments.length;
  }

  await post.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    post,
  });
});

//BOOK MARK A POST
exports.bookMarkPost = catchAsyncError(async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.bookmark.includes(req.user.id)) {
      await post.updateOne({ $push: { bookmark: req.user.id } });
      return res.status(200).json("Post has been bookmarked");
    } else {
      await post.updateOne({ $pull: { bookmark: req.user.id } });
      return res.status(200).json("Post has been unbookMarked");
    }
  } catch (error) {
    return res.status(500).json("Internal server error ");
  }
});

exports.postAuthors = catchAsyncError(async (req, res, next) => {
  try {
    const post = await Post.find();

    for (let i = 0; i < post.length; i++) {}
  } catch (error) {}
});

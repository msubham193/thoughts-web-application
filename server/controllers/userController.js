const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const User = require("../models/userModel");
const { sendToken } = require("../utils/jwtToken");
const cloudinary = require("../utils/cloudinary");
const Post = require("../models/postModel");

exports.register = catchAsyncError(async (req, res, next) => {
  // const file = req.files.photos;

  const { name, email, password, image } = req.body;

  if (!name || !email || !password || !image) {
    return next(new ErrorHandler("All field should not be empty"));
  }

  if (password.length < 8) {
    return next(new ErrorHandler("Password must be at least 8 characters"));
  }

  try {
    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        upload_preset: "thoughts",
      });

      if (uploadRes) {
        const user = await User.create({
          name,
          email,
          password,
          avatar: uploadRes.secure_url,
        });
        sendToken(user, 201, res);
      }
    }
  } catch (error) {
    console.log(error.message);
  }

  // res.status(200).json({
  //   success: true,

  //   user,
  // });
});

//*LOGIN USER
exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter the login credentials !"));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Credentials !"));
  }

  const isPasswordMatched = await user.comparePassword(password);
  console.log(isPasswordMatched);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Credentials"));
  }

  const post = await Post.find();

  let userPost = [];

  for (let i = 0; i < post.length; i++) {
    if (post[i].author.toString() == user._id.toString()) {
      userPost.push(post[i]);
    }
  }

  sendToken(user, 200, res, userPost);
});

//*LOGOUT USER:::::
exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

//UPADATE A USER:::
exports.updateUser = catchAsyncError(async (req, res, next) => {
  // console.log(req.user);
  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

//GET USER DETAILS::::::
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
    );
  }
  const post = await Post.find();

  // console.log(post[0]);

  let userPost = [];

  for (let i = 0; i < post.length; i++) {
    if (post[i].author.toString() == user._id.toString()) {
      userPost.push(post[i]);
    }
  }
  res.status(200).json({
    success: true,
    user,
    post: userPost,
  });
});

// *Get all users(admin)
exports.getAllUser = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// *Get single user
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
    );
  }

  const post = await Post.find();

  // console.log(post[0]);

  let userPost = [];

  for (let i = 0; i < post.length; i++) {
    if (post[i].author.toString() == user._id.toString()) {
      userPost.push(post[i]);
    }
  }

  res.status(200).json({
    success: true,
    user,
    post: userPost,
  });
});

exports.addFollow = catchAsyncError(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const me = await User.findById(req.user.id);
    if (!user.followers.includes(req.user.id)) {
      await user.updateOne({ $push: { followers: req.user.id } });
      await me.updateOne({ $push: { following: req.params.id } });
      return res.status(200).json("Following.....");
    } else {
      await user.updateOne({ $pull: { followers: req.user.id } });
      await me.updateOne({ $pull: { following: req.params.id } });
      return res.status(200).json("UnFollowing.....");
    }
  } catch (error) {
    return res.status(500).json("Internal server error ");
  }
});

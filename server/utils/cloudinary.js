const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dsgsinzrk",
  api_key: "849526791538131",
  api_secret: "1ftR9R-ISGQ4kHP95T7cIWWXmAc",
  secure: true,
});

module.exports = cloudinary;

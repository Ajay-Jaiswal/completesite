const blogModel = require("../models/blogModel.js");
const authorModel = require("../models/authorModel.js");
const jwt = require("jsonwebtoken");
const validator = require("../utils/validator");

// creating blog by authorizing authorId.
const createBlog = async function (req, res) {
  try {
    const requestBody = req.body;
    const tokenId = req.authorId
    if (!validator.isValidRequestBody(requestBody)) {
      return res.status(400).send({
        status: false,
        message: "Invalid request parameters. Please provide blog details",
      });
    }

    //Extract params
    const { title, body, authorId, tags, category, subcategory, isPublished } =
      requestBody;

    // Validation starts
    if (!validator.isValid(title)) {
      return res
        .status(400)
        .send({ status: false, message: "Blog Title is required" });
    }
    if (!validator.isValid(body)) {
      return res
        .status(400)
        .send({ status: false, message: "Blog body is required" });
    }
    if (!validator.isValid(authorId)) {
      return res
        .status(400)
        .send({ status: false, message: "Author id is required" });
    }
    if (!validator.isValidObjectId(authorId)) {
      return res.status(400).send({
        status: false,
        message: `${authorId} is not a valid author id`,
      });
    }
    
    if(authorId !== tokenId){
    
      return res.status(400).send({
        status: false,
        message: 'Unauthorised Access. Please login again!',
      });
    }
    const findAuthor = await authorModel.findById(authorId);
    if (!findAuthor) {
      return res
        .status(400)
        .send({ status: false, message: `Author does not exists.` });
    }
    if (!validator.isValid(category)) {
      return res
        .status(400)
        .send({ status: false, message: "Blog category is required" });
    }
    //validation Ends

    const blogData = {
      title,
      body,
      authorId,
      category,
      isPublished: isPublished ? isPublished : false,
      publishedAt: isPublished ? new Date() : null,
    };

    if (tags) {
      if (Array.isArray(tags)) {
        const uniqueTagArr = [...new Set(tags)];
        blogData["tags"] = uniqueTagArr; //Using array constructor here
      } 
    }

    if (subcategory) {
      if (Array.isArray(subcategory)) {
        const uniqueSubcategoryArr = [...new Set(subcategory)];
        blogData["subcategory"] = uniqueSubcategoryArr; //Using array constructor here
      }
    }

    const newBlog = await blogModel.create(blogData);
    return res.status(201).send({
      status: true,
      message: "New blog created successfully",
      data: newBlog,
    });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
    console.log({message: error.message })
  }
};

//get all blogs by using filters - title,tags,category & subcategory.
const getBlog = async function (req, res) {
  try {
    let filterQuery = { isDeleted: false, deletedAt: null, isPublished: true };
    let queryParams = req.query;
    const { authorId, category, tags, subcategory } = queryParams;

    if (!validator.isValidString(authorId)) {
      return res
        .status(400)
        .send({ status: false, message: "Author id is required"  });
    }
    if (authorId) {
      if (!validator.isValidObjectId(authorId)) {
        return res.status(400).send({
          status: false,
          message: `authorId is not valid.`,
        });
      }
    }

    if (!validator.isValidString(category)) {
      return res.status(400).send({
        status: false,
        message: "Category cannot be empty while fetching.",
      });
    }

    if (!validator.isValidString(tags)) {
      return res.status(400).send({
        status: false,
        message: "tags cannot be empty while fetching.",
      });
    }
    // console.log(tags)
    // console.log(subcategory)

    if (!validator.isValidString(subcategory)) {
      return res.status(400).send({
        status: false,
        message: "subcategory cannot be empty while fetching.",
      });
    }

    if (validator.isValidRequestBody(queryParams)) {
      const { authorId, category, tags, subcategory } = queryParams;
      if (validator.isValid(authorId) && validator.isValidObjectId(authorId)) {
        filterQuery["authorId"] = authorId;
      }
      if (validator.isValid(category)) {
        filterQuery["category"] = category.trim();
      }
      if (validator.isValid(tags)) {
        const tagsArr = tags
          .trim()
          .split(",")
          .map((x) => x.trim());
        filterQuery["tags"] = { $all: tagsArr };
      }
      if (validator.isValid(subcategory)) {
        const subcatArr = subcategory 
          .trim()
          .split(",")
          .map((subcat) => subcat.trim());
        filterQuery["subcategory"] = { $all: subcatArr };
      }
    }
    const blog = await blogModel.find(filterQuery);
    console.log(blog)

    if (Array.isArray(blog) && blog.length === 0) {
      return res.status(404).send({ status: false, message: "No blogs found" });
    }
    res.status(200).send({ status: true, message: "Blogs list", data: blog });
  } catch (error) {
    res.status(500).send({ status: false, Error: error.message });
  }
};

//Update blogs
const updateDetails = async function (req, res) {
  try {
    let authorIdFromToken = req.authorId;
    let blogId = req.params.blogId;
    let requestBody = req.body;
    const { title, body, tags, subcategory } = requestBody;

    if (!validator.isValidRequestBody(req.params)) {
      return res.status(400).send({status: false, message: "Invalid request parameters. Please provide query details"});
    }

    
    if (!validator.isValidObjectId(blogId)) {
      return res
        .status(400)
        .send({ status: false, message: `BlogId is invalid.` });
    }

    if (!validator.isValidString(title)) {
      return res
        .status(400)
        .send({ status: false, message: "Title is required for updatation." });
    }

    if (!validator.isValidString(body)) {
      return res
        .status(400)
        .send({ status: false, message: "Body is required for updatation." });
    }

    if (tags) {
      if (tags.length === 0) {
        return res
          .status(400)
          .send({ status: false, message: "tags is required for updatation." });
      }
    }

    if (subcategory) {
      if (subcategory.length === 0) {
        return res.status(400).send({
          status: false,
          message: "subcategory is required for updatation.",
        });
      }
    }

    let Blog = await blogModel.findOne({ _id: blogId });
    if (!Blog) {
      return res.status(400).send({ status: false, msg: "No such blog found" });
    }
    if (Blog.authorId.toString() !== authorIdFromToken) {
      res.status(401).send({
        status: false,
        message: `Unauthorized access! author's info doesn't match`,
      });
      return;
    }
    if (
      req.body.title ||
      req.body.body ||
      req.body.tags ||
      req.body.subcategory
    ) {
      const title = req.body.title;
      const body = req.body.body;
      const tags = req.body.tags;
      const subcategory = req.body.subcategory;
      const isPublished = req.body.isPublished;

      const updatedBlog = await blogModel.findOneAndUpdate(
        { _id: req.params.blogId },
        {
          title: title,
          body: body,
          $addToSet: { tags: tags, subcategory: subcategory },
          isPublished: isPublished,
        },
        { new: true }
      );
      if (updatedBlog.isPublished == true) {
        updatedBlog.publishedAt = new Date();
      }
      if (updatedBlog.isPublished == false) {
        updatedBlog.publishedAt = null;
      }
      return res.status(200).send({
        status: true,
        message: "Successfully updated blog details",
        data: updatedBlog,
      });
    } else {
      return res
        .status(400)
        .send({ status: false, msg: "Please provide blog details to update" });
    }
  } catch (err) {
    res.status(500).send({
      status: false,
      Error: err.message,
    });
  }
};

//DELETE /blogs/:blogId - Mark is Deleted:true if the blogId exists and it is not deleted.
const deleteBlogById = async function (req, res) {
  try {
    //let authorIdFromToken = req.authorId;
    let id = req.params.blogId;

    if (!validator.isValidObjectId(id)) {
      return res
        .status(400)
        .send({ status: false, message: `BlogId is invalid.` });
    }

    let Blog = await blogModel.findOne({ _id: id });

    if (!Blog) {
      return res.status(400).send({ status: false, msg: "No such blog found" });
    }

    /*
    if (Blog.authorId.toString() !== authorIdFromToken) {
      res.status(401).send({
        status: false,
        message: `Unauthorized access! Owner info doesn't match`,
      });
      return;
    }*/
    
    let data = await blogModel.findOne({ _id: id });
    if (data.isDeleted == false) {
      let Update = await blogModel.findOneAndUpdate(
        { _id: id },
        { isDeleted: true, deletedAt: Date() },
        { new: true }
      );
      return res.status(200).send({
        status: true,
        message: "successfully deleted blog",
      });
    } else {
      return res
        .status(404)
        .send({ status: false, msg: "Blog already deleted" });
    }
  } catch (err) {
    res.status(500).send({ status: false, Error: err.message });
  }
};



const deleteByQuery = async function (req, res) {
  try{
      let category = req.query.category
      let authorId = req.query.authorId
      let tags = req.query.tags
      let subcategory = req.query.subcategory
      let isPublished = req.query.isPublished

      if (!validator.isValidRequestBody(req.query)) {
        return res.status(400).send({status: false, message: "Invalid request parameters. Please provide query details"});
      }
  


      if (!validator.isValidString(authorId)) {
        return res .status(400).send({ status: false, message: "Author id is required" });
      }
      if (authorId) {
        if (!validator.isValidObjectId(authorId)) {
          return res.status(400).send({ status: false,message: `authorId is not valid.`});
        }
      }
  
      if (!validator.isValidString(category)) {
        return res.status(400).send({status: false,message: "Category cannot be empty while fetching."});
      }
  
      if (!validator.isValidString(tags)) {
        return res.status(400).send({status: false, message: "tags cannot be empty while fetching."});
      }
      if (!validator.isValidString(subcategory)) {
        return res.status(400).send({status: false,message: "subcategory cannot be empty while fetching."});
      }
      

      let fetchdata = await blogModel.find({$or:[{category: category  },{tags: tags},{subcategory: subcategory},{isPublished: isPublished}, { authorId: authorId }]})



      if(fetchdata.length == 0){
      return res.status(404).send({ status: false, msg: " Blog document doesn't exist "})
      }

      let deletedtedUser = await blogModel.updateMany({$or:[{category: category  },{tags: tags},{subcategory: subcategory},{isPublished: isPublished}, { authorId: authorId }]}, { $set: { isDeleted: true } }, { new: true });

      if (deletedtedUser.isDeleted == true) {
        res.status(400).send({status: false, msg: "blog already deleted"})
      }

      res.status(201).send({status: true, msg: "Blog is successfully deleted- Thanks for deleting- From MONGO-DB", data: deletedtedUser });
  }
  catch(err){
      res.status(500).send({ msg: "Error", error: err.message })
  }
}



module.exports = {
  createBlog,
  getBlog,
  updateDetails,
  deleteBlogById,
  deleteByQuery
  
};

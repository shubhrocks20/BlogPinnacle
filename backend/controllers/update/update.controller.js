import uploadOnCloudinary from "../../middlewares/cloudinary.js";
import { Post } from "../../models/index.js";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";
const updateController = {
  async updatePost(req, res, next) {
    try {
      const postId = req.params.id;
      const { title, content } = req.body;
      // Check if the post exists
      const existingPost = await Post.findById(postId);
      if (!existingPost) {
        return next(CustomErrorHandler.notFound("Post not found"));
      }

      // Check if a new image is sent
      let updatedImageData = {};
      if (req.files && req.files.image) {
        // Upload the new image on Cloudinary
        const imageLocalPath = await uploadOnCloudinary(
          req.files.image[0].path
        );
        updatedImageData.image = imageLocalPath.url;
      }

      // Update only the fields that are present in req.body
      const updatedPostData = {
        ...(title && { title }),
        ...(content && { content }),
        ...(Object.keys(updatedImageData).length && {
          image: updatedImageData.image,
        }),
      };

      // Update the post
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        updatedPostData,
        { new: true }
      );

      res.json({ message: "Post updated successfully", post: updatedPost });
    } catch (error) {
      return next(error);
    }
  },
};
export default updateController;

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
  
      // Handle image update
      let imageUrl;
      if (req.files && req.files.image) {
        // Upload the new image on Cloudinary
        const imageLocalPath = await uploadOnCloudinary(req.files.image[0].path);
        imageUrl = imageLocalPath;
      }
  
      // Update the post data
      const updatedPostData = {
        ...(title && { title }),
        ...(content && { content }),
        ...(imageUrl && { image: imageUrl }), // Update image only if new image is uploaded
      };
  
      // Update the post
      const updatedPost = await Post.findByIdAndUpdate(postId, updatedPostData, { new: true });
  
      if (!updatedPost) {
        return next(CustomErrorHandler.notFound("Failed to update post"));
      }
  
      res.json({ message: "Post updated successfully", post: updatedPost });
    } catch (error) {
      return next(error);
    }
  }
  
};
export default updateController;

import { Post } from "../../models";
const updateController = {
  async update(req, res, next) {
    const itemId = req.params.id;
    const updatedItemData = req.body;

    try {
      // Use findOneAndUpdate to find the item by ID and update it
      const updatedItem = await Post.findOneAndUpdate(
        { _id: itemId },
        { $set: updatedItemData },
        { new: true } // Return the updated document
      ).select('-record -createdAt -updatedAt -__v');

      // Check if the item was found and updated
      if (!updatedItem) {
        return res.status(404).json({ error: "Item not found" });
      }

      // Respond with the updated item
      res.json(updatedItem);
    } catch (error) {
      // Handle any errors that occurred during the update
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
export default updateController;

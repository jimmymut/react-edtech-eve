import axios from "axios";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export function DeletePost({ id, posts, setPosts }) {
  const [delLoading, setDelLoading] = useState(false);

  async function handleDelete() {
    try {
      setDelLoading(true);
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      const updPosts = posts.filter((pst)=>pst.id !== id);
      setPosts(updPosts);
      toast.success("Post deleted");
    } catch (error) {
      console.log(error);
    } finally {
      setDelLoading(false);
    }
  }
  return (
    <>
      {delLoading ? (
        <p>Deleting...</p>
      ) : (
        <Trash2
          className="text-red-500 cursor-pointer"
          onClick={handleDelete}
        />
      )}
    </>
  );
}

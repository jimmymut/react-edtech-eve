import axios from "axios";
import {
  Button,
  Checkbox,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Spinner,
  TextInput,
} from "flowbite-react";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export function EditPostModel({posts, setPosts, post}) {
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [loading, setLoading] = useState(false);

  function onCloseModal() {
    setOpenModal(false);
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    setLoading(true);
    try {
      console.log( {
        id: post.id,
        title: title,
        body: body,
        userId: post.userId,
      },);
      
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${post.id}`,
        {
          id: post.id,
          title: title,
          body: body,
          userId: post.userId,
        },
        // {
        //     headers:{
        //         "Content-Type": "application/json"
        //     }
        // }
      );
      console.log(response.data);
      

      const updatedPosts = posts.map((pt)=>{
        if(pt.id == post.id){
          return response.data;
        }
        return pt;
      })

      setPosts(updatedPosts);
      onCloseModal();
      toast.success("Post successfully created");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Pencil
        className="text-blue-600"
        onClick={() => setOpenModal(true)}
      />
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <ModalHeader />
        <ModalBody>
          <form 
          className="w-52 m-auto"
          onSubmit={(event)=>handleSubmit(event)}
          >
            <h1 className="text-2xl w-full text-center">Update Post</h1>
            <div className="mb-2 w-full">
              <input
                type="text"
                placeholder="Title"
                defaultValue={post.title}
                className="border rounded w-full px-1"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-2 w-full">
              <textarea
                type="text"
                placeholder="Body"
                defaultValue={post.body}
                className="border rounded w-full px-1"
                onChange={(e) => setBody(e.target.value)}
                required
              />
            </div>
            <button
              className="w-full bg-blue-500 text-white my-2 py-1 rounded"
              type="submit"
              disabled={loading}
            >
                {
                    loading?<><Spinner size="sm" light /> Loading...</>: "Submit"
                }
            </button>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}

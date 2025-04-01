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
import { useState } from "react";
import { toast } from "react-toastify";

export function AddPostModal({posts, setPosts}) {
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  function onCloseModal() {
    setOpenModal(false);
    setTitle("");
    setBody("");
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          title: title,
          body: body,
          userId: 1,
        },
        // {
        //     headers:{
        //         "Content-Type": "application/json"
        //     }
        // }
      );
      setPosts([response.data, ...posts]);
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
      <Button
        className="bg-blue-600 py-1 px-2 rounded m-3"
        onClick={() => setOpenModal(true)}
      >
        +Add Post
      </Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <ModalHeader />
        <ModalBody>
          <form 
          className="w-52 m-auto"
          onSubmit={(event)=>handleSubmit(event)}
          >
            <h1 className="text-2xl w-full text-center">Add Post</h1>
            <div className="mb-2 w-full">
              <input
                type="text"
                placeholder="Title"
                className="border rounded w-full px-1"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-2 w-full">
              <textarea
                type="text"
                placeholder="Body"
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

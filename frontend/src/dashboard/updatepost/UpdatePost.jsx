import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
const DisplaySuccess = (text) => toast.success(text);
const DisplayError = (text) => toast.error(text);
import "./UpdatePost.css";

const UpdatePost = () => {
  const location = useLocation();
  const postid = location.state.id;
  const [inputValue, setInputValue] = useState(location.state || {});
  const { title, content } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  // function for creating post
  const updatepost = async (e) => {
    e.preventDefault();
    try {
      if (title.length !== 0 && content.length !== 0) {
        await axios.put(
          `/api/v1/post/updatepost/${postid}`,
          { title, content },
          { withCredentials: true }
        );
        await post();
        DisplaySuccess("post updated");
      } else DisplayError("Post title and content is required");
    } catch (error) {
      DisplayError("Some error occurred by connecting server!");
      console.log(error);
    }
  };
  //   fetching post
  const [updatedpost, setPost] = useState({});
  const post = async () => {
    await axios
      .get(`/api/v1/post/updatedpost/${postid}`)
      .then((post) => setPost(post.data));
  };
  useEffect(() => {
    post();
  }, []);
  return (
    <>
      <div id="UpdateContainer" className="container-fluid">
        <div id="UpdatePostForm" className="container">
          <form onSubmit={updatepost}>
            <input
              type="text"
              name="title"
              value={title}
              className="form-control"
              placeholder="Enter post title"
              onChange={handleOnChange}
            />
            <textarea
              name="content"
              value={content}
              className="form-control"
              rows="8"
              placeholder="Enter post content"
              onChange={handleOnChange}
            ></textarea>
            {/* <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              Choose image
            </label>
            <input className="form-control" 
            name="img_url"
            value={img_url}
            type="file" id="formFile" />
          </div> */}
            <button className="btn btn-outline-primary btn-lg" type="submit">
              Update Post
            </button>
          </form>
        </div>
        {/* container for card for displaying post */}
        <div id="UserAllPosts" className="container">
          <div className="card mb-3 container">
            <div className="card-header">
              <span className="card-title fw-bolder">{updatedpost.title}</span>
            </div>
            <div className="card-body">
              <p className="card-text">{updatedpost.content}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePost;

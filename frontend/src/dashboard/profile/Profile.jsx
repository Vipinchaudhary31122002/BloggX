import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
const DisplaySuccess = (text) => toast.success(text);
const DisplayError = (text) => toast.error(text);

import "./Profile.css";
const Profile = () => {
  const [inputValue, setInputValue] = useState({
    title: "",
    content: "",
    img_url: "",
  });
  const { title, content, img_url } = inputValue;
  const resetObject = () => {
    const defaultObject = {
      title: "",
      content: "",
      img_url: "",
    };
    setInputValue(defaultObject);
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (title.length !== 0) {
        await axios.post(
          "/api/v1/post/userpost",
          { title, content },
          { withCredentials: true }
        );
        resetObject();
        DisplaySuccess("post created");
      } else DisplayError("Post title is required");
    } catch (error) {
      DisplayError("Some error occurred by connecting server!");
      console.log(error);
      resetObject();
    }
  };
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get("/api/v1/post/userpost").then((posts) => setPosts(posts.data));
  }, []);
  return (
    <div id="ProfileContainer" className="container-fluid">
      <div id="CreatePostForm" className="container">
        {/* form for creating post */}
        <form onSubmit={handleSubmit}>
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
            Create Post
          </button>
        </form>
      </div>
      <div id="UserAllPosts" className="container">
        {/* card for displaying post */}
        {posts.length > 0 &&
          posts.map((e) => (
            <div className="card mb-3" key={e._id}>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <span className="card-title fw-bolder">{e.title}</span>
                </div>
                <p className="card-text">
                  <small className="text-body-secondary">
                    created by
                    <span className="card-title m-1 fw-bolder">
                      {e.username}
                    </span>
                  </small>
                </p>
                <p className="card-text">{e.content}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Profile;

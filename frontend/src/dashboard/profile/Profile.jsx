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
    img_url: ""
  });
  const { title, content, img_url } = inputValue;
  const resetObject = () => {
    const defaultObject = {
      title: "",
      content: "",
      img_url: ""
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
    console.log(title);
    e.preventDefault();
    try {
      if (title.length !== 0) {
        await axios.post(
          "/api/v1/post/createpost",
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
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              Choose image
            </label>
            <input className="form-control" 
            name="img_url"
            value={img_url}
            type="file" id="formFile" />
          </div>
          <button className="btn btn-outline-primary btn-lg" type="submit">
            Create Post
          </button>
        </form>
      </div>
      <div id="UserAllPosts" className="container">
        {/* card for displaying post */}
        <div className="card mb-3">
          {/* <img src="..." className="card-img-top" alt="..." /> */}
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            {/* <p className="card-text">
              <small className="text-body-secondary">
                Last updated 3 mins ago
              </small>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

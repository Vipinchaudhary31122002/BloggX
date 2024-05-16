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
  });
  const { title, content } = inputValue;
  const resetObject = () => {
    const defaultObject = {
      title: "",
      content: "",
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
        <form className="m-2" onSubmit={handleSubmit}>
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
            rows="1"
            placeholder="Enter post content"
            onChange={handleOnChange}
          ></textarea>
          <button className="btn btn-outline-primary btn-lg" type="submit">
            Create Post
          </button>
        </form>
      </div>
      <div id="UserAllPosts" className="container"></div>
    </div>
  );
};

export default Profile;

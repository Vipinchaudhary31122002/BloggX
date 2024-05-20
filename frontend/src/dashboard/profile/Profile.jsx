import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const DisplaySuccess = (text) => toast.success(text);
const DisplayError = (text) => toast.error(text);

import "./Profile.css";
const Profile = () => {
  const [inputValue, setInputValue] = useState({
    title: "",
    content: "",
    img_url: {},
  });
  const { title, content, img_url } = inputValue;
  const resetObject = () => {
    const defaultObject = {
      title: "",
      content: "",
      img_url: {},
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
  // const handleFileChange = (e) => {
  //   console.log(e.target);
  //   setInputValue({
  //     ...inputValue,
  //     img_url: e.target.files[0],
  //   });
  // };
  // function for creating post
  const createpost = async (e) => {
    e.preventDefault();
    try {
      if (title.length !== 0) {
        await axios.post(
          "/api/v1/post/createpost",
          { title, content },
          { withCredentials: true }
        );
        resetObject();
        await userpost();
        DisplaySuccess("post created");
      } else DisplayError("Post title is required");
    } catch (error) {
      DisplayError("Some error occurred by connecting server!");
      console.log(error);
      resetObject();
    }
  };
  // function for fetching all the post of particular user
  const [posts, setPosts] = useState([]);
  const userpost = async () => {
    await axios
      .get("/api/v1/post/userpost")
      .then((posts) => setPosts(posts.data));
  };
  // delete post
  const deletepost = async (id) => {
    try {
      await axios.delete(`/api/v1/post/deletepost/${id}`);
      await userpost();
      DisplaySuccess("post deleted");
    } catch (error) {
      DisplayError("Some error genereated on server side while deleting post!");
      console.log(error);
    }
  };
  useEffect(() => {
    userpost();
  }, []);
  return (
    <div id="ProfileContainer" className="container-fluid">
      <div id="CreatePostForm" className="container">
        {/* form for creating post */}
        <form onSubmit={createpost}>
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
            <input
              className="form-control"
              name="img_url"
              type="file"
              id="formFile"
              onChange={handleFileChange}
              accept="image/png, image/jpeg"
            ></input>
          </div> */}
          <button className="btn btn-outline-primary btn-lg" type="submit">
            Create Post
          </button>
        </form>
      </div>
      {/* container for card for displaying post */}
      <div id="UserAllPosts" className="container">
        {posts.length > 0 &&
          posts.map((e) => (
            <div className="card mb-3 container" key={e._id}>
              <div className="card-header">
                <span className="card-title fw-bolder">{e.title}</span>
              </div>
              <div className="card-body">
                <p className="card-text">{e.content}</p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button
                  className="btn btn-outline-danger"
                  onClick={() => deletepost(e._id)}
                >
                  Delete post
                </button>
                <Link
                  to="/dashboard/updatepost"
                  state={{ id: e._id, title: e.title, content: e.content }}
                  className="btn btn-outline-primary"
                >
                  Update post
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Profile;

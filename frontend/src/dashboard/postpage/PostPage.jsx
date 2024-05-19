import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const DisplaySuccess = (text) => toast.success(text);
const DisplayError = (text) => toast.error(text);

const PostPage = () => {
  const location = useLocation();
  const { title, content, username, id } = location.state;
  //   comment implementation
  const [inputValue, setInputValue] = useState({
    comment: "",
  });
  const { comment } = inputValue;
  const resetObject = () => {
    const defaultObject = {
      comment: "",
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
  // function for creating post
  const createcomment = async (e) => {
    e.preventDefault();
    try {
      if (comment.length !== 0) {
        await axios.post(
          "/api/v1/post/createcomment",
          { comment, id },
          { withCredentials: true }
        );
        // await userpost();
        resetObject();
        DisplaySuccess("comment created");
      } else DisplayError("comment is required");
    } catch (error) {
      DisplayError("Some error occurred by connecting server!");
      console.log(error);
      resetObject();
    }
  };
  return (
    <>
      {/* card for displaying post */}
      <div className="card container mb-3">
        <div className="card-header d-flex justify-content-between">
          <span className="card-title fw-bolder">{title}</span>
          <span className="card-text">
            <small className="text-body-secondary">
              created by
              <span className="card-title m-1 fw-bolder">{username}</span>
            </small>
          </span>
        </div>
        <div className="card-body">
          <p className="card-text">{content}</p>
        </div>
      </div>
      {/* card for taking comment from user */}
      <div className="card container mb-3">
        <div className="card-body">
          <form className="d-flex" onSubmit={createcomment}>
            <input
              type="text"
              name="comment"
              value={comment}
              className="form-control"
              placeholder="Enter comment"
              onChange={handleOnChange}
            />
            <button className="btn btn-outline-primary" type="submit">
              Comment
            </button>
          </form>
        </div>
      </div>
      {/* card for displaying comment */}
      <div className="card container mb-3">
        <div className="card-body"></div>
      </div>
    </>
  );
};

export default PostPage;

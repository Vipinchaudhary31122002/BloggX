import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const DisplaySuccess = (text) => toast.success(text);
const DisplayError = (text) => toast.error(text);

const PostPage = () => {
  const location = useLocation();
  const [postcomment, setPostComment] = useState([]);
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
        const res = await axios.post(
          "/api/v1/post/createcomment",
          { comment, id },
          { withCredentials: true }
        );
        getcomment();
        if (
          res.data.message ===
          "Duplicate comment error: User has already commented on this post."
        ) {
          DisplayError("Cannot add more than 1 comment on a single post");
        } else {
          await getcomment();
          DisplaySuccess("comment created");
          resetObject();
        }
      } else DisplayError("comment is required");
    } catch (error) {
      DisplayError("Some error occurred by connecting server!");
      console.log(error);
      resetObject();
    }
  };

  // fetching all comments on the particular post
  const getcomment = async () => {
    await axios
      .get(`/api/v1/post/comments/${id}`)
      .then((comment) => setPostComment(comment.data));
  };
  useEffect(() => {
    console.log("fetching all the comments");
    getcomment();
  }, []);
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
        {postcomment.length > 0 ? (
          postcomment.map((e) => (
            <div
              className="card-header d-flex justify-content-between"
              key={e._id}
            >
              <span>{e.comment}</span>
              <span>by {e.username}</span>
            </div>
          ))
        ) : (
          <div className="card-header">
            <span>No comments</span>
          </div>
        )}
      </div>
    </>
  );
};

export default PostPage;

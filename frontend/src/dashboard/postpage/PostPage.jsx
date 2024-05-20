import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const DisplaySuccess = (text) => toast.success(text);
const DisplayError = (text) => toast.error(text);

const PostPage = () => {
  const [liked, setliked] = useState(false);
  const handleLikeClick = () => {
    setliked((prevLiked) => !prevLiked);
  };
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
  const togglelikepost = async () => {
    try {
      if (liked) {
        await axios.post(`/api/v1/post/unlikepost/${id}`);
        DisplaySuccess("Post unliked");
      } else {
        await axios.post(`/api/v1/post/likepost/${id}`);
        DisplaySuccess("Post liked");
      }
      handleLikeClick();
    } catch (error) {
      DisplayError("Failed to update like status");
      console.log(error);
    }
  };
  const getlikestatus = async () => {
    const likestatus = await axios.get(`/api/v1/post/userliked/${id}`);
    console.log(likestatus);
  };
  useEffect(() => {
    getcomment();
    getlikestatus();
  }, []);
  return (
    <>
      {/* card for displaying post */}
      <div className="card container mb-3">
        <div className="card-header d-flex justify-content-between">
          <span className="card-title fw-bolder">{title}</span>
          <span
            className="likecontainer"
            onClick={togglelikepost}
            style={{ cursor: "pointer" }}
          >
            {liked ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  fill="red"
                  className="bi bi-heart-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                  />
                </svg>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  fill="currentColor"
                  className="bi bi-heart"
                  viewBox="0 0 16 16"
                >
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                </svg>
              </>
            )}
          </span>
        </div>
        <div className="card-body">
          <p className="card-text">{content}</p>
          <span className="card-text">
            <small className="text-body-secondary">
              created by
              <span className="card-title m-1 fw-bolder">{username}</span>
            </small>
          </span>
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

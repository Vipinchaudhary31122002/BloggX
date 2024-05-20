import "./AllPosts.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("/api/v1/post/allpost").then((posts) => setPosts(posts.data));
  }, []);
  return (
    <div id="AllPostsContainer" className="container-fluid">
      <span className="badge text-bg-primary m-2 p-1 pb-0">
        <h5>Trending Post</h5>
      </span>
      <div className="Posts container">
        {posts.length > 0 &&
          posts.map((e) => (
            <div className="card mb-3" key={e._id}>
              {/* card header */}
              <div className="card-header d-flex justify-content-between">
                <span className="card-title fw-bolder">{e.title}</span>
                <span className="card-text">
                  <small className="text-body-secondary">
                    created by
                    <span className="card-title m-1 fw-bolder">
                      {e.username}
                    </span>
                  </small>
                </span>
              </div>
              {/* card body */}
              <div className="card-body">
                <p className="card-text">{e.content}</p>
              </div>
              {/* card footer */}
              <div className="card-footer">
                <Link
                  to={`/dashboard/post/${e._id}`}
                  state={{
                    id: e._id,
                    title: e.title,
                    content: e.content,
                    username: e.username,
                  }}
                  className="btn btn-outline-primary float-end"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllPosts;

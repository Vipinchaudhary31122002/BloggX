import "./Profile.css";
const Profile = () => {
  return (
    <div id="ProfileContainer" className="container-fluid">
      <div id="CreatePostForm" className="container">
        <form action="" className="m-2">
          <input
            type="text"
            className="form-control"
            placeholder="Enter post title"
          />
          <textarea
            className="form-control"
            rows="1"
            placeholder="Enter post content"
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

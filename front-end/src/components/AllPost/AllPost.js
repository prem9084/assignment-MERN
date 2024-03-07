import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "./AllPost.css";
const AllPost = () => {
  const [post, setPost] = useState([]);

  const AllPost = async () => {
    try {
      const res = await axios.get("/api/v1/post/get-post");
      setPost(res.data.post);
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    AllPost();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/v1/post/delete-post/${id}`);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center cards"
      style={{ marginTop: "10rem" }}
    >
      {post?.map((u) => (
        <div className="card ms-5 posts" style={{ width: "18rem" }}>
          <img
            src={`/api/v1/post/get-post-photo/${u._id}`}
            className="card-img-top"
            alt={u.name}
          />
          <div className="card-body">
            <p className="card-text">UserID:{u._id}</p>
            <p className="card-text">Name: {u.pname}</p>
            <p className="card-text">Title: {u.title}</p>
            <p className="card-text">Description: {u.description}</p>
          </div>
          <div className="d-flex">
            <Link
              key={u._id}
              to={`/update-post/${u.slug}`}
              className="btn btn-primary w-50"
            >
              UPDATE
            </Link>

            <button
              onClick={() => handleDelete(u._id)}
              className="btn btn-danger w-50 ms-2"
            >
              DELETE
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllPost;

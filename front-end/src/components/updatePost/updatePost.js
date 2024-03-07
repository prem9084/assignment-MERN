import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import "./update.css";
const UpdatePost = () => {
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const [pname, setPname] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");

  const getSignlePost = async () => {
    try {
      const res = await axios.get(`/api/v1/post/single-post/${params.slug}`);

      const post = res.data.post;
      setPname(post.pname);
      setTitle(post.title);
      setDescription(post.description);
      setPhoto(post.photo);
      setId(post._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSignlePost();
  }, [params.id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const postData = new FormData();
      postData.append("pname", pname);
      postData.append("title", title);
      postData.append("description", description);
      postData.append("photo", photo);
      const res = await axios.put(`/api/v1/post/update-post/${id}`, postData);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/all-post");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div style={{ marginTop: "8rem" }}>
      <form
        onSubmit={handleUpdate}
        className="w-50 m-auto forms"
        style={{ padding: "3rem" }}
      >
        <div className="mb-3">
          <label htmlFor="exampleInputDnsRecord" className="form-label">
            ENTER POST NAME
          </label>
          <input
            type="text"
            value={pname}
            onChange={(e) => setPname(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputtitle" className="form-label">
            ENTER POST TITLE
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputdescription" className="form-label">
            ENTER POST DESCRIPTION
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="btn btn-outline-secondary col-md-12">
            {photo ? photo.name : "Upload Photo"}
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              hidden
            />
          </label>
        </div>
        <div className="mb-3">
          {photo && (
            <div className="text-center">
              <img
                src={URL.createObjectURL(photo)}
                alt="dns_photo"
                height={"200px"}
                className="img img-responsive"
              />
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdatePost;

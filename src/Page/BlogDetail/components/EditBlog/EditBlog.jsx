/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { blogAPI } from "../../../../api/blogApi";
import ReactQuill from "react-quill";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faXmark } from "@fortawesome/free-solid-svg-icons";
import uploadFileWithProgress from "../../../../Firebase/uploadFileWithProgress";
import { toast } from "react-hot-toast";
import ProgressUpload from "../../../../Admin/components/ProgressUpload/ProgressUpload";
import { useNavigate } from "react-router-dom";

const EditBlog = ({ id }) => {
  const navigate = useNavigate();
  const [dataBlog, setDataBlog] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState({});
  const [progress, setProgress] = useState(0);
  const [content, setContent] = useState("");
  const getBlogDetail = useCallback(async () => {
    const res = await blogAPI.getBlogDetail(id);
    if (res.status === 200) {
      setDataBlog(res.data);
      setContent(res.data.content);
      setImage({ ...image, preview: res.data.image });
    } else {
      toast.error("Get data fail !");
    }
  }, []);
  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setImage(file);
  };
  const handleClickClearImage = useCallback(() => {
    setImage({ ...image, preview: "" });
  }, []);
  const handleChangeTitle = (e) => {
    setDataBlog({ ...dataBlog, title: e.target.value });
  };
  const handleSubmitBlog = async () => {
    setIsLoading(true);
    let url = dataBlog?.image;
    if (dataBlog?.title) {
      if (image.preview !== url) {
        url = await uploadFileWithProgress(
          image,
          "images/blog",
          dataBlog.title,
          setProgress
        );
      }
      const res = await blogAPI.editBlog(id, {
        title: dataBlog.title,
        image: url,
        content: content,
      });
      if (res.status === 200) {
        toast.success("Updated blog successfully !");
        navigate(`/blog`);
      } else {
        toast.error("Update Blog failed !");
      }
    } else {
      toast.error("Please enter title blog !");
    }
    setIsLoading(false);
  };
  const renderTextarea = useMemo(() => {
    return (
      <div className="mt-4">
        <ReactQuill
          value={content}
          onChange={(e) => {
            setContent(e);
          }}
        />
      </div>
    );
  }, [dataBlog?.content]);
  const renderImage = useMemo(() => {
    return (
      <div className="mt-4">
        {image?.preview && (
          <div className="relative">
            <img src={image.preview} alt="blog" className="p-4" />
            <button
              className="icon-edit-avatar-blog"
              onClick={handleClickClearImage}
            >
              <FontAwesomeIcon icon={faXmark} fontWeight={900} fontSize={16} />
            </button>
          </div>
        )}
        <div className="flex justify-center mt-3">
          <label
            htmlFor="image"
            className="cursor-pointer px-4 py-2 border-red-400 text-red-400 border-2 border-solid rounded-full hover:text-red-600 hover:border-red-600"
          >
            <FontAwesomeIcon icon={faUpload} className="mr-2" /> Choose file to
            upload
          </label>
          <input
            type="file"
            className="hidden"
            name="image"
            id="image"
            accept=".png, .jpg, .jpeg"
            onChange={handleChangeImage}
          />
        </div>
      </div>
    );
  }, [image, handleClickClearImage]);

  useEffect(() => {
    getBlogDetail();
  }, [getBlogDetail]);
  useEffect(() => {
    return () => {
      if (image.preview) {
        URL.revokeObjectURL(image.preview);
      }
    };
  }, [image]);
  return (
    <>
      {isLoading ? (
        <ProgressUpload progress={progress} />
      ) : (
        <div>
          <div className="max-h-[480px] overflow-y-auto">
            <div className="flex items-center justify-between">
              <label className="w-3/12 m-0 text-lg font-medium" htmlFor="title">
                Title :
              </label>
              <input
                className="w-9/12 px-4 py-2 border-2 rounded-xl border-slate-400 border-solid"
                type="text"
                name="title"
                id="title"
                value={dataBlog?.title}
                onChange={handleChangeTitle}
              />
            </div>
            {renderImage}
            {renderTextarea}
          </div>
          <div className="mt-4 flex justify-end">
            <button>Cancel</button>
            <button className="btn-custom" onClick={handleSubmitBlog}>
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditBlog;

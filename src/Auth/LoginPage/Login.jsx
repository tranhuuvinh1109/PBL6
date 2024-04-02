import React, { useContext, useState } from "react";
import "../../Assets/css/Login.css";
import { Link } from "react-router-dom";
import {
  faCircleArrowLeft,
  faUser,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AppContext } from "../../App";
import InputCustom from "../../components/Input/Input";
import Loading from "../../components/Loading/Loading";
import { userData } from "../../constants";

const Login = () => {
  const navigator = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(AppContext);
  console.log("Loading", isLoading);

  const handleChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (data.email === userData.email && data.password === userData.password) {
      setTimeout(() => {
        toast.success("Login Successfully");
        context.setUser(userData);

        context.setIsAdmin(false);
        navigator("/");
      }, 2000);
    } else {
      setTimeout(() => {
        toast.success("Login Fail");
        setIsLoading(false);
      }, 2000);
      toast.error("Please enter email & password");
    }
  };

  return (
    <>
      <div className="login">
        <div className="login_box rounded-lg shadow-2xl">
          <div className="login_content">
            <div className="login_content_left">
              <div className="top-link text-left text-[greenCustom] ">
                <Link to="/" className="no-underline return-home">
                  <FontAwesomeIcon icon={faCircleArrowLeft} />
                  <span className="ml-1.5">Return home</span>
                </Link>
                <div className="top-link-title">
                  <h2>Education</h2>
                  <h4>Learn to work</h4>
                </div>
              </div>
              <div className="field-body">
                <form onSubmit={handleSubmit} className="field-content">
                  <h3 className="">SIGN IN</h3>
                  <div>
                    <InputCustom
                      type="email"
                      icon={<FontAwesomeIcon icon={faUser} fontSize={14} />}
                      id="email"
                      placeholder="Your Email"
                      required={true}
                      name="email"
                      value={data.username}
                      onChange={handleChange}
                      onBlur={() => {}}
                    />
                    <InputCustom
                      type="password"
                      icon={<FontAwesomeIcon icon={faLock} fontSize={14} />}
                      id="password"
                      placeholder="Password"
                      required={true}
                      name="password"
                      value={data.password}
                      onChange={handleChange}
                      onBlur={() => {}}
                    />
                  </div>
                  <div>
                    <button type="submit" className="btn-login">
                      Login
                    </button>
                  </div>
                  <div>
                    <span>New here?</span>{" "}
                    <Link to="/register">Create new account</Link>
                  </div>
                </form>
              </div>
            </div>
            <div className="login_content_right">
              <div className="login_content_right_title">
                <h2>Education</h2>
                <h4>Learn to work</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLoading && <Loading />}
    </>
  );
};
export default Login;

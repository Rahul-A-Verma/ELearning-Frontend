import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import "./lecture.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";
import { TiTick } from "react-icons/ti";
import gsap from "gsap";

const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState({}); // Initialize as object
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [show, setShow] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  
  // Form States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setvideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  
  // Progress States
  const [completed, setCompleted] = useState("");
  const [completedLec, setCompletedLec] = useState("");
  const [lectLength, setLectLength] = useState("");
  const [progress, setProgress] = useState([]);

  const pageRef = useRef(null);

  // Security Check
  useEffect(() => {
    if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
      navigate("/");
    }
  }, [user, params.id, navigate]);

  // 1. Fetch all lectures
  async function fetchLectures() {
    try {
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setLectures(data.lectures);
      setLoading(false);
      
      // Auto-load first lecture if none is selected
      if (data.lectures.length > 0 && !lecture._id) {
        fetchLecture(data.lectures[0]._id);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  // 2. Fetch specific lecture (The fix for your error)
  async function fetchLecture(id) {
    setLecLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lecture/${id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setLecture(data.lecture);
      setLecLoading(false);
    } catch (error) {
      console.error(error);
      setLecLoading(false);
    }
  }

  // 3. Progress Tracking
  async function fetchProgress() {
    try {
      const { data } = await axios.get(`${server}/api/user/progress?course=${params.id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setCompleted(data.courseProgressPercentage);
      setCompletedLec(data.completedLectures);
      setLectLength(data.allLectures);
      setProgress(data.progress);
    } catch (error) {
      console.error(error);
    }
  }

  const addProgress = async (id) => {
    try {
      await axios.post(`${server}/api/user/progress?course=${params.id}&lectureId=${id}`, {}, {
        headers: { token: localStorage.getItem("token") },
      });
      fetchProgress();
    } catch (error) {
      console.error(error);
    }
  };

  // 4. Admin Handlers
  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setvideo(file);
    };
  };

  const submitHandler = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);

    try {
      const { data } = await axios.post(`${server}/api/course/${params.id}`, myForm, {
        headers: { token: localStorage.getItem("token") },
      });
      toast.success(data.message);
      setBtnLoading(false);
      setShow(false);
      fetchLectures();
      setTitle(""); setDescription(""); setvideo(""); setVideoPrev("");
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
          headers: { token: localStorage.getItem("token") },
        });
        toast.success(data.message);
        fetchLectures();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  // 5. Entrance Animations
  useLayoutEffect(() => {
    if (!loading) {
      gsap.from(".lecture-sidebar", { x: 50, opacity: 0, duration: 1, ease: "power3.out" });
      gsap.from(".video-player-section", { opacity: 0, y: 20, duration: 1, ease: "power3.out" });
    }
  }, [loading]);

  useEffect(() => {
    fetchLectures();
    fetchProgress();
  }, [params.id]);

  return (
    <div ref={pageRef} className="lecture-page-wrapper">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="learning-header">
            <div className="progress-info">
              <span>Course Progress: {completed}%</span>
              <span>{completedLec} / {lectLength} Lectures</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${completed}%` }}></div>
            </div>
          </div>

          <div className="lecture-container">
            <div className="video-player-section">
              {lecLoading ? <Loading /> : (
                <div className="video-content">
                  {lecture.video ? (
                    <>
                      <div className="video-wrapper">
                        <video
                          src={`${server}/${lecture.video}`}
                          controls
                          controlsList="nodownload"
                          onEnded={() => addProgress(lecture._id)}
                          autoPlay
                          key={lecture._id}
                        ></video>
                      </div>
                      <div className="lecture-details">
                        <h1>{lecture.title}</h1>
                        <p>{lecture.description}</p>
                      </div>
                    </>
                  ) : (
                    <div className="select-prompt"><h1>Select a lecture to start</h1></div>
                  )}
                </div>
              )}
            </div>

            <div className="lecture-sidebar">
              <div className="sidebar-header">
                <h3>Playlist</h3>
                {user?.role === "admin" && (
                  <button className="add-lec-btn" onClick={() => setShow(!show)}>
                    {show ? "Close" : "+ Add"}
                  </button>
                )}
              </div>

              {show && (
                <div className="admin-lecture-form">
                  <form onSubmit={submitHandler}>
                    <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    <input type="file" onChange={changeVideoHandler} required />
                    <button disabled={btnLoading} type="submit" className="common-btn">
                      {btnLoading ? "Uploading..." : "Add"}
                    </button>
                  </form>
                </div>
              )}

              <div className="playlist-scroll">
                {lectures.map((e, i) => (
                  <div key={e._id} className="playlist-item-group">
                    <div
                      onClick={() => fetchLecture(e._id)}
                      className={`playlist-card ${lecture._id === e._id ? "active-lec" : ""}`}
                    >
                      <span className="lec-index">{i + 1}.</span>
                      <span className="lec-title">{e.title}</span>
                      {progress[0]?.completedLectures.includes(e._id) && (
                        <TiTick className="complete-tick" />
                      )}
                    </div>
                    {user?.role === "admin" && (
                      <button className="del-btn-small" onClick={() => deleteHandler(e._id)}>Delete</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Lecture;
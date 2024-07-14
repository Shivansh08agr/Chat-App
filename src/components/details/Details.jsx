import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { auth, db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";
import "./details.css";
import { useState } from "react";

const Detail = ({ setInfo }) => {
  const {
    user,
    isCurrentUserBlocked,
    isReceiverBlocked,
    changeBlock,
    resetChat,
  } = useChatStore();
  const { currentUser } = useUserStore();

  const [showPhotos, setShowPhotos] = useState(false);
  const [showText1, setShowText1] = useState(false);
  const [showText2, setShowText2] = useState(false);

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    auth.signOut();
    resetChat();
  };

  const bringPhotos = () => {
    setShowPhotos((prev) => !prev);
  };

  const bringText1 = () => {
    setShowText1((prev) => !prev);
  };
  const bringText2 = () => {
    setShowText2((prev) => !prev);
  };
  return (
    <div className="detail">
      <div className="nobuttons">
        <div className="user">
          <div className="quit">
            <img
              src="./arrowDown.png"
              onClick={() => setInfo(false)}
              style={{ transform: "rotateZ(90deg)" }}
            />
          </div>
          <div className="userInfo">
            <img src={user?.avatar || "./avatar.png"} />
            <h2>{user?.username}</h2>
          </div>
        </div>
        <div className="info">
          <div className="option">
            <div className="title">
              <span>Chat Settings</span>
              <img
                src={showText1 ? "./arrowDown.png" : "./arrowUp.png"}
                onClick={bringText1}
              />
            </div>
            <p style={{ display: showText1 ? "block" : "none" }}>
              This feature is not not available yet
            </p>
          </div>
          <div className="option">
            <div className="title">
              <span>Privacy & help</span>
              <img
                src={showText2 ? "./arrowDown.png" : "./arrowUp.png"}
                onClick={bringText2}
              />
            </div>
            <p style={{ display: showText2 ? "block" : "none" }}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Distinctio vero quos facere dolor aliquam reprehenderit nulla
              repudiandae sint, eaque.
            </p>
          </div>

          <div className="option">
            <div className="title">
              <span>Shared photos</span>
              <img
                src={showPhotos ? "./arrowDown.png" : "./arrowUp.png"}
                onClick={bringPhotos}
              />
            </div>
            <div
              className="photos"
              style={showPhotos ? { display: "block" } : { display: "none" }}
            >
              <div className="photoItem">
                <div className="photoDetail">
                  <img
                    src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                    alt=""
                  />
                  <span>photo_2024_2.png</span>
                </div>
                <img src="./download.png" alt="" className="icon" />
              </div>
              <div className="photoItem">
                <div className="photoDetail">
                  <img
                    src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                    alt=""
                  />
                  <span>photo_2024_2.png</span>
                </div>
                <img src="./download.png" alt="" className="icon" />
              </div>
              <div className="photoItem">
                <div className="photoDetail">
                  <img
                    src="https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                    alt=""
                  />
                  <span>photo_2024_2.png</span>
                </div>
                <img src="./download.png" alt="" className="icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="buttons">
        <button onClick={handleBlock} className="block">
          {isCurrentUserBlocked
            ? "You are Blocked!"
            : isReceiverBlocked
            ? "User blocked"
            : "Block User"}
        </button>
        <button className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Detail;

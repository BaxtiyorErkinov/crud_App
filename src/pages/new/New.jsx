import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { db, auth, storage } from '../../firebase'
import { doc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom'


const New = ({inputs, title}) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const uploadFile = () => {

      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on("state_changed", (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress)
        setPerc(progress)
        console.log(per)
        switch (snapshot.state) {
          case "PAUSED":
            console.log("paused")
            break;
          case "running":
            console.log("running");
            break;
          default:
            break;
        }
      },
        (err) => {
          console.log(err)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadUrl => {
            setData((prev) => ({
              ...prev,
              img: downloadUrl
            }))
          })
        }
      )
    }

    file && uploadFile()
  }, [file])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await createUserWithEmailAndPassword(auth, data.email, data.password)
      await setDoc(doc(db, "users", res.user.uid), {
        ...data,
        timeStamp: serverTimestamp(),
        status: data.length % 2 ? "active" : "pending"
      })
      navigate(-1)
    } catch ( err ) {
      console.log(err)
    }
  }

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({
      ...data,
      [id]: value
    })
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{ title }</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img src={ file
                       ? URL.createObjectURL(file)
                       : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg" } alt="" />
          </div>
          <div className="right">
            <form onSubmit={ handleSubmit }>
              <div className="formInput">
                <label htmlFor="file">
                  Image:
                  <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input type="file" id="file" onChange={ (e) => setFile(e.target.files[0]) } style={ { display: "none" } } />
              </div>
              { inputs.map((input) => (
                  <div className="formInput" key={ input.id }>
                    <label>
                      { input.label }
                    </label>
                    <input id={ input.id } type={ input.type } placeholder={ input.placeholder } onChange={ e => handleInput(e) } />
                  </div>
                )) }
              <button disabled={ per !== null && per < 100 } type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    );
};

export default New;

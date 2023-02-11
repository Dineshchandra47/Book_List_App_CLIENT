import bookimg from "../../images/book.jpg";
import "./Booklist.css";
import { context } from "../context/context";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const config = {
    headers: {
      token: localStorage.getItem("token"),
    },
  };
  const navigate = useNavigate();
  // eslint-disable-next-line
  const { bookdetails, setBookdetails } = useContext(context);
  useEffect(() => {
    axios
    // http://localhost:5000
      .get("https://booklist-server-10x-test.onrender.com/api/books", config)
      .then((res) => {
        // console.log(res);
        setBooks([...res.data.data]);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, []);
  const handleClick = (data) => {
    setBookdetails({ ...data });
    navigate("/viewbook");
  };

  return (
    <>
      <div>
        <h1>Book List</h1>
        <div>
          <button
            onClick={() => {
              navigate("/addbook");
            }}
          >
            + ADD BOOK
          </button>
        </div>
        <div style={{ textAlign: "right", marginRight: "200px" }}>
          <button
            onClick={() => {
              localStorage.setItem("token", "");
              navigate("/");  toast.success("Logged out successfullu", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                window.reload()
              
            }}
          >
            LogOut
          </button>
        </div>
        <div className="card-container">
          {books.map((book, i) => {
            return (
              <>
                <div
                  className="book-card-container"
                  key={book._id}
                  onClick={() => handleClick(book)}
                >
                  <ul style={{ listStyle: "none" }}>
                    <li>
                      <img src={bookimg} alt="" />
                    </li>
                    <li>{book.title}</li>
                    <li>{book.author}</li>
                    <li>{book.description}</li>
                  </ul>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BookList;

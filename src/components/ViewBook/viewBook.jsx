import "./viewBook.css";
import { useContext } from "react";
import { context } from "../context/context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewBook = () => {
  const config = {
    headers: {
      token: localStorage.getItem("token"),
    },
  };
  const navigate = useNavigate();
  // eslint-disable-next-line
  const { bookdetails, setBookdetails } = useContext(context);
  const handleDelete = () => {
    axios
      .delete(
        `https://booklist-server-10x-test.onrender.com/api/books/${bookdetails._id}`,
        config
      )
      .then((res) => {
        console.log(res);
        // window.alert(res.data.message);
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/booklist");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="view-book-container">
      <div>
        <button
          onClick={() => {
            navigate("/booklist");
          }}
        >
          Show Book list
        </button>
      </div>
      <h1>Book's Record</h1>
      <h5>view book's info</h5>
      <ol>
        <li>name: {bookdetails.title}</li>
        <li>Author: {bookdetails.author}</li>
        <li>ISBN: {bookdetails.isbn}</li>
      </ol>
      <div className="edit-delete-btn-container">
        <button
          onClick={() => {
            navigate("/editbook");
          }}
        >
          Edit Book
        </button>
        <button onClick={handleDelete}>Delete Book</button>
      </div>
    </div>
  );
};

export default ViewBook;

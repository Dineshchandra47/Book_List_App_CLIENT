import { useEffect, useState } from "react";
import "./AddBook.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddBook = () => {
  const config = {
    headers: {
      token: localStorage.getItem("token"),
    },
  };
  const navigate = useNavigate();
  const [bookDetails, setBookdetails] = useState({
    title: "",
    isbn: "",
    author: "",
    description: "",
    publish_date: "",
    publisher: "",
  });
  const [formError, setFormError] = useState({});
  const [isSubmit, setisSubmit] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookdetails({ ...bookDetails, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(validate(bookDetails));
    setisSubmit(true);
  };
  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      console.log(bookDetails);
      axios
        .post(
          "https://booklist-server-10x-test.onrender.com/api/books/addBook",
          // http://localhost:5000
          bookDetails,
          config
        )
        .then((res) => {
          console.log(res);
        //   window.alert(res.data.message);
          toast.success(res.data.message, {
            position: "top-center",
            autoClose: 5000,
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
    }
    // eslint-disable-next-line
  }, [formError]);
  function validate(data) {
    let error = {};
    if (
      !data.title ||
      !data.author ||
      !data.isbn ||
      !data.description ||
      !data.publish_date ||
      !data.publisher
    ) {
      error.details = "All Fields are Mandatory";
    }
    return error;
  }
  return (
    <>
      <div className="addbook-container">
        <div>
          <button
            className="show-book-btn"
            onClick={() => {
              navigate("/booklist");
            }}
          >
            Show Book list
          </button>
        </div>
        <h1>Add Book</h1>
        <h5>Create new Book</h5>
        <p>{formError.details}</p>
        <form method="post" className="form-container" onSubmit={handleSubmit}>
          <div className="input-controll">
            <input
              type="text"
              placeholder="Title of the Book"
              name="title"
              value={bookDetails.title}
              onChange={handleChange}
            />
          </div>
          <div className="input-controll">
            <input
              type="text"
              placeholder="ISBN"
              name="isbn"
              value={bookDetails.isbn}
              onChange={handleChange}
            />
          </div>
          <div className="input-controll">
            <input
              type="text"
              placeholder="Author"
              name="author"
              value={bookDetails.author}
              onChange={handleChange}
            />
          </div>
          <div className="input-controll">
            <input
              type="text"
              placeholder="Description"
              name="description"
              value={bookDetails.description}
              onChange={handleChange}
            />
          </div>
          <div className="input-controll">
            <input
              type="text"
              placeholder="Published date"
              name="publish_date"
              value={bookDetails.publish_date}
              onChange={handleChange}
            />
          </div>
          <div className="input-controll">
            <input
              type="text"
              placeholder="Publisher of the book"
              name="publisher"
              value={bookDetails.publisher}
              onChange={handleChange}
            />
          </div>
          <div>
            <button className="submit-btn">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddBook;

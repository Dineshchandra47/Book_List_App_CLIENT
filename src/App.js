import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddBook from "./components/AddBook/AddBook";
import BookList from "./components/Booklist/BookList";
import ContextProvider from "./components/context/context";
import EditBook from "./components/EditBook/EditBook";
import SignUp from "./components/signUp/signup";
import ViewBook from "./components/ViewBook/viewBook";
import SignIn from "./components/signIn/signIn";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const token = localStorage.getItem("token");
  return (
    <>
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route
              path="/booklist"
              element={token ? <BookList /> : <SignIn />}
            />
            <Route path="/addbook" element={<AddBook />} />
            <Route path="/viewbook" element={<ViewBook />} />
            <Route path="/editbook" element={<EditBook />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </ContextProvider>
    </>
  );
}

export default App;

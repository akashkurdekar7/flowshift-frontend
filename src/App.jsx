import {useState} from "react";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toolbar from './components/Toolbar';
import Ui from "./components/Ui";
import Submit from "./components/Submit";
import Result from './components/Result';

function App() {
  const [modalData, setModalData] = useState({isOpen: false, results: {}});

  const handleCloseModal = () => {
    setModalData((prev) => ({...prev, isOpen: false}));
  };

  return (
    <div>
      <Toolbar />
      <Ui />
      <div className="submit-container">
        <Submit
          onResult={(results) => setModalData({isOpen: true, results})}
        />
      </div>
      <Result
        isOpen={modalData.isOpen}
        onClose={handleCloseModal}
        results={modalData.results}
      />
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </div>
  );
}

export default App;

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotificationIndicator = () => {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
      />
    </>
  );
};

export default NotificationIndicator;

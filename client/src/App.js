import "./app.css";
import {
  TextField,
  Button,
  FormControl,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
  
      setLoading(true);
      await axios.post("http://localhost:9090/send_mail", formData);
      setLoading(false);
      toast.success("Email sent successfully !", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setFormData({
        email: "",
        name: "",
        message: "",
      })
      console.log("success");
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong !", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setFormData({
        email: "",
        name: "",
        message: "",
      })
      console.log(error);
    }
  };

  return (
    <form id="detail_form" className="contact-form" >
       
      <TextField
        label="Name"
        value={formData.name}
        type="text"
        name="name"
        variant="outlined"
        onChange={handleInputChange}
        required
      />
      <TextField
        label="Email"
        value={formData.email}
        type="email"
        name="email"
        variant="outlined"
        onChange={handleInputChange}
        required
      />
      <FormControl
        variant="outlined"
        sx={{
          minWidth: 120,
        }}>
        <TextField
          label="Message"
          type="text"
          value={formData.message}
          multiline
          rows={4}
          variant="outlined"
          name="message"
          required
          onChange={handleInputChange}
        />
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        sx={{
          marginTop: 2,
        }}
        onClick={handleSubmit}>
        {loading ? <CircularProgress color="inherit" size={25} /> : "Submit"}
      </Button>
      <ToastContainer />
    </form>
  );
};

export default App;

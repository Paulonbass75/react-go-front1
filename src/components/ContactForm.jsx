import React from 'react'
import axios from "axios";
import { useState } from 'react';
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";



  
export default function ContactForm() {

    // eslint-disable-next-line no-undef
    const [name, setName] = useState("");
    // eslint-disable-next-line no-undef
    const [email, setEmail] = useState("");
    // eslint-disable-next-line no-undef
    const [message, setMessage] = useState("");


    // eslint-disable-next-line no-undef
    const [alertMessage, setAlertMessage] = useState("");
    // eslint-disable-next-line no-undef
    const [alertClassName, setAlertClassName] = useState("d-none");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submitting");
        const data = {
            name: name,
            email: email,
            message: message,
        };
        axios
            .post("/contact", data)
            .then((res) => {
                console.log("res", res);
                setAlertClassName("alert alert-success");
                setAlertMessage("Message sent successfully");
                setName("");
                setEmail("");
                setMessage("");
            })
            .catch((err) => {
                console.log("err", err);
                setAlertClassName("alert alert-danger");
                setAlertMessage("Message failed to send");
            });

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "name") {
            setName(value);
        } else if (name === "email") {
            setEmail(value);
        } else if (name === "message") {
            setMessage(value);
        }
    };

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1 className="mt-4">Contact Us</h1>
            <form id="contact-form" onSubmit={handleSubmit} method="POST">
              <div className={alertClassName} role="alert">
                {alertMessage}
              </div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  className="form-control"
                  rows="5"
                  name="message"
                  value={message}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary mb-4">
                Submit
              </button>
            </form>
          </div>
          <div className="col-md-6">
            <h1 className="mt-4">Our Location</h1>
            {/* <div className="embed-responsive embed-responsive-16by9 mb-4">
                        // eslint-disable-next-line jsx-a11y/iframe-has-title
                        <iframe
                            className="embed-responsive-item"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.880508821434!2d-118.2844586847829!3d34.09000998060779!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bf2b3f9e1a9d%3A0x1b0e1b0e0b0e1b0e!2sThe%20Grove!5e0!3m2!1sen!2sus!4v1626950440324!5m2!1sen!2sus"
                            width="600"
                            height="450"
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div> */}
            <p>3348 Gateway Centre Parkway Gainesville, GA 30507</p>
            <p>Toll-Free: (833) 404-4777 Local: (770) 967-0909</p>
            <p>
              Email:
              <a
                href="mailto:

                        "
              ></a>
            </p>
            <p>
              Sales Hours: Mon-Fri 8am-6pm est Counter Hours: Mon-Fri 8am-5pm
              est
            </p>
          </div>
        </div>
      </div>
    );
}




//     return (
//        <div className="container">
//         <div className="row">
//             <div className="col-md-6">
//                 <h1 className="mt-4">Contact Us</h1>
//                 <form
//                     id="contact-form"
//                     onSubmit={this.handleSubmit}
//                     method="POST"
//                 >
//                     <div className={this.state.alertClassName} role="alert">
//                         {this.state.alertMessage}
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="name">Name</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             name="name"
//                             value={this.state.name}
//                             onChange={this.handleChange}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="exampleInputEmail1">Email address</label>
//                         <input
//                             type="email"
//                             className="form-control"
//                             aria-describedby="emailHelp"
//                             name="email"
//                             value={this.state.email}
//                             onChange={this.handleChange}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="message">Message</label>
//                         <textarea
//                             className="form-control"
//                             rows="5"
//                             name="message"
//                             value={this.state.message}
//                             onChange={this.handleChange}
//                         ></textarea>
//                     </div>
//                     <button type="submit" className="btn btn-primary mb-4">
//                         Submit
//                     </button>
//                 </form>
//             </div>
//             <div className="col-md-6">
//                 <h1 className="mt-4">Our Location</h1>
//                 <div className="embed-responsive embed-responsive-16by9 mb-4">
//                     // eslint-disable-next-line jsx-a11y/iframe-has-title
//                     <iframe
//                         className="embed-responsive-item"
//                         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.880508821434!2d-118.2860726847879!3d34.025351980609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1
//                         s0x80c2c7f1c8e8a0c1%3A0x7a0d1d8c8f5e2b8b!2sSanta%20Monica%20College!5e0!3m2!1sen!2sus!4v1598889362206!5m2!1sen!2sus"
//                         allowFullScreen
//                     ></iframe>
//                 </div>
//                 <p>
//                     3348 Gateway Centre Pkwy, Gaineville, GA 30057
//                     <br />
//                     Toll-Free (833) 404-4777
//                     Phone: (770) 967-6360-5555
//                     <br />
//                     Sales Hours: Mon-Fri 8am-6pm est
//                     Counter Hours: Mon-Fri 8am-5pm est
//                 </p>
//             </div>
//         </div>
//     </div>

//   );
// }







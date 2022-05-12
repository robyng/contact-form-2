import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_MESSAGE } from "../utils/mutations";

const Contact = (props) => {
  const [formState, setFormState] = useState({ email: '', userName: '', messageText: '' });
  // parameters for success, sending, and failed messages
  const [addMessage, { data, loading, error }] = useMutation(ADD_MESSAGE);


  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // add formState to db
    try {
      await addMessage({
        variables: { ...formState },
      });
    } catch (e) {
      console.error(e);
    };

    // clear formState values
    setFormState({
      email: '',
      userName: '',
      messageText: ''
    });

  };

  return (
    <main className=" justify-center mb-4">
      <h1 className='row'>Contact Us</h1>
      <div className="flex-row col-12 col-md-6">
        <div className="card">
          <h4 className="card-header">How can we help?</h4>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                placeholder="Your email"
                name="email"
                type="email"
                id="email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="Your name"
                name="userName"
                type="text"
                id="userName"
                value={formState.userName}
                onChange={handleChange}
              />
              <textarea
                placeholder="Your Message"
                className="form-input"
                name="messageText"
                type="text"
                value={formState.messageText}
                onChange={handleChange}
              />
              <button className="btn d-block w-100" type="submit">
                Submit
              </button>
            </form>
            {data && <div>Success!</div>}
            {loading && <div>Sending...</div>}
            {error && <div>Message failed. Try again?</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
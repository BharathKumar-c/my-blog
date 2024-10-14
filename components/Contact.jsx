'use client';
import React, {useState} from 'react';

const Contact = () => {
  const [contactForm, setContactForm] = useState({});
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const {name, value} = e.target;
    setContactForm({...contactForm, [name]: value});
  };

  const formValidation = () => {
    let error = {};

    if (!contactForm?.name?.length > 0) {
      error.name = 'Name is required';
    }

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{0,5}$/;
    if (!emailPattern.test(contactForm?.email)) {
      error.email = 'Email is invalid';
    }

    if (!contactForm?.message?.length > 0) {
      error.message = 'Message is required';
    }

    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = formValidation();

    if (Object.keys(validation).length === 0) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/enquiry`, {
        method: 'POST',
        body: JSON.stringify(contactForm),
      })
        .then((res) => res.json())
        .then((res) => setMessage(res.message))
        .catch((e) => {
          console.log(e);
          setMessage(e);
        })
        .finally(() => {
          setContactForm({});
          setErrors({});
          setTimeout(() => setMessage(''), 3000);
        });
    } else {
      setErrors(validation);
    }
  };

  return (
    <main className="container mx-auto px-4 py-6">
      <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
      {message && (
        <p className="bg-green-300 text-green-800 text-lg flex justify-center items-center p-4 m-3">
          {message}
        </p>
      )}
      <form className="w-full max-w-4xl" onSubmit={handleSubmit}>
        <div className="flex items-center mb-4">
          <label htmlFor="name" className="w-1/4">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={contactForm.name ?? ''}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-2/4"
          />
          <p className="text-red-600 text-sm w-2/4 flex items-center ml-2">
            {errors?.name ?? ''}
          </p>
        </div>
        <div className="flex items-center mb-4">
          <label htmlFor="email" className="w-1/4">
            Email:
          </label>
          <input
            id="email"
            name="email"
            value={contactForm.email ?? ''}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-2/4"
          />
          <p className="text-red-600 text-sm w-2/4 flex items-center ml-2">
            {errors?.email ?? ''}
          </p>
        </div>
        <div className="flex items-center mb-4">
          <label htmlFor="message" className="w-1/4">
            Message:
          </label>
          <textarea
            id="message"
            className="border rounded px-2 py-1 w-2/4"
            name="message"
            onChange={handleChange}
            value={contactForm.message ?? ''}
            rows="4"></textarea>
          <p className="text-red-600 text-sm w-2/4 flex items-center ml-2">
            {errors?.message ?? ''}
          </p>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </main>
  );
};

export default Contact;

import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";

export default function Form({ featureId, updateComments }) {
  const [comment, setComment] = useState("");

  const onInputChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://127.0.0.1:3000/api/features/${featureId}/comments`,
        {
          body: comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setComment("");
      updateComments();
    } catch (error) {
      console.error(error);
    }
    setComment("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="col-span-full">
        <label
          htmlFor="about"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Comentar
        </label>
        <div className="mt-2">
          <textarea
            id="about"
            name="comment"
            rows={3}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={comment}
            onChange={onInputChange}
          />
        </div>
        <p className="mt-3 text-sm leading-6 text-gray-600">
          Write a few sentences about yourself.
        </p>
      </div>
      <button
        type="submit"
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Enviar
      </button>
    </form>
  );
}

Form.propTypes = {
  featureId: PropTypes.string,
  updateComments: PropTypes.func,
};

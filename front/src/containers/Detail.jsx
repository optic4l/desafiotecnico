import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Form from "../components/Form";
const Detail = () => {
  const [comments, setComments] = useState([]);
  const { featureId } = useParams();
  const { state } = useLocation();

  const getComments = async () => {
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:3000/api/features/${featureId}/comments`
      );
      setComments(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateComments = async () => {
    getComments();
  };

  useEffect(() => {
    getComments();
  }, []);
  return (
    <div>
      <h1>
        Feature #{state.id} - {state.attributes.external_id}
      </h1>
      <h2>{state.attributes.title} </h2>
      <p>
        {state.attributes.magnitude} {state.attributes.mag_type}
      </p>
      <p>{state.attributes.place}</p>
      <p>{state.attributes.tsunami}</p>
      <p>{state.attributes.links.external_url}</p>

      <h2>Comentarios</h2>
      <ul>
        {comments?.map((comment) => (
          <li key={comment.id}>
            {comment.created_at} {comment.body}
          </li>
        ))}
        <div>
          <Form featureId={featureId} updateComments={updateComments} />
        </div>
      </ul>
    </div>
  );
};

export default Detail;

Detail.propTypes = { feature: PropTypes.object };

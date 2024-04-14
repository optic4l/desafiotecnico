import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [features, setFeatures] = useState([]);
  const [pagination, setPagination] = useState({});
  const getFeatures = async () => {
    try {
      const resp = await axios.get(
        "http://127.0.0.1:3000/api/features?page=1&per_page=2"
      );
      setFeatures(resp.data.data);
      setPagination(resp.data.pagination);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFeatures();
  }, []);

  console.log("Features: ", features);
  console.log("Pagination: ", pagination);
  return (
    <div className="container flex flex-col justify-center items-center p-5">
      <h1 className="text-3xl font-bold underline">Listado de Features</h1>
      <div>
        <table>
          <thead>
            <tr>
              <td>Titulo</td>
              <td>Lugar</td>
              <td>Magnitud</td>
              <td>Tipo Magnitud</td>
              <td>Coordenadas</td>
              <td>URL</td>
            </tr>
          </thead>
          <tbody>
            {features?.map((feature) => (
              <tr key={feature.id}>
                <td>{feature.attributes.title}</td>
                <td>{feature.attributes.place}</td>
                <td>{feature.attributes.magnitude}</td>
                <td>{feature.attributes.magType}</td>
                <td>
                  {feature.attributes.coordinates.latitude}
                  {","}
                  {feature.attributes.coordinates.longitude}
                </td>
                <td>{feature.attributes.links.external_url}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

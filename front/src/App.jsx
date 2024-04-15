import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Filters from "./components/Filters";
import PaginationFooter from "./components/paginationFooter";

function App() {
  const [features, setFeatures] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState([]);

  const getFeatures = async () => {
    try {
      let filtersParams = "";
      if (filters.length > 0) {
        filters.forEach((filter) => {
          filtersParams += `&mag_type[]=${filter}`;
        });
      }
      const { data } = await axios.get(
        `http://127.0.0.1:3000/api/features?page=${page}&per_page=10${filtersParams}`
      );
      setFeatures(data.data);
      setPagination(data.pagination);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSetFilters = (filters) => {
    setFilters(filters);
  };

  useEffect(() => {
    getFeatures();
  }, [page, filters]);

  console.log("Features: ", features);
  console.log("Pagination: ", pagination);
  console.log("page", page);
  console.log("filters: ", filters);
  return (
    <div className="container flex flex-col justify-center items-center p-5 w-full">
      <h1 className="text-3xl font-bold underline">Listado de Features</h1>
      <div className="container p-5">
        <Filters setFiltersCallback={handleSetFilters} />
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
                <td>{feature.attributes.mag_type}</td>
                <td>
                  {feature.attributes.coordinates.latitude}
                  {","}
                  {feature.attributes.coordinates.longitude}
                </td>
                <td>{feature.attributes.links.external_url}</td>
                <td>
                  <Link to={`${feature.id}`} state={feature}>
                    Detalles
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <PaginationFooter
              actual={pagination.current_page}
              limiteInferior={pagination.current_page * 10 - 9}
              limiteSuperior={pagination.current_page * 10}
              total={pagination.total}
              setActualCallback={setPage}
            />
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default App;

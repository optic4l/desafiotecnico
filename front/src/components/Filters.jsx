import PropTypes from "prop-types";
import { useState } from "react";

const Filters = ({ setFiltersCallback }) => {
  const filters = ["md", "ml", "ms", "mw", "me", "mi", "mb", "mlg"];
  const [activeFilters, setActiveFilters] = useState([]);

  const toggleFilter = (filter) => {
    const isActive = activeFilters.includes(filter);

    let updatedFilters;

    if (isActive) {
      updatedFilters = activeFilters.filter((f) => f !== filter);
    } else {
      updatedFilters = [...activeFilters, filter];
    }

    setActiveFilters(updatedFilters);

    setFiltersCallback(updatedFilters);
  };

  return (
    <div className="flex gap-2">
      <h1>
        <strong>Filtros</strong>
      </h1>
      <div>
        <ul className="flex gap-4">
          {filters.map((filter) => (
            <li key={filter}>
              <button
                onClick={() => toggleFilter(filter)}
                className={
                  activeFilters.includes(filter) ? " bg-slate-600" : ""
                }
              >
                {filter}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Filters;

Filters.propTypes = { setFiltersCallback: PropTypes.func };

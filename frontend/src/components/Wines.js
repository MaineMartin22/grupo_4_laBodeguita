import React, { useEffect, useState } from "react";
import TarjetaCategoria from "./CategoryWines";

function Wines() {
  const [categoriasVinos, setCategoriasVinos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:2000/api/products')
      .then((response) => response.json())
      .then((data) => {
        setCategoriasVinos(data.meta.countByCategory);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Cantidad de vinos por tipo de vino
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            {categoriasVinos.length > 0 && categoriasVinos.map((categoria, index) => {
              return <TarjetaCategoria {...categoria} key={index}/>
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wines;
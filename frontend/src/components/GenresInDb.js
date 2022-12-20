import React, { useState, useEffect } from 'react';

function GenresInDb() {

  const [totalColors, setTotalColors] = useState({})

  useEffect(() => {
    fetch('http://localhost:2000/api/colors')
      .then(response => response.json())
      .then((data) => {
        //console.log(data);
        let color = data.data
        setTotalColors(color)
      })
  }, [])
  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Colors of wines in Data Base
          </h5>
        </div>
        <div className="card-body">
          {totalColors.length > 0 && totalColors.map( color => {
            return (
              <>
                <div className="row">
                  <div className="col-lg-6 mb-12">
                    <div className="card bg-dark text-white shadow">
                      <div className="card-body">
                        {color.name}
                        </div>
                    </div>
                  </div>
                </div>
              </>
            )
          })}
          
        </div>
      </div>
    </div>
  );
}

export default GenresInDb;

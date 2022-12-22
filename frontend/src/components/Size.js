import React, { useState, useEffect } from 'react';

function Size() {

  const [sizes, setSizes] = useState({})

  useEffect(() => {
    fetch('http://localhost:2000/api/sizes')
      .then(response => response.json())
      .then((data) => {
        //console.log(data);
        let size = data.data
        setSizes(size)
      })
  }, [])
  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">
            Sizes of wines in Data Base
          </h5>
        </div>
        <div className="row card-body">
          {sizes.length > 0 && sizes.map( size => {
            return (
              <>
                <div className="col-lg-6 mb-4">
                  <div className="">
                    <div className="card bg-dark text-white shadow">
                      <div className="card-body">
                        {size.name}
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

export default Size;
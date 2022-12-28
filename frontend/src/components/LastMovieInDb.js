import React, { useState, useEffect } from 'react';

function LastMovieInDb() {

    const [totalProducts, setTotalProducts] = useState({})

    useEffect(() => {
        fetch('http://localhost:2000/api/products')
            .then(response => response.json())
            .then((data) => {
                //console.log(data);
                let i = data.data.length - 1
                let lastProduct = data.data[i]
                setTotalProducts(lastProduct)
            })
    }, [])

    return (
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Last product in Data Base</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <h1>{totalProducts.name}</h1>
                        <br />
                        <h5>Descripción: 
                        <br />
                             {totalProducts.description}</h5>
                        <br />
                        <h5>Bodega: {totalProducts.cellar}</h5>
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: 25 + 'rem' }} src={totalProducts.image} alt={totalProducts.name} />
                    </div>
                    <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">View movie detail</a>
                </div>
            </div>
        </div>
    )
}

export default LastMovieInDb;

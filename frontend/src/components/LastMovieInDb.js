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
        <div className="col-lg-12 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Último producto en la DB</h5>
                </div>
                <div className="card-body">
                    <div className="text-left">
                        <h1><b>{totalProducts.name}</b></h1>
                        <br />
                        <h4> <b>Descripción:</b> {totalProducts.description}</h4>
                        <h4><b>Bodega:</b> {totalProducts.cellar}</h4>
                        <h4><b>Precio:</b> ${totalProducts.price}</h4>
                        <h4><b>Tipo:</b> {totalProducts.type}</h4>
                        <h4><b>Alcohol:</b> {totalProducts.alcohol}</h4>
                        <h4><b>Color:</b> {totalProducts.color}</h4>
                        <div className="text-center">
                            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: 25 + 'rem' }} src={totalProducts.image} alt={totalProducts.name} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LastMovieInDb;

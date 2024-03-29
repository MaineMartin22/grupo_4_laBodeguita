import React, { useEffect, useState } from 'react';
import ChartRow from './ChartRow';


function Chart() {

    const [totalProducts, setTotalProducts] = useState({})

    useEffect(() => {
        fetch('http://localhost:2000/api/products')
            .then(response => response.json())
            .then((data) => {
                //console.log(data);
                let total = data.data
                setTotalProducts(total)
            })

            .catch(error => (error))
    }, [])
    return (
        /* <!-- DataTales Example --> */
        <div className="card shadow mb-4">
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <h4>Listado de productos</h4>
                            <tr>
                                <th>Producto</th>
                                <th>Bodega</th>
                                <th>Color</th>
                                <th>Precio</th>
                                <th>Tipo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <ChartRow products = {totalProducts}/>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default Chart;
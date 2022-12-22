import React, { useState, useEffect, useRef } from 'react';


function SearchMovies() {

	const [products, setProducts] = useState({})
	const [keyword, setKeyword] = useState()

	const busqueda = useRef();

	useEffect(() => {
	  fetch('http://localhost:2000/api/products')
		.then(response => response.json())
		.then((data) => {
		  //console.log(data);
		  let product = data.data
		  setProducts(product)
		})
	}, [busqueda])



	const handleSubmit = (e) => {
		e.preventDefault();

		const inputValue = busqueda.current.value

		console.log(inputValue);

		setKeyword(inputValue)

		fetch(`http://localhost:2000/api/products/search/${inputValue}`)
		.then(response => response.json())
		.then((data) => {
		  //console.log(data);
		  let product = data.data
		  setProducts(product)
		})
		
	}

	
	return (
		<div className="container-fluid">
			{
				//apiKey !== '' ?
				<>
					<div className="row my-4">
						<div className="col-12 col-md-6">
							{/* Buscador */}
							<form method="GET" onSubmit={handleSubmit}>
								<div className="form-group">
									<label htmlFor="">Buscar por título:</label>
									<input ref={busqueda} type="text" className="form-control" />
								</div>
								<button className="btn btn-info">Search</button>
							</form>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<h2>Productos para la palabra: {keyword}</h2>
						</div>
						{/* Listado de productos */}
						{
							products.length > 0 && products.map( product => {
								return (
									<div className="col-sm-6 col-md-3 my-4" key={product.id}>
										<div className="card shadow mb-4">
											<div className="card-header py-3">
												<h5 className="m-0 font-weight-bold text-gray-800">{product.name}</h5>
											</div>
											<div className="card-body">
												<div className="text-center">
													<img
														className="img-fluid px-3 px-sm-4 mt-3 mb-4"
														src={product.image}
														alt={product.name}
														style={{ width: '100%', height: '300px', objectFit: 'cover' }}
													/>
												</div>
												[{/* <p>{movie.Year}</p> */}]
											</div>
										</div>
									</div>
								)
							})
						}
					</div>
					{products.length === 0 && <div className="alert alert-warning text-center">No se encontraron películas</div>}
				</>
				/* :
				<div className="alert alert-danger text-center my-4 fs-2">Eyyyy... ¿PUSISTE TU APIKEY?</div> */
			}
		</div>
	)
}

export default SearchMovies;

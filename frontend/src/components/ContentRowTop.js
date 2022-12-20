import React, {useEffect, useState} from 'react';
import ContentRowCenter from './ContentRowCenter';
import ContentRowMovies from './ContentRowMovies';
import Chart from './Chart';

function ContentRowTop(){

	const [totalProducts, setTotalProducts] = useState({})

	const [allUsers, setAllUsers] = useState({})

	const [allCellars, setAllCellars] = useState({})

	useEffect(() => {
		fetch('http://localhost:2000/api/products')
			.then(response => response.json())
			.then((data) => {
                //console.log(data);
                let total = data.data
                setTotalProducts(total)
            })
            
			.catch(error => (error))

			fetch('http://localhost:2000/api/users')
			.then(response => response.json())
			.then((data) => {
                //console.log(data);
                let user = data.users
                setAllUsers(user)
            })
            
			.catch(error => (error))

			fetch('http://localhost:2000/api/cellar')
			.then(response => response.json())
			.then((data) => {
                //console.log(data);
                let cellar = data.data
                setAllCellars(cellar)
            })
            
			.catch(error => (error))

       
	}, [])
    return(
        <React.Fragment>
				{/*<!-- Content Row Top -->*/}
				<div className="container-fluid">
					<div className="d-sm-flex aligns-items-center justify-content-between mb-4">
						<h1 className="h3 mb-0 text-gray-800">Dashboard La Bodeguita</h1>
					</div>
				
					{/*<!-- Content Row Movies-->*/}
					<ContentRowMovies products = {totalProducts} users = {allUsers} cellars = {allCellars}/>
					<ContentRowCenter />
					<Chart />
					
				</div>
				{/*<!--End Content Row Top-->*/}

        </React.Fragment>
    )

}
export default ContentRowTop;
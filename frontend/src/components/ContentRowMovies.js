import React from 'react';
import SmallCard from './SmallCard';

function ContentRowMovies(props){
    

    return (
        <div className='row'>
            <SmallCard 
                title= 'Total products'
                color= 'primary'
                cuantity = {props.products.length}
                icon= 'fas fa-wine-bottle'
            />
             <SmallCard 
                title= 'Total users'
                color= 'success'
                cuantity = {props.users.length}
                icon= "fa-sharp fas fa-users"
            />
             <SmallCard 
                title= 'Total cellars'
                color= 'warning'
                cuantity = {props.cellars.length}
                icon= 'fa-clipboard-list'
            />
    </div>
    )
}

export default ContentRowMovies;
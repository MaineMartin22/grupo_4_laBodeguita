import React from 'react';
import SmallCard from './SmallCard';

function ContentRowMovies(props){
    
    return (
        <div className='row'>
            <SmallCard 
                title= 'Total de productos'
                color= 'primary'
                cuantity = {props.products ? props.products.length : 0}
                icon= 'fas fa-wine-bottle'
            />
             <SmallCard 
                title= 'Total de usuarios'
                color= 'success'
                cuantity = {props.users ? props.users.length : 0}
                icon= "fa-sharp fas fa-users"
            />
             <SmallCard 
                title= 'Total de bodegas'
                color= 'warning'
                cuantity = {props.cellars ? props.cellars.length: 0}
                icon= 'fa-clipboard-list'
            />
    </div>
    )
}

export default ContentRowMovies;
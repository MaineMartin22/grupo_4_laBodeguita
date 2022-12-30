import React, {useEffect, useState} from 'react';
import LastMovieInDb from './LastMovieInDb';
import GenresInDb from './GenresInDb';
import Size from './Size';
import Wines from './Wines';

function ContentRowCenter(){
   
    return (
        <div className="row">
            {/*<!-- Last Movie in DB -->*/}
            <LastMovieInDb />

            {/*<!-- Genres in DB -->*/}
            <GenresInDb />
            <Size />
            <Wines/>
          

        </div>
    )
}

export default ContentRowCenter;
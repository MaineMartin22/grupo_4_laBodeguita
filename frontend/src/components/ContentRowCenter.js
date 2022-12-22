import React from 'react';
import LastMovieInDb from './LastMovieInDb';
import GenresInDb from './GenresInDb';
import Size from './Size';

function ContentRowCenter(){
    return (
        <div className="row">
            {/*<!-- Last Movie in DB -->*/}
            <LastMovieInDb />

            {/*<!-- Genres in DB -->*/}
            <GenresInDb />
            <Size />
          

        </div>
    )
}

export default ContentRowCenter;
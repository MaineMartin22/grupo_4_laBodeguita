import React from 'react';
import LastMovieInDb from './LastMovieInDb';
import GenresInDb from './GenresInDb';

function ContentRowCenter(){
    return (
        <div className="row">
            
            {/*<!-- Last Movie in DB -->*/}
            <LastMovieInDb />

            {/*<!-- Genres in DB -->*/}
            <GenresInDb />

        </div>
    )
}

export default ContentRowCenter;
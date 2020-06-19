import React, { useState } from 'react';
import Artists from './Artists';

const ArtistSearch = ({ spotifyApi }) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [artists, setArtists] = useState([]);

    const handleSearchTerm = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        spotifyApi.search(searchTerm, ['artist'], { limit: 5}).then((response) => {
            console.log(response.artists.items);
            setArtists(response.artists.items);
        })
    }
    
    return ( 
        <div>
            <form style={{marginBottom: "40px"}} onSubmit={handleSearchSubmit} >
                <input className="search-input"
                       placeholder="Enter an artist" 
                       value={searchTerm} 
                       onChange={handleSearchTerm}
                />
            </form>
            
            <Artists artists={artists} />
        </div>
    );
}
 
export default ArtistSearch;
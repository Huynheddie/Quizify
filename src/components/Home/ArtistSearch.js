import React, { useState, useEffect } from 'react';
import ArtistPanels from './ArtistPanels';
import SpotifyWebApi from 'spotify-web-api-js';

const ArtistSearch = (props) => {
    const spotifyApi = new SpotifyWebApi();

    const [searchTerm, setSearchTerm] = useState('');
    const [artists, setArtists] = useState([]);
    const [token, setToken] = useState();

    useEffect(() => {
        const token = sessionStorage.getItem("access_token");
        setToken(token);
    }, []);

    useEffect(() => {
        if (token) {
            spotifyApi.setAccessToken(token);
        }
    }, [token, spotifyApi]);

    useEffect(() => {
        if (searchTerm) {
            spotifyApi.search(searchTerm, ['artist'], { limit: 15}).then((response) => {
                setArtists(response.artists.items);
            });
        }
    }, [searchTerm, spotifyApi]);

    const handleSearchTerm = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchTerm) {
            spotifyApi.search(searchTerm, ['artist'], { limit: 6}).then((response) => {
                setArtists(response.artists.items);
            });
        }
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
            
            <ArtistPanels artists={artists} />
        </div>
    );
}
 
export default ArtistSearch;
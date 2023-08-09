
const clientId = "ac28a2d5b15f4bfd85e07a3f4f5aa3f2";
const redirectUri = "http://kitty-fy.surge.sh";
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    // check for access token match
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      // This clears the parameters, allowing us to grab a new access token when it expires.
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    }).then(response => {
        return response.json();
    }).then(jsonResponse => {
        if (!jsonResponse.tracks){
            return [];
        }
        return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
        }))
    })
  },

async savePlaylist(playlistName, trackUris) {
    const accessToken = Spotify.getAccessToken();

    try {
      // Create a new playlist on the user's Spotify account
      const response = await fetch('https://api.spotify.com/v1/me/playlists', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: playlistName }),
      });

      if (response.ok) {
        const playlist = await response.json();
        // Add tracks to the newly created playlist
        await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uris: trackUris }),
        });

        // You can return the playlist ID or any other relevant data if needed
        return playlist.id;
      } else {
        throw new Error('Failed to create playlist');
      }
    } catch (error) {
      console.error('Error saving playlist:', error);
      // Handle the error appropriately, e.g., show an error message to the user
      return 'Error';
    }
  },
};

export default Spotify;

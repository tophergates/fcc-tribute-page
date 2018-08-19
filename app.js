(function(context) {
  'use strict';

  function loadDiscography() {
    // Go get the discography info
    const getData = fetch('./discography.json')
      .then(function(res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function(res) {
        return res.data;
      })
      .catch(function(error) {
        console.error(error);
      });

    // Insert the data into the HTML
    getData.then(function(discography) {
      if (Array.isArray(discography) && discography.length > 0) {
        const listEl = document.getElementById('js-discography-list');

        // Sort by release year
        discography.sort(function(a, b) {
          return a.releaseYear < b.releaseYear;
        });

        // Build the HTML
        const html = discography
          .map(function(album) {
            const html = [];
            album.tracks.sort(function(a, b) {
              return a.number - b.number;
            });

            html.push(`<li class="album">`);
            html.push(
              `<img class="album-artwork" src="./images/${album.image}" alt="Album artwork for ${
                album.albumName
              }" />`
            );
            html.push(`<h3 class="album__name">${album.albumName} (${album.releaseYear})</h3>`);
            html.push('<ol class="track-list">');
            html.push(
              album.tracks
                .map(function(track) {
                  return `<li class="track">${
                    track.isSingle ? '<span class="track__single">☆</span>' : ''
                  }${track.name}</li>`;
                })
                .join('')
            );
            html.push('</ol>');
            html.push('</li>');

            return html.join('');
          })
          .join('');

        // Append the HTML to the list element
        listEl.innerHTML = html;
      }
    });
  }

  window.addEventListener('load', loadDiscography);
})(window || {}, undefined);

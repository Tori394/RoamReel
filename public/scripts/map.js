document.addEventListener("DOMContentLoaded", function() {
    const panZoom = svgPanZoom('#allSvg', {
        zoomEnabled: true,
        panEnabled: true,
        minZoom: 1,
        maxZoom: 5,
        fit: true,
        center: true,
        beforePan: function(oldPan, newPan) {
        const padding = 80;
        const sizes = this.getSizes();
        const zoom = this.getZoom();

        const maxWidthOffset = sizes.width - sizes.viewBox.width * zoom;
        const maxHeightOffset = sizes.height - sizes.viewBox.height * zoom + padding;
        const minPanX = sizes.width - (sizes.viewBox.width * zoom);

        return {
            x: Math.min(padding, Math.max(newPan.x, Math.max(maxWidthOffset, minPanX))),
            y: Math.min(padding, Math.max(newPan.y, maxHeightOffset))
        };
    }

    });
});

document.addEventListener("DOMContentLoaded", () => {
  const countries = document.querySelectorAll("#allSvg .allPaths");
  const panel = document.getElementById("countryGallery");
  const closeBtn = document.getElementById("closePanel");

  const titleElement = document.getElementById("countryNameTitle");
  const reelsContainer = document.getElementById("countryReelsContainer");

  countries.forEach(country => {
    country.addEventListener("click", () => {
      const countryName = country.id;
      //nazwa kraju z id
      titleElement.textContent = countryName;

      //czyszczenie poprzednich reelów
      reelsContainer.innerHTML = `<p>Loading reels for ${countryName}...</p>`;
      panel.classList.add("active");

      const formData = new FormData();
      formData.append('country', countryName);

      fetch('/getCountryReels', {
          method: "POST",
          body: formData 
      })
      .then(response => {
          if (!response.ok) {
              throw new Error("Network response was not ok");
          }
          return response.json();
      })
      .then(data => {
          reelsContainer.innerHTML = ""; 

          if (data.reels && data.reels.length > 0) {
              data.reels.forEach(reel => {
                  const imgPath = reel.thumbnail_name;
                  const dateObj = new Date(reel.created_at);
                  const dateDisplay = dateObj.toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  });
                  
                  const reelWrapper = document.createElement("div");
                  reelWrapper.classList.add("trip-card"); 

                  reelWrapper.innerHTML = `
                      <img src="${imgPath}" alt="Trip thumbnail">
                      <div class="trip-info">
                          <span class="trip-date">${dateDisplay}</span>
                      </div>
                  `;

                  reelsContainer.appendChild(reelWrapper);
              });
          } else {
              reelsContainer.innerHTML = "<p>You haven't been in this country yet</p>";
          }
      })
    });
  });

  closeBtn.addEventListener("click", () => {
    panel.classList.remove("active");
  });
});

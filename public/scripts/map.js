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
  const infoContent = document.getElementById("infoContent");

  countries.forEach(country => {
    country.addEventListener("click", () => {
      const countryName = country.id;
      infoContent.innerHTML = `
        <h2>${countryName}</h2>
        <p>You haven't been in this country yet</p>
      `;
      panel.classList.add("active");
    });
  });

  closeBtn.addEventListener("click", () => {
    panel.classList.remove("active");
  });
});

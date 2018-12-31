import useGoogle from "./useGoogle";

let infoWindow;

class Popup {};

function definePopupClass(google) {
  Popup = class extends google.maps.OverlayView {
    /** Called when the popup is added to the map. */
    onAdd() {
      this.getPanes().floatPane.appendChild(this.anchor);
    }

    onRemove() {
      if (this.anchor.parentElement) {
        this.anchor.parentElement.removeChild(this.anchor);
      }
    }

    open(map, marker) {
      this.setMap(map);
      
      this.marker = marker;
    }

    close() {
      this.setMap(null);
    }

    setContent(node) {
      var pixelOffset = document.createElement('div');
      pixelOffset.classList.add('popup-bubble-anchor');
      pixelOffset.appendChild(node);

      this.anchor = document.createElement('div');
      this.anchor.classList.add('popup-tip-anchor');
      this.anchor.appendChild(pixelOffset);

      this.stopEventPropagation();
    }

    draw() {
      const divPosition = this.getProjection().fromLatLngToDivPixel(
        this.marker.getPosition()
      );
      divPosition.x += this.marker.anchorPoint.x;
      divPosition.y += this.marker.anchorPoint.y;
      // Hide the popup when it is far out of view.
      var display =
        Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000
          ? "block"
          : "none";

      if (display === "block") {
        this.anchor.style.left = divPosition.x + "px";
        this.anchor.style.top = divPosition.y + "px";
      }
      if (this.anchor.style.display !== display) {
        this.anchor.style.display = display;
      }
    }

    stopEventPropagation() {
      var anchor = this.anchor;
      anchor.style.cursor = "auto";

      [
        "click",
        "dblclick",
        "contextmenu",
        "wheel",
        "mousedown",
        "touchstart",
        "pointerdown"
      ].forEach(function(event) {
        anchor.addEventListener(event, function(e) {
          e.stopPropagation();
        });
      });
    }
  }
}

export default function useInfoWindow() {
  const google = useGoogle();
  if (!infoWindow) {
    definePopupClass(google);
    infoWindow = new Popup();
  }

  return infoWindow;
}

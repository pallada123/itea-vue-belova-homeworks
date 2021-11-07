const app = new Vue({
    el: '#app',
    data: {
        popupOpen: 'Show Pop-up',
        idPopupOverlay: {
            id: 'popup-overlay'
        },
        idPopup: {
            id: 'popup'
        },
        idPopupContent: {
            id: 'popup-content'
        },
        classClose: 'popup-close',
        popupIsShown: false,
        bgColors: [
            {
                btnName: 'Lilac',
                btnClassForPopup: 'bg-lilac'
            },
            {
                btnName: 'Green',
                btnClassForPopup: 'bg-green'
            },
            {
                btnName: 'Yellow',
                btnClassForPopup: 'bg-yellow'
            }
        ],
        popupClass: 'bg-lilac',
        btnActiveClass: 'btn-active'
    }

});

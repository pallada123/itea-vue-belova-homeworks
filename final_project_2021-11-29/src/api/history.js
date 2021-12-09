const storageName = 'history';

const api =  {

    pullStorage() {
        if (!localStorage.getItem(storageName) || !localStorage.getItem(storageName).length) {
            const data = [];
            localStorage.setItem(storageName, JSON.stringify(data));
        }
        return JSON.parse(localStorage.getItem(storageName));
    },

    updateHistory(data) {
        this.pullStorage();
        localStorage.setItem(storageName, JSON.stringify(data));
    },

};


export default api;
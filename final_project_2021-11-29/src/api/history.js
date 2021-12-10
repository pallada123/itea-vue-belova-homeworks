const storageName = 'history';

const api =  {

    /**
     *
     * @returns {any}
     */
    pullStorage() {
        if (!localStorage.getItem(storageName) || !localStorage.getItem(storageName).length) {
            const data = [];
            localStorage.setItem(storageName, JSON.stringify(data));
        }
        return JSON.parse(localStorage.getItem(storageName));
    },

    /**
     *
     * @param data
     */
    updateHistory(data) {
        this.pullStorage();
        localStorage.setItem(storageName, JSON.stringify(data));
    },

};


export default api;
import testDataBase from '../data/testStorageData.js'; // for testing only

const storageName = 'toDoList';

const api =  {

    pushTestStorage() {
        if (!this.pullStorage().usersList) {
            localStorage.setItem(storageName, JSON.stringify(testDataBase));
        }
    },

    pullStorage() {
        if (localStorage.getItem(storageName)) {
            return JSON.parse(localStorage.getItem(storageName));
        } else {
            return {};
        }
    },

    getActiveUser() {
        const data = this.pullStorage();
        return data.activeUserId || 0;
    },

    setActiveUser(activeUserId) {
        const data = this.pullStorage();
        data.activeUserId = activeUserId
        localStorage.setItem(storageName, JSON.stringify(data));
    },

    updateUsersList(userId, usersArray) {
        const data = this.pullStorage();

        if (!data.usersList.length) {
            data.usersList = [];
            data.usersData = [];
        }

        data.usersList = usersArray.map(item => item);

        const newUserData = {
            userId: userId,
            toDoList: []
        }

        data.usersData.push(newUserData);

        localStorage.setItem(storageName, JSON.stringify(data));
    },

    updateUserToDoList(userId, toDoArray) {
        const data = this.pullStorage();

        const user = data.usersData.find((item) => item.userId === userId);
        user.toDoList = toDoArray;

        localStorage.setItem(storageName, JSON.stringify(data));
    },

    getUserToDoList(userId) {
        const data = this.pullStorage();

        return data.usersData.find((item) => item.userId === userId).toDoList;
    },

    getUsersList() {
        const data = this.pullStorage();

        return data.usersList;
    }

};


export default api;
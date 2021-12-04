import testDataBase from '../data/testStorageData.js'; // for testing only

const storageName = 'toDoList';

const api =  {

    pushTestStorage() {
        if (!this.pullStorage().usersList) {
            localStorage.setItem(storageName, JSON.stringify(testDataBase));
        }
    },

    pullStorage() {
        if (!localStorage.getItem(storageName)) {
            const data = {
                activeUserId: 0,
                usersList: [],
                usersData: []
            }
            localStorage.setItem(storageName, JSON.stringify(data));
        }
        return JSON.parse(localStorage.getItem(storageName));
    },

    getActiveUser() {
        const data = this.pullStorage();
        if (!this.pullStorage().usersList) {
            return null;
        }
        return data.usersList.find((item) => item.userId === data.activeUserId);
    },

    setActiveUser(activeUserId) {
        const data = this.pullStorage();
        data.activeUserId = activeUserId
        localStorage.setItem(storageName, JSON.stringify(data));
    },

    updateUsersList(userId, usersArray) {
        const data = this.pullStorage();

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
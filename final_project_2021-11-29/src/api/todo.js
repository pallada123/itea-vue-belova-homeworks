import testDataBase from '../data/testStorageData.js'; // for testing only

const storageName = 'toDoList';

const api =  {
    /**
     *
     */
    pushTestStorage() {
        if (!this.pullStorage().usersList.length) {
            localStorage.setItem(storageName, JSON.stringify(testDataBase));
        }
    },

    /**
     *
     * @returns {any}
     */
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

    /**
     *
     *
     */
    getActiveUser() {
        const data = this.pullStorage();
        if (!data.usersList) {
            return null;
        }
        return data.usersList.find((item) => item.userId === data.activeUserId);
    },

    /**
     *
     * @param activeUserId
     */
    setActiveUser(activeUserId) {
        const data = this.pullStorage();
        data.activeUserId = activeUserId
        localStorage.setItem(storageName, JSON.stringify(data));
    },

    /**
     *
     * @param userId
     * @param usersArray
     */
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

    /**
     *
     * @param userId
     * @param toDoArray
     */
    updateUserToDoList(userId, toDoArray) {
        const data = this.pullStorage();

        const user = data.usersData.find((item) => item.userId === userId);
        user.toDoList = toDoArray;

        localStorage.setItem(storageName, JSON.stringify(data));
    },

    /**
     *
     * @param userId
     * @returns {[]|[{taskDescription: string, taskImgUrl: string, taskName: string, isEdited: boolean, isDone: boolean, taskId: number, taskStatus: string, taskCreationDate: string}, {taskDescription: string, taskImgUrl: string, taskName: string, isEdited: boolean, isDone: boolean, taskId: number, taskStatus: string, taskCreationDate: string}, {taskDescription: string, taskImgUrl: string, taskName: string, isEdited: boolean, isDone: boolean, taskId: number, taskStatus: string, taskCreationDate: string}, {taskDescription: string, taskImgUrl: string, taskName: string, isEdited: boolean, isDone: boolean, taskId: number, taskStatus: string, taskCreationDate: string}, {taskDescription: string, taskImgUrl: string, taskName: string, isEdited: boolean, isDone: boolean, taskId: number, taskStatus: string, taskCreationDate: string}]|[{taskDescription: string, taskImgUrl: string, taskName: string, isEdited: boolean, isDone: boolean, taskId: number, taskStatus: string, taskCreationDate: string}, {taskDescription: string, taskImgUrl: string, taskName: string, isEdited: boolean, isDone: boolean, taskId: number, taskStatus: string, taskCreationDate: string}, {taskDescription: string, taskImgUrl: string, taskName: string, isEdited: boolean, isDone: boolean, taskId: number, taskStatus: string, taskCreationDate: string}]|*}
     */
    getUserToDoList(userId) {
        const data = this.pullStorage();

        return data.usersData.find((item) => item.userId === userId).toDoList;
    },

    /**
     *
     * @returns {[]|[{userPassword: string, userNickname: string, userEmail: string, userName: string, userId: number}, {userPassword: string, userNickname: string, userEmail: string, userName: string, userId: number}, {userPassword: string, userNickname: string, userEmail: string, userName: string, userId: number}]|*}
     */
    getUsersList() {
        const data = this.pullStorage();

        return data.usersList;
    }

};


export default api;
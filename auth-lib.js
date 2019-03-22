class User {
    
    constructor (name, password) {
        this._name = name;
		this._password = password;
		this._groups = [];
    }

	get Name () {
		return this._name;
	}

    get Groups() {
        return this._groups;
	}
	
	get Password() {
		return this._password;
	}

    addGroup(group) {
        this._groups.push(group);
    }

	deleteGroup(group) {
		for (let i=0; i<this._groups.length; i++) {
			if (this._groups[i] == group) {
				this._groups.splice(i, 1);
			}
		}
	}
}

class Right {
    
    constructor (name) {
        this._name = name;
    }

	get Name() {
		return this._name;
	}
}

class Group {

    constructor (name) {
        this._name = name;
		this._rights = [];
    }

	get Name() {
		return this._name;
	}

	get Rights() {
		return this._rights;
	}

	addRight(right) {
		this._rights.push(right);
	}

	delRight(right) {
		for (let i=0; i<this._rights.length; i++) {
			if (this._rights[i] == right) {
				this._rights.splice(i, 1);
			}
		}
	}
}

class Session {
	constructor (user) {
		this._user = user;
	}

	get User() {
		return this._user;
	}
}

var allUsers = [];
var allGroups = [];
var allRights = [];
var allSessions = [];

var curSession;

//Создание гостя, его группы и прав
var guest = new User('guest', '');
var newGroup = createGroup('Guest');
var newRight = createRight('Read');
addRightToGroup(newRight, newGroup);
addUserToGroup(guest, newGroup);

function createUser(username, password) {
    let newUser = new User (username, password);
	if (allUsers.indexOf(newUser) === -1) {
		allUsers.push(newUser);
		return newUser;
	}
	else throw new Error ('Пользователь с таким именем уже существует.');
};

function deleteUser(user) {
	if (user instanceof User) {
		if (allUsers.indexOf(user) !== -1) {
			for (let i=0; i<allUsers.length; i++) {
				if (allUsers[i].Name == user.Name) {
					allUsers.splice(i, 1);
					return undefined;
				}
			}
		}
		else throw new Error ('Пользователя не существует.');
	}
	else throw new Error ('Передан неверный тип.');
};

function users() {
	return allUsers;
};

function createGroup(name) {
	let newGroup = new Group(name);
	if (allGroups.indexOf(newGroup) === -1) {
		allGroups.push(newGroup);
		return newGroup;
	}
	else throw new Error('Группа с таким именем уже существует.');
};

function deleteGroup(group) {
	if (group instanceof Group) {
		if (allGroups.indexOf(group) !== -1) {
			for (let i=0; i<allGroups.length; i++) {
				if (allGroups[i] == group) {
					allGroups.splice(i, 1);
					break;
				}
			}
		}
		else throw new Error ('Группы не существует.');
		
		for (let i=0; i<allUsers.length; i++) {
			for (let j=0; j<allUsers[i].Groups.length; j++) {
				if (allUsers[i].Groups[j] == group) {
					removeUserFromGroup(allUsers[i], group);
				}
			}
		}
		return undefined;
	}
	else throw new Error ('Передан неверный тип.');
};

function groups() {
	return allGroups;
};

function addUserToGroup(user, group) {
	if ((user instanceof User) &&
		(group instanceof Group)) {
		if ((allUsers.indexOf(user) !== -1) &&
			(allGroups.indexOf(group) !== -1)) {
				for (let i=0; i<allUsers.length; i++) {
					if (allUsers[i].Name == user.Name) {
						allUsers[i].addGroup(group);
						return undefined;
					}
				}
			}
		else throw new Error ('Пользователя или группы не существует.')
	}
	else throw new Error ('Передан неверный тип.')
};

function userGroups(user) {
	if (user instanceof User) {
		let groupsOfUser = [];
		for (let i=0; i<allUsers.length; i++) {
			if (user.Name == allUsers[i].Name) {
				groupsOfUser = allUsers[i].Groups;
				return groupsOfUser;
			}
		}
		throw new Error ('Пользователь не найден.');
	}
	else throw new Error ('Передан неверный тип.');
};

function removeUserFromGroup(user, group) {
	if ((user instanceof User) &&
		(group instanceof Group)) {
		for (let i=0; i<allUsers.length; i++) {
			if (allUsers[i] == user) {
				for (let j=0; j<allUsers[i].Groups.length; j++) {
					if (allUsers[i].Groups[j] == group) {
						allUsers[i].deleteGroup(group);
						return undefined;
					}
				}
				throw new Error ('Пользователя нет в указанной группе.');
			}
		}
		throw new Error ('Пользователь не найден.');
	}
	else throw new Error ('Передан неверный тип.');
};

function createRight(name) {
	newRight = new Right(name);
	if (allRights.indexOf(newRight) === -1) {
		allRights.push(newRight);
		return newRight;
	}
	throw new Error ('Право уже существует.');
};

function deleteRight(right) {
	if (right instanceof Right) {
		if (allRights.indexOf(right) !== -1) {
			for (let i=0; i<allRights.length; i++) {
				if (allRights[i] == right) {
					allRights.splice(i, 1);
				}
			}
			for (let i=0; i<allGroups.length; i++) {
				for (let j=0; j<allGroups[i].Rights.length; j++) {
					if (allGroups[i].Rights[j] == right) {
						removeRightFromGroup(right, allGroups[i]);
					}
				}
			}
			return undefined;
		}
		else throw new Error ('Право не существует.');
	}
	else throw new Error ('Передан неверный тип.');
};

function groupRights(group) {
	if (group instanceof Group) {
		let groupRights = [];
		for (let i=0; i<allGroups.length; i++) {
			if (allGroups[i] == group) {
				groupRights = allGroups[i].Rights;
				return groupRights;
			}
		}
		throw new Error ('Группа не найдена.');
	}
	else throw Error ('Передан неверный тип.');
};

function rights() {
	return allRights;
};

function addRightToGroup(right, group) {
	if ((right instanceof Right) &&
		(group instanceof Group)) {
		if (allRights.indexOf(right) !== -1) {
				for (let i=0; i<allGroups.length; i++) {
					if (allGroups[i] == group) {
						allGroups[i].addRight(right);
						return undefined;
					}
				}
				throw new Error ('Группы не существует.')
			}
		else throw new Error ('Права не существует.')
	}
	else throw new Error ('Передан неверный тип.')
};

function removeRightFromGroup(right, group) {
	if ((right instanceof Right) &&
		(group instanceof Group)) {
		for (let i=0; i<allGroups.length; i++) {
			if (allGroups[i] == group) {
				for (let j=0; j<allGroups[i].Rights.length; j++) {
					if (allGroups[i].Rights[j] == right) {
						allGroups[i].delRight(right);
						return undefined;
					}
				}
				throw new Error ('Права нет в указанной группе.');
			}
		}
		throw new Error ('Группа не найдена.');
	}
	else throw new Error ('Передан неверный тип.');
};

function login(username, password) {
	if (curSession) {
		return false;
	}

	for (let i = 0; i<allUsers.length; i++) {
		if (allUsers[i].Name == username) {
			if (allUsers[i].Password == password) {
				curSession = new Session(allUsers[i]);
				return true;
			}
			return false;
		}
	}
	return false;
};

function currentUser() {
	if (curSession) {
		return curSession.User;
	}
	else return undefined;
};

function logout() {
	for (let i=0; i<allSessions.length; i++) {
		if (allSessions[i] == curSession) {
			allSessions.splice(i, 1);
		}
	}
	curSession = allSessions[allSessions.length];
};

function isAuthorized(user, right) {
	if ((user instanceof User) && (right instanceof Right)) {
		if ((allUsers.indexOf(user) !== -1) && (allRights.indexOf(right) !== -1)) {
			for (let i=0; i<user.Groups.length; i++) {
				for (let j=0; j<user.Groups[i].Rights.length; j++) {
					if (user.Groups[i].Rights[j] == right) {
						return true;
					}
				}
			}
			return false;
		}
		else throw new Error ('Пользователь или право не найдено.');
	}
	else throw new Error ('Передан неверный тип.');
};

function guestLogin() {
	login('guest', '');
};

function loginAs(user) {
	allSessions.push(curSession);
	curSession = new Session(user);
}

function securityWrapper(action, right) {
	if (isAuthorized(curSession.User, right)) {
		//
	}
}
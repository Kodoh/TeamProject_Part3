const db = require('./db');
const helper = require('./helper');
const config = require('./config');
const bcrypt = require('bcrypt');

// GET

async function getMessagesForGroup(page = 1, req) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM messages INNER JOIN user ON messages.Sender = user.idUser WHERE Group_idGroup = ${req};`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function getUsersForGroup(page = 1, req) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT idUser, Name, email, joindate, role  FROM user WHERE idUser IN (SELECT User_idUser FROM membership WHERE Group_idGroup = ${req});`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function getAll(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM \`group\`;`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function getGroupMessages(page = 1, req) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM messages WHERE Group_idGroup IN (SELECT idGroup FROM \`group\` WHERE Private = 1 AND idGroup IN (SELECT Group_idGroup FROM membership WHERE User_idUser = ${req}));`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function getPrivateMessages(page = 1, req) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM messages WHERE Group_idGroup IN (SELECT idGroup FROM \`group\` WHERE Private = 1 AND idGroup IN (SELECT Group_idGroup FROM membership WHERE User_idUser = ${req}));`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function getAllPrivateMessages(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM messages WHERE Group_idGroup IN (SELECT idGroup FROM \`group\` WHERE Private = 1);`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function getAllGroupMessages(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM messages WHERE Group_idGroup IN (SELECT idGroup FROM \`group\` WHERE Private = 0);`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function getMembership(page = 1, req) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM membership WHERE User_idUser = ${req}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}


async function getAllGroups(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM \`group\` WHERE Private = 0;`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function getGroups(page = 1, req) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM \`group\` WHERE Private = 0 AND idGroup IN (SELECT Group_idGroup FROM membership WHERE User_idUser = ${req});`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function getGroupInfo(page = 1, req) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM \`group\` WHERE idGroup = ${req};`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function getAllPrivate(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM \`group\` WHERE Private = 1;`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function getPrivate(page = 1, req) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT * FROM \`group\` WHERE Private = 1 AND idGroup IN (SELECT Group_idGroup FROM membership WHERE User_idUser = ${req});`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function getAllUsers(page = 1) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT idUser, Name, email, joindate, role FROM user;`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function getUser(page = 1, req) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT idUser, Name, email, joindate, role FROM user WHERE idUser = ${req};`
    );
    const data = helper.emptyOrRows(rows);
    const meta = { page };

    return {
        data,
        meta
    }
}

async function getUserByEmail(page = 1, req) {
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(`SELECT * FROM user WHERE email = '${req.email}';`);
    let data = helper.emptyOrRows(rows);
    const meta = { page };
    const result = await bcrypt.compare(data[0].Password, req.Password);
    if (!result) {
        data = []
    }
    return {
        data,
        meta
    };


}

// POST



async function createUser(user) {
    const salt = await bcrypt.genSalt(10);
    user.Password = await bcrypt.hash(user.Password, salt)
    const result = await db.query(
        `INSERT INTO user 
    (Name, Password, email, joindate, role) 
    VALUES 
    ('${user.name}', '${user.Password}', '${user.email}', (SELECT CURRENT_DATE()), 'Staff');`
    );

    let data = 'Error in creating new user';

    if (result.affectedRows) {
        data = result.insertId;
    }

    return { data };
}

async function createMessage(m) {
    const result = await db.query(
        `INSERT INTO messages 
    (Contents, Group_idGroup, Sender) 
    VALUES
    ('${m.Contents}', ${m.Group_idGroup}, ${m.Sender});`
    );

    let message = 'Error in creating new message';

    if (result.affectedRows) {
        message = 'message created successfully';
    }

    return { message };
}

async function createMembership(m) {
    const result = await db.query(
        `INSERT INTO membership 
    (User_idUser, Group_idGroup) 
    VALUES
    (${m.userId}, ${m.groupId});`
    );

    let message = 'Error in creating new membership';

    if (result.affectedRows) {
        message = 'membership created successfully';
    }

    return { message };
}

async function createGroup(group) {
    const result = await db.query(
        `INSERT INTO \`group\` 
    (Name, Private) 
    VALUES
    ('${group.Name}', 0);`
    );

    let message = 'Error in creating new group';

    if (result.affectedRows) {
        message = result.insertId;
    }

    return { message };
}

async function createPrivate(pm) {
    const result = await db.query(
        `INSERT INTO \`group\` 
    (Name, Private) 
    VALUES
    ('${pm.Name}', 1);`
    );

    let message = 'Error in creating new pm';

    if (result.affectedRows) {
        message = result.insertId;
    }

    return { message };
}

// DELETE


async function removeMessage(id) {
    const result = await db.query(
        `DELETE FROM messages WHERE idMessages=${id};`
    );

    let message = 'Error in deleting message';

    if (result.affectedRows) {
        message = 'message deleted successfully';
    }

    return { message };
}


async function removeUser(id) {
    const result = await db.query(
        `DELETE FROM user WHERE idUser=${id};`
    );

    let message = 'Error in deleting user';

    if (result.affectedRows) {
        message = 'User deleted successfully';
    }

    return { message };
}

async function removeGroup(id) {
    const result = await db.query(
        `DELETE FROM \`group\` WHERE idGroup=${id};`
    );

    let message = 'Error in deleting group';

    if (result.affectedRows) {
        message = 'Group deleted successfully';
    }

    return { message };
}


async function removeMembership(membership) {
    const result = await db.query(
        `DELETE FROM membership WHERE User_idUser = ${membership.userId} AND Group_idGroup = ${membership.groupId};`
    );

    let message = 'Error in deleting membership';

    if (result.affectedRows) {
        message = 'membership deleted successfully';
    }

    return { message };
}


// PUT


async function updateMessage(id, newMessage) {
    const result = await db.query(
        `UPDATE messages 
    SET Contents="${newMessage.Contents}"
    WHERE idMessages=${id};`
    );

    let message = 'Error in updating message - Id does not exist';

    if (result.affectedRows) {
        message = 'message updated successfully';
    }

    return { message };
}


async function updateUser(id, user) {
    const result = await db.query(
        `UPDATE user 
    SET Name="${user.name}", email = "${user.email}"
    WHERE idUser=${id};`
    );

    let message = 'Error in updating user - Id does not exist';

    if (result.affectedRows) {
        message = 'User updated successfully';
    }

    return { message };
}


async function updateGroupName(id, group) {
    const result = await db.query(
        `UPDATE \`group\` 
    SET Name="${group.Name}"
    WHERE idGroup=${id};`
    );

    let message = 'Error in updating group - Id does not exist';

    if (result.affectedRows) {
        message = 'Group updated successfully';
    }

    return { message };
}

// EXPORT


module.exports = {
    getMessagesForGroup,
    getUsersForGroup,
    getAll,
    getGroupMessages,
    getPrivateMessages,
    getAllGroupMessages,
    getAllPrivateMessages,
    getAllUsers,
    getUser,
    getUserByEmail,
    createUser,
    createMembership,
    createMessage,
    createGroup,
    removeMessage,
    removeUser,
    removeGroup,
    getAllGroups,
    getGroups,
    getGroupInfo,
    getAllPrivate,
    getPrivate,
    removeMembership,
    getMembership,
    updateMessage,
    updateUser,
    updateGroupName,
    createPrivate
}
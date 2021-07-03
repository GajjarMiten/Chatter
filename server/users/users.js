var users = [];

module.exports.addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find(
        (user) => user.room === room && user.name === name
    );
    if (existingUser) {
        return { error: "Username is taken" };
    }

    const user = { id, name, room };
    users.push(user);

    return { user };
};
module.exports.removeUser = ({name, room}) => {
    return users.find(
        (user) => user.name === name.trim().toLowerCase() && user.room === room
    );
};
module.exports.getUser = ({ name, room }) => {
    const user = users.find(
        (user) =>
            user.name === name.toLowerCase() && user.room.toString() === room
    );

    return user;
};
module.exports.getUserInRoom = (room) =>
    users.filter((user) => user.room === room);

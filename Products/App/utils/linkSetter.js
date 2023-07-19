const API_PATH = '/api';
const USER_PATH = API_PATH + '/users';


function setUserLinks(user) {
    user.dataValues.links = [
        { rel: 'self', href: USER_PATH + '/' + user.id },
    ];
}


module.exports = {
    setUserLinks
}
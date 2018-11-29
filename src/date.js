const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

let today = new Date();
let dd = today.getDate();
let mm = months[today.getMonth()];
let yyyy = today.getFullYear();

today = mm + ' ' + dd + ', ' + yyyy;

export default today;
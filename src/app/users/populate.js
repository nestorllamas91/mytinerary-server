import User from '$server/app/users/model';

import bcrypt from 'bcrypt';

let newUser1PasswordHash = '';
let newUser2PasswordHash = '';
let newUser3PasswordHash = '';
let newUser4PasswordHash = '';
let newUser5PasswordHash = '';
let newUser6PasswordHash = '';
let newUser7PasswordHash = '';
let newUser8PasswordHash = '';
let newUser9PasswordHash = '';
let newUser10PasswordHash = '';
(function hashUserPasswords() {
  try {
    const salt = bcrypt.genSaltSync(10);
    const newUser1Password = '8UvVq*Rd8&0h';
    newUser1PasswordHash = bcrypt.hashSync(newUser1Password, salt);
    const newUser2Password = '6@4@W4$J1oa&';
    newUser2PasswordHash = bcrypt.hashSync(newUser2Password, salt);
    const newUser3Password = '@Qmt%I5vm3hK';
    newUser3PasswordHash = bcrypt.hashSync(newUser3Password, salt);
    const newUser4Password = 'jMv056Br7qu$';
    newUser4PasswordHash = bcrypt.hashSync(newUser4Password, salt);
    const newUser5Password = 'b9A1*eD0$LJe';
    newUser5PasswordHash = bcrypt.hashSync(newUser5Password, salt);
    const newUser6Password = 'd$y04AiEsA&7';
    newUser6PasswordHash = bcrypt.hashSync(newUser6Password, salt);
    const newUser7Password = 'qG2xjfl%I3z0';
    newUser7PasswordHash = bcrypt.hashSync(newUser7Password, salt);
    const newUser8Password = 'T8d%Y3$S2@Cv';
    newUser8PasswordHash = bcrypt.hashSync(newUser8Password, salt);
    const newUser9Password = '5x33cl%NMUBf';
    newUser9PasswordHash = bcrypt.hashSync(newUser9Password, salt);
    const newUser10Password = 'Oe@W58Lg%JKz';
    newUser10PasswordHash = bcrypt.hashSync(newUser10Password, salt);
  } catch (err) {
    console.log('\x1b[36m%s\x1b[0m', `[mytinerary-server] ${err.name}: ${err.message}`);
  }
})();

export const newUser1 = new User({
  userId: 1,
  countryId: 62,
  username: 'adamcollins',
  password: newUser1PasswordHash,
  email: 'adamcollins@gmail.com',
  name: {
    first: 'Adam',
    last: 'Collins'
  },
  isLoggedIn: false
});
export const newUser2 = new User({
  userId: 2,
  countryId: 31,
  username: 'ashleyross',
  password: newUser2PasswordHash,
  email: 'ashleyross@gmail.com',
  name: {
    first: 'Ashley',
    last: 'Ross'
  },
  isLoggedIn: false
});
export const newUser3 = new User({
  userId: 3,
  countryId: 105,
  username: 'billywilson',
  password: newUser3PasswordHash,
  email: 'billywilson@gmail.com',
  name: {
    first: 'Billy',
    last: 'Wilson'
  },
  isLoggedIn: false
});
export const newUser4 = new User({
  userId: 4,
  countryId: 136,
  username: 'catherineward',
  password: newUser4PasswordHash,
  email: 'catherineward@gmail.com',
  name: {
    first: 'Catherine',
    last: 'Ward'
  },
  isLoggedIn: false
});
export const newUser5 = new User({
  userId: 5,
  countryId: 47,
  username: 'dianapowell',
  password: newUser5PasswordHash,
  email: 'dianapowell@gmail.com',
  name: {
    first: 'Diana',
    last: 'Powell'
  },
  isLoggedIn: false
});
export const newUser6 = new User({
  userId: 6,
  countryId: 149,
  username: 'henryrussell',
  password: newUser6PasswordHash,
  email: 'henryrussell@gmail.com',
  name: {
    first: 'Henry',
    last: 'Russell'
  },
  isLoggedIn: false
});
export const newUser7 = new User({
  userId: 7,
  countryId: 19,
  username: 'jeremyjohnson',
  password: newUser7PasswordHash,
  email: 'jeremyjohnson@gmail.com',
  name: {
    first: 'Jeremy',
    last: 'Johnson'
  },
  isLoggedIn: false
});
export const newUser8 = new User({
  userId: 8,
  countryId: 53,
  username: 'lisamorris',
  password: newUser8PasswordHash,
  email: 'lisamorris@gmail.com',
  name: {
    first: 'Lisa',
    last: 'Morris'
  },
  isLoggedIn: false
});
export const newUser9 = new User({
  userId: 9,
  countryId: 186,
  username: 'patrickbailey',
  password: newUser9PasswordHash,
  email: 'patrickbailey@gmail.com',
  name: {
    first: 'Patrick',
    last: 'Bailey'
  },
  isLoggedIn: false
});
export const newUser10 = new User({
  userId: 10,
  countryId: 124,
  username: 'rosewilson',
  password: newUser10PasswordHash,
  email: 'rosewilson@gmail.com',
  name: {
    first: 'Rose',
    last: 'Wilson'
  },
  isLoggedIn: false
});

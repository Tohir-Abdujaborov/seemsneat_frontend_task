export function validateIfEmpty(userName, password) {
  if (userName === "" || password === "") return false;
  else return true;
}
export function validateEmailFormat(userName) {
  let mailformat =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (userName.match(mailformat)) return true;
  else return false;
}

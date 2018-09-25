const unixTime = (unixtime, fullDate = true) => {
  var u = new Date(unixtime * 1000);
  let resultDate = "";
  if (fullDate) {
    resultDate =
      u.getUTCFullYear() +
      "/" +
      ("0" + u.getUTCMonth()).slice(-2) +
      "/" +
      ("0" + u.getUTCDate()).slice(-2) +
      " - " +
      ("0" + u.getUTCHours()).slice(-2) +
      ":" +
      ("0" + u.getUTCMinutes()).slice(-2) +
      ":" +
      ("0" + u.getUTCSeconds()).slice(-2);
  } else {
    resultDate =
      ("0" + u.getUTCHours()).slice(-2) +
      ":" +
      ("0" + u.getUTCMinutes()).slice(-2) +
      ":" +
      ("0" + u.getUTCSeconds()).slice(-2);
  }
  return resultDate;
};

export default unixTime;

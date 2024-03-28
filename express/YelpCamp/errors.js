function errorPage(err, req, res, next) {
  console.log(err);
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong";
  res.status(statusCode).render("error", { statusCode, err });
}

function handleValidationErr(err, req, res, next) {
  const handleValidationErr = (err) => {
    console.log(err);
    return err;
  };

  console.log(err.name); // print mongoose errors
  if (err.name === "ValidationError") {
    err = handleValidationErr(err);
  }
  next(err);
}

function pageNotFound(req, res) {
  res.status(404).send("Error 404.  Page not found.");
}

module.exports = { errorPage, handleValidationErr, pageNotFound };

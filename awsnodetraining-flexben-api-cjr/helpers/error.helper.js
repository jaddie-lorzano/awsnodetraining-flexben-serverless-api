import { LogRepository } from "../repositories/index.js";

export const logErrors = (err, req, res, next) => {
  let errorObject = errorBuilder(err);
  errorObject.requestInfo = {
    "hostname": req.hostname,
    "path": req.path,
    "app": req.app,
  };
  LogRepository.write(errorObject, (data) => {
      console.log(data);
    }, (err) => {
      console.error(err);
    });
  next(err);
}

export const clientErrorHandler = (err, req, res, next) => {
  if (req.xhr) {
    res.status(500).send({
      "status": 500,
      "statusText": "Internal Server Error",
      "message": "XMLHttpRequest error",
      "error": {
        "errno": 0,
        "call": "XMLHttpRequest Call",
        "code": "INTERNAL_SERVER_ERROR",
        "message": "XMLHttpRequest error"
      }
    });
  } else {
    next(err);
  }
}

export const errorHandler = (err, req, res, next) => {
  res.status(500).json(errorBuilder(err));
}

export const errorBuilder = (err) => {
  return {
    "status": 500,
    "statusText": "Internal Server Error",
    "message": err.message,
    "error": {
      "errno": err.errno,
      "call": err.syscall,
      "code": "INTERNAL_SERVER_ERROR",
      "message": err.message
    }
  };
}
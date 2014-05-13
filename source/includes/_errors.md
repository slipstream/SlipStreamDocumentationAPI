# Errors

The SlipStream REST API uses the following error codes:


Error Code | Meaning
---------- | -------
400 | Bad Request -- Your request is inconsistent
401 | Unauthorized -- Your username/password of cookie is wrong
403 | Forbidden -- You don't have the rights to perform this action
404 | Not Found -- The requested resource doesn't exist
405 | Method Not Allowed -- You tried to access a resource with an invalid method
406 | Not Acceptable -- You requested a format that is not supported?
418 | I'm a teapot -- The all time classic :-)
500 | Internal Server Error -- We had a problem with our server. Try again later.
503 | Service Unavailable -- We're temporarially offline for maintenance. Please try again later.
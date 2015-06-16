# assidu-node
Track items you want to do every day - implemented in Node 

The initial parts of this are based on ideas found here : 

https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4

# Test Rig
There's a page to make testing the API easier.

Make the directory `testrig` within the repos your current directory and execute the following command :

``` python -m SimpleHTTPServer 8000```

You can then access the page via a browser at localhost:8000 .


# Remember

When doing insert/update/delete the form has to be submitted as application/x-www-form-urlencoded.

Remember the HTTP verbs for a:

INSERT is POST
DELETE is DELETE
UPDATE is PUT
DISPLAY is GET
LIST is GET



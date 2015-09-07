# assidu-node
Track items you want to do every day - implemented in Node 

The initial parts of this are based on ideas found here : 

https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4

# Test Rig
There's a page to make testing the API easier.

Make the directory `testrig` within the repos your current directory and execute the following command :

``` python -m SimpleHTTPServer 8000```

You can then access the page via a browser at localhost:8000 .

## Please note ##
As of August 2015 the index.html is being swopped out so we can put an angular one in place. This does mean that until that is all working as it should you'll want to swop index-HIDE.html back into index.html .

In an attempt to make this work as an SPA I've now got into the situation where 404's are resulting in the index.html being returned. This is not good and needs fixing.


# Remember

When doing insert/update/delete the form has to be submitted as application/x-www-form-urlencoded.

Remember the HTTP verbs for a:

INSERT is POST
DELETE is DELETE
UPDATE is PUT
DISPLAY is GET
LIST is GET



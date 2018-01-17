# Steps for auth on Postman

https://courses.thinkful.com/NODE-001v5/assignment/3.1.1

1. User registration POST /api/users
   * returns your user if ok.
2. to login, and get a token POST to /api/auth/login
   * returns an auth Token
3. GET expenses (protected endpoint) sending token

   * Set token on request
   * Authorization -> Bearer SDFD235647

# Steps for frontend auth.

1. /signup.html [Signup section] should POST to POST /api/users to create the user. If successful -> show login.
2. /signup.html [Login section] POST to /api/auth/login to get token. If successful -> you get a token.

* Save the token to localStorage.
  `localStorage.setItem('token', req.body.authToken);`
* redirect to dashboard.

3. /expense-history.html Get token from localstorage
   `var token = localStorage.getItem("token");`
   make all the ajax requests using that token
   Set the `Authorization` header to `Bearer ${token}`

# ToDos

* Add padding on home before "Need to get your Finances on Track"
* fix image width instead of height#

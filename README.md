# dzencode_testtask
1. `git clone %code%`
2. `cp backend/.env.dev .env`
3. `nano backend/.env`
4. fill the empty fields
5. add `DATABASE=db` line at the end of the file
6. `nano docker-compose.yml`
7. change POSTGRES values to yours (should be the same as in the .env file)
8. `sudo docker container ls`, find the `backend` container
9. `sudo docker exec -it _backend_id_ python manage.py migrate`
10. now you should be able to go to http://yourhost:5173
11. Signup, login and try to create a comment.

_
The app is very raw and contains a lot of bugs.

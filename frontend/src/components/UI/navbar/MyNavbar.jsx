  // import React, { useState, useEffect } from "react";
  // import { Link, useLocation } from "react-router-dom";
  // import MyButton from "../button/MyButton";
  // import classes from './MyNavbar.module.css';
  // import Cookies from 'js-cookie';

  // const Navbar = () => {
  //   const [isUserAuth, setIsUserAuth] = useState(null);
  //   const location = useLocation();

  //   useEffect(() => {
  //     const accessToken = Cookies.get('access_token');
  //     const refreshToken = Cookies.get('refresh_token');
  //     if (accessToken || refreshToken) {
  //       setIsUserAuth(true);
  //     } else {
  //       setIsUserAuth(false);
  //     }
  //   }, []);

  //   const logout = () => {
  //     Cookies.remove('access_token');
  //     Cookies.remove('refresh_token');
  //     setIsUserAuth(false);
  //     window.location.reload();
  //   };
  //   return (
  //     <div className={classes.navbar}>
  //       <div className={classes.navbarItems}>
  //         {location.pathname.endsWith('/login/')
  //           ? null :
  //           isUserAuth
  //             ? <MyButton onClick={logout}>Logout</MyButton>
  //             : <Link className={classes.navbarLink} to="/login/">Login</Link>
  //         }
  //       </div>
  //     </div>
  //   )
  // }

  // export default Navbar;
  import React, { useState, useEffect } from "react";
  import { Link, useLocation } from "react-router-dom";
  import MyButton from "../button/MyButton";
  import classes from './MyNavbar.module.css';
  import Cookies from 'js-cookie';
  
  const Navbar = () => {
    const [isUserAuth, setIsUserAuth] = useState(null);
    const location = useLocation();
  
    useEffect(() => {
      const checkAuthStatus = async () => {
        const accessToken = Cookies.get('access_token');
        const refreshToken = Cookies.get('refresh_token');
        if (accessToken || refreshToken) {
          setIsUserAuth(true);
        } else {
          setIsUserAuth(false);
        }
      };
  
      checkAuthStatus();
    }, [location]);
  
    const logout = () => {
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      setIsUserAuth(false);
      window.location.reload()
    };
  
    return (
      <div className={classes.navbar}>
        <div className={classes.navbarItems}>
          {location.pathname.endsWith('/login/')
            ? null :
            isUserAuth
              ? <MyButton onClick={logout}>Logout</MyButton>
              : <Link className={classes.navbarLink} to="/login/">Login</Link>
          }
        </div>
      </div>
    );
  };
  
  export default Navbar;
  
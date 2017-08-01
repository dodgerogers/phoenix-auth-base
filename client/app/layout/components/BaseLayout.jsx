import React from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';


const BaseLayout = (props) => (
  <div className="BaseLayout">
    <Navbar {...props} />
    <div className="main">
      {props.children}
    </div>
    <Footer {...props} />
  </div>
);

export default BaseLayout;

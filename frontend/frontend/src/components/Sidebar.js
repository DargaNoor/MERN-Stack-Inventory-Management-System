// frontend/src/components/Sidebar.js
import React from 'react';
import '../Sidebar.css';

const Sidebar = () => {
  return (
    <div class="sidebar">
      <div class="logo">
        <img src="/images/logo.png" alt="Logo" />
      </div>
      <div class="menuitems">
        <div class="active1">
          <img src="/images/active1.png" />
        </div>
        <div class="active2">
          <img src="/images/active2.png" />
        </div>
        <div class="active3">
          <img src="/images/active3.png" />
        </div>
        <div class="active4">
          <img src="/images/active4.png" />
        </div>
        <div class="active5">
          <img src="/images/active5.png" />
        </div>
        <div class="active6">
          <img src="/images/active6.png" />
        </div>
        <div class="active7">
          <img src="/images/active7.png" />
        </div>
        <div class="active8">
          <img src="/images/active8.png" />
        </div>
      </div>

    </div>

  );
};

export default Sidebar;

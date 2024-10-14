import React from 'react';

const Footer = () => {
  return (
    <footer className="fixed inset-x-0 bottom-0 flex items-center bg-neutral-900 text-center text-white">
      <div
        className="w-full p-4 text-center"
        style={{backgroundColor: 'rgba(0,0,0,0.2)'}}>
        &copy; 2023 CodeWithDav
      </div>
    </footer>
  );
};

export default Footer;

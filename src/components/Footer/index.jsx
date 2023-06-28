const Footer = () => {
  return (
    <footer className="bg-pink-500 py-3">
      <div className="container mx-auto px-4 text-center text-white">
        &copy; {new Date().getFullYear()} MYECOM. All rights reserved.
      </div>
    </footer>
  );
};
export default Footer;

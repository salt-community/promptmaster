function TopNav() {
  return (
    <>
      <div className="navbar bg-custom-secondary p-5 ">
        <div className="flex-1">
          <a  href="https://salt.dev/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost text-xl text-white">{"</salt>"}</a>
        </div>
        <div className="flex-none">
          <a href="https://salt.dev/contact/" target="_blank" rel="noopener noreferrer"><button className="btn bg-white text-black">
            Contact Us
          </button></a>
          
        </div>
      </div>
    </>
  );
}
export default TopNav;

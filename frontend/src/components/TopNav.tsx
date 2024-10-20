function TopNav() {
  return (
    <>
      <div className="navbar bg-custom-secondary p-5 flex justify-between">
        <div className="justify-start">
          <a  href="https://salt.dev/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost text-xl text-white">{"</salt>"}</a>
        </div>
        <div><p className="text-2xl text-white font-bold">Prompt Master</p></div>
        <div className="">
          <a href="https://salt.dev/contact/" target="_blank" rel="noopener noreferrer"><button className="btn bg-white hover:bg-custom-tertiary hover:text-white hover:border-custom-tertiary hover:scale-x-105 ">
            Contact Us
          </button></a>
          
        </div>
      </div>
    </>
  );
}
export default TopNav;

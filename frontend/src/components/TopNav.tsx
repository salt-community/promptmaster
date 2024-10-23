function TopNav() {
  return (
    <>
      <div className="navbar bg-custom-secondary p-5 flex justify-between">
        <div className="justify-start">
          <a  href="https://salt.dev/" target="_blank" rel="noopener noreferrer" className=" bg-custom-secondary border-none  text-xl text-white"> <img src="https://salt.dev/wp-content/uploads/2024/02/salt-logo-light.svg" className="p-1"/></a>
        </div>
        <div><p className="text-4xl text-white font-bold">Prompt Master</p></div>
        <div className="">
          <a href="https://salt.dev/contact/" target="_blank" rel="noopener noreferrer"><button className="btn bg-white text-custom-secondary border-white hover:bg-custom-tertiary hover:text-white hover:border-custom-tertiary hover:scale-x-105 ">
            Contact us
          </button></a>
          
        </div>
      </div>
    </>
  );
}
export default TopNav;

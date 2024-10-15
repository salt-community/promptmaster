function GameHeader() {
  return (
    <>
      <div className="hero bg-base-200 ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Prompt Master</h1>
            <p className="py-6">
            Welcome to Prompt Master, the ultimate game where creativity meets challenge! Can you craft the perfect prompt to recreate these stunning images? Test your skills and become the master of imagination!
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default GameHeader;

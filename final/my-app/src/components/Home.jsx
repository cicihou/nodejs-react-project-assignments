import'../assets/home.css'

function Home() {
  return (
    <main className="home__main">
      <div className="home">
        <ul className="home__users">
          <li className="user">
            <img className="user__avatar" src="https://img.930tu.com/20210223/146264f418ce34b36159a3b28b7792d8.jpg" alt=""/>
            <div className="user__info">
              <div className="user__base">
                <h2 className="user__name">cccccccccccccccccccc</h2>
                <p className="user__status">online</p>
              </div>
              <p className="user_slogan">ababababababababababa</p>
            </div>
          </li>
          <li className="user">
            <img className="user__avatar" src="https://img.930tu.com/20210223/146264f418ce34b36159a3b28b7792d8.jpg" alt=""/>
            <div className="user__info">
              <div className="user__base">
                <h2 className="user__name">ccc</h2>
                <p className="user__status">online</p>
              </div>
              <p className="user_slogan">lalalala</p>
            </div>
          </li>
        </ul>
        <div className="home__message"></div>
      </div>
    </main>
  );
}

export default Home;
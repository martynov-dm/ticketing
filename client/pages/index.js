import buildClient from "../api/build-client";

function Home ({ currentUser }) {
  return <h1>
      {currentUser ? 'You are signed in' : 'You are NOT signed in' }
  </h1>
}

Home.getInitialProps = async (context) => {
    const { data } = await buildClient(context).get('/api/users/currentuser')
    return data
}

export default Home

import buildClient from "../api/build-client";

function Home ({ currentUser }) {
  console.log(currentUser)
  return <h1>Home page</h1>
}

Home.getInitialProps = async (context) => {
    const { data } = await buildClient(context).get('/api/users/currentuser')
    return data
}

export default Home

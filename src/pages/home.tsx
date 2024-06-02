import { Container, Slogan, ProfileDetail } from '../components';

function Home() {
  return (
    <Container className="bg-custom-gradient">
      <div className="grid my-10 md:grid-cols-2">
        <Slogan />
        <ProfileDetail />
      </div>
    </Container>
  );
}

export default Home;

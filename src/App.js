
import './App.scss';
import Header from './components/Header';
import TableUsers from './components/TableUsers.js';
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <div className='app-container'>
      <Header />
      <Container>
        <TableUsers />
      </Container>

    </div>
  );
}

export default App;

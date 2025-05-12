import { Navigate, Route, Routes } from 'react-router-dom';
import { BigContainer } from './components/commonStyled';

function App() {
  return (
    <BigContainer>
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
      </Routes>
    </BigContainer>
  );
}

export default App;

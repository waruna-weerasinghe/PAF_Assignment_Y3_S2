import React from 'react';
import PostPage from './pages/PostPage.jsx';
import NotificationDropdown from './components/NotificationDropdown';

function App() {
  return (
    <div className="App">
      <NotificationDropdown />
      <PostPage />
    </div>
  );
}

export default App;

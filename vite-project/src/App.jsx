import React from 'react';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';
import HeaderNav from './components/HeaderNav';
import useSidebar from './components/Sidebar';

function App() {
  const { Sidebar } = useSidebar();
  return (
    <>
      <div className="wrapper">
        <Sidebar />
        <div className="main">
          <HeaderNav />
          <main className="content">
            <Dashboard />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;


import Header from './components/Header';
import Service1Component from './components/Service1Component';
import Service2Component from './components/Service2Component';
import ChatBot from './components/ChatBot'; // Import the ChatBot component

const App = () => {
  return (
    <div>
      <Header />
      <main>
        <h1>Welcome to Micro services</h1>
        <Service1Component />
        <Service2Component />
        <ChatBot />
      </main>
    </div>
  );
};

export default App;

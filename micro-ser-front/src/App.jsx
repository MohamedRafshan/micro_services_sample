
import Header from './components/Header';
import Service1Component from './components/Service1Component';
import Service2Component from './components/Service2Component';

const App = () => {
  return (
    <div>
      <Header />
      <main>
        <h1>Welcome to Vite App</h1>
        <Service1Component />
        <Service2Component />
      </main>
    </div>
  );
};

export default App;

import Header from "../components/Common/Header";
import MainComponent from "../components/LandingPage/MainComponent";

export default function HomePage({darkMode,ontoggleDarkMode}) {
  return (
    <div>
      <Header />
      <MainComponent />
    </div>
  );
}

// darkMode={darkMode} ontoggleDarkMode={ontoggleDarkMode}
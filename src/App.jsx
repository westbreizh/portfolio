import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import "./App.scss";


function App() {

  const [resumeData, setResumeData] = useState({});
  const [sharedData, setSharedData] = useState({});  // share --> partager
  const [languageIconId, setLanguageIconId] = useState(
    window.$secondaryLanguageIconId
  );
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState("light"); // Par défaut, le thème est "light"



  useEffect(() => {
    loadSharedData();
    applyPickedLanguage(window.$primaryLanguage, languageIconId);// applyPickedLanguage --> appliquer la langue sélectionnée
  }, []);

  const applyPickedLanguage = (pickedLanguage, oppositeLangIconId) => {   // appliquer langue choisie
    swapCurrentlyActiveLanguage(oppositeLangIconId); // changer la langue actuellement active
    document.documentElement.lang = pickedLanguage;
    const resumePath =
      document.documentElement.lang === window.$primaryLanguage
        ? `res_primaryLanguage.json`
        : `res_secondaryLanguage.json`;
    loadResumeFromPath(resumePath);   // en fonction de la langue en charge les bonne variables via le path (le chemin fichier)
  };

  const swapCurrentlyActiveLanguage = (oppositeLangIconId) => {
    const pickedLangIconId =
      oppositeLangIconId === window.$primaryLanguageIconId
        ? window.$secondaryLanguageIconId
        : window.$primaryLanguageIconId;
  
    const oppositeElement = document.getElementById(oppositeLangIconId);
    const pickedElement = document.getElementById(pickedLangIconId);
  
    if (oppositeElement && pickedElement) {
      oppositeElement.removeAttribute("filter", "brightness(40%)");
      pickedElement.setAttribute("filter", "brightness(40%)");
      setLanguageIconId(pickedLangIconId);
    } else {
      console.error("Les éléments ne peuvent pas être trouvés");
    }
  };
  

  const loadResumeFromPath = (path) => {
    fetch(path)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setResumeData(data);
        setIsLoading(false); // Marquez le chargement comme terminé
      })
      .catch((error) => {
        console.error("Error loading resume data:", error);
      });
  };

  const loadSharedData = () => {
    fetch(`portfolio_shared_data.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSharedData(data);
        console.log("sharedData", sharedData)
        document.title = `${data.basic_info.name}`;

      })
      .catch((error) => {
        console.error("Error loading shared data:", error);
      });
  };

  return (

    <div data-theme={theme === "dark" ? "dark" : "light"}>      

      {isLoading ? (
        <div>Loading...</div>
        ) : (
        <>
        <Header sharedData={sharedData.basic_info} setTheme={setTheme} />

        <div className="col-md-12 mx-auto text-center language">

          <div
            onClick={() => applyPickedLanguage(window.$primaryLanguage, languageIconId)}
            style={{ display: "inline" }}
          >
            <span
              className="iconify language-icon mr-5"
              data-icon="twemoji-flag-for-flag-france"
              data-inline="false"
              id={window.$primaryLanguageIconId}
            ></span>

          </div>

          <div
            onClick={() => applyPickedLanguage(window.$secondaryLanguage, languageIconId)}
            style={{ display: "inline" }}
          >
            <span
              className="iconify language-icon"
              data-icon="twemoji-flag-for-flag-united-kingdom"
              data-inline="false"
              id={languageIconId}
            ></span>

          </div>

        </div>

        <About
          resumeBasicInfo={resumeData.basic_info}
          sharedBasicInfo={sharedData.basic_info}
        />
        <Projects
          resumeProjects={resumeData.projects}
          resumeBasicInfo={resumeData.basic_info}
        />
        <Skills
          sharedSkills={sharedData.skills}
          resumeBasicInfo={resumeData.basic_info}
        />
        <Experience
          resumeExperience={resumeData.experience}
          resumeBasicInfo={resumeData.basic_info}
        />
        <Footer sharedBasicInfo={sharedData.basic_info} />
        </>
      )}
      
    </div>
  );
}

export default App;

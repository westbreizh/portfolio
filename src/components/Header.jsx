import React, { useState, useEffect } from "react";
import Typical from "react-typical";
import Switch from "react-switch";

function Header(props) {

  const [checked, setChecked] = useState(false); // gestion du thème jour nuit
  const [titles, setTitles] = useState([]);  // titres pour affichage dynamique

  const { sharedData, setTheme } = props; 

  useEffect(() => {
    if (sharedData) {
      setTitles(sharedData.titles.map((x) => [x.toUpperCase(), 1500]).flat()); // 1500 correspond au futur délai flat pour applatir les donées en un seul tableau ...
    }
  }, [sharedData]);

  const onThemeSwitchChange = (newChecked) => {
    setChecked(newChecked);
    setTheme(newChecked ? "dark" : "light");
  };



  const HeaderTitleTypeAnimation = React.memo(() => {
    return <Typical className="title-styles" steps={titles} loop={50} />;
  }, (props, prevProp) => true);

  return (

    <header id="home" style={{ height: window.innerHeight - 140, display: 'block' }}>

      <div className="row aligner" style={{ height: '100%' }}>

        <div className="col-md-12">

          <div>
            <span className="iconify header-icon" data-icon="la:laptop-code" data-inline="false"></span>
            <br />
            <h1 className="mb-0">
              <Typical steps={[sharedData.name]} wrapper="p" />
            </h1>
            <div className="title-container">
              <HeaderTitleTypeAnimation />
            </div>
            <Switch
              checked={checked}
              onChange={onThemeSwitchChange}
              offColor="#baaa80"
              onColor="#353535"
              className="react-switch mx-auto"
              width={90}
              height={40}
              uncheckedIcon={
                <span
                  className="iconify"
                  data-icon="twemoji:owl"
                  data-inline="false"
                  style={{
                    display: "block",
                    height: "100%",
                    fontSize: 25,
                    textAlign: "end",
                    marginLeft: "20px",
                    color: "#353239",
                  }}
                ></span>
              }
              checkedIcon={
                <span
                  className="iconify"
                  data-icon="noto-v1:sun-with-face"
                  data-inline="false"
                  style={{
                    display: "block",
                    height: "100%",
                    fontSize: 25,
                    textAlign: "end",
                    marginLeft: "10px",
                    color: "#353239",
                  }}
                ></span>
              }
              id="icon-switch"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

import React, { useState } from 'react'

const MyComponent = ({Image, alt, Line, State, languageData, continueBtn}) => {
    const [lanSelected, setLanSelected] = useState(false);
    const [active, setActive] = useState(null);
    return (
    <div className="new_component">
      <div className="new_component_card">
        <div
          className="new_component_logo_section"
        >
          <img
          src={Image}
            alt={alt}
          />
          <h2>{Line ? Line : ""}</h2>
          <h3>{State}</h3>
        </div>
        <div className="new_component_button_main">
          {languageData.map((item) => (
            <button
              style={{width : "100px", border: active === item.id && !lanSelected  ? "none" : "1px solid #505A5F", height : "40px" ,backgroundColor: active=== item.id && !lanSelected && "#F47738", color: active=== item.id && !lanSelected && "#fff" }}
              className={active === item.id && !lanSelected ? "removeBorder" : ""}
              key={item.id}
              onClick={() =>{setActive(item.id), setLanSelected(active === item.id && !lanSelected)}}
            >
              {item.language}
            </button>
          ))}
        </div>
        <div  className="new_component_continue_btn">
          <button>{continueBtn}</button>
        </div>
      </div>
    </div>
    )
}

export default MyComponent

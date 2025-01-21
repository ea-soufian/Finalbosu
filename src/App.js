import React, { useState, useEffect, useMemo, useRef } from 'react';
import Hls from 'hls.js';
import './App.css';
import background1 from './assets/cook.png';
import background2 from './assets/Backgroendie.jpg';
import character from './assets/FinalBosuChar.png';
import poster1 from './assets/finalbosuposter1.jpg';
import poster2 from './assets/finalbosuposter2.jpg';
import xIcon from './assets/x.jpg'; // Voeg het X-logo toe



function App() {
  const [showPopup, setShowPopup] = useState(true);
  const [page, setPage] = useState(1);
  const [text, setText] = useState('');
  const [currentSection, setCurrentSection] = useState(0);
  const [characterText, setCharacterText] = useState('');
  const videoRef = useRef(null);
  const videoSource = '/assets/Finalbosurecord.mp4';

  

   // Nieuwe hooks voor blur-logica en character messages
   const [isLeftBlurred, setIsLeftBlurred] = useState(false);
   const [isRightBlurred, setIsRightBlurred] = useState(true);
   const [characterMessage, setCharacterMessage] = useState("Don't forget to join the Discord!!");

   const [buttonClicked, setButtonClicked] = useState(false);
   const [isButtonClicked, setIsButtonClicked] = useState(false);

   const [isDoneClicked, setIsDoneClicked] = useState(false);
  const [showCharacter, setShowCharacter] = useState(false);

const handleDoneClick = () => {
  setIsDoneClicked(true);
  setTimeout(() => setShowCharacter(true), 2000); // Toon het personage na 2 seconden
};


  const fullText = 'Welcome to FinalBosu: Against All Odds';

  const characterDialogues = useMemo(() => [
    "Let's read about what FinalBosu is.",
    "Discover what’s next for FinalBosu!",
    "See how FinalBosu is shaping its legacy!",
  ], []);

  const sections = [
    {
      title: 'About FinalBosu',
      content: `FinalBosu is a media franchise dedicated to crafting captivating stories, unforgettable characters, and immersive universes. With a mission to expand its intellectual property across both Web3 and Web2 ecosystems. From movies and stories to video games and series, FinalBosu is redefining entertainment through innovation and creativity.`,
      position: { top: '50%', left: '16%' },
    },
    {
      title: 'The Vision Ahead',
      content: `FinalBosu’s future is as dynamic as the universes it creates. With plans to launch a lore-driven mini-game and potentially explore an anime adaptation, the team is committed to delivering engaging experiences that bring fans deeper into the world of FinalBosu.`,
      position: { top: '50%', left: '50%' },
    },
    {
      title: 'Global Powerhouse',
      content: `Through relentless passion and community involvement, FinalBosu is setting its sights on becoming a global powerhouse in storytelling and entertainment.`,
      position: { top: '50%', left: '84%' },
    },
  ];

  useEffect(() => {
    if (page === 1 && showPopup) {
      let index = 0;
      const timer = setInterval(() => {
        setText(fullText.substring(0, index + 1));
        index++;
        if (index === fullText.length) clearInterval(timer);
      }, 100);
      return () => clearInterval(timer);
    }
  }, [page, showPopup]);

  useEffect(() => {
    if (page === 2) {
      let index = 0;
      const timer = setInterval(() => {
        setCharacterText(characterDialogues[currentSection].substring(0, index + 1));
        index++;
        if (index === characterDialogues[currentSection].length) clearInterval(timer);
      }, 100);
      return () => clearInterval(timer);
    }
  }, [page, currentSection, characterDialogues]);

  useEffect(() => {
    if (page === 3) {
      // Reset characterText aan het begin
      setCharacterText('');
      const fullText = "Watch the video for the lore Bosu!";
      let index = 0;
  
      const timer = setInterval(() => {
        if (index < fullText.length) {
          setCharacterText(fullText.substring(0, index + 1)); // Gebruik substring om exacte tekst te bouwen
          index++;
        } else {
          clearInterval(timer); // Stop de timer als de tekst volledig is
        }
      }, 100); // Snelheid aanpassen
  
      return () => clearInterval(timer); // Timer opruimen bij verlaten van de pagina
    }
  }, [page]);
  
  
  

  useEffect(() => {
    if (page === 5) {
      setIsLeftBlurred(false);
      setIsRightBlurred(false);
      console.log('Resetting blur states for Page 5');
    }
  }, [page]);
  

  useEffect(() => {
    if (page === 5) {
      setCharacterText(''); // Reset de tekst aan het begin van pagina 5
      const fullText = "Don't forget to join the Discord!!";
      let index = 0;
      const timer = setInterval(() => {
        setCharacterText(fullText.substring(0, index + 1)); // Voeg letter per letter toe
        index++;
        if (index === fullText.length) clearInterval(timer);
      }, 100); // Snelheid aanpassen
      return () => clearInterval(timer); // Timer opruimen
    }
  }, [page]);
  

  const handleStart = () => {
    setShowPopup(false);
    setTimeout(() => setPage(2), 1000);
  };

  const handleNextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection((prev) => prev + 1);
    } else {
      document.getElementById('page2-content').classList.add('fade-out');
      setTimeout(() => setPage(3), 1000);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${page === 1 ? background1 : background2})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'background 1s ease-in-out',
      }}
    >
      {page === 1 && showPopup && (
  <div className="popup fade-out">
    <div className="chatbox">
      <p>{text}</p>
    </div>
    <img src={character} alt="Character" className="character-image" />
    <button onClick={handleStart} className="popup-button">
      Let's Start
    </button>

    {/* Footer met Twitter-redirect */}
    <div
      style={{
        position: 'absolute',
        bottom: '10px',
        width: '100%',
        textAlign: 'center',
        color: 'white',
        fontSize: '1.2rem',
      }}
    >
      <p>
        Created by{' '}
        <a
          href="https://twitter.com/soufian112"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#1DA1F2', textDecoration: 'none', fontWeight: 'bold' }}
        >
          @soufian112
        </a>{' '}
        &{' '}
        <a
          href="https://twitter.com/kingweakness"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#1DA1F2', textDecoration: 'none', fontWeight: 'bold' }}
        >
          @kingweakness
        </a>
      </p>
    </div>
  </div>
)}


      {page === 2 && (
        <div id="page2-content">
          {sections.map((section, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                top: currentSection === index ? '50%' : section.position.top,
                left: currentSection === index ? '50%' : section.position.left,
                transform: currentSection === index ? 'translate(-50%, -50%) scale(1.5)' : 'translate(-50%, -50%)',
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '20px',
                borderRadius: '10px',
                maxWidth: currentSection === index ? '500px' : '300px',
                textAlign: 'center',
                filter: currentSection === index ? 'none' : 'blur(5px)',
                zIndex: currentSection === index ? 3 : 1,
                transition: 'all 0.5s ease-in-out',
              }}
            >
              <h2>{section.title}</h2>
              <p>{section.content}</p>
            </div>
          ))}

          <div
            style={{
              position: 'absolute',
              top: `calc(${sections[currentSection].position.top} + 200px)`,
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              zIndex: 4,
            }}
          >
            <div
              style={{
                background: 'white',
                color: 'black',
                padding: '20px',
                borderRadius: '10px',
                marginBottom: '15px',
                maxWidth: '400px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <p>{characterText}</p>
            </div>
            <img
              src={character}
              alt="Character"
              style={{
                width: '350px',
                height: 'auto',
              }}
            />
            <button
              onClick={handleNextSection}
              style={{
                marginTop: '10px',
                background: '#007bff',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}

{page === 3 && (
  <div
    style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: `url(${background2}) center/cover no-repeat`,
    }}
  >
    <h1 style={{ color: '#fff', marginBottom: '20px' }}>Final Bosu Animation</h1>
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        gap: '50px',
        width: '80%',
        maxWidth: '1200px',
      }}
    >
      <video
        src="/assets/Finalbosurecord.mp4" // Nieuwe MP4-videobron
        controls
        style={{ width: '60%', maxWidth: '700px', height: 'auto' }}
      ></video>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            background: 'white',
            color: 'black',
            padding: '10px 20px',
            borderRadius: '10px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            fontWeight: 'normal',
            maxWidth: '200px',
          }}
        >
          {characterText} {/* Dynamische tekst */}
        </div>
        <img
          src={character}
          alt="Character"
          style={{
            width: '300px',
            height: 'auto',
          }}
        />
        <button
          onClick={() => setPage(4)}
          style={{
            marginTop: '20px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          Next
        </button>
      </div>
    </div>
  </div>
)}

{page === 4 && (
  <div
    style={{
      display: 'flex',
      width: '100%',
      height: '100vh',
      overflow: 'hidden', // Verhindert scrollen
      backgroundImage: `url(${background2})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }}
  >
    {/* Linkerhelft: Discord Navigation */}
    <div
      style={{
        flex: 1,
        filter: isLeftBlurred ? 'blur(5px)' : 'none',
        transition: 'filter 0.5s ease',
        padding: '80px',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1
        style={{
          fontSize: '4rem',
          marginBottom: '40px',
          textShadow: '4px 4px 8px rgba(0,0,0,0.7)',
        }}
      >
        Discord Navigation
      </h1>
      <div
        style={{
          background: 'white',
          color: 'black',
          padding: '40px',
          borderRadius: '20px',
          marginBottom: '40px',
          maxWidth: '600px',
          textAlign: 'center',
          boxShadow: '0px 20px 30px rgba(0, 0, 0, 0.5)',
          transform: 'scale(1.1)',
          zIndex: 2,
        }}
      >
        <p style={{ fontWeight: 'bold', fontSize: '1.5rem', marginBottom: '20px' }}>
          Keshuma Terminal – What Exactly Is This?
        </p>
        <p style={{ fontSize: '1.5rem', lineHeight: '2rem' }}>
          The #teams-welcome channel serves as an introduction to how the sections under it are structured. I recommend watching the videos provided.
        </p>
        <a
          href="https://finalbosu.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#007bff',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '1.8rem',
            marginTop: '20px',
            display: 'inline-block',
          }}
        >
          Join the Discord!
        </a>
      </div>
      <img
        src={poster1}
        alt="Discord Poster"
        style={{
          width: '90%',
          maxWidth: '500px',
          borderRadius: '20px',
          boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.7)',
          transition: 'transform 0.3s ease',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
        onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
      />
    </div>

    {/* Character in het midden */}
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          position: 'relative',
          background: 'white',
          color: 'black',
          padding: '20px 40px',
          borderRadius: '20px',
          marginBottom: '20px',
          textAlign: 'center',
          maxWidth: '400px',
          fontSize: '2rem',
          boxShadow: '0px 8px 12px rgba(0,0,0,0.5)',
        }}
      >
        <p>{characterMessage}</p>
      </div>
      <img
        src={character}
        alt="Character"
        style={{
          width: '500px',
          height: 'auto',
        }}
      />

{/* Volgende pagina-knop */}
<button
  onClick={() => {
    // Zorg eerst dat de rechterkant helder wordt en de linkerkant wazig
    setIsRightBlurred(false); // Rechterkant helder
    setIsLeftBlurred(true); // Linkerkant wazig
    setCharacterMessage("Let's focus on the right side now!"); // Eventuele boodschap aanpassen

    // Stel een vertraging in voordat je naar de volgende pagina gaat
    setTimeout(() => {
      setPage(5); // Navigeer naar pagina 5
    }, 2000); // Wacht 2 seconden voor de overgang
  }}
  style={{
    marginTop: '20px',
    background: '#007bff',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1rem',
  }}
>
  Go to Next Page
</button>

    </div>

    {/* Rechterhelft: Community Accounts */}
    <div
      style={{
        flex: 1,
        filter: isRightBlurred ? 'blur(5px)' : 'none',
        transition: 'filter 0.5s ease',
        padding: '80px',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h2
        style={{
          fontSize: '3rem',
          marginBottom: '40px',
          textShadow: '4px 4px 8px rgba(0,0,0,0.5)',
        }}
      >
        Community Accounts to Follow:
      </h2>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          fontSize: '1.8rem',
          textAlign: 'center',
          lineHeight: '3rem',
        }}
      >
        <li style={{ marginBottom: '20px' }}>
          <img
            src={xIcon}
            alt="X Logo"
            style={{ width: '40px', marginRight: '20px', verticalAlign: 'middle' }}
          />
          <a
            href="https://x.com/BosuArchives"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#00aaff', textDecoration: 'none' }}
          >
            Bosu Archives
          </a>
        </li>
        <li style={{ marginBottom: '20px' }}>
          <img
            src={xIcon}
            alt="X Logo"
            style={{ width: '40px', marginRight: '20px', verticalAlign: 'middle' }}
          />
          <a
            href="https://x.com/ONYXNFTT"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#00aaff', textDecoration: 'none' }}
          >
            ONYXNFTT - Community Spaces
          </a>
        </li>
        <li>
          <img
            src={xIcon}
            alt="X Logo"
            style={{ width: '40px', marginRight: '20px', verticalAlign: 'middle' }}
          />
          <a
            href="https://x.com/BosuTelevision"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#00aaff', textDecoration: 'none' }}
          >
            Bosu Television
          </a>
        </li>
      </ul>
      <img
        src={poster2}
        alt="Community Poster"
        style={{
          width: '90%',
          maxWidth: '500px',
          borderRadius: '20px',
          boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.7)',
          transition: 'transform 0.3s ease',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
        onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
      />
    </div>
    
  </div>

  
)}

{page === 5 && (
  <div
    style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundImage: `url(${background2})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      padding: '40px',
    }}
  >
    {!isDoneClicked ? (
      <>
        {/* Linkerzijde: Titel en Teamkaarten */}
        <div
          style={{
            flex: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '50px',
          }}
        >
          <h1
            style={{
              fontSize: '3rem',
              color: 'white',
              marginBottom: '30px',
              textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
            }}
          >
            Meet the Team
          </h1>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
              justifyItems: 'center',
              maxWidth: '900px',
            }}
          >
            {[
              {
                name: '@kaito_ayo',
                img: require('./assets/kaito.jpg'),
                text: `Kaito, originally from Italy, is a multilingual talent who speaks French, English, and Italian. Why is he called "the popular guy"? Because he’s well-connected and seems to be everywhere these days! The community loves him for his approachable vibe and active involvement.`,
              },
              {
                name: '@MustaYaki',
                img: require('./assets/mustayaki.jpg'),
                text: `Musta runs a YouTube channel called “How to Bam”, which boasts an impressive 22k subscribers. He used this platform to promote his company, Mangafy’ed. Curious? Check it out here: Mangafy’ed.`,
              },
              {
                name: '@JeffMustaman',
                img: require('./assets/JeffMustaman.jpg'),
                text: `Jeff is the founder of MovieRebels, a company specializing in innovative video production. After leading this successful venture, he shifted focus to blogging on Instagram about meditation and spirituality.`,
              },
              {
                name: '@barracuda1709',
                img: require('./assets/Barracuda1709.jpg'),
                text: `He is also loved by the community like Kaito, and people often mention how he is always online on discord. He´s the shadow hokage lurking in the dark always monitoring chat and keeping an eye on the community.`,
              },
              {
                name: '@kevinfinalbosu',
                img: require('./assets/Kevinfinalbosu.jpg'),
                text: `Kevin is from the Netherlands but has been living in Gran Canaria, Spain, for the past 12 years. Despite dropping out of high school, he landed a job at a marketing agency. However, Kevin made the bold decision to leave the agency and fully commit to building @finalbosuX alongside his brothers.`,
              },
            ].map((member, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  borderRadius: '10px',
                  padding: '15px',
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                  textAlign: 'center',
                  maxWidth: '250px',
                  minHeight: '280px',
                }}
              >
                <img
                  src={member.img}
                  alt={`${member.name} Profile`}
                  style={{
                    width: '100%',
                    height: '120px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                    marginBottom: '10px',
                  }}
                />
                <h2 style={{ fontSize: '1rem', marginBottom: '10px' }}>{member.name}</h2>
                <p style={{ fontSize: '0.8rem', lineHeight: '1.2rem' }}>{member.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Rechterzijde: Character */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginLeft: '-100px',
          }}
        >
          <div
            style={{
              background: 'white',
              color: 'black',
              padding: '10px 20px',
              borderRadius: '10px',
              marginBottom: '10px',
              maxWidth: '300px',
              textAlign: 'center',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            {characterText}
          </div>
          <img
            src={character}
            alt="Character"
            style={{
              width: '100%',
              maxWidth: '450px',
              height: 'auto',
            }}
          />
          <button
            onClick={() => handleDoneClick()}
            style={{
              marginTop: '20px',
              background: '#007bff',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Done
          </button>
        </div>
      </>
    ) : (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <img
          src={require('./assets/Fudkaito.png')}
          alt="Flying Image"
          style={{
            animation: 'flyIn 2s forwards',
            width: '50%',
            maxWidth: '500px',
            marginBottom: '20px',
          }}
        />
        <div style={{ textAlign: 'center' }}>
          <img
            src={character}
            alt="Character"
            style={{
              width: '50%',
              maxWidth: '500px',
              animation: 'fadeIn 1.5s forwards',
            }}
          />
          <div
            style={{
              marginTop: '20px',
              background: 'white',
              padding: '10px 20px',
              borderRadius: '10px',
              maxWidth: '300px',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            You thought that you are done??? You still need to FUD Kaito!!!!!!!!!!!!!!!
          </div>
        </div>
      </div>
    )}
  </div>
)}


    </div>
  );
}

export default App;

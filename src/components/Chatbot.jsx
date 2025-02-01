import React, { useEffect, useState } from "react";

const Chatbot = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
    script.type = "text/javascript";
    script.onload = () => {
      const translations = {
        en: {
          title: "LaHelpNow",
          description: "Get and give help during California Wildfires",
        },
        es: {
          title: "LaAyudaAhora",
          description:
            "Obtén y brinda ayuda durante los incendios forestales en California",
        },
        fr: {
          title: "LaAideMaintenant",
          description:
            "Obtenez et donnez de l'aide pendant les incendies de forêt en Californie",
        },
      };

      const selectedLanguage = document.documentElement.lang || "en";

      window.voiceflow.chat.load({
        verify: { projectID: "6788df4b6fcd91c13b78ebb2" },
        url: "https://general-runtime.voiceflow.com",
        versionID: "production",
        assistant: {
          title: translations[selectedLanguage]?.title || "LaHelpNow",
          description:
            translations[selectedLanguage]?.description ||
            "Get and give help during California Wildfires",
          image: "string",
        },
      });

      // Wait for chatbot to render, then attach tooltip
      setTimeout(() => {
        const chatbotButton = document.querySelector(
          'iframe[src*="voiceflow"]'
        )?.parentElement;
        if (chatbotButton) {
          chatbotButton.style.position = "relative"; // Ensure the button is positioned relative
        }
      }, 1500);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChatbotClick = () => {
    if (window.voiceflow && window.voiceflow.chat) {
      window.voiceflow.chat.open();
    }
    setShowTooltip(false); // Hide tooltip when chatbot opens
  };

  return (
    <>
      {showTooltip && (
        <div
          id="chatbot-tooltip"
          className="absolute bottom-16 right-0 bg-blue-500 text-white text-sm px-4 py-2 rounded-lg shadow-md animate-fadeIn"
          style={{
            position: "fixed",
            bottom: "94px", // Adjusted to appear above the chatbot button
            right: "55px",
            maxWidth: "330px", // Ensures wrapping on smaller screens
            textAlign: "center",
            whiteSpace: "normal", // Allows multi-line text
            lineHeight: "1.3",
          }}
        >
          Want to talk with Lala about what's going on?
          <br />
          <span style={{float: "right"}} >Click here!</span>
          <div
            className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-500 rotate-45"
            style={{
              position: "absolute",
              bottom: "-5px",
              left: "94%",
              transform: "translateX(-50%) rotate(45deg)",
              width: "10px",
              height: "10px",
              backgroundColor: "#3b82f6",
            }}
          ></div>
        </div>
      )}

      <script>
        {`
          document.addEventListener("DOMContentLoaded", () => {
            setTimeout(() => {
              const chatbotButton = document.querySelector('iframe[src*="voiceflow"]')?.parentElement;
              if (chatbotButton) {
                chatbotButton.appendChild(document.getElementById("chatbot-tooltip"));
                chatbotButton.addEventListener("click", () => {
                  document.getElementById("chatbot-tooltip").style.display = "none";
                });
              }
            }, 2000);
          });
        `}
      </script>
    </>
  );
};

export default Chatbot;

import React, { useEffect } from "react";

const Chatbot = () => {
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

      window.voiceflow.chat
        .load({
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
        })
        .then(() => {
          setTimeout(() => window.voiceflow.chat.open(), 1000);
        });
    };

    document.body.appendChild(script);

    // Cleanup script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // This component does not render anything visually
};

export default Chatbot;

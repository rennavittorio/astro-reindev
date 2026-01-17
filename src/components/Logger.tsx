import { useEffect } from "react";

const Logger = () => {
  const color = "color: #2196F3";
  useEffect(() => {
    const devFunctions = {
      help: () => {
        console.log("Comandi disponibili: ");
        console.log("  - dev.help(): Lista dei comandi disponibili.");
        console.log("  - dev.contacts(): Se vuoi sapere dove contattarmi.");
        console.log(
          "  - dev.about(): Se vuoi sapere qualcosa più di personale su di me.",
        );
        console.log(
          "  - dev.profession(): Se vuoi sapere qualcosa in più sul mio percorso.",
        );
      },
      contacts: () => {
        console.log("-------------------------");
        console.log(
          "Se vuoi contattarmi, scrivimi pure alla email: %crenna.vittorio@gmail.com",
          color,
        );
        console.log("Oppure cercami su Discord come %c@reindev", color);
        console.log("Mi troverai sempre disponibile per due chiacchiere");
        console.log("-------------------------");
      },
      about: () => {
        console.log("-------------------------");
        console.log(`Che mi chiamo Vittorio già lo sai`);
        console.log(`Sono cresciuto tra le montagne ossolane`);
        console.log(
          `E mi sono formato come professionista tra Padova e Milano`,
        );
        console.log("-------------------------");
      },
      profession: () => {
        console.log("-------------------------");
        console.log(
          "Ho da sempre la passione per il tech, ma non sono stato sempre un dev",
        );
        console.log(
          "Ho studiato il comportamento delle persone attraverso le neuroscienze",
        );
        console.log(
          "Dopo un primo periodo di ricerca, sono passato al mondo aziendale: prima come HR e poi come Consulente IT",
        );
        console.log(
          "È stato un percorso particolare che mi ha lasciato molte competenze trasversali",
        );
        console.log("Parlo con le persone, e deployo codice");
        console.log("-------------------------");
      },
    };

    (window as any).dev = devFunctions;

    console.log(
      "%cCiao! Se sei qui vuol dire che sei un collega. Scrivi `dev.help()` in console per scoprire i comandi disponbili.",
      color,
    );

    return () => {
      delete (window as any).dev;
    };
  }, []);

  return null;
};

export default Logger;

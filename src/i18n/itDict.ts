// Italian translations indexed by their English source string.
// Used by BookingPage / PricingPage / HomePage / ExcursionsPage so that
// when the active language is "IT", the inline tr(lang, fr, en, de, es, ar)
// helper returns Italian instead of falling back to English.

export const IT_DICT: Record<string, string> = {
  // BookingPage — vehicles & passengers
  "Hatchback": "Hatchback",
  "Sedan": "Berlina",
  "Minivan": "Monovolume",
  "3 passengers · 3 bags": "3 passeggeri · 3 bagagli",
  "4 passengers · 4 bags": "4 passeggeri · 4 bagagli",
  "8 passengers · 8 bags": "8 passeggeri · 8 bagagli",
  "Adults": "Adulti",
  "Children": "Bambini",
  "Infants": "Neonati",
  "13 yrs and over": "13 anni e oltre",
  "2 to 12 yrs": "da 2 a 12 anni",
  "0 to 2 yrs": "da 0 a 2 anni",
  "Pax": "Pax",
  "passengers": "passeggeri",
  "infants": "neonati",
  "luggage": "bagagli",
  "Luggage": "Bagagli",
  "Suitcases & bags": "Valigie e borse",

  // BookingPage — flow
  "Express Booking": "Prenotazione Express",
  "Your Trip": "Il tuo Tragitto",
  "Passengers & Luggage": "Passeggeri e Bagagli",
  "Vehicle, Payment & Info": "Veicolo, Pagamento e Info",
  "Trip": "Tragitto",
  "Vehicle": "Veicolo",
  "Trip summary": "Riepilogo del tragitto",
  "Edit": "Modifica",
  "Continue": "Continua",
  "Back": "Indietro",
  "See vehicles": "Vedi i veicoli",
  "Choose your vehicle": "Scegli il tuo veicolo",
  "Who's travelling with you?": "Chi viaggia con te?",
  "Tap + or − to adjust.": "Tocca + o − per modificare.",
  "Maximum 8 passengers (adults + children).": "Massimo 8 passeggeri (adulti + bambini).",
  "Maximum 8 passengers": "Massimo 8 passeggeri",
  "Decrease": "Diminuisci",
  "Increase": "Aumenta",
  "Swap": "Scambia",

  // BookingPage — fields & labels
  "Pickup location *": "Luogo di partenza *",
  "Destination *": "Destinazione *",
  "Date *": "Data *",
  "Time *": "Ora *",
  "Date": "Data",
  "Time": "Ora",
  "Full name *": "Nome completo *",
  "Phone *": "Telefono *",
  "Flight number": "Numero di volo",
  "Comments": "Commenti",
  "From": "Da",
  "Ex: Tunis-Carthage Airport": "Es: Aeroporto Tunisi-Cartagine",
  "Ex: Hammamet, Sousse…": "Es: Hammamet, Sousse…",
  "Ex: Hammamet": "Es: Hammamet",
  "No destination found": "Nessuna destinazione trovata",
  "Filter destination": "Filtra destinazione",

  // BookingPage — payment
  "Payment method": "Metodo di pagamento",
  "Cash": "Contanti",
  "Online": "Online",
  "Secure card": "Carta sicura",
  "To the driver": "All'autista",
  "Confirm booking": "Conferma prenotazione",
  "Confirm & pay": "Conferma e paga",
  "Submitting…": "Invio in corso…",
  "Booking confirmed ✓": "Prenotazione confermata ✓",
  "Submission failed": "Invio non riuscito",
  "You'll be redirected to payment.": "Sarai reindirizzato al pagamento.",
  "Pay cash directly to the driver.": "Paga in contanti direttamente all'autista.",

  // BookingPage — validation & misc
  "Pickup is required": "Luogo di partenza richiesto",
  "Destination is required": "Destinazione richiesta",
  "Date is required": "Data richiesta",
  "Time is required": "Ora richiesta",
  "Booking must be at least 4 hours in advance.": "La prenotazione deve essere effettuata almeno 4 ore prima.",
  "This route has no fixed rate. Submit your request and we'll confirm a tailored quote.":
    "Questo tragitto non ha una tariffa fissa. Invia la richiesta e ti confermeremo un preventivo personalizzato.",
  "ON QUOTE": "SU RICHIESTA",
  "from": "da",
  "around": "circa",
  "h": "h",
  "min": "min",

  // PricingPage
  "✦ FIXED RATES · PREMIUM PRIVATE TRANSFERS ✦": "✦ TARIFFE FISSE · TRASFERIMENTI PRIVATI PREMIUM ✦",
  "One way": "Sola andata",
};

---
services:
  - name:
      da: Køkken
      en: Kitchen
    schedule:
      - days: [Mon, Tue, Wed, Thu]
        ranges:
          - { opens: "11:30", closes: "16:00" }
          - { opens: "17:30", closes: "21:00" }
      - days: [Fri, Sat]
        ranges:
          - { opens: "11:30", closes: "16:00" }
          - { opens: "17:30", closes: "21:30" }
  - name:
      da: Restaurant & bar
      en: Restaurant & bar
    schedule:
      - days: [Mon, Tue, Wed, Thu]
        ranges:
          - { opens: "11:30", closes: "23:00" }
      - days: [Fri, Sat]
        ranges:
          - { opens: "11:30", closes: "02:00" }
notes:
  da: Søndag holder vi lukket.
  en: Closed on Sundays.
---

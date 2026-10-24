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
      - days: [Sun]
        ranges:
          - { opens: "10:00", closes: "14:00" }
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
      - days: [Sun]
        ranges:
          - { opens: "10:00", closes: "14:00" }
notes:
  da: ""
  en: ""
---

// Built-in sample content. The site uses it when Supabase is not configured,
// and scripts/generate-seed.ts turns it into supabase/seed.sql.
// Sample reviews are for layout previews only: the seed stores them as "hidden".
import type { SampleData } from "./types";

export const sample: SampleData = {
  "destinations": [
    {
      "slug": "masai-mara",
      "name": {
        "en": "Maasai Mara",
        "de": "Maasai Mara"
      },
      "region": {
        "en": "Narok County · southwest",
        "de": "Narok County · Südwesten"
      },
      "description": {
        "en": "Kenya’s most famous reserve and the home of the Maasai. Big cats are seen year-round, and from July to October the Great Migration crosses the Mara River. The surrounding community conservancies keep vehicle numbers low.",
        "de": "Kenias berühmtestes Schutzgebiet und Heimat der Maasai. Großkatzen sieht man das ganze Jahr, und von Juli bis Oktober überquert die Große Tierwanderung den Mara River. Die umliegenden Gemeinde-Schutzgebiete halten die Zahl der Fahrzeuge niedrig."
      },
      "bestTime": {
        "en": "All year; July–October for river crossings",
        "de": "Ganzjährig; Juli–Oktober für Flussüberquerungen"
      },
      "keywords": "safari mara masai migration big five lion",
      "group": "safari",
      "latitude": -1.4939,
      "longitude": 35.1439,
      "image": null,
      "placeholder": "savannah",
      "featured": true,
      "position": 1
    },
    {
      "slug": "amboseli",
      "name": {
        "en": "Amboseli",
        "de": "Amboseli"
      },
      "region": {
        "en": "Kajiado County · south",
        "de": "Kajiado County · Süden"
      },
      "description": {
        "en": "Large elephant herds wander the swamps beneath Mount Kilimanjaro, which rises just across the border in Tanzania. Clear mornings give the classic view of the snow-capped peak.",
        "de": "Große Elefantenherden ziehen durch die Sümpfe am Fuß des Kilimanjaro, der direkt jenseits der Grenze in Tansania aufragt. An klaren Morgen zeigt sich der schneebedeckte Gipfel."
      },
      "bestTime": {
        "en": "June–October, January–February",
        "de": "Juni–Oktober, Januar–Februar"
      },
      "keywords": "safari elephants kilimanjaro",
      "group": "safari",
      "latitude": -2.6527,
      "longitude": 37.2606,
      "image": null,
      "placeholder": "savannah",
      "featured": true,
      "position": 2
    },
    {
      "slug": "tsavo",
      "name": {
        "en": "Tsavo East & West",
        "de": "Tsavo East & West"
      },
      "region": {
        "en": "Between Nairobi and the coast",
        "de": "Zwischen Nairobi und der Küste"
      },
      "description": {
        "en": "Together one of the largest protected areas in Africa. Tsavo East is known for elephants dusted red by the soil; Tsavo West has volcanic hills and the clear pools of Mzima Springs.",
        "de": "Zusammen eines der größten Schutzgebiete Afrikas. Tsavo East ist für seine von der Erde rot gefärbten Elefanten bekannt, Tsavo West für Vulkanhügel und die klaren Quellen von Mzima Springs."
      },
      "bestTime": {
        "en": "June–October",
        "de": "Juni–Oktober"
      },
      "keywords": "safari elephants red wilderness mzima",
      "group": "safari",
      "latitude": -2.9833,
      "longitude": 38.4667,
      "image": null,
      "placeholder": "north",
      "featured": false,
      "position": 3
    },
    {
      "slug": "samburu",
      "name": {
        "en": "Samburu",
        "de": "Samburu"
      },
      "region": {
        "en": "Samburu County · north",
        "de": "Samburu County · Norden"
      },
      "description": {
        "en": "Dry, rugged country along the Ewaso Ng’iro river and home of the Samburu people. Look for the “Samburu Special Five”: Grevy’s zebra, reticulated giraffe, gerenuk, beisa oryx and Somali ostrich.",
        "de": "Trockenes, raues Land am Fluss Ewaso Ng’iro und Heimat der Samburu. Hier leben die „Samburu Special Five“: Grevyzebra, Netzgiraffe, Giraffengazelle, Beisa-Oryx und Somali-Strauß."
      },
      "bestTime": {
        "en": "June–October, December–March",
        "de": "Juni–Oktober, Dezember–März"
      },
      "keywords": "safari north desert special five",
      "group": "safari",
      "latitude": 0.6167,
      "longitude": 37.5333,
      "image": null,
      "placeholder": "north",
      "featured": false,
      "position": 4
    },
    {
      "slug": "nakuru",
      "name": {
        "en": "Lake Nakuru",
        "de": "Lake Nakuru"
      },
      "region": {
        "en": "Rift Valley",
        "de": "Rift Valley"
      },
      "description": {
        "en": "A compact park around a Rift Valley lake, and one of the best places in Kenya to see both black and white rhinos. Flamingo numbers rise and fall with the water level.",
        "de": "Ein kompakter Park um einen See im Rift Valley und einer der besten Orte Kenias, um Spitz- und Breitmaulnashörner zu sehen. Die Zahl der Flamingos schwankt mit dem Wasserstand."
      },
      "bestTime": {
        "en": "All year",
        "de": "Ganzjährig"
      },
      "keywords": "safari rhino flamingo lake",
      "group": "lakes",
      "latitude": -0.3667,
      "longitude": 36.0833,
      "image": null,
      "placeholder": "flamingo",
      "featured": true,
      "position": 5
    },
    {
      "slug": "naivasha",
      "name": {
        "en": "Lake Naivasha & Hell’s Gate",
        "de": "Lake Naivasha & Hell’s Gate"
      },
      "region": {
        "en": "Rift Valley",
        "de": "Rift Valley"
      },
      "description": {
        "en": "A freshwater lake full of hippos and birdlife, with walking safaris on Crescent Island. Next door, Hell’s Gate is one of the few parks where you can cycle among zebras and walk through a gorge.",
        "de": "Ein Süßwassersee voller Flusspferde und Vögel, mit Fußsafaris auf Crescent Island. Gleich nebenan liegt Hell’s Gate, einer der wenigen Parks, in denen man zwischen Zebras Rad fahren und durch eine Schlucht wandern kann."
      },
      "bestTime": {
        "en": "All year",
        "de": "Ganzjährig"
      },
      "keywords": "boat hippo cycling walking gorge",
      "group": "lakes",
      "latitude": -0.7667,
      "longitude": 36.4167,
      "image": null,
      "placeholder": "lake",
      "featured": false,
      "position": 6
    },
    {
      "slug": "mount-kenya",
      "name": {
        "en": "Mount Kenya & Ol Pejeta",
        "de": "Mount Kenya & Ol Pejeta"
      },
      "region": {
        "en": "Central highlands · Laikipia",
        "de": "Zentrales Hochland · Laikipia"
      },
      "description": {
        "en": "Africa’s second-highest mountain at 5,199 m, with forest walks on its lower slopes. On the plains below, Ol Pejeta Conservancy protects rhinos and runs a chimpanzee sanctuary.",
        "de": "Mit 5.199 m Afrikas zweithöchster Berg, mit Waldwanderungen an den unteren Hängen. In der Ebene darunter schützt das Ol Pejeta Conservancy Nashörner und betreibt ein Schimpansen-Schutzzentrum."
      },
      "bestTime": {
        "en": "January–February, July–October",
        "de": "Januar–Februar, Juli–Oktober"
      },
      "keywords": "mountain hiking rhino chimpanzee",
      "group": "lakes",
      "latitude": -0.1521,
      "longitude": 37.3084,
      "image": null,
      "placeholder": "mountain",
      "featured": false,
      "position": 7
    },
    {
      "slug": "diani",
      "name": {
        "en": "Diani Beach",
        "de": "Diani Beach"
      },
      "region": {
        "en": "South coast",
        "de": "Südküste"
      },
      "description": {
        "en": "Long white sand on the Indian Ocean south of Mombasa. Snorkel or dive at Kisite-Mpunguti marine park and watch colobus monkeys in the coastal forest.",
        "de": "Langer weißer Sandstrand am Indischen Ozean südlich von Mombasa. Schnorcheln oder tauchen Sie im Meeresschutzgebiet Kisite-Mpunguti und beobachten Sie Stummelaffen im Küstenwald."
      },
      "bestTime": {
        "en": "December–March, July–October",
        "de": "Dezember–März, Juli–Oktober"
      },
      "keywords": "beach strand sea snorkel coast",
      "group": "coast",
      "latitude": -4.2797,
      "longitude": 39.5947,
      "image": null,
      "placeholder": "coast",
      "featured": true,
      "position": 8
    },
    {
      "slug": "mombasa",
      "name": {
        "en": "Mombasa",
        "de": "Mombasa"
      },
      "region": {
        "en": "Coast",
        "de": "Küste"
      },
      "description": {
        "en": "Kenya’s old port city. Walk the lanes of Old Town, browse the spice market and visit Fort Jesus, a 16th-century Portuguese fort and UNESCO World Heritage Site.",
        "de": "Kenias alte Hafenstadt. Spazieren Sie durch die Gassen der Altstadt, stöbern Sie auf dem Gewürzmarkt und besuchen Sie Fort Jesus, eine portugiesische Festung aus dem 16. Jahrhundert und UNESCO-Welterbe."
      },
      "bestTime": {
        "en": "December–March, July–October",
        "de": "Dezember–März, Juli–Oktober"
      },
      "keywords": "beach strand coast city fort swahili",
      "group": "coast",
      "latitude": -4.0435,
      "longitude": 39.6682,
      "image": null,
      "placeholder": "coast",
      "featured": false,
      "position": 9
    },
    {
      "slug": "lamu",
      "name": {
        "en": "Lamu",
        "de": "Lamu"
      },
      "region": {
        "en": "North coast",
        "de": "Nordküste"
      },
      "description": {
        "en": "An island where donkeys and dhows replace cars. Lamu Old Town is a UNESCO World Heritage Site and one of the oldest Swahili settlements on the coast.",
        "de": "Eine Insel, auf der Esel und Dhaus die Autos ersetzen. Die Altstadt von Lamu ist UNESCO-Welterbe und eine der ältesten Swahili-Siedlungen der Küste."
      },
      "bestTime": {
        "en": "November–March",
        "de": "November–März"
      },
      "keywords": "beach strand island swahili dhow",
      "group": "coast",
      "latitude": -2.2717,
      "longitude": 40.902,
      "image": null,
      "placeholder": "coast",
      "featured": false,
      "position": 10
    },
    {
      "slug": "nairobi",
      "name": {
        "en": "Nairobi",
        "de": "Nairobi"
      },
      "region": {
        "en": "Capital",
        "de": "Hauptstadt"
      },
      "description": {
        "en": "The only capital with a national park inside its limits, where giraffes graze in front of the skyline. Many trips start here, with a visit to an elephant orphanage or the Giraffe Centre.",
        "de": "Die einzige Hauptstadt mit einem Nationalpark innerhalb der Stadtgrenzen, wo Giraffen vor der Skyline grasen. Viele Reisen beginnen hier, etwa mit einem Besuch im Elefantenwaisenhaus oder im Giraffe Centre."
      },
      "bestTime": {
        "en": "All year",
        "de": "Ganzjährig"
      },
      "keywords": "city stadt giraffe elephant orphanage",
      "group": "coast",
      "latitude": -1.2921,
      "longitude": 36.8219,
      "image": null,
      "placeholder": "city",
      "featured": false,
      "position": 11
    }
  ],
  "trips": [
    {
      "slug": "mara-classic",
      "title": {
        "en": "Maasai Mara Classic",
        "de": "Maasai Mara Klassik"
      },
      "summary": {
        "en": "Three nights in the Mara with twice-daily game drives, a Maasai village visit and an optional sunrise balloon flight.",
        "de": "Drei Nächte in der Maasai Mara mit zwei Pirschfahrten täglich, Besuch eines Maasai-Dorfes und optionaler Ballonfahrt bei Sonnenaufgang."
      },
      "season": {
        "en": "All year; July–October for river crossings",
        "de": "Ganzjährig; Juli–Oktober für Flussüberquerungen"
      },
      "durationDays": 4,
      "priceFrom": 1290,
      "style": "safari",
      "status": "published",
      "coverImage": null,
      "placeholder": "savannah",
      "featured": true,
      "position": 1,
      "destinations": [
        "masai-mara"
      ],
      "days": [
        {
          "dayNumber": 1,
          "dayLabel": "1",
          "title": {
            "en": "Nairobi to the Maasai Mara",
            "de": "Nairobi – Maasai Mara"
          },
          "description": {
            "en": "Pickup from your hotel, drive through the Great Rift Valley, afternoon game drive.",
            "de": "Abholung am Hotel, Fahrt durch das Rift Valley, Pirschfahrt am Nachmittag."
          }
        },
        {
          "dayNumber": 2,
          "dayLabel": "2",
          "title": {
            "en": "A full day in the Mara",
            "de": "Ein ganzer Tag in der Mara"
          },
          "description": {
            "en": "Full-day game drive with a picnic lunch along the Mara River.",
            "de": "Ganztägige Pirschfahrt mit Picknick am Mara River."
          }
        },
        {
          "dayNumber": 3,
          "dayLabel": "3",
          "title": {
            "en": "Balloon and Maasai village",
            "de": "Ballon und Maasai-Dorf"
          },
          "description": {
            "en": "Optional balloon flight at dawn, then an afternoon with a Maasai community.",
            "de": "Optionale Ballonfahrt im Morgengrauen, nachmittags Besuch einer Maasai-Gemeinschaft."
          }
        },
        {
          "dayNumber": 4,
          "dayLabel": "4",
          "title": {
            "en": "Back to Nairobi",
            "de": "Zurück nach Nairobi"
          },
          "description": {
            "en": "Last morning drive, back in Nairobi by mid-afternoon.",
            "de": "Letzte Morgenpirsch, Rückkehr nach Nairobi am Nachmittag."
          }
        }
      ],
      "inclusions": [
        {
          "type": "included",
          "text": {
            "en": "Private 4x4 with pop-up roof and driver-guide",
            "de": "Privater Geländewagen mit Hubdach und Fahrer-Guide"
          }
        },
        {
          "type": "included",
          "text": {
            "en": "Park and conservancy fees",
            "de": "Park- und Schutzgebietsgebühren"
          }
        },
        {
          "type": "included",
          "text": {
            "en": "Accommodation as listed",
            "de": "Unterkünfte wie beschrieben"
          }
        },
        {
          "type": "included",
          "text": {
            "en": "Meals on safari days",
            "de": "Mahlzeiten an Safaritagen"
          }
        },
        {
          "type": "included",
          "text": {
            "en": "Drinking water in the vehicle",
            "de": "Trinkwasser im Fahrzeug"
          }
        },
        {
          "type": "excluded",
          "text": {
            "en": "International flights",
            "de": "Internationale Flüge"
          }
        },
        {
          "type": "excluded",
          "text": {
            "en": "Kenya eTA (electronic travel authorisation)",
            "de": "Kenia eTA (elektronische Reisegenehmigung)"
          }
        },
        {
          "type": "excluded",
          "text": {
            "en": "Travel insurance",
            "de": "Reiseversicherung"
          }
        },
        {
          "type": "excluded",
          "text": {
            "en": "Tips and drinks",
            "de": "Trinkgelder und Getränke"
          }
        },
        {
          "type": "excluded",
          "text": {
            "en": "Optional activities, e.g. balloon flight",
            "de": "Optionale Aktivitäten, z. B. Ballonfahrt"
          }
        }
      ],
      "images": [],
      "offers": [
        {
          "label": {
            "en": "Early booking −10%",
            "de": "Frühbucher −10 %"
          },
          "startsOn": "2026-10-01",
          "endsOn": "2027-01-31",
          "priceOverride": null,
          "percentOff": 10
        }
      ]
    },
    {
      "slug": "rift-valley-mara",
      "title": {
        "en": "Rift Valley Lakes & the Mara",
        "de": "Rift-Valley-Seen & Maasai Mara"
      },
      "summary": {
        "en": "Rhinos at Lake Nakuru, hippos on Lake Naivasha, cycling through Hell’s Gate and three nights in the Mara.",
        "de": "Nashörner am Lake Nakuru, Flusspferde auf dem Lake Naivasha, Radtour durch Hell’s Gate und drei Nächte in der Mara."
      },
      "season": {
        "en": "All year",
        "de": "Ganzjährig"
      },
      "durationDays": 7,
      "priceFrom": 2190,
      "style": "safari",
      "status": "published",
      "coverImage": null,
      "placeholder": "lake",
      "featured": true,
      "position": 2,
      "destinations": [
        "nakuru",
        "naivasha",
        "masai-mara"
      ],
      "days": [
        {
          "dayNumber": 1,
          "dayLabel": "1",
          "title": {
            "en": "Arrival in Nairobi",
            "de": "Ankunft in Nairobi"
          },
          "description": {
            "en": "Welcome and a quiet first night.",
            "de": "Begrüßung und eine ruhige erste Nacht."
          }
        },
        {
          "dayNumber": 2,
          "dayLabel": "2",
          "title": {
            "en": "Lake Nakuru",
            "de": "Lake Nakuru"
          },
          "description": {
            "en": "Game drive in search of black and white rhinos, then the view from Baboon Cliff.",
            "de": "Pirschfahrt auf der Suche nach Spitz- und Breitmaulnashörnern, danach Aussicht vom Baboon Cliff."
          }
        },
        {
          "dayNumber": 3,
          "dayLabel": "3",
          "title": {
            "en": "Lake Naivasha",
            "de": "Lake Naivasha"
          },
          "description": {
            "en": "Boat ride among hippos and a walking safari on Crescent Island.",
            "de": "Bootsfahrt zwischen Flusspferden und Fußsafari auf Crescent Island."
          }
        },
        {
          "dayNumber": 4,
          "dayLabel": "4",
          "title": {
            "en": "Hell’s Gate to the Mara",
            "de": "Hell’s Gate – Maasai Mara"
          },
          "description": {
            "en": "Morning cycle through Hell’s Gate, afternoon drive to the Mara.",
            "de": "Morgens mit dem Rad durch Hell’s Gate, nachmittags Fahrt in die Mara."
          }
        },
        {
          "dayNumber": 5,
          "dayLabel": "5",
          "title": {
            "en": "Maasai Mara",
            "de": "Maasai Mara"
          },
          "description": {
            "en": "Full day of game drives.",
            "de": "Ganztägige Pirschfahrten."
          }
        },
        {
          "dayNumber": 6,
          "dayLabel": "6",
          "title": {
            "en": "Maasai Mara",
            "de": "Maasai Mara"
          },
          "description": {
            "en": "Morning drive and a Maasai village visit.",
            "de": "Morgenpirsch und Besuch eines Maasai-Dorfes."
          }
        },
        {
          "dayNumber": 7,
          "dayLabel": "7",
          "title": {
            "en": "Back to Nairobi",
            "de": "Zurück nach Nairobi"
          },
          "description": {
            "en": "Return to Nairobi for your onward journey.",
            "de": "Rückfahrt nach Nairobi zur Weiterreise."
          }
        }
      ],
      "inclusions": [
        {
          "type": "included",
          "text": {
            "en": "Private 4x4 with pop-up roof and driver-guide",
            "de": "Privater Geländewagen mit Hubdach und Fahrer-Guide"
          }
        },
        {
          "type": "included",
          "text": {
            "en": "Park and conservancy fees",
            "de": "Park- und Schutzgebietsgebühren"
          }
        },
        {
          "type": "included",
          "text": {
            "en": "Accommodation as listed",
            "de": "Unterkünfte wie beschrieben"
          }
        },
        {
          "type": "included",
          "text": {
            "en": "Meals on safari days",
            "de": "Mahlzeiten an Safaritagen"
          }
        },
        {
          "type": "included",
          "text": {
            "en": "Drinking water in the vehicle",
            "de": "Trinkwasser im Fahrzeug"
          }
        },
        {
          "type": "excluded",
          "text": {
            "en": "International flights",
            "de": "Internationale Flüge"
          }
        },
        {
          "type": "excluded",
          "text": {
            "en": "Kenya eTA (electronic travel authorisation)",
            "de": "Kenia eTA (elektronische Reisegenehmigung)"
          }
        },
        {
          "type": "excluded",
          "text": {
            "en": "Travel insurance",
            "de": "Reiseversicherung"
          }
        },
        {
          "type": "excluded",
          "text": {
            "en": "Tips and drinks",
            "de": "Trinkgelder und Getränke"
          }
        },
        {
          "type": "excluded",
          "text": {
            "en": "Optional activities, e.g. balloon flight",
            "de": "Optionale Aktivitäten, z. B. Ballonfahrt"
          }
        }
      ],
      "images": [],
      "offers": []
    },
    {
      "slug": "amboseli-tsavo-diani",
      "title": {
        "en": "Kilimanjaro Views to Diani Beach",
        "de": "Vom Kilimanjaro nach Diani Beach"
      },
      "summary": {
        "en": "Elephants beneath Kilimanjaro, Tsavo’s red earth, then four days on the white sand of Diani.",
        "de": "Elefanten unter dem Kilimanjaro, Tsavos rote Erde und danach vier Tage am weißen Strand von Diani."
      },
      "season": {
        "en": "June–October, December–March",
        "de": "Juni–Oktober, Dezember–März"
      },
      "durationDays": 10,
      "priceFrom": 2890,
      "style": "combo",
      "status": "published",
      "coverImage": null,
      "placeholder": "coast",
      "featured": true,
      "position": 3,
      "destinations": [
        "amboseli",
        "tsavo",
        "diani"
      ],
      "days": [
        {
          "dayNumber": 1,
          "dayLabel": "1",
          "title": {
            "en": "Arrival in Nairobi",
            "de": "Ankunft in Nairobi"
          },
          "description": {
            "en": "Welcome and overnight in Nairobi.",
            "de": "Begrüßung und Übernachtung in Nairobi."
          }
        },
        {
          "dayNumber": 2,
          "dayLabel": "2–3",
          "title": {
            "en": "Amboseli",
            "de": "Amboseli"
          },
          "description": {
            "en": "Elephant herds in the swamps and sunrise views of Kilimanjaro.",
            "de": "Elefantenherden in den Sümpfen und Kilimanjaro bei Sonnenaufgang."
          }
        },
        {
          "dayNumber": 4,
          "dayLabel": "4",
          "title": {
            "en": "Tsavo West",
            "de": "Tsavo West"
          },
          "description": {
            "en": "Mzima Springs and the Shetani lava flow.",
            "de": "Mzima Springs und der Shetani-Lavastrom."
          }
        },
        {
          "dayNumber": 5,
          "dayLabel": "5",
          "title": {
            "en": "Tsavo East",
            "de": "Tsavo East"
          },
          "description": {
            "en": "Red elephants along the Galana River.",
            "de": "Rote Elefanten am Galana River."
          }
        },
        {
          "dayNumber": 6,
          "dayLabel": "6–9",
          "title": {
            "en": "Diani Beach",
            "de": "Diani Beach"
          },
          "description": {
            "en": "Beach days at your pace, with optional snorkelling at Kisite-Mpunguti.",
            "de": "Strandtage im eigenen Tempo, optional Schnorcheln bei Kisite-Mpunguti."
          }
        },
        {
          "dayNumber": 10,
          "dayLabel": "10",
          "title": {
            "en": "Departure",
            "de": "Abreise"
          },
          "description": {
            "en": "Transfer for your flight home.",
            "de": "Transfer zum Heimflug."
          }
        }
      ],
      "inclusions": [
        {
          "type": "included",
          "text": {
            "en": "Private 4x4 with pop-up roof and driver-guide",
            "de": "Privater Geländewagen mit Hubdach und Fahrer-Guide"
          }
        },
        {
          "type": "included",
          "text": {
            "en": "Park and conservancy fees",
            "de": "Park- und Schutzgebietsgebühren"
          }
        },
        {
          "type": "included",
          "text": {
            "en": "Accommodation as listed",
            "de": "Unterkünfte wie beschrieben"
          }
        },
        {
          "type": "included",
          "text": {
            "en": "Meals on safari days",
            "de": "Mahlzeiten an Safaritagen"
          }
        },
        {
          "type": "included",
          "text": {
            "en": "Drinking water in the vehicle",
            "de": "Trinkwasser im Fahrzeug"
          }
        },
        {
          "type": "excluded",
          "text": {
            "en": "International flights",
            "de": "Internationale Flüge"
          }
        },
        {
          "type": "excluded",
          "text": {
            "en": "Kenya eTA (electronic travel authorisation)",
            "de": "Kenia eTA (elektronische Reisegenehmigung)"
          }
        },
        {
          "type": "excluded",
          "text": {
            "en": "Travel insurance",
            "de": "Reiseversicherung"
          }
        },
        {
          "type": "excluded",
          "text": {
            "en": "Tips and drinks",
            "de": "Trinkgelder und Getränke"
          }
        },
        {
          "type": "excluded",
          "text": {
            "en": "Optional activities, e.g. balloon flight",
            "de": "Optionale Aktivitäten, z. B. Ballonfahrt"
          }
        }
      ],
      "images": [],
      "offers": []
    },
    {
      "slug": "samburu-mount-kenya",
      "title": {
        "en": "Wild North: Samburu & Mount Kenya",
        "de": "Wilder Norden: Samburu & Mount Kenya"
      },
      "summary": {
        "en": "Kenya’s dry north and its Special Five, then the cool slopes of Mount Kenya and Ol Pejeta’s rhinos.",
        "de": "Kenias trockener Norden mit seinen Special Five, dann die kühlen Hänge des Mount Kenya und die Nashörner von Ol Pejeta."
      },
      "season": {
        "en": "June–October, December–March",
        "de": "Juni–Oktober, Dezember–März"
      },
      "durationDays": 6,
      "priceFrom": 1890,
      "style": "safari",
      "status": "published",
      "coverImage": null,
      "placeholder": "north",
      "featured": false,
      "position": 4,
      "destinations": [
        "samburu",
        "mount-kenya"
      ],
      "days": [
        {
          "dayNumber": 1,
          "dayLabel": "1",
          "title": {
            "en": "North from Nairobi",
            "de": "Von Nairobi nach Norden"
          },
          "description": {
            "en": "Drive past the slopes of Mount Kenya to the edge of Samburu.",
            "de": "Fahrt vorbei am Mount Kenya bis an den Rand von Samburu."
          }
        },
        {
          "dayNumber": 2,
          "dayLabel": "2–3",
          "title": {
            "en": "Samburu",
            "de": "Samburu"
          },
          "description": {
            "en": "Game drives along the Ewaso Ng’iro river looking for the Special Five.",
            "de": "Pirschfahrten am Ewaso Ng’iro auf der Suche nach den Special Five."
          }
        },
        {
          "dayNumber": 4,
          "dayLabel": "4",
          "title": {
            "en": "Ol Pejeta",
            "de": "Ol Pejeta"
          },
          "description": {
            "en": "Rhino conservancy and the chimpanzee sanctuary.",
            "de": "Nashorn-Schutzgebiet und Schimpansen-Schutzzentrum."
          }
        },
        {
          "dayNumber": 5,
          "dayLabel": "5",
          "title": {
            "en": "Mount Kenya",
            "de": "Mount Kenya"
          },
          "description": {
            "en": "Guided forest walk on the lower slopes.",
            "de": "Geführte Waldwanderung an den unteren Hängen."
          }
        },
        {
          "dayNumber": 6,
          "dayLabel": "6",
          "title": {
            "en": "Back to Nairobi",
            "de": "Zurück nach Nairobi"
          },
          "description": {
            "en": "Return to Nairobi by afternoon.",
            "de": "Rückkehr nach Nairobi am Nachmittag."
          }
        }
      ],
      "inclusions": [
        {
          "type": "included",
          "text": {
            "en": "Private 4x4 with pop-up roof and driver-guide",
            "de": "Privater Geländewagen mit Hubdach und Fahrer-Guide"
          }
        },
        {
          "type": "included",
          "text": {
            "en": "Park and conservancy fees",
            "de": "Park- und Schutzgebietsgebühren"
          }
        },
        {
          "type": "included",
          "text": {
            "en": "Accommodation as listed",
            "de": "Unterkünfte wie beschrieben"
          }
        },
        {
          "type": "included",
          "text": {
            "en": "Meals on safari days",
            "de": "Mahlzeiten an Safaritagen"
          }
        },
        {
          "type": "included",
          "text": {
            "en": "Drinking water in the vehicle",
            "de": "Trinkwasser im Fahrzeug"
          }
        },
        {
          "type": "excluded",
          "text": {
            "en": "International flights",
            "de": "Internationale Flüge"
          }
        },
        {
          "type": "excluded",
          "text": {
            "en": "Kenya eTA (electronic travel authorisation)",
            "de": "Kenia eTA (elektronische Reisegenehmigung)"
          }
        },
        {
          "type": "excluded",
          "text": {
            "en": "Travel insurance",
            "de": "Reiseversicherung"
          }
        },
        {
          "type": "excluded",
          "text": {
            "en": "Tips and drinks",
            "de": "Trinkgelder und Getränke"
          }
        },
        {
          "type": "excluded",
          "text": {
            "en": "Optional activities, e.g. balloon flight",
            "de": "Optionale Aktivitäten, z. B. Ballonfahrt"
          }
        }
      ],
      "images": [],
      "offers": []
    },
    {
      "slug": "swahili-coast",
      "title": {
        "en": "Swahili Coast: Mombasa, Diani & Lamu",
        "de": "Swahili Coast: Mombasa, Diani & Lamu"
      },
      "summary": {
        "en": "Old Town Mombasa and Fort Jesus, slow days in Diani, then Lamu, where donkeys and dhows replace cars.",
        "de": "Altstadt von Mombasa und Fort Jesus, ruhige Tage in Diani, dann Lamu, wo Esel und Dhaus die Autos ersetzen."
      },
      "season": {
        "en": "December–March, July–October",
        "de": "Dezember–März, Juli–Oktober"
      },
      "durationDays": 8,
      "priceFrom": 1490,
      "style": "beach",
      "status": "published",
      "coverImage": null,
      "placeholder": "coast",
      "featured": false,
      "position": 5,
      "destinations": [
        "mombasa",
        "diani",
        "lamu"
      ],
      "days": [
        {
          "dayNumber": 1,
          "dayLabel": "1",
          "title": {
            "en": "Arrival in Mombasa",
            "de": "Ankunft in Mombasa"
          },
          "description": {
            "en": "Welcome and check-in by the sea.",
            "de": "Begrüßung und Check-in am Meer."
          }
        },
        {
          "dayNumber": 2,
          "dayLabel": "2",
          "title": {
            "en": "Mombasa Old Town",
            "de": "Altstadt Mombasa"
          },
          "description": {
            "en": "Fort Jesus and the spice market.",
            "de": "Fort Jesus und der Gewürzmarkt."
          }
        },
        {
          "dayNumber": 3,
          "dayLabel": "3–5",
          "title": {
            "en": "Diani Beach",
            "de": "Diani Beach"
          },
          "description": {
            "en": "Beach, snorkelling and the colobus forest.",
            "de": "Strand, Schnorcheln und der Wald der Stummelaffen."
          }
        },
        {
          "dayNumber": 6,
          "dayLabel": "6–7",
          "title": {
            "en": "Lamu",
            "de": "Lamu"
          },
          "description": {
            "en": "Short flight north, dhow sail at sunset, walks through Lamu Old Town.",
            "de": "Kurzer Flug nach Norden, Dhau-Fahrt bei Sonnenuntergang, Spaziergänge durch die Altstadt."
          }
        },
        {
          "dayNumber": 8,
          "dayLabel": "8",
          "title": {
            "en": "Departure",
            "de": "Abreise"
          },
          "description": {
            "en": "Flight back via Mombasa or Nairobi.",
            "de": "Rückflug über Mombasa oder Nairobi."
          }
        }
      ],
      "inclusions": [
        {
          "type": "included",
          "text": {
            "en": "Private 4x4 with pop-up roof and driver-guide",
            "de": "Privater Geländewagen mit Hubdach und Fahrer-Guide"
          }
        },
        {
          "type": "included",
          "text": {
            "en": "Park and conservancy fees",
            "de": "Park- und Schutzgebietsgebühren"
          }
        },
        {
          "type": "included",
          "text": {
            "en": "Accommodation as listed",
            "de": "Unterkünfte wie beschrieben"
          }
        },
        {
          "type": "included",
          "text": {
            "en": "Meals on safari days",
            "de": "Mahlzeiten an Safaritagen"
          }
        },
        {
          "type": "included",
          "text": {
            "en": "Drinking water in the vehicle",
            "de": "Trinkwasser im Fahrzeug"
          }
        },
        {
          "type": "excluded",
          "text": {
            "en": "International flights",
            "de": "Internationale Flüge"
          }
        },
        {
          "type": "excluded",
          "text": {
            "en": "Kenya eTA (electronic travel authorisation)",
            "de": "Kenia eTA (elektronische Reisegenehmigung)"
          }
        },
        {
          "type": "excluded",
          "text": {
            "en": "Travel insurance",
            "de": "Reiseversicherung"
          }
        },
        {
          "type": "excluded",
          "text": {
            "en": "Tips and drinks",
            "de": "Trinkgelder und Getränke"
          }
        },
        {
          "type": "excluded",
          "text": {
            "en": "Optional activities, e.g. balloon flight",
            "de": "Optionale Aktivitäten, z. B. Ballonfahrt"
          }
        }
      ],
      "images": [],
      "offers": [
        {
          "label": {
            "en": "Summer deal",
            "de": "Sommerangebot"
          },
          "startsOn": "2026-05-01",
          "endsOn": "2026-09-30",
          "priceOverride": null,
          "percentOff": 8
        }
      ]
    },
    {
      "slug": "grand-kenya",
      "title": {
        "en": "Grand Kenya Journey",
        "de": "Große Kenia-Rundreise"
      },
      "summary": {
        "en": "Two weeks from north to south: Samburu, Lake Nakuru, the Mara, Amboseli, and a finish on the coast.",
        "de": "Zwei Wochen von Nord nach Süd: Samburu, Lake Nakuru, Maasai Mara, Amboseli und zum Abschluss die Küste."
      },
      "season": {
        "en": "June–October",
        "de": "Juni–Oktober"
      },
      "durationDays": 14,
      "priceFrom": 4290,
      "style": "combo",
      "status": "published",
      "coverImage": null,
      "placeholder": "dawn",
      "featured": false,
      "position": 6,
      "destinations": [
        "samburu",
        "nakuru",
        "masai-mara",
        "amboseli",
        "diani"
      ],
      "days": [
        {
          "dayNumber": 1,
          "dayLabel": "1",
          "title": {
            "en": "Arrival in Nairobi",
            "de": "Ankunft in Nairobi"
          },
          "description": {
            "en": "Welcome and overnight.",
            "de": "Begrüßung und Übernachtung."
          }
        },
        {
          "dayNumber": 2,
          "dayLabel": "2–3",
          "title": {
            "en": "Samburu",
            "de": "Samburu"
          },
          "description": {
            "en": "The dry north and the Special Five.",
            "de": "Der trockene Norden und die Special Five."
          }
        },
        {
          "dayNumber": 4,
          "dayLabel": "4",
          "title": {
            "en": "Lake Nakuru",
            "de": "Lake Nakuru"
          },
          "description": {
            "en": "Rhinos and the Rift Valley escarpment.",
            "de": "Nashörner und der Grabenrand des Rift Valley."
          }
        },
        {
          "dayNumber": 5,
          "dayLabel": "5–7",
          "title": {
            "en": "Maasai Mara",
            "de": "Maasai Mara"
          },
          "description": {
            "en": "Three days of game drives and a Maasai village visit.",
            "de": "Drei Tage Pirschfahrten und Besuch eines Maasai-Dorfes."
          }
        },
        {
          "dayNumber": 8,
          "dayLabel": "8–9",
          "title": {
            "en": "Amboseli",
            "de": "Amboseli"
          },
          "description": {
            "en": "Elephants and Kilimanjaro views.",
            "de": "Elefanten und Blick auf den Kilimanjaro."
          }
        },
        {
          "dayNumber": 10,
          "dayLabel": "10–13",
          "title": {
            "en": "Diani Beach",
            "de": "Diani Beach"
          },
          "description": {
            "en": "Flight to the coast and four days by the sea.",
            "de": "Flug an die Küste und vier Tage am Meer."
          }
        },
        {
          "dayNumber": 14,
          "dayLabel": "14",
          "title": {
            "en": "Departure",
            "de": "Abreise"
          },
          "description": {
            "en": "Transfer for your flight home.",
            "de": "Transfer zum Heimflug."
          }
        }
      ],
      "inclusions": [
        {
          "type": "included",
          "text": {
            "en": "Private 4x4 with pop-up roof and driver-guide",
            "de": "Privater Geländewagen mit Hubdach und Fahrer-Guide"
          }
        },
        {
          "type": "included",
          "text": {
            "en": "Park and conservancy fees",
            "de": "Park- und Schutzgebietsgebühren"
          }
        },
        {
          "type": "included",
          "text": {
            "en": "Accommodation as listed",
            "de": "Unterkünfte wie beschrieben"
          }
        },
        {
          "type": "included",
          "text": {
            "en": "Meals on safari days",
            "de": "Mahlzeiten an Safaritagen"
          }
        },
        {
          "type": "included",
          "text": {
            "en": "Drinking water in the vehicle",
            "de": "Trinkwasser im Fahrzeug"
          }
        },
        {
          "type": "excluded",
          "text": {
            "en": "International flights",
            "de": "Internationale Flüge"
          }
        },
        {
          "type": "excluded",
          "text": {
            "en": "Kenya eTA (electronic travel authorisation)",
            "de": "Kenia eTA (elektronische Reisegenehmigung)"
          }
        },
        {
          "type": "excluded",
          "text": {
            "en": "Travel insurance",
            "de": "Reiseversicherung"
          }
        },
        {
          "type": "excluded",
          "text": {
            "en": "Tips and drinks",
            "de": "Trinkgelder und Getränke"
          }
        },
        {
          "type": "excluded",
          "text": {
            "en": "Optional activities, e.g. balloon flight",
            "de": "Optionale Aktivitäten, z. B. Ballonfahrt"
          }
        }
      ],
      "images": [],
      "offers": []
    }
  ],
  "reviews": [
    {
      "id": "sample-1",
      "authorName": "Anna & Tobias",
      "origin": {
        "en": "Hamburg, Germany",
        "de": "Hamburg, Deutschland"
      },
      "tripSlug": "mara-classic",
      "text": {
        "en": "First evening, a lioness with three cubs, maybe twenty metres from the car. Joseph switched the engine off and we just sat there for half an hour. I was worried the village visit would feel like a show. It didn’t. We were invited in for tea and nobody pushed us to buy anything.",
        "de": "Am ersten Abend eine Löwin mit drei Jungen, vielleicht zwanzig Meter vom Auto entfernt. Joseph hat den Motor ausgemacht und wir saßen einfach eine halbe Stunde da. Ich hatte Sorge, dass der Dorfbesuch wie eine Show wirkt. War er nicht. Wir wurden zum Tee eingeladen und niemand hat uns gedrängt, etwas zu kaufen."
      },
      "rating": 5,
      "photo": null,
      "status": "sample"
    },
    {
      "id": "sample-2",
      "authorName": "Priya",
      "origin": {
        "en": "London, UK",
        "de": "London, Großbritannien"
      },
      "tripSlug": "rift-valley-mara",
      "text": {
        "en": "I travelled solo and was honestly a bit nervous. Didn’t need to be. Every silly question I sent on WhatsApp got an answer, including one at 11pm about malaria tablets. Cycling through Hell’s Gate with zebras right next to the path is something I’ll be telling people about for years.",
        "de": "Ich bin allein gereist und war ehrlich gesagt etwas nervös. Völlig unnötig. Jede noch so kleine Frage per WhatsApp wurde beantwortet, auch eine um 23 Uhr zu Malariatabletten. Mit dem Rad durch Hell’s Gate, Zebras direkt neben dem Weg: davon werde ich noch jahrelang erzählen."
      },
      "rating": 5,
      "photo": null,
      "status": "sample"
    },
    {
      "id": "sample-3",
      "authorName": "The Mwangi family",
      "origin": {
        "en": "Nairobi, Kenya",
        "de": "Nairobi, Kenia"
      },
      "tripSlug": "swahili-coast",
      "text": {
        "en": "We live in Nairobi and had never been to Lamu, which is a bit embarrassing to admit. It was slow in the best possible way. Our flight up got moved by two hours, but they’d already sorted the boat transfer before we even noticed. The food at the guesthouse was the best we had all year.",
        "de": "Wir wohnen in Nairobi und waren noch nie auf Lamu, was ein bisschen peinlich ist. Es war entschleunigt im allerbesten Sinne. Unser Flug wurde um zwei Stunden verschoben, aber der Bootstransfer war schon umgeplant, bevor wir es überhaupt gemerkt haben. Das Essen in der Unterkunft war das beste des ganzen Jahres."
      },
      "rating": 4,
      "photo": null,
      "status": "sample"
    },
    {
      "id": "sample-4",
      "authorName": "Familie Krüger",
      "origin": {
        "en": "Munich, Germany",
        "de": "München, Deutschland"
      },
      "tripSlug": "amboseli-tsavo-diani",
      "text": {
        "en": "Five of us, including two teenagers who were “not really into animals”. By day two my son was quizzing the driver about how elephant families work. We had a fixed budget and got a quote broken down line by line, plus two cheaper alternatives. No surprises at the end.",
        "de": "Wir waren zu fünft, darunter zwei Teenager, die sich „nicht so für Tiere interessieren“. Am zweiten Tag hat mein Sohn den Fahrer schon über Elefantenfamilien ausgefragt. Wir hatten ein festes Budget und bekamen ein Angebot, Posten für Posten aufgeschlüsselt, dazu zwei günstigere Alternativen. Keine Überraschungen am Ende."
      },
      "rating": 5,
      "photo": null,
      "status": "sample"
    },
    {
      "id": "sample-5",
      "authorName": "Marco",
      "origin": {
        "en": "Zurich, Switzerland",
        "de": "Zürich, Schweiz"
      },
      "tripSlug": "samburu-mount-kenya",
      "text": {
        "en": "Samburu is nothing like what you picture. Dry, red, very quiet. We watched a gerenuk stand on its back legs to eat from a tree, which looks completely made up. One tip: bring a proper fleece for Mount Kenya. I didn’t and regretted it every single morning.",
        "de": "Samburu ist ganz anders, als man es sich vorstellt. Trocken, rot, sehr still. Wir haben eine Giraffengazelle gesehen, die auf den Hinterbeinen stand, um von einem Baum zu fressen. Sieht völlig ausgedacht aus. Ein Tipp: Nehmt eine richtige Fleecejacke für den Mount Kenya mit. Ich hatte keine und habe es jeden Morgen bereut."
      },
      "rating": 5,
      "photo": null,
      "status": "sample"
    },
    {
      "id": "sample-6",
      "authorName": "Emma & Liam",
      "origin": {
        "en": "Dublin, Ireland",
        "de": "Dublin, Irland"
      },
      "tripSlug": "grand-kenya",
      "text": {
        "en": "Two weeks that felt like a month, in a good way. A couple of the driving days are long (Samburu to Nakuru is a proper haul), but they told us that before we booked. Ending in Diani was the right call. We were wrecked by then and the beach fixed us.",
        "de": "Zwei Wochen, die sich wie ein Monat angefühlt haben, im positiven Sinne. Ein paar Fahrtage sind lang (Samburu bis Nakuru zieht sich), aber das wurde uns vor der Buchung offen gesagt. Mit Diani aufzuhören war genau richtig. Wir waren platt, und der Strand hat uns wieder hingekriegt."
      },
      "rating": 4,
      "photo": null,
      "status": "sample"
    },
    {
      "id": "sample-7",
      "authorName": "Sophie",
      "origin": {
        "en": "Utrecht, Netherlands",
        "de": "Utrecht, Niederlande"
      },
      "tripSlug": "mara-classic",
      "text": {
        "en": "The balloon is expensive. I went back and forth on it for weeks. Do it. We landed near a herd of wildebeest and had breakfast in the grass while they wandered past.",
        "de": "Die Ballonfahrt ist teuer, ich habe wochenlang hin und her überlegt. Macht es. Wir sind neben einer Gnuherde gelandet und haben im Gras gefrühstückt, während sie vorbeizogen."
      },
      "rating": 5,
      "photo": null,
      "status": "sample"
    },
    {
      "id": "sample-8",
      "authorName": "David & Grace",
      "origin": {
        "en": "Toronto, Canada",
        "de": "Toronto, Kanada"
      },
      "tripSlug": "rift-valley-mara",
      "text": {
        "en": "We mentioned it was our honeymoon in one line of the inquiry form and then forgot about it. On our last night in the Mara they’d set up dinner out in the bush with lanterns. Grace cried. I may have as well.",
        "de": "Wir hatten im Anfrageformular in einem Satz erwähnt, dass es unsere Hochzeitsreise ist, und es dann vergessen. An unserem letzten Abend in der Mara gab es ein Abendessen draußen im Busch mit Laternen. Grace hat geweint. Ich vielleicht auch."
      },
      "rating": 5,
      "photo": null,
      "status": "sample"
    }
  ],
  "posts": [
    {
      "slug": "great-migration-maasai-mara",
      "title": {
        "en": "When to see the Great Migration in the Mara",
        "de": "Wann man die Große Tierwanderung in der Mara sieht"
      },
      "excerpt": {
        "en": "River crossings usually peak from July to October. Here’s how to plan around the herds.",
        "de": "Flussüberquerungen gibt es meist von Juli bis Oktober. So planen Sie rund um die Herden."
      },
      "body": {
        "en": "<p>Every year, more than a million wildebeest, together with zebras and gazelles, move in a long loop between Tanzania’s Serengeti and Kenya’s Maasai Mara, following the rain and fresh grass.</p><h2>When the herds are in the Mara</h2><p>The herds usually reach the Mara around July and stay until about October. That is also when the famous river crossings happen, as the animals cross the Mara and Talek rivers, often in front of waiting crocodiles.</p><p>Nature keeps no timetable. Some years the herds arrive early, other years late, and a crossing can happen in minutes or not at all on a given day. A good guide reads the herd and positions you with patience.</p><h2>Is it worth visiting outside the migration?</h2><p>Yes. Lions, cheetahs, leopards, elephants and many resident herds live in the Mara all year. Outside the busy months there are fewer vehicles and lodges often cost less.</p><h2>How to plan</h2><ul><li>Plan at least three nights in the Mara so you have time for the herds to move.</li><li>Book early for July to September, the busiest months.</li><li>Ask us about the conservancies next to the reserve, where vehicle numbers are limited.</li></ul>",
        "de": "<p>Jedes Jahr ziehen mehr als eine Million Gnus zusammen mit Zebras und Gazellen in einer großen Schleife zwischen der Serengeti in Tansania und der Maasai Mara in Kenia, immer dem Regen und frischem Gras hinterher.</p><h2>Wann die Herden in der Mara sind</h2><p>Meist erreichen die Herden die Mara um Juli und bleiben etwa bis Oktober. In dieser Zeit finden auch die berühmten Flussüberquerungen statt, wenn die Tiere den Mara River und den Talek River durchqueren, oft vor wartenden Krokodilen.</p><p>Die Natur hält sich an keinen Fahrplan. Manche Jahre kommen die Herden früher, andere später, und eine Überquerung kann in Minuten vorbei sein oder an einem Tag gar nicht stattfinden. Ein guter Guide liest die Herde und wartet mit Ihnen an der richtigen Stelle.</p><h2>Lohnt sich die Mara auch außerhalb der Wanderung?</h2><p>Ja. Löwen, Geparden, Leoparden, Elefanten und viele Herden leben das ganze Jahr in der Mara. Außerhalb der Hauptmonate sind weniger Fahrzeuge unterwegs, und die Lodges sind oft günstiger.</p><h2>So planen Sie</h2><ul><li>Planen Sie mindestens drei Nächte in der Mara ein, damit die Herden Zeit haben, sich zu bewegen.</li><li>Buchen Sie für Juli bis September früh, das sind die gefragtesten Monate.</li><li>Fragen Sie uns nach den Conservancies neben dem Schutzgebiet, in denen die Zahl der Fahrzeuge begrenzt ist.</li></ul>"
      },
      "category": {
        "en": "When to go",
        "de": "Reisezeit"
      },
      "coverImage": null,
      "placeholder": "savannah",
      "status": "published",
      "publishedAt": "2026-09-12T08:00:00Z",
      "metaTitle": {
        "en": "",
        "de": ""
      },
      "metaDescription": {
        "en": "River crossings usually peak from July to October. Here’s how to plan around the herds.",
        "de": "Flussüberquerungen gibt es meist von Juli bis Oktober. So planen Sie rund um die Herden."
      },
      "relatedTrips": [
        "mara-classic",
        "rift-valley-mara"
      ]
    },
    {
      "slug": "kenya-eta-before-you-fly",
      "title": {
        "en": "Kenya’s eTA: what to sort out before you fly",
        "de": "Kenias eTA: Was Sie vor dem Abflug erledigen sollten"
      },
      "excerpt": {
        "en": "Every visitor applies online before departure. A simple checklist for the application.",
        "de": "Alle Reisenden beantragen sie vor der Abreise online. Eine einfache Checkliste für den Antrag."
      },
      "body": {
        "en": "<p>Kenya asks most visitors to apply online for an Electronic Travel Authorisation (eTA) before they travel. You can’t get it on arrival, so it belongs on your checklist as soon as your flights are booked.</p><h2>What you need for the application</h2><ul><li>A passport valid for your whole stay, with blank pages</li><li>A recent passport-style photo</li><li>Your flight details and where you’ll stay on the first night</li><li>A payment card for the fee</li></ul><h2>Our tips</h2><ul><li>Apply only on the official government portal. Lookalike sites charge extra fees.</li><li>Fees and processing times can change, so check the portal for the current details and apply well before you fly.</li><li>Keep a copy of the approval on your phone and a printed copy in your hand luggage.</li></ul><p>When you plan a trip with us, we send you the accommodation details you need for the form.</p>",
        "de": "<p>Kenia verlangt von den meisten Reisenden, vor der Reise online eine elektronische Reisegenehmigung (eTA) zu beantragen. Bei der Ankunft gibt es sie nicht, deshalb gehört sie auf Ihre Liste, sobald die Flüge gebucht sind.</p><h2>Was Sie für den Antrag brauchen</h2><ul><li>Einen Reisepass, der für die gesamte Reise gültig ist und freie Seiten hat</li><li>Ein aktuelles Passfoto</li><li>Ihre Flugdaten und die Unterkunft für die erste Nacht</li><li>Eine Zahlungskarte für die Gebühr</li></ul><h2>Unsere Tipps</h2><ul><li>Beantragen Sie die eTA nur auf dem offiziellen Regierungsportal. Nachahmerseiten verlangen zusätzliche Gebühren.</li><li>Gebühren und Bearbeitungszeiten können sich ändern. Prüfen Sie die aktuellen Angaben auf dem Portal und beantragen Sie rechtzeitig vor dem Abflug.</li><li>Speichern Sie die Genehmigung auf dem Handy und nehmen Sie einen Ausdruck im Handgepäck mit.</li></ul><p>Wenn Sie mit uns planen, schicken wir Ihnen die Angaben zur Unterkunft, die Sie für das Formular brauchen.</p>"
      },
      "category": {
        "en": "Entry & visas",
        "de": "Einreise"
      },
      "coverImage": null,
      "placeholder": "city",
      "status": "published",
      "publishedAt": "2026-08-28T08:00:00Z",
      "metaTitle": {
        "en": "",
        "de": ""
      },
      "metaDescription": {
        "en": "Every visitor applies online before departure. A simple checklist for the application.",
        "de": "Alle Reisenden beantragen sie vor der Abreise online. Eine einfache Checkliste für den Antrag."
      },
      "relatedTrips": [
        "mara-classic",
        "swahili-coast"
      ]
    },
    {
      "slug": "safari-packing-list",
      "title": {
        "en": "Packing for a safari: soft bags and neutral colours",
        "de": "Packen für die Safari: weiche Taschen und gedeckte Farben"
      },
      "excerpt": {
        "en": "Small planes have weight limits. What to bring, what to leave and why it matters.",
        "de": "Kleinflugzeuge haben Gewichtsgrenzen. Was mit muss, was zu Hause bleibt und warum."
      },
      "body": {
        "en": "<p>The best safari luggage is light and soft. If your trip includes a flight in a small plane, the airline will usually set a strict weight limit, often around 15 kg including hand luggage, and ask for soft bags that fit into the hold.</p><h2>What to bring</h2><ul><li>Clothes in neutral colours like khaki, olive and beige. Bright colours and white show dust; dark blue and black attract tsetse flies.</li><li>Layers. Early game drives can be cold, especially in the Mara and around Mount Kenya, and afternoons get hot.</li><li>A warm fleece or light down jacket</li><li>A wide-brimmed hat, sunglasses and high-factor sunscreen</li><li>Binoculars, one pair each if you can</li><li>A power bank and spare memory cards</li></ul><h2>What to leave at home</h2><ul><li>Hard-shell suitcases</li><li>Too many outfits. Many camps offer laundry.</li><li>Plastic bags. Kenya banned single-use plastic carrier bags in 2017.</li></ul>",
        "de": "<p>Das beste Safarigepäck ist leicht und weich. Wenn Ihre Reise einen Flug im Kleinflugzeug enthält, gibt es meist eine strenge Gewichtsgrenze, oft um die 15 kg inklusive Handgepäck, und es werden weiche Taschen verlangt, die in den Frachtraum passen.</p><h2>Was mit muss</h2><ul><li>Kleidung in gedeckten Farben wie Khaki, Oliv und Beige. Auf knalligen Farben und Weiß sieht man den Staub, Dunkelblau und Schwarz ziehen Tsetsefliegen an.</li><li>Kleidung im Zwiebellook. Frühe Pirschfahrten können kalt sein, besonders in der Mara und am Mount Kenya, nachmittags wird es heiß.</li><li>Eine warme Fleecejacke oder leichte Daunenjacke</li><li>Hut mit breiter Krempe, Sonnenbrille und Sonnencreme mit hohem Schutzfaktor</li><li>Ein Fernglas, am besten eines pro Person</li><li>Eine Powerbank und Ersatz-Speicherkarten</li></ul><h2>Was zu Hause bleiben kann</h2><ul><li>Hartschalenkoffer</li><li>Zu viele Outfits. Viele Camps bieten einen Wäscheservice.</li><li>Plastiktüten. Kenia hat Einweg-Plastiktüten 2017 verboten.</li></ul>"
      },
      "category": {
        "en": "Packing",
        "de": "Packliste"
      },
      "coverImage": null,
      "placeholder": "north",
      "status": "published",
      "publishedAt": "2026-07-30T08:00:00Z",
      "metaTitle": {
        "en": "",
        "de": ""
      },
      "metaDescription": {
        "en": "Small planes have weight limits. What to bring, what to leave and why it matters.",
        "de": "Kleinflugzeuge haben Gewichtsgrenzen. Was mit muss, was zu Hause bleibt und warum."
      },
      "relatedTrips": [
        "samburu-mount-kenya",
        "grand-kenya"
      ]
    }
  ],
  "heroSlides": [
    {
      "position": 0,
      "isWelcome": true,
      "eyebrow": {
        "en": "Supa — welcome",
        "de": "Supa – willkommen"
      },
      "title": {
        "en": "Kenya, planned by someone who calls it home.",
        "de": "Kenia, geplant von jemandem, der dort zu Hause ist."
      },
      "text": {
        "en": "Safaris, coast escapes and everything in between, planned personally by our team in Kenya and Germany.",
        "de": "Safaris, Auszeiten an der Küste und alles dazwischen, persönlich geplant von unserem Team in Kenia und Deutschland."
      },
      "linkLabel": {
        "en": "Offices in Nairobi and Germany · Sister company of Oloning’o Mara Camp",
        "de": "Büros in Nairobi und Deutschland · Schwesterunternehmen des Oloning’o Mara Camp"
      },
      "destinationSlug": null,
      "image": null,
      "placeholder": "dawn"
    },
    {
      "position": 1,
      "isWelcome": false,
      "eyebrow": {
        "en": "Mombasa · Swahili coast",
        "de": "Mombasa · Swahili Coast"
      },
      "title": {
        "en": "Where the old town meets the Indian Ocean.",
        "de": "Wo die Altstadt auf den Indischen Ozean trifft."
      },
      "text": {
        "en": "Fort Jesus, spice markets and warm turquoise water.",
        "de": "Fort Jesus, Gewürzmärkte und warmes, türkisfarbenes Wasser."
      },
      "linkLabel": {
        "en": "Explore Mombasa",
        "de": "Mombasa entdecken"
      },
      "destinationSlug": "mombasa",
      "image": null,
      "placeholder": "coast"
    },
    {
      "position": 2,
      "isWelcome": false,
      "eyebrow": {
        "en": "Maasai Mara",
        "de": "Maasai Mara"
      },
      "title": {
        "en": "Big cats, open plains and the Great Migration.",
        "de": "Großkatzen, weite Ebenen und die Große Tierwanderung."
      },
      "text": {
        "en": "Kenya’s most famous reserve and the home of the Maasai. River crossings usually run July to October.",
        "de": "Kenias berühmtestes Schutzgebiet und Heimat der Maasai. Flussüberquerungen gibt es meist von Juli bis Oktober."
      },
      "linkLabel": {
        "en": "Explore the Maasai Mara",
        "de": "Maasai Mara entdecken"
      },
      "destinationSlug": "masai-mara",
      "image": null,
      "placeholder": "savannah"
    },
    {
      "position": 3,
      "isWelcome": false,
      "eyebrow": {
        "en": "Lake Nakuru",
        "de": "Lake Nakuru"
      },
      "title": {
        "en": "When the water is right, the shore turns pink.",
        "de": "Wenn der Wasserstand stimmt, färbt sich das Ufer rosa."
      },
      "text": {
        "en": "Flamingos along the lake, rhinos in the acacia woodland.",
        "de": "Flamingos am Seeufer, Nashörner im Akazienwald."
      },
      "linkLabel": {
        "en": "Explore Lake Nakuru",
        "de": "Lake Nakuru entdecken"
      },
      "destinationSlug": "nakuru",
      "image": null,
      "placeholder": "flamingo"
    }
  ],
  "legalPages": [
    {
      "slug": "impressum",
      "title": {
        "en": "Imprint (Impressum)",
        "de": "Impressum"
      },
      "body": {
        "en": "",
        "de": ""
      },
      "updatedAt": null
    },
    {
      "slug": "privacy",
      "title": {
        "en": "Privacy policy",
        "de": "Datenschutzerklärung"
      },
      "body": {
        "en": "",
        "de": ""
      },
      "updatedAt": null
    },
    {
      "slug": "terms",
      "title": {
        "en": "Terms & travel conditions",
        "de": "AGB & Reisebedingungen"
      },
      "body": {
        "en": "",
        "de": ""
      },
      "updatedAt": null
    }
  ],
  "settings": {
    "business_name": "Oloning’o Travel",
    "contact_email": "info@your-domain.com",
    "whatsapp_number": "254700000000",
    "phone_kenya": "+254 700 000 000",
    "phone_germany": "+49 000 000 0000",
    "office_kenya": "Nairobi, Kenya",
    "office_germany": "Germany",
    "founder_name": "Siimoi",
    "founder_photo": "",
    "cecilia_photo": "",
    "instagram_url": "",
    "facebook_url": ""
  }
};

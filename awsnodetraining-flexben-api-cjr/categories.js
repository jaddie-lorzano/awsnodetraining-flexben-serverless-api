const categories = [
    {
      "category_id": 1,
      "code": "MEDC",
      "name": "MEDICAL Claim Category",
      "description": "prescriptive drugs, over the counter drugs, vitamins, supplements, herbal supplements, vaccinations/vaccines, baby milk formula, eye drops, dental procedures, dental braces & retainers, dentures, dental accessories, prescriptive glasses & shades, prescriptive contact lenses, aesthetic contact lenses, glass frames, laboratory tests",
      "date_added": "2018-08-21 18:09:13.187884+08",
      "added_by": "SYSTEM",
      "updated_date": "",
      "updated_by": ""
    },
    {
      "category_id": 2,
      "code": "APPC",
      "name": "APPLIANCE Claim Category",
      "description": "Refrigerator, Aircon, Electric Fan, TV, DVD/VCD/Media Players, Radio component, radio speakers, pc speakers, cordless phones, landline, washing machine, gas range/stove, oven/oven toaster, microwave, lights & lamps, air humidifier, electronic sterilizer, electric shaver, electric toothbrush, vacuum cleaner, baby monitor",
      "date_added": "2018-08-21 18:09:13.187884+08",
      "added_by": "SYSTEM",
      "updated_date": "",
      "updated_by": ""
    },
    {
      "category_id": 3,
      "code": "BEAC",
      "name": "Beauty & Wellness Claim Category",
      "description": "Gym Membership, Spa visits, Yoga/pilates/other wellness classes, massage, marathon fees, spiritual retreat fees, personal trainers, beauty and grooming expenses, etc.",
      "date_added": "2018-08-21 18:09:13.187884+08",
      "added_by": "SYSTEM",
      "updated_date": "",
      "updated_by": ""
    },
    {
      "category_id": 4,
      "code": "FOODC",
      "name": "FOOD, RESTAURANT & GROCERIES Claim Category",
      "description": "purchases of people to maintain life and growth.",
      "date_added": "2018-08-21 18:09:13.187884+08",
      "added_by": "SYSTEM",
      "updated_date": "",
      "updated_by": ""
    },
    {
      "category_id": 5,
      "code": "FASC",
      "name": "FASHION Claim Category",
      "description": "purchases of clothing, shoes, bags, and other fashion accesories.",
      "date_added": "2018-08-21 18:09:13.187884+08",
      "added_by": "SYSTEM",
      "updated_date": "",
      "updated_by": ""
    },
    {
      "category_id": 6,
      "code": "ENTC",
      "name": "ENTERTAINMENT Claim Category",
      "description": "cinema tickets, concerts, musical instruments, themed parks, basketball events, etc.",
      "date_added": "2018-08-21 18:09:13.187884+08",
      "added_by": "SYSTEM",
      "updated_date": "",
      "updated_by": ""
    },
    {
      "category_id": 7,
      "code": "GADC",
      "name": "GADGETS Claim Category",
      "description": "PC, Laptops, Printer & Ink, USB, Portable WIFI, Keyboard, Mouse, PC Speakers, Earphones, Headset, Monitor, Scanner, Game consoles, MP3 players, Cellphone accessories, Laptop Adaptors, Laptop skins, Projectors, Routers, Modem, Tablets, PC cables, Rechargeable batteries, iPod Accessories, External hard drive, camera, etc.",
      "date_added": "2018-08-21 18:09:13.187884+08",
      "added_by": "SYSTEM",
      "updated_date": "",
      "updated_by": ""
    },
    {
      "category_id": 8,
      "code": "TRANC",
      "name": "TRANSPORTATION Claim Category",
      "description": "Inter-city transport, parking fees, gasoline, toll fee, e pass payments, commuters cards (MRT/LRT), Car accessories and repairs.",
      "date_added": "2018-08-21 18:09:13.187884+08",
      "added_by": "SYSTEM",
      "updated_date": "",
      "updated_by": ""
    },
    {
      "category_id": 9,
      "code": "TRVLC",
      "name": "TRAVEL & LEISURE Claim Category",
      "description": "Airfare, Boat/Ship Fares, Hotel Accomodations, Travel Packages, Travel Taxes, Travel Agency Fees, Passport Applications/Renewal fees, Travel luggage (additional check-in) NOTE: We will allow online receipts that includes the name of immediate family members.",
      "date_added": "2018-08-21 18:09:13.187884+08",
      "added_by": "SYSTEM",
      "updated_date": "",
      "updated_by": ""
    },
    {
      "category_id": 10,
      "code": "CONNC",
      "name": "CONNECTIVITY Claim Category",
      "description": "Telephone Bills and Phone Plans NOTE: There will be a cut off in the submission of receipts; receipts paid within the quarter can be claimed within the quarter of the payout schedules.",
      "date_added": "2018-08-21 18:09:13.187884+08",
      "added_by": "SYSTEM",
      "updated_date": "",
      "updated_by": ""
    },
    {
      "category_id": 11,
      "code": "SOFTC",
      "name": "Applications and Software Claim Category",
      "description": "refers to installers, etc.",
      "date_added": "2018-08-21 18:09:13.187884+08",
      "added_by": "SYSTEM",
      "updated_date": "",
      "updated_by": ""
    },
    {
      "category_id": 12,
      "code": "HOMEC",
      "name": "HOME IMROVEMENTS & FURNITURES Claim Category",
      "description": "refers of the maintenance and enhancements of your homes.",
      "date_added": "2018-08-21 18:09:13.187884+08",
      "added_by": "SYSTEM",
      "updated_date": "",
      "updated_by": ""
    },
    {
      "category_id": 13,
      "code": "LIFEC",
      "name": "LIFE INSURANCE Claim Category",
      "description": "refers to your life insurances purchases. NOTE: We will allow insurances for immediate family members.",
      "date_added": "2018-08-21 18:09:13.187884+08",
      "added_by": "SYSTEM",
      "updated_date": "",
      "updated_by": ""
    },
    {
      "category_id": 14,
      "code": "BOOKC",
      "name": "Books and Subscriptions Claim Category",
      "description": "any books and subscriptions are acceptable. NOTE: We will allow books purchased for immediate family members such as school books.",
      "date_added": "2018-08-21 18:09:13.187884+08",
      "added_by": "SYSTEM",
      "updated_date": "",
      "updated_by": ""
    },
    {
      "category_id": 15,
      "code": "OFCSUPC",
      "name": "OFFICE SUPPLIES Claim Category",
      "description": "refers to writing implements, office consumables, notebooks, rulers, calculators, etc.",
      "date_added": "2018-08-21 18:09:13.187884+08",
      "added_by": "SYSTEM",
      "updated_date": "",
      "updated_by": ""
    },
    {
      "category_id": 16,
      "code": "TRAINC",
      "name": "TRAINING & TUITION Claim Category",
      "description": "refers to tuition fees for personal and professional developments. Seminar fees and counseling sessions also included. NOTE: We will allow tuition fees for immediate family members.",
      "date_added": "2018-08-21 18:09:13.187884+08",
      "added_by": "SYSTEM",
      "updated_date": "",
      "updated_by": ""
    },
    {
      "category_id": 17,
      "code": "CSRC",
      "name": "Corporate Social Responsibility Claim Category",
      "description": "If FC's are unclaimed then points will be added in our CSR funds for future CSR events.",
      "date_added": "2018-08-21 18:09:13.187884+08",
      "added_by": "SYSTEM",
      "updated_date": "",
      "updated_by": ""
    },
    {
      "category_id": 18,
      "code": "LVC",
      "name": "LEAVE BUY BACK",
      "description": "All leave buy back applications will only be til June 22, 2018 for this payout and will resume leave back application after the flexben payout.",
      "date_added": "2018-08-21 18:09:13.187884+08",
      "added_by": "SYSTEM",
      "updated_date": "",
      "updated_by": ""
    }
   ]

   categories.forEach((category) => {console.log(`CODE: ${category.code}`)})

   export default categories
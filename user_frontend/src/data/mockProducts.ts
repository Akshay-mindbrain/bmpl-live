export const MOCK_PRODUCTS = [
    // Vitamins & Supplements
    {
        id: 101,
        name: "Multi-Vitamin Complex",
        category: "Vitamins & Supplements",
        price: 999,
        originalPrice: 1299,
        bv: 450,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600", // Medicine bottle
        description: "Daily essential vitamins for boosting immunity and energy.",
        longDescription: "Our Multi-Vitamin Complex is a comprehensive blend of essential vitamins and minerals designed to support overall health and vitality. Packed with Vitamin A, C, D, E, and B-complex, it helps boost immunity, improve energy levels, and support healthy metabolism.",
        keyBenefits: [
            "Boosts immune system function",
            "Enhances daily energy levels",
            "Supports heart and bone health",
            "Promotes healthy skin and hair"
        ],
        specifications: {
            "Serving Size": "1 Tablet",
            "Servings Per Container": "60",
            "Form": "Tablet",
            "Vegetarian": "Yes"
        }
    },
    {
        id: 102,
        name: "Vitamin C 1000mg",
        category: "Vitamins & Supplements",
        price: 549,
        originalPrice: 799,
        bv: 250,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1626015632766-4c4c23c72750?auto=format&fit=crop&q=80&w=600", // White bottle
        description: "High potency Vitamin C antioxidant support.",
        longDescription: "High potency Vitamin C supplement providing 1000mg per serving. Essential for immune health, collagen production, and antioxidant protection against free radicals.",
        keyBenefits: [
            "Powerful antioxidant support",
            "Supports collagen synthesis",
            "Boosts immune defense",
            "Promotes gum and skin health"
        ],
        specifications: {
            "Serving Size": "1 Tablet",
            "Vitamin C": "1000mg",
            "Form": "Tablet",
            "Vegetarian": "Yes"
        }
    },
    {
        id: 103,
        name: "Omega-3 Fish Oil",
        category: "Vitamins & Supplements",
        price: 899,
        originalPrice: 1199,
        bv: 400,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=600", // Supplement Bottle in hand/clean
        description: "Supports heart, brain, and joint health.",
        longDescription: "Our premium Omega-3 Fish Oil contains high-quality EPA and DHA sourced from deep-sea fish. Each serving provides 1000mg of essential fatty acids to support cardiovascular health, brain function, and joint mobility.",
        keyBenefits: [
            "Supports cardiovascular health",
            "Promotes brain function & focus",
            "Supports joint flexibility",
            "Maintains healthy cholesterol levels"
        ],
        specifications: {
            "Serving Size": "2 Softgels",
            "EPA": "360mg",
            "DHA": "240mg",
            "Form": "Softgel"
        }
    },
    {
        id: 104,
        name: "Vitamin D3 5000 IU",
        category: "Vitamins & Supplements",
        price: 499,
        originalPrice: 699,
        bv: 200,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600", // Reusing bottle style/consistent brand feel
        description: "Essential for strong bones and immune system.",
        longDescription: "High-potency Vitamin D3 to support strong bones, teeth, and a healthy immune system. Often referred to as the 'sunshine vitamin', valid for those with limited sun exposure.",
        keyBenefits: [
            "Promotes calcium absorption",
            "Supports bone & tooth health",
            "Boosts immune system",
            "Supports muscle function"
        ],
        specifications: {
            "Serving Size": "1 Softgel",
            "Vitamin D3": "5000 IU",
            "Form": "Softgel",
            "Vegetarian": "No"
        }
    },
    {
        id: 105,
        name: "B-Complex",
        category: "Vitamins & Supplements",
        price: 649,
        originalPrice: 899,
        bv: 300,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1626015632766-4c4c23c72750?auto=format&fit=crop&q=80&w=600",
        description: "Energy production and nervous system support.",
        longDescription: "Full spectrum Vitamin B-Complex to aid in converting food into energy. Supports nervous system health and red blood cell formation.",
        keyBenefits: [
            "Supports energy production",
            "Promotes nervous system health",
            "Aids in metabolism",
            "Reduces fatigue"
        ],
        specifications: {
            "Serving Size": "1 Capsule",
            "B-Vitamins": "B1, B2, B3, B6, B12",
            "Form": "Capsule",
            "Vegetarian": "Yes"
        }
    },
    {
        id: 106,
        name: "Magnesium Glycinate",
        category: "Vitamins & Supplements",
        price: 799,
        originalPrice: 999,
        bv: 350,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=600",
        description: "Supports relaxation and better sleep.",
        longDescription: "Highly absorbable Magnesium Glycinate to support muscle relaxation, nerve function, and restful sleep without digestive discomfort.",
        keyBenefits: [
            "Promotes relaxation & sleep",
            "Supports muscle function",
            "Helps manage stress",
            "Gentle on stomach"
        ],
        specifications: {
            "Serving Size": "2 Capsules",
            "Magnesium": "400mg",
            "Form": "Capsule",
            "Vegetarian": "Yes"
        }
    },
    // Expanded Mock List with Consistent Images
    {
        id: 107,
        name: "Zinc Picolinate",
        category: "Vitamins & Supplements",
        price: 399,
        originalPrice: 599,
        bv: 150,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600",
        description: "Immune support and skin health.",
        longDescription: "Zinc is crucial for immune function and skin health.",
        keyBenefits: ["Immune support", "Skin health", "Antioxidant"],
        specifications: { "Serving": "1 Cap", "Form": "Capsule" }
    },
    {
        id: 108,
        name: "Iron Complex",
        category: "Vitamins & Supplements",
        price: 449,
        originalPrice: 649,
        bv: 200,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1626015632766-4c4c23c72750?auto=format&fit=crop&q=80&w=600",
        description: "Prevents iron deficiency anemia.",
        longDescription: "Gentle iron formula to combat fatigue.",
        keyBenefits: ["Prevents anemia", "Boosts energy", "Gentle on stomach"],
        specifications: { "Serving": "1 Tab", "Form": "Tablet" }
    },
    {
        id: 109,
        name: "Calcium & D3",
        category: "Vitamins & Supplements",
        price: 599,
        originalPrice: 799,
        bv: 250,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=600",
        description: "Bone strength formula.",
        longDescription: "Essential calcium with Vitamin D3 for absorption.",
        keyBenefits: ["Strong bones", "Healthy teeth", "Muscle function"],
        specifications: { "Serving": "2 Tabs", "Form": "Tablet" }
    },
    {
        id: 110,
        name: "Biotin 10000mcg",
        category: "Vitamins & Supplements",
        price: 699,
        originalPrice: 999,
        bv: 300,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600",
        description: "Promotes healthy hair, skin, and nails.",
        longDescription: "High potency biotin for beauty from within.",
        keyBenefits: ["Hair growth", "Strong nails", "Glowing skin"],
        specifications: { "Serving": "1 Cap", "Form": "Capsule" }
    },
    {
        id: 111,
        name: "Probiotics Daily",
        category: "Vitamins & Supplements",
        price: 1199,
        originalPrice: 1499,
        bv: 500,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1626015632766-4c4c23c72750?auto=format&fit=crop&q=80&w=600",
        description: "Gut health and digestive balance.",
        longDescription: "Multi-strain probiotic for optimal gut flora.",
        keyBenefits: ["Digestive health", "Immune support", "Nutrient absorption"],
        specifications: { "Serving": "1 Cap", "Form": "Capsule" }
    },
    {
        id: 112,
        name: "Multivitamin Gummies",
        category: "Vitamins & Supplements",
        price: 799,
        originalPrice: 999,
        bv: 350,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1624362772719-2166946d8409?auto=format&fit=crop&q=80&w=600", // Gummy bottle
        description: "Tasty daily vitamins for adults.",
        longDescription: "Delicious fruit flavored gummies packed with essential nutrients.",
        keyBenefits: ["Easy to take", "Complete nutrition", "Natural flavors"],
        specifications: { "Serving": "2 Gummies", "Form": "Gummy" }
    },

    // Immunity Boosters (Using Medicine Bottles/Tinctures)
    {
        id: 201,
        name: "Immunity Booster Herbal Tea",
        category: "Immunity Boosters",
        price: 399,
        originalPrice: 599,
        bv: 150,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=600", // Tea/Herbal
        description: "Natural herbal blend.",
        longDescription: "Ancient herbal blend for daily immunity.",
        keyBenefits: ["Natural ingredients", "Caffeine free", "Rich antioxidants"],
        specifications: { "Serving": "1 Cup", "Form": "Tea Bag" }
    },
    {
        id: 202,
        name: "Chyawanprash Gold",
        category: "Immunity Boosters",
        price: 649,
        originalPrice: 899,
        bv: 300,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1615485500704-8e990999dd95?auto=format&fit=crop&q=80&w=600", // Jar/Paste like
        description: "Traditional ayurvedic immunity support.",
        longDescription: "Power of 40 herbs in a traditional formula.",
        keyBenefits: ["Respiratory health", "Stamina", "Digestion"],
        specifications: { "Serving": "1 Spoon", "Form": "Paste" }
    },
    {
        id: 203,
        name: "Elderberry Syrup",
        category: "Immunity Boosters",
        price: 899,
        originalPrice: 1199,
        bv: 400,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1626015632766-4c4c23c72750?auto=format&fit=crop&q=80&w=600",
        description: "Concentrated immune defense.",
        longDescription: "Potent elderberry extract for seasonal support.",
        keyBenefits: ["Viral defense", "Great taste", "Vitamin C rich"],
        specifications: { "Serving": "1 tsp", "Form": "Syrup" }
    },
    {
        id: 204,
        name: "Turmeric Curcumin",
        category: "Immunity Boosters",
        price: 599,
        originalPrice: 799,
        bv: 250,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=600", // Turmeric
        description: "Anti-inflammatory and antioxidant.",
        longDescription: "High absorption turmeric formula.",
        keyBenefits: ["Joint health", "Inflammation", "Heart health"],
        specifications: { "Serving": "1 Cap", "Form": "Capsule" }
    },
    {
        id: 205,
        name: "Ginger Extract",
        category: "Immunity Boosters",
        price: 349,
        originalPrice: 499,
        bv: 150,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1615485500704-8e990999dd95?auto=format&fit=crop&q=80&w=600",
        description: "Digestive and immune aid.",
        longDescription: "Pure ginger root extract.",
        keyBenefits: ["Digestion", "Nausea relief", "Immunity"],
        specifications: { "Serving": "1 Cap", "Form": "Capsule" }
    },
    {
        id: 206,
        name: "Giloy Tablets",
        category: "Immunity Boosters",
        price: 299,
        originalPrice: 399,
        bv: 100,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600",
        description: "Fever and immunity management.",
        longDescription: "Potent herb for building immunity.",
        keyBenefits: ["Detox", "Skin health", "Fever relief"],
        specifications: { "Serving": "1 Tab", "Form": "Tablet" }
    },
    {
        id: 207,
        name: "Ashwagandha",
        category: "Immunity Boosters",
        price: 499,
        originalPrice: 699,
        bv: 200,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&q=80&w=600",
        description: "Stress relief and vitality.",
        longDescription: "Adaptogen for stress and energy.",
        keyBenefits: ["Stress relief", "Better sleep", "Strength"],
        specifications: { "Serving": "1 Cap", "Form": "Capsule" }
    },
    {
        id: 208,
        name: "Tulsi Drops",
        category: "Immunity Boosters",
        price: 199,
        originalPrice: 249,
        bv: 80,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1629864299839-a5e665961316?auto=format&fit=crop&q=80&w=600", // Dropper
        description: "Concentrated holy basil extract.",
        longDescription: "5 types of Tulsi in one drop.",
        keyBenefits: ["Immunity", "Cough cold", "Respiratory health"],
        specifications: { "Serving": "2 Drops", "Form": "Liquid" }
    },

    // Protein & Nutrition Powders (Using Protein Tub/Canister images)
    {
        id: 301,
        name: "Whey Protein Isolate",
        category: "Protein & Nutrition Powders",
        price: 2499,
        originalPrice: 3299,
        bv: 1000,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&q=80&w=600", // Powder Tub
        description: "Premium pure whey for recovery.",
        longDescription: "Highest quality whey isolate for fast muscle recovery.",
        keyBenefits: ["Fast absorption", "Muscle growth", "Low fat"],
        specifications: { "Serving": "1 Scoop", "Protein": "25g", "Form": "Powder" }
    },
    {
        id: 302,
        name: "Plant Protein Chocolate",
        category: "Protein & Nutrition Powders",
        price: 2199,
        originalPrice: 2899,
        bv: 900,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&q=80&w=600",
        description: "Vegan pea and rice protein blend.",
        longDescription: "Complete amino acid profile from plant sources.",
        keyBenefits: ["Vegan friendly", "Digestive enzyme", "No bloating"],
        specifications: { "Serving": "1 Scoop", "Protein": "24g", "Form": "Powder" }
    },
    {
        id: 303,
        name: "Mass Gainer",
        category: "Protein & Nutrition Powders",
        price: 1899,
        originalPrice: 2399,
        bv: 800,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=600",
        description: "High calorie formula for bulking.",
        longDescription: "Complex carbs and protein for size and strength.",
        keyBenefits: ["Muscle size", "Recovery", "Energy"],
        specifications: { "Serving": "2 Scoops", "Calories": "500", "Form": "Powder" }
    },
    {
        id: 304,
        name: "Casein Protein",
        category: "Protein & Nutrition Powders",
        price: 2699,
        originalPrice: 3499,
        bv: 1100,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&q=80&w=600",
        description: "Slow release protein for night.",
        longDescription: "Micellar casein for 8-hour amino release.",
        keyBenefits: ["Overnight recovery", "Prevents muscle breakdown", "Satiety"],
        specifications: { "Serving": "1 Scoop", "Protein": "24g", "Form": "Powder" }
    },
    {
        id: 305,
        name: "BCAA Powder",
        category: "Protein & Nutrition Powders",
        price: 1299,
        originalPrice: 1699,
        bv: 500,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1546868871-0f6c7d44362f?auto=format&fit=crop&q=80&w=600",
        description: "Amino acids for muscle endurance.",
        longDescription: "2:1:1 Ratio of Leucine, Isoleucine, Valine.",
        keyBenefits: ["Endurance", "Recovery", "Prevents fatigue"],
        specifications: { "Serving": "1 Scoop", "BCAAs": "5g", "Form": "Powder" }
    },
    {
        id: 306,
        name: "Pre-Workout Fruit Punch",
        category: "Protein & Nutrition Powders",
        price: 1499,
        originalPrice: 1999,
        bv: 600,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=600",
        description: "Energy and focus booster.",
        longDescription: "Explosive energy and laser focus for workouts.",
        keyBenefits: ["Energy", "Focus", "Pump"],
        specifications: { "Serving": "1 Scoop", "Caffeine": "200mg", "Form": "Powder" }
    },
    {
        id: 307,
        name: "Creatine Monohydrate",
        category: "Protein & Nutrition Powders",
        price: 999,
        originalPrice: 1299,
        bv: 400,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=600",
        description: "Strength and power enhancer.",
        longDescription: "Micronized creatine for absorption.",
        keyBenefits: ["Strength", "Power", "Muscle volume"],
        specifications: { "Serving": "1 Scoop", "Creatine": "3g", "Form": "Powder" }
    },

    // Skin, Hair & Beauty (Using Cosmetic Bottles/Jars)
    {
        id: 401,
        name: "Glow Skin Serum",
        category: "Skin, Hair & Beauty Care",
        price: 1299,
        originalPrice: 1899,
        bv: 500,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600", // Serum Bottle
        description: "Radiant skin formula.",
        longDescription: "Advanced serum with Vitamin C and Hyaluronic Acid.",
        keyBenefits: ["Brightening", "Hydration", "Anti-aging"],
        specifications: { "Size": "30ml", "Skin Type": "All", "Form": "Serum" }
    },
    {
        id: 402,
        name: "Hydrating Moisturizer",
        category: "Skin, Hair & Beauty Care",
        price: 899,
        originalPrice: 1199,
        bv: 350,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&q=80&w=600", // Cream jar
        description: "Deep hydration for dry skin.",
        longDescription: "24-hour moisture lock technology.",
        keyBenefits: ["Hydration", "Barrier repair", "Softness"],
        specifications: { "Size": "50g", "Skin Type": "Dry/Normal", "Form": "Cream" }
    },
    {
        id: 403,
        name: "Vitamin C Face Wash",
        category: "Skin, Hair & Beauty Care",
        price: 399,
        originalPrice: 599,
        bv: 150,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1556228720-1957be83f761?auto=format&fit=crop&q=80&w=600",
        description: "Brightening facial cleanser.",
        longDescription: "Gentle cleanser that removes impurities and brightens.",
        keyBenefits: ["Cleansing", "Brightening", "Refreshing"],
        specifications: { "Size": "100ml", "Skin Type": "All", "Form": "Gel" }
    },
    {
        id: 404,
        name: "Anti-Aging Cream",
        category: "Skin, Hair & Beauty Care",
        price: 1499,
        originalPrice: 2099,
        bv: 600,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1571781535009-1793b451787b?auto=format&fit=crop&q=80&w=600",
        description: "Reduces fine lines and wrinkles.",
        longDescription: "Retinol enriched formula for youthful skin.",
        keyBenefits: ["Anti-wrinkle", "Firming", "Even tone"],
        specifications: { "Size": "50g", "Skin Type": "Mature", "Form": "Cream" }
    },
    {
        id: 405,
        name: "Sunscreen SPF 50",
        category: "Skin, Hair & Beauty Care",
        price: 599,
        originalPrice: 899,
        bv: 250,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1532413992378-f169ac26fff0?auto=format&fit=crop&q=80&w=600",
        description: "Broad spectrum UV protection.",
        longDescription: "Matte finish protection against UVA/UVB rays.",
        keyBenefits: ["Sun protection", "Non-greasy", "No white cast"],
        specifications: { "Size": "50ml", "SPF": "50 PA+++", "Form": "Cream" }
    },
    {
        id: 406,
        name: "Hair Growth Oil",
        category: "Skin, Hair & Beauty Care",
        price: 499,
        originalPrice: 699,
        bv: 200,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1626015565291-3e3c2e78939c?auto=format&fit=crop&q=80&w=600",
        description: "Nourishing oil for strong hair.",
        longDescription: "Blend of 10 essential oils for hair vitality.",
        keyBenefits: ["Hair growth", "Dandruff control", "Shine"],
        specifications: { "Size": "100ml", "Hair Type": "All", "Form": "Oil" }
    },

    // Digestive (Using Supplement Jar/Bottle)
    {
        id: 501,
        name: "Probiotics Gut Health",
        category: "Digestive Health",
        price: 899,
        originalPrice: 1299,
        bv: 350,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1629864299839-a5e665961316?auto=format&fit=crop&q=80&w=600",
        description: "Balances gut flora.",
        longDescription: "Advanced probiotic formula.",
        keyBenefits: ["Gut balance", "Digestion", "Immunity"],
        specifications: { "Serving": "1 Cap", "Form": "Capsule" }
    },
    {
        id: 502,
        name: "Digestive Enzymes",
        category: "Digestive Health",
        price: 699,
        originalPrice: 999,
        bv: 250,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600",
        description: "Aids food breakdown.",
        longDescription: "Helps digest complex foods.",
        keyBenefits: ["Reduces bloating", "Better absorption", "Comfort"],
        specifications: { "Serving": "1 Tab", "Form": "Tablet" }
    },
    {
        id: 503,
        name: "Psyllium Husk Fiber",
        category: "Digestive Health",
        price: 499,
        originalPrice: 699,
        bv: 200,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1616671276441-2f2c277b8bf8?auto=format&fit=crop&q=80&w=600",
        description: "Promotes regularity.",
        longDescription: "Natural fiber for digestive health.",
        keyBenefits: ["Regularity", "Heart health", "Detox"],
        specifications: { "Serving": "1 Scoop", "Form": "Powder" }
    },
    {
        id: 504,
        name: "Apple Cider Vinegar",
        category: "Digestive Health",
        price: 349,
        originalPrice: 499,
        bv: 150,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1565611776-e17f41f7d988?auto=format&fit=crop&q=80&w=600",
        description: "With Mother, for digestion.",
        longDescription: "Raw, unfiltered ACV.",
        keyBenefits: ["pH Balance", "Weight management", "Digestion"],
        specifications: { "Serving": "10ml", "Form": "Liquid" }
    }
];

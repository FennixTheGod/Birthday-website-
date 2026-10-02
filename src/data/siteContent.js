/**
 * ====================================================================
 * CENTRAL WEBSITE CONTENT & ASSET CONFIGURATION FILE
 * ====================================================================
 * All copy, dates, memories, quiz questions, and image/video paths are
 * managed right here in this single file.
 * 
 * TO CUSTOMIZE:
 * 1. Update recipientName, birthdayDate, messages, facts, and memories.
 * 2. Place your custom images/videos in `public/images/`.
 * 3. Update the media file paths below if using different filenames.
 * ====================================================================
 */

export const siteContent = {
  // --- Personalization & Recipient Details ---
  recipientName: "Trivi Mansan", // Her name (Replace with her actual name)
  senderName: "Sidhant Bhushan Gope (Sunflower)", // Your name/nickname
  
  // Optional date format: "YYYY-MM-DD" or "MM-DD". Used for live age & birthday countdown.
  // If null or omitted, fallback text is displayed gracefully.
  birthdayDate: "2005-10-03", 
  birthdayDisplayDate: "October 3",
  customAgeSubtitle: "Celebrating 21 wonderful years & counting 🎂✨",

  // --- Background Audio Configuration ---
  audio: {
    bgMusicPath: "/images/background-music.mp3", // Place your MP3 in public/images/
    title: "Moshi Moshi ♡",
    artist: "Romantic Melody",
  },

  // --- 1. Opening / Intro Screen ---
  opening: {
    badgeText: "A Little World Made For My Masoor Dal💗....",
    title: "A romantic surprise for a very special birthday girl ✨",
    subtitle: "One tiny interactive love story, created with a whole lot of love & gentle magic.",
    buttonText: "Open your surprise",
  },

  // --- 2. Hero Section & Profile Card (Anime Design Inspired) ---
  hero: {
    badge: "Happy Birthday Trivi💗",
    headingPrefix: "Happy Birthday, ",
    messageTypewriter: "Today is all about you — your smile, your cute habits, your dreams, and every small thing that makes you wonderfully you. I hope this year gives you as much happiness as you bring into my world.",
    ctaButtonText: "Take a walk through our story",
    heroImage: "/images/main-hero.png",
    
    // Anime reference design card fields
    profileCard: {
      birthdayDisplay: "3 October", // Display label matching reference design style
      personality: ["Kind", "Ambivert", "Sleepy","Foodie","Caring"],
      role: "Daydreamer",
      bio: "♡ Just a special girl who likes sweet things, Cozy Naps, and Magical Moments.",
      interests: ["Anime", "Music", "Manga", "Sid's Poetries", "Rainy Days", "Cats"],
      yearsActive: "2026 - Present",
      activeStatus: "Online & Celebrating 🎂",
    }
  },

  // --- 3. Timeline / Our Story ---
  timeline: {
    sectionTitle: "Our Story & Milestones 📖",
    sectionSubtitle: "A walk down memory lane — the small moments that built our world.",
    entries: [
      {
        id: "t1",
        date: "Chapter I",
        title: "The Day Our Story Started",
        description: "The day our paths crossed — 12/02/2026 @12:04 am we met at the online chatting PLatform named CHITCHAT . A simple conversation that ended up changing everything.",
        icon: "Sparkles",
        tag: "Beginning",
        image: "/images/chapter1.png"
      },
      {
        id: "t2",
        date: "Chapter II",
        title: "The Conversations That Flew By",
        description: "Those late talks where time seemed to disappear — We used to talk about everything from 11:00 PM - 4:00 AM and sometimes 6:00 AM , Even Though We knew We had our own Tasks to do still we found peace in have a convo with each other .",
        icon: "MessageCircle",
        tag: "Connection",
        image: "/images/chapter2.png"
      },
      {
        id: "t3",
        date: "Chapter III",
        title: "Our Inside Jokes & Little Habits",
        description: "Random updates, cute Nicknames , and moments only we truly understand — The way when we swap each other's gender and you face my Tantrums and you still love me for who I am , The way we used to call each other by our nicknames and the way we used to tease each other and laugh about it .",
        icon: "Smile",
        tag: "Fun",
        image: "/images/chapter3.png"
      },
      {
        id: "t4",
        date: "Chapter IV",
        title: "A Favorite Shared Memory",
        description: "One specific moment I would happily replay on loop — 26 May 2026 The day when we finally met for 5 minutes although the journey wasn't that easy for us but we made it the fragrance from you , the Eyes which i like the most , The cute nose , and your height just made me say that Yaar tum itni khoobsurat kese ho sakti ho ? .",
        icon: "Heart",
        tag: "Unforgettable",
        image: "/images/chapter4.png"
      },
      {
        id: "t5",
        date: "Chapter V",
        title: "Today & Beyond",
        description: "Another page turned, a new year of life, and one more reason to celebrate the wonderful person you are. I wish You were here so we could have Visited the Temple first for praying and then we could have eaten our Meals there then we could have watched a romantic or maybe a horror movie together then we might have done few shopping and them we could have gobe to the park and listen to our playlist and then have a cute little picnic and when it's finally the time of sunset we could have watched the sunset together and had our birthday cake cutting ceremony . I wish we could have done all of this together but still I hope you had a great day and I wish you a very happy birthday and I hope you have a great year ahead .",
        icon: "Gift",
        tag: "Present",
        image: "/images/chapter5.png"
      }
    ]
  },

  // --- 4. Little Facts About Us (Interactive Flip Cards) ---
  facts: {
    sectionTitle: "Little Things I Love About Us 💌",
    sectionSubtitle: "Tap or click each card to flip and reveal a hidden memory.",
    cards: [
      {
        id: "f1",
        title: "A Thing I Remember",
        frontIcon: "Eye",
        backText: "The way your eyes light up when you talk about something you love, those ocean-deep eyes… ❤️ I’m an introvert who struggles with eye contact, but for you, I’d gladly step out of my comfort zone just to look into your eyes while talking. 💗",
        accentColor: "#E86F9A"
      },
      {
        id: "f2",
        title: "Our Kind of Fun",
        frontIcon: "Coffee",
        backText: "The way we can spend hours talking about nothing and everything, laughing at our own jokes, and still feel like time has flown by.",
        accentColor: "#B87591"
      },
      {
        id: "f3",
        title: "A Little Comfort",
        frontIcon: "Home",
        backText: "The cozy feeling of just being together , i watch your pics and you listen to our playlist and we talk about our future and our dreams  and we talk about everything and anything and it makes me feel so comfortable with you .",
        accentColor: "#F45B8E"
      },
      {
        id: "f4",
        title: "Something I Admire",
        frontIcon: "Star",
        backText: "Your genuinYour kindness, strength, and warm heart make me admire you endlessly. The way you listen to me and respect my comfort means more than words can say. You do so much for me, and that's one of the many reasons I love you ❤️. ",
      },
      {
        id: "f5",
        title: "Our Tiny Tradition",
        frontIcon: "Bookmark",
        backText: "Treating me like a small kid (Mera bachhaa) who needs to be taken care of and pampered, even when I insist I’m fine. Your little gestures of love and care make me feel so special and cherished.",
        accentColor: "#B87591"
      },
      {
        id: "f6",
        title: "One Wish for Us",
        frontIcon: "Sparkles",
        backText: "I wish we both continue to grow together , end all the distance and be together forever and ever and make our own little world where we can be together and be happy and make each other happy and make our own little family and live happily ever after .",
        accentColor: "#F45B8E"
      }
    ]
  },

  // --- 5. Memory Gallery ---
  gallery: {
    sectionTitle: "Memory Gallery 📸",
    sectionSubtitle: "Snapshots of sweet smiles, quiet days, and unforgettable moments.",
    categories: ["All", "Sweet Days", "Favorites", "Adventures"],
    items: [
      {
        id: "m1",
        src: "/images/memory1.png",
        title: "MY First Memory With You",
        caption: "Just tell me how can someone be so cute and adorabe even from the back ? btw this was the first picture you shared with me .",
        date: "Memory #1",
        category: "Sweet Days"
      },
      {
        id: "m2",
        src: "/images/memory2.png",
        title: "Our Space SIVI",
        caption: "The only place which feels like home is when we listen to our playlist and think about each other .",
        date: "Memory #2",
        category: "Favorites"
      },
      {
        id: "m3",
        src: "/images/memory3.png",
        title: "Your gorgeous pic",
        caption: "One of my absolute favorite photos of your bright, Expression.",
        date: "Memory #3",
        category: "Sweet Days"
      },
      {
        id: "m4",
        src: "/images/memory4.png",
        title: "Our little adventure",
        caption: "Exploring games and making new memories together.",
        date: "Memory #4",
        category: "Adventures"
      },
      {
        id: "m5",
        src: "/images/memory5.png",
        title: "Sid Unsaid Founder & Backbone.",
        caption: "If you wouldn't have told me that i have this much potential in my voice i would never have that confidence to post my voiceovers. Thank you for being my backbone and my support system.",
        date: "Memory #5",
        category: "Favorites"
      },
      {
        id: "m6",
        src: "/images/memory6.jpg",
        title: "Forever in my heart",
        caption: "A sweet snapshot of us together that I'll cherish forever.",
        date: "Memory #6",
        category: "Adventures"
      }
    ]
  },

  // --- 6. Mini Games ---
  quiz: {
    sectionTitle: "How Well Do You Know Us? 🎮",
    sectionSubtitle: "Test your memory with this quick romantic quiz!",
    questions: [
      {
        id: "q1",
        question: "Which moment would I happily relive on loop?",
        options: [
          "Our very first long conversation",
          "That rainy day when we laughed non-stop",
          "Every single late-night call",
          "All of the above!"
        ],
        correctIndex: 3,
        explanation: "Correct! Every single moment spent with you is my absolute favorite. 💕"
      },
      {
        id: "q2",
        question: "What is my absolute favorite thing about your smile?",
        options: [
          "How it lights up your whole face",
          "How it instantly brightens my worst days",
          "The cute way your eyes crinkle",
          "Literally everything about it!"
        ],
        correctIndex: 3,
        explanation: "Spot on! Your smile is genuinely magical. ✨"
      },
      {
        id: "q3",
        question: "What is our official superpower as a team?",
        options: [
          "Telepathic inside jokes",
          "Finishing each other's snacks",
          "Talking for hours without noticing time",
          "Making any place feel cozy and happy"
        ],
        correctIndex: 2,
        explanation: "Yes! Time really disappears when we talk. ⏳"
      }
    ],
    results: {
      perfect: "100% Soulmate Score! 💖 You know our story inside out!",
      good: "Super Score! 💗 You remembered almost everything!",
      tryAgain: "Cute attempt! 💕 Want to play again?"
    }
  },

  catchHearts: {
    title: "Catch the Falling Hearts 💖",
    subtitle: "Tap or click the floating hearts before they drift away!",
    gameDuration: 15, // Seconds per round
    winTarget: 10,
    winMessage: "You caught all my love! You're amazing! 🎉💗"
  },

  // --- 7. Birthday Cake Interaction ---
  cake: {
    sectionTitle: "Make a Wish, Birthday Girl 🎂",
    instructionMic: "Take a deep breath and blow gently into your microphone — or tap the button below!",
    micButtonText: "Enable mic to blow out candles 🌬️",
    fallbackButtonText: "Tap to blow out candles ✨",
    listeningText: "Listening for your breath... Blow into your microphone! 🌬️",
    wishedHeader: "Your Birthday Wish Has Been Made! ✨",
    wishedMessage: "May this year bring you gentle days, brave dreams, real laughter, and every single beautiful thing you deserve in this world. Happy Birthday! 🥳💗",
    customWishNote: "A special note for you: You make every single day brighter just by being yourself. Never stop shining! 💕",
    bouquetPrompt: "A special birthday bouquet of Sunflowers & Roses has appeared! 🌻🌹 Tap the bouquet to bloom flowers across the screen! ✨",
    flowerMessage: "A bouquet of endless love, warmth & sunflowers — created with all my heart for you! 🌻🌹💖",
  },

  // --- 8. Love Letter Section ---
  letter: {
    sectionTitle: "A Little Letter For You 💌",
    sectionSubtitle: "Tap the envelope to open and read your personal love letter.",
    badge: "Written with love",
    date: "Special Birthday Edition",
    heading: "To My Dearest Birthday Girl,",
    body: `I  may not always find the perfect words, but I hope you always know this: your presence can make an ordinary day feel truly special.

Thank you for the endless conversations, the shared laughs, the cute quiet moments, and all the tiny details that mean far more than they seem.

You bring so much light, warmth, and genuine beauty into the world. On your special day, I hope you feel celebrated, deeply appreciated, and loved beyond measure.

Happy Birthday, my favorite person. 💗`,
    closing: "With all my love,",
    signature: "Always Yours"
  },

  // --- 9. Final Video Message ---
  video: {
    sectionTitle: "One Last Thing, From Me To You 🎥",
    sectionSubtitle: "A personal birthday video message recorded just for you.",
    videoPath: "/images/final-message.mp4",
    posterPath: "/images/final-poster.jpg",
    captionUnderVideo: "If I could wish one thing for you, it would be that you never forget how much light you bring into the lives around you. Happy birthday. 💗",
    missingVideoInstructions: "Personal Video Placeholder: Add your personal video as 'final-message.mp4' in 'public/images/' and poster as 'final-poster.jpg'!"
  },

  // --- 10. Finale & Replay ---
  finale: {
    heading: "And this is only one little chapter… ✨",
    message: "Here’s to more memories, more laughter, more late conversations, and more reasons to smile. Happy birthday!",
    replayButtonText: "Replay our story 🔄",
    footerText: "Made with extra love & magic for a very special girl 💗"
  }
};

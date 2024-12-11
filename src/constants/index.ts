export const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
].map((d) => ({
  label: d,
  value: d,
}));

export const subjects = [
  "English",
  "Mathematics",
  "Science",
  "Social Studies",
].map((d) => ({ label: d, value: d }));
export const genders = ["Male", "Female", "Do not specify"].map((d) => ({
  label: d,
  value: d.toLowerCase()?.replaceAll(" ", "_"),
}));
export const grades = [
  "Preschool (Pre-K)",
  "Kindergarten",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6 (Middle School)",
  "Grade 7",
  "Grade 8",
  "Grade 9 (High School)",
  "Grade 10",
  "Grade 11",
  "Grade 12",
  "Higher Education",
].map((d) => ({ label: d, value: d }));

export const AllNationsCode = [
  {
    label: "🇺🇸 United States",
    value: "+1",
    code: "US",
    emoji: "🇺🇸",
    new_field: "United States",
  },

  {
    label: "🇨🇦 Canada",
    value: "+1",
    code: "CA",
    emoji: "🇨🇦",
    new_field: "Canada",
  },

  {
    label: "🇳🇬 Nigeria",
    value: "+234",
    code: "NG",
    emoji: "🇳🇬",
    new_field: "Nigeria",
  },
];

export const extractAvatar = (name: string) => {
  const splitName = name?.split(" ");
  if (splitName.length === 1) return splitName[0].charAt(0).toUpperCase();
  const firstLetter = splitName?.[0]?.charAt(0);
  const secondLetter = splitName?.[1]?.charAt(0);
  return `${firstLetter}${secondLetter}`;
};

export const transformText = (
  input: string,
  textToReplace: string,
  newText: string
) => {
  // Create a regular expression using the textToReplace variable
  const regex = new RegExp(`\\b${textToReplace}\\b`, "gi");
  // Use the regular expression to replace textToReplace with newText, case insensitive
  return input.replace(regex, newText);
};

export const demoQuestionTracker = {
  message: "Questions gotten successfully",
  data: [
    {
      _id: "6670cb55525ffd8a91feeb7f",
      user: "666a9c53fc6704d65feff69d",
      teach_id: "8d393196-68a4-45c7-b328-32c7452675f2",
      title: "Test question tracker",
      s3_bucket_url:
        "s3://teacher-storage-bucket/twitter_unreal_stories_mono.wav",
      speakers: [
        {
          speaker: "speaker_2",
          munites: "1 minute, 54 seconds",
          seconds: 114.4,
          percentage: 20.63,
        },
        {
          speaker: "speaker_1",
          munites: "1 minute, 22 seconds",
          seconds: 82.32,
          percentage: 14.85,
        },
        {
          speaker: "speaker_0",
          munites: "4 minutes, 31 seconds",
          seconds: 271.92,
          percentage: 49.05,
        },
        {
          speaker: "speaker_3",
          munites: "1 minute, 25 seconds",
          seconds: 85.76,
          percentage: 15.47,
        },
      ],
      questions: [
        {
          question: "What is food?",
          answer: "food is food",
          type: "oeq",
          id: 0,
          question_type: "oeq",
        },
        {
          question: "what a oh what a moral conflict yeah",
          answer: "",
          type: "oeq",
          id: 1,
        },
        {
          question: "what would you do",
          answer: "",
          type: "oeq",
          id: 2,
        },
        {
          question: "how much i've stolen so far",
          answer: "",
          type: "oeq",
          id: 3,
        },
        {
          question: "what happened i'm",
          answer: "",
          type: "oeq",
          id: 4,
        },
        {
          question:
            "yeah they need man behind bars but i'm not willing to go the last person i te from i sta all these pictures pro and this guy's taking and killing children do you understand",
          answer: "",
          type: "oeq",
          id: 5,
        },
        {
          question: "can be so conflicted",
          answer: "",
          type: "oeq",
          id: 6,
        },
        {
          question: "shed like do you want to do you understand why you're",
          answer: "",
          type: "oeq",
          id: 7,
        },
        {
          question: "are",
          answer: "",
          type: "oeq",
          id: 8,
        },
        {
          question: "is the same",
          answer: "",
          type: "oeq",
          id: 9,
        },
        {
          question: "might be you so sharp",
          answer: "",
          type: "oeq",
          id: 10,
        },
        {
          question:
            "was shake and say yes i would shake and say yes james i'm willing to save the children",
          answer: "",
          type: "oeq",
          id: 11,
        },
        {
          question:
            "are going to all sorts of jail ro your day has just gone worse i don't imagine this being a movie oh right shot over one night oh right a's the scene is one nightong",
          answer: "",
          type: "oeq",
          id: 12,
        },
        {
          question: "do not don't have a focking don't have a fucking",
          answer: "",
          type: "oeq",
          id: 13,
        },
        {
          question:
            "is that what i need you to do fan oh oh wy it's go it's gonna be drama",
          answer: "",
          type: "oeq",
          id: 14,
        },
      ],
      status: "Success",
      createdAt: "2024-06-17T23:48:37.714Z",
      updatedAt: "2024-06-18T00:00:53.864Z",
      __v: 1,
    },
    {
      _id: "6670cef5ab262d83b32c6178",
      user: "666a9c53fc6704d65feff69d",
      teach_id: "1e35e122-f590-4498-9bd4-5dc7e0d87d26",
      title: "Test question tracker",
      s3_bucket_url:
        "s3://teacher-storage-bucket/twitter_unreal_stories_mono.wav",
      speakers: [
        {
          speaker: "speaker_2",
          munites: "1 minute, 54 seconds",
          seconds: 114.4,
          percentage: 20.63,
        },
        {
          speaker: "speaker_1",
          munites: "1 minute, 22 seconds",
          seconds: 82.32,
          percentage: 14.85,
        },
        {
          speaker: "speaker_0",
          munites: "4 minutes, 31 seconds",
          seconds: 271.92,
          percentage: 49.05,
        },
        {
          speaker: "speaker_3",
          munites: "1 minute, 25 seconds",
          seconds: 85.76,
          percentage: 15.47,
        },
      ],
      questions: [
        {
          question: "was arrested for murder",
          answer: "",
          type: "oeq",
          id: 0,
        },
        {
          question: "what a oh what a moral conflict yeah",
          answer: "",
          type: "oeq",
          id: 1,
        },
        {
          question: "what would you do",
          answer: "",
          type: "oeq",
          id: 2,
        },
        {
          question: "how much i've stolen so far",
          answer: "",
          type: "oeq",
          id: 3,
        },
        {
          question: "what happened i'm",
          answer: "",
          type: "oeq",
          id: 4,
        },
        {
          question:
            "yeah they need man behind bars but i'm not willing to go the last person i te from i sta all these pictures pro and this guy's taking and killing children do you understand",
          answer: "",
          type: "oeq",
          id: 5,
        },
        {
          question: "can be so conflicted",
          answer: "",
          type: "oeq",
          id: 6,
        },
        {
          question: "shed like do you want to do you understand why you're",
          answer: "",
          type: "oeq",
          id: 7,
        },
        {
          question: "are",
          answer: "",
          type: "oeq",
          id: 8,
        },
        {
          question: "is the same",
          answer: "",
          type: "oeq",
          id: 9,
        },
        {
          question: "might be you so sharp",
          answer: "",
          type: "oeq",
          id: 10,
        },
        {
          question:
            "was shake and say yes i would shake and say yes james i'm willing to save the children",
          answer: "",
          type: "oeq",
          id: 11,
        },
        {
          question:
            "are going to all sorts of jail ro your day has just gone worse i don't imagine this being a movie oh right shot over one night oh right a's the scene is one nightong",
          answer: "",
          type: "oeq",
          id: 12,
        },
        {
          question: "do not don't have a focking don't have a fucking",
          answer: "",
          type: "oeq",
          id: 13,
        },
        {
          question:
            "is that what i need you to do fan oh oh wy it's go it's gonna be drama",
          answer: "",
          type: "oeq",
          id: 14,
        },
      ],
      status: "Success",
      createdAt: "2024-06-18T00:04:05.550Z",
      updatedAt: "2024-06-18T00:05:38.330Z",
      __v: 1,
    },
    {
      _id: "6670d0194d47a9de36eddba4",
      user: "666a9c53fc6704d65feff69d",
      teach_id: "6f1a980b-b2e1-4957-b66a-f7f7ea782fab",
      title: "Test question tracker",
      s3_bucket_url:
        "s3://teacher-storage-bucket/twitter_unreal_stories_mono.wav",
      speakers: [],
      questions: [],
      status: "Pending",
      createdAt: "2024-06-18T00:08:57.790Z",
      updatedAt: "2024-06-18T00:08:57.790Z",
      __v: 0,
    },
    {
      _id: "6670d075271116f008cf4cd6",
      user: "666a9c53fc6704d65feff69d",
      teach_id: "960c71bf-52e0-44df-aeee-b157a26b124a",
      title: "Test question tracker",
      s3_bucket_url:
        "s3://teacher-storage-bucket/twitter_unreal_stories_mono.wav",
      speakers: [
        {
          speaker: "speaker_2",
          is_teacher: false,
          munites: "1 minute, 54 seconds",
          seconds: 114.4,
          percentage: 20.63,
        },
        {
          speaker: "speaker_1",
          is_teacher: false,
          munites: "1 minute, 22 seconds",
          seconds: 82.32,
          percentage: 14.85,
        },
        {
          speaker: "speaker_0",
          is_teacher: false,
          munites: "4 minutes, 31 seconds",
          seconds: 271.92,
          percentage: 49.05,
        },
        {
          speaker: "speaker_3",
          is_teacher: false,
          munites: "1 minute, 25 seconds",
          seconds: 85.76,
          percentage: 15.47,
        },
      ],
      questions: [
        {
          question: "was arrested for murder",
          answer: "",
          type: "oeq",
          id: 0,
        },
        {
          question: "what a oh what a moral conflict yeah",
          answer: "",
          type: "oeq",
          id: 1,
        },
        {
          question: "what would you do",
          answer: "",
          type: "oeq",
          id: 2,
        },
        {
          question: "how much i've stolen so far",
          answer: "",
          type: "oeq",
          id: 3,
        },
        {
          question: "what happened i'm",
          answer: "",
          type: "oeq",
          id: 4,
        },
        {
          question:
            "yeah they need man behind bars but i'm not willing to go the last person i te from i sta all these pictures pro and this guy's taking and killing children do you understand",
          answer: "",
          type: "oeq",
          id: 5,
        },
        {
          question: "can be so conflicted",
          answer: "",
          type: "oeq",
          id: 6,
        },
        {
          question: "shed like do you want to do you understand why you're",
          answer: "",
          type: "oeq",
          id: 7,
        },
        {
          question: "are",
          answer: "",
          type: "oeq",
          id: 8,
        },
        {
          question: "is the same",
          answer: "",
          type: "oeq",
          id: 9,
        },
        {
          question: "might be you so sharp",
          answer: "",
          type: "oeq",
          id: 10,
        },
        {
          question:
            "was shake and say yes i would shake and say yes james i'm willing to save the children",
          answer: "",
          type: "oeq",
          id: 11,
        },
        {
          question:
            "are going to all sorts of jail ro your day has just gone worse i don't imagine this being a movie oh right shot over one night oh right a's the scene is one nightong",
          answer: "",
          type: "oeq",
          id: 12,
        },
        {
          question: "do not don't have a focking don't have a fucking",
          answer: "",
          type: "oeq",
          id: 13,
        },
        {
          question:
            "is that what i need you to do fan oh oh wy it's go it's gonna be drama",
          answer: "",
          type: "oeq",
          id: 14,
        },
      ],
      status: "Success",
      createdAt: "2024-06-18T00:10:29.913Z",
      updatedAt: "2024-06-18T00:13:02.162Z",
      __v: 1,
    },
    {
      _id: "6670d2be814459761011daf1",
      user: "666a9c53fc6704d65feff69d",
      teach_id: "9f99d81e-a7f2-45f4-83b3-2c3bda939cda",
      title: "Test question tracker",
      s3_bucket_url:
        "s3://teacher-storage-bucket/twitter_unreal_stories_mono.wav",
      speakers: [
        {
          speaker: "speaker_2",
          is_teacher: false,
          munites: "1 minute, 54 seconds",
          seconds: 114.4,
          percentage: 20.63,
        },
        {
          speaker: "speaker_1",
          is_teacher: true,
          munites: "1 minute, 22 seconds",
          seconds: 82.32,
          percentage: 14.85,
        },
        {
          speaker: "speaker_0",
          is_teacher: false,
          munites: "4 minutes, 31 seconds",
          seconds: 271.92,
          percentage: 49.05,
        },
        {
          speaker: "speaker_3",
          is_teacher: false,
          munites: "1 minute, 25 seconds",
          seconds: 85.76,
          percentage: 15.47,
        },
      ],
      questions: [
        {
          question: "was arrested for murder",
          answer: "",
          type: "oeq",
          id: 0,
        },
        {
          question: "what a oh what a moral conflict yeah",
          answer: "",
          type: "oeq",
          id: 1,
        },
        {
          question: "what would you do",
          answer: "",
          type: "oeq",
          id: 2,
        },
        {
          question: "how much i've stolen so far",
          answer: "",
          type: "oeq",
          id: 3,
        },
        {
          question: "what happened i'm",
          answer: "",
          type: "oeq",
          id: 4,
        },
        {
          question:
            "yeah they need man behind bars but i'm not willing to go the last person i te from i sta all these pictures pro and this guy's taking and killing children do you understand",
          answer: "",
          type: "oeq",
          id: 5,
        },
        {
          question: "can be so conflicted",
          answer: "",
          type: "oeq",
          id: 6,
        },
        {
          question: "shed like do you want to do you understand why you're",
          answer: "",
          type: "oeq",
          id: 7,
        },
        {
          question: "are",
          answer: "",
          type: "oeq",
          id: 8,
        },
        {
          question: "is the same",
          answer: "",
          type: "oeq",
          id: 9,
        },
        {
          question: "might be you so sharp",
          answer: "",
          type: "oeq",
          id: 10,
        },
        {
          question:
            "was shake and say yes i would shake and say yes james i'm willing to save the children",
          answer: "",
          type: "oeq",
          id: 11,
        },
        {
          question:
            "are going to all sorts of jail ro your day has just gone worse i don't imagine this being a movie oh right shot over one night oh right a's the scene is one nightong",
          answer: "",
          type: "oeq",
          id: 12,
        },
        {
          question: "do not don't have a focking don't have a fucking",
          answer: "",
          type: "oeq",
          id: 13,
        },
        {
          question:
            "is that what i need you to do fan oh oh wy it's go it's gonna be drama",
          answer: "",
          type: "oeq",
          id: 14,
        },
      ],
      status: "Success",
      createdAt: "2024-06-18T00:20:14.835Z",
      updatedAt: "2024-06-18T00:21:47.985Z",
      __v: 1,
    },
    {
      _id: "667b2aca80b112f57cad3384",
      user: "666a9c53fc6704d65feff69d",
      teach_id: "afa164e4-dd0d-4f3c-a8bf-50387b8391d9",
      title: "Test question tracker",
      s3_bucket_url:
        "s3://teacher-storage-bucket/twitter_unreal_stories_mono.wav",
      speakers: [],
      questions: [],
      status: "Pending",
      createdAt: "2024-06-25T20:38:34.246Z",
      updatedAt: "2024-06-25T20:38:34.246Z",
      __v: 0,
    },
  ],
};

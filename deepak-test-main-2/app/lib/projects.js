export const projects = [
  {
    id: 1,
    slug: "project-one",
    title: "NBA Player Sentiment Analysis",
    shortDescription: "Sentiment analysis on NBA players using posts pulled from X (Twitter), surfacing public perception trends in real time.",
    fullDescription:
      "This project scrapes and processes posts from X (Twitter) to perform sentiment analysis on NBA players. Using natural language processing, each post is classified as positive, negative, or neutral, and the results are aggregated to surface public perception trends over time. The pipeline ingests raw social data, cleans and tokenizes the text, runs it through a sentiment model, and stores the output for visualization. The goal was to explore how social media discourse shifts around players during different points in the season — trades, injuries, big performances — and turn that signal into something meaningful.",
    tags: ["Python", "NLP", "X API", "Sentiment Analysis", "Data Pipelines"],
    link: "https://github.com/deepakpraba/NBASentimentAnalysis",
  },
  {
    id: 2,
    slug: "project-two",
    title: "Biometric Feedback Controller for Stress Reduction",
    shortDescription: "A hardware-software system using a Raspberry Pi and heart rate sensor to reduce stress through real-time audio modulation.",
    fullDescription:
      "This project implements a closed-loop negative feedback system designed to reduce an individual's stress in real time. A heart rate sensor feeds live biometric data into a Raspberry Pi, which processes heart rate and heart rate variability (HRV) and uses MATLAB libraries to dynamically modulate audio output — adjusting pitch, volume, and tempo through a speaker to guide the user toward a calmer physiological state. The system continuously monitors the user's response and adapts the audio signal accordingly, closing the feedback loop. The goal was to apply control systems theory to a real-world biofeedback application, demonstrating how hardware and signal processing can work together to influence human stress response.",
    tags: ["Raspberry Pi", "MATLAB", "Biometrics", "Signal Processing", "Hardware"],
    link: "/BiometricFeedbackController.pdf",
  },
  {
    id: 3,
    slug: "project-three",
    title: "Personal Website",
    shortDescription: "This site — a personal portfolio and contact hub built with Next.js, Tailwind CSS, and deployed on Vercel.",
    fullDescription:
      "My personal website, built from scratch using Next.js and Tailwind CSS. The site features an interactive oscilloscope hero component, an animated starfield background, a portfolio section, an about page, and a fully functional contact form powered by Resend. The oscilloscope is a custom SVG and canvas-based component with knobs, buttons, glitch effects, and a crash/reboot sequence. The spaceship beneath it is hand-drawn in SVG with animated engine exhaust plumes and wing-tip navigation lights. The goal was to build something that felt unique and reflected my personality rather than using a template.",
    tags: ["Next.js", "Tailwind CSS", "JavaScript", "Resend", "Vercel"],
    link: "https://github.com/deepakpraba/PersonalWebsite",
  },
];

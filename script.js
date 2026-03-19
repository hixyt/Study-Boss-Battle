let selectedTopic = "";
let selectedBoss = "";
let selectedBossEmoji = "🧚";
let currentQuestionIndex = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let battleQuestions = [];
let answerLocked = false;

const questionBank = {
  "A* Algorithm": [
    {
      question: "A* algorithm is mainly used for:",
      options: ["Sorting", "Pathfinding", "Compression", "Encryption"],
      answer: 1
    },
    {
      question: "A* chooses path using:",
      options: ["Only queue", "Only stack", "Cost + heuristic", "Random value"],
      answer: 2
    },
    {
      question: "Heuristic function in A* estimates:",
      options: ["Past score", "Remaining distance", "Array size", "CPU speed"],
      answer: 1
    },
    {
      question: "A* is better than UCS when:",
      options: ["No graph exists", "Heuristic is useful", "Data is unsorted", "Internet is fast"],
      answer: 1
    },
    {
      question: "A* tries to find:",
      options: ["Worst path", "Any node", "Optimal path", "Loop"],
      answer: 2
    }
  ],

  "Hill Climbing": [
    {
      question: "Hill Climbing is mainly used for:",
      options: ["Optimization", "Printing", "Networking", "Binary conversion"],
      answer: 0
    },
    {
      question: "Hill Climbing moves toward:",
      options: ["Worse state", "Better neighboring state", "Random state", "Final report"],
      answer: 1
    },
    {
      question: "A problem in Hill Climbing is:",
      options: ["Compilation", "Local optimum", "Syntax highlighting", "Keyboard input"],
      answer: 1
    },
    {
      question: "Hill Climbing does not keep:",
      options: ["One current state", "Many unnecessary old states", "Goal", "Neighbors"],
      answer: 1
    },
    {
      question: "Hill Climbing stops when:",
      options: ["No better neighbor is found", "Battery is low", "Graph is deleted", "Screen turns off"],
      answer: 0
    }
  ],

  "Naive Bayes": [
    {
      question: "Naive Bayes is a:",
      options: ["Search algorithm", "Classification algorithm", "Sorting method", "Game engine"],
      answer: 1
    },
    {
      question: "Naive Bayes is based on:",
      options: ["Probability", "Animation", "Matrix printing", "Backtracking only"],
      answer: 0
    },
    {
      question: "Naive Bayes assumes features are:",
      options: ["Dependent", "Invisible", "Independent", "Sorted"],
      answer: 2
    },
    {
      question: "Naive Bayes is commonly used for:",
      options: ["Text classification", "Typing speed", "Monitor control", "Graphics rendering"],
      answer: 0
    },
    {
      question: "The output of Naive Bayes is usually:",
      options: ["Class label", "Sound file", "Port number", "Memory block"],
      answer: 0
    }
  ],

  "Graph Search": [
    {
      question: "Graph Search is used to:",
      options: ["Explore nodes and edges", "Draw only circles", "Delete folders", "Compress videos"],
      answer: 0
    },
    {
      question: "BFS stands for:",
      options: ["Binary File Sort", "Breadth First Search", "Basic Function Set", "Branch Find System"],
      answer: 1
    },
    {
      question: "DFS stands for:",
      options: ["Data File System", "Depth First Search", "Double Function Scan", "Direct Filter Search"],
      answer: 1
    },
    {
      question: "BFS usually uses:",
      options: ["Queue", "Stack", "Tree image", "Printer"],
      answer: 0
    },
    {
      question: "DFS usually uses:",
      options: ["Queue", "Stack", "Mouse", "Heap sort only"],
      answer: 1
    }
  ]
};

function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });
  document.getElementById(screenId).classList.add("active");
}

function goToTopics() {
  showScreen("topicScreen");
}

function selectTopic(card, topicName) {
  document.querySelectorAll(".topic-card").forEach(c => c.classList.remove("selected"));
  card.classList.add("selected");
  selectedTopic = topicName;
  document.getElementById("selectedTopicText").innerText = "Selected Topic: " + topicName;
}

function goToBosses() {
  if (!selectedTopic) {
    alert("Please select a topic first.");
    return;
  }
  showScreen("bossScreen");
}

function selectBoss(card, bossName, bossEmoji) {
  document.querySelectorAll(".boss-card").forEach(c => c.classList.remove("selected"));
  card.classList.add("selected");
  selectedBoss = bossName;
  selectedBossEmoji = bossEmoji;
  document.getElementById("selectedBossText").innerText = "Selected Boss: " + bossName;
}

function startBattle() {
  if (!selectedBoss) {
    alert("Please select a boss first.");
    return;
  }

  battleQuestions = questionBank[selectedTopic];
  currentQuestionIndex = 0;
  correctAnswers = 0;
  wrongAnswers = 0;
  answerLocked = false;

  document.getElementById("battleTopicHeading").innerText = selectedTopic;
  document.getElementById("battleBossHeading").innerText = "Boss: " + selectedBoss;
  document.getElementById("monster").innerText = selectedBossEmoji;
  document.getElementById("monster").className = "fighter monster-avatar";
  document.getElementById("monsterStatus").innerText = "Normal Size";

  document.getElementById("outcomeCard").classList.remove("victory-glow");

  showScreen("battleScreen");
  loadQuestion();
}

function loadQuestion() {
  answerLocked = false;
  document.getElementById("nextBtn").style.display = "none";
  document.getElementById("answerMessage").innerText = "Choose the correct answer to attack smartly.";

  const current = battleQuestions[currentQuestionIndex];
  document.getElementById("questionCounter").innerText =
    `Question ${currentQuestionIndex + 1} / ${battleQuestions.length}`;
  document.getElementById("questionText").innerText = current.question;

  const optionsBox = document.getElementById("optionsBox");
  optionsBox.innerHTML = "";

  current.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerText = option;
    btn.onclick = () => checkAnswer(index, btn);
    optionsBox.appendChild(btn);
  });
}

function checkAnswer(selectedIndex, clickedBtn) {
  if (answerLocked) return;
  answerLocked = true;

  const current = battleQuestions[currentQuestionIndex];
  const optionButtons = document.querySelectorAll(".option-btn");

  optionButtons.forEach((btn, index) => {
    btn.disabled = true;
    if (index === current.answer) {
      btn.classList.add("correct");
    }
  });

  if (selectedIndex === current.answer) {
    correctAnswers++;
    clickedBtn.classList.add("correct");
    document.getElementById("answerMessage").innerText =
      "Correct! Monster stayed under control.";
  } else {
    wrongAnswers++;
    clickedBtn.classList.add("wrong");
    document.getElementById("answerMessage").innerText =
      "Wrong! Monster grew stronger.";
    growMonster();
  }

  document.getElementById("nextBtn").style.display = "inline-block";
}

function growMonster() {
  const monster = document.getElementById("monster");
  const status = document.getElementById("monsterStatus");

  monster.classList.remove(
    "monster-grow-1",
    "monster-grow-2",
    "monster-grow-3",
    "monster-grow-4",
    "monster-grow-5"
  );

  const growClass = "monster-grow-" + wrongAnswers;
  monster.classList.add(growClass);

  monster.classList.add("shake");
  setTimeout(() => {
    monster.classList.remove("shake");
  }, 300);

  if (wrongAnswers === 1) status.innerText = "Monster Growing";
  else if (wrongAnswers === 2) status.innerText = "Monster Angry";
  else if (wrongAnswers === 3) status.innerText = "Monster Huge";
  else if (wrongAnswers >= 4) status.innerText = "Monster Overpowered";
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < battleQuestions.length) {
    loadQuestion();
  } else {
    endBattle();
  }
}

function endBattle() {
  const win = correctAnswers >= 3;
  const learner = naiveBayesClassify(correctAnswers);
  const path = getAStarPath(selectedTopic, correctAnswers);

  document.getElementById("finalTitle").innerText = win
    ? "Victory Screen"
    : "Defeat Screen";

  document.getElementById("finalOutcome").innerText = win
    ? "You defeated the boss and mastered this concept. Ready for the next challenge."
    : "The boss exposed your weak areas. Revise and return stronger.";

  document.getElementById("finalScore").innerText =
    `Score: ${correctAnswers} / ${battleQuestions.length}`;

  document.getElementById("finalTopic").innerText =
    `Topic: ${selectedTopic}`;

  document.getElementById("finalBoss").innerText =
    `Boss: ${selectedBoss}`;

  document.getElementById("learnerType").innerText =
    `Learner Type: ${learner}`;

  document.getElementById("performanceText").innerText =
    getPerformanceText(learner, correctAnswers);

  document.getElementById("studyPath").innerText =
    `Recommended Path: ${path.join(" → ")}`;

  if (win) {
    document.getElementById("outcomeCard").classList.add("victory-glow");
  } else {
    document.getElementById("outcomeCard").classList.remove("victory-glow");
  }

  showScreen("resultScreen");
}

function naiveBayesClassify(score) {
  if (score >= 4) return "Strong Learner";
  if (score >= 3) return "Average Learner";
  return "Weak Learner";
}

function getPerformanceText(learner, score) {
  if (learner === "Strong Learner") {
    return `Excellent battle performance. You answered ${score} questions correctly and showed strong concept control.`;
  }
  if (learner === "Average Learner") {
    return `Decent performance. Your basics are partially clear, but you still need more revision for stronger boss fights.`;
  }
  return `Low performance in this battle. Your concept clarity needs work before fighting harder bosses.`;
}

function getAStarPath(topic, score) {
  if (score >= 4) {
    return [topic, "Advanced Practice", "Boss Rematch", "Final Mastery"];
  }
  if (score >= 3) {
    return [topic, "Revision Notes", "Practice MCQs", "Boss Rematch"];
  }
  return [topic, "Basics Revision", "Watch Explanation", "Solve Easy MCQs", "Try Again"];
}

function restartGame() {
  selectedTopic = "";
  selectedBoss = "";
  selectedBossEmoji = "🧚";
  currentQuestionIndex = 0;
  correctAnswers = 0;
  wrongAnswers = 0;
  battleQuestions = [];
  answerLocked = false;

  document.getElementById("selectedTopicText").innerText = "Selected Topic: None";
  document.getElementById("selectedBossText").innerText = "Selected Boss: None";

  document.querySelectorAll(".topic-card").forEach(c => c.classList.remove("selected"));
  document.querySelectorAll(".boss-card").forEach(c => c.classList.remove("selected"));

  document.getElementById("outcomeCard").classList.remove("victory-glow");

  showScreen("homeScreen");
}
// quiz.js

function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

document.addEventListener("DOMContentLoaded", () => {
  const id = Number(getQueryParam("id"));
  const lesson = lessons.find((l) => l.id === id);

  const titleEl = document.getElementById("quiz-title");
  const metaEl = document.getElementById("quiz-meta");
  const formEl = document.getElementById("quiz-form");
  const resultEl = document.getElementById("quiz-result");

  if (!lesson) {
    titleEl.textContent = "Quiz not found";
    return;
  }

  titleEl.textContent = `Quiz: ${lesson.title}`;
  metaEl.textContent = `Questions: ${lesson.questions.length}`;

  // Build questions
  formEl.innerHTML = lesson.questions
    .map((q, index) => {
      const name = `q_${index}`;
      return `
        <fieldset style="margin-bottom:1rem; padding:0.75rem 0.75rem; border-radius:0.75rem; border:1px solid rgba(148,163,184,0.4);">
          <legend style="font-size:0.95rem; margin-bottom:0.5rem;">${index + 1}. ${
        q.question
      }</legend>
          ${q.options
            .map(
              (opt, optIndex) => `
            <label style="display:block; font-size:0.9rem; margin-bottom:0.25rem;">
              <input type="radio" name="${name}" value="${optIndex}" style="margin-right:0.4rem;" />
              ${opt}
            </label>
          `
            )
            .join("")}
        </fieldset>
      `;
    })
    .join("");

  // Add submit button
  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Submit quiz";
  submitBtn.className = "btn primary";
  formEl.appendChild(submitBtn);

  formEl.addEventListener("submit", (e) => {
    e.preventDefault();

    let correctCount = 0;

    lesson.questions.forEach((q, index) => {
      const name = `q_${index}`;
      const selected = formEl.querySelector(`input[name="${name}"]:checked`);

      if (!selected) return;

      const selectedIndex = Number(selected.value);
      if (selectedIndex === q.correctIndex) {
        correctCount++;
      }
    });

    const total = lesson.questions.length;
    const scorePercent = Math.round((correctCount / total) * 100);

    // Save best score
    const progressKey = `lesson_${lesson.id}_bestScore`;
    const previousBest = Number(localStorage.getItem(progressKey) || 0);
    if (scorePercent > previousBest) {
      localStorage.setItem(progressKey, scorePercent);
    }

    // Show result
    let message = "";
    if (scorePercent >= 80) {
      message = "दमदार! तपाईंले धेरै राम्रो गर्नुभयो, अगाडि बढ्न तयार।";
    } else if (scorePercent >= 60) {
      message = "ठीकै छ, तर एकपटक अझ दोहोर्‍याएर पढ्नुस्।";
    } else {
      message = "चिन्ता नलिनुस्, फेरि अभ्यास गर्दा सजिलै मिल्छ। फेरी प्रयास गर्नुहोस्।";
    }

    resultEl.innerHTML = `
      <p style="font-size:1rem; margin-bottom:0.25rem;">
        Score: <strong>${scorePercent}%</strong> (${correctCount}/${total})
      </p>
      <p style="font-size:0.9rem; margin-bottom:0.5rem;">${message}</p>
      <a href="lesson.html?id=${lesson.id}" class="link">← Back to lesson</a>
    `;
  });
});

// lesson.js

function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

document.addEventListener("DOMContentLoaded", () => {
  const id = Number(getQueryParam("id"));
  const lesson = lessons.find((l) => l.id === id);

  const titleEl = document.getElementById("lesson-title");
  const metaEl = document.getElementById("lesson-meta");
  const descEl = document.getElementById("lesson-description");
  const phrasesList = document.getElementById("phrases-list");
  const quizBtn = document.getElementById("start-quiz-btn");

  if (!lesson) {
    titleEl.textContent = "Lesson not found";
    return;
  }

  titleEl.textContent = lesson.title;
  metaEl.textContent = `Track: ${lesson.track.toUpperCase()} • Level: ${
    lesson.level
  }`;
  descEl.textContent = lesson.description;

  phrasesList.innerHTML = lesson.phrases
    .map(
      (p) => `
      <li style="margin-bottom:0.75rem; padding:0.6rem 0.75rem; border-radius:0.75rem; background:#020617; border:1px solid rgba(148,163,184,0.4);">
        <div style="font-size:1rem; margin-bottom:0.2rem;">${p.ja}</div>
        <div style="font-size:0.82rem; color:#a5b4fc; margin-bottom:0.15rem;">${p.romaji}</div>
        <div style="font-size:0.85rem; color:#cbd5f5;">${p.ne}</div>
      </li>
    `
    )
    .join("");

  quizBtn.href = `quiz.html?id=${lesson.id}`;
});

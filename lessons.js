// lessons.js

// Helper: get query params from URL
function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

document.addEventListener("DOMContentLoaded", () => {
  const track = getQueryParam("track"); // "n5", "work" or null
  const container = document.getElementById("lessons-container");
  const titleEl = document.getElementById("track-title");

  if (!container) return;

  let filteredLessons = lessons;

  if (track === "n5") {
    filteredLessons = lessons.filter((l) => l.track === "n5");
    titleEl.textContent = "N5 Basics Lessons";
  } else if (track === "work") {
    filteredLessons = lessons.filter((l) => l.track === "work");
    titleEl.textContent = "Work Skills Lessons (Food Service)";
  } else {
    titleEl.textContent = "All Lessons";
  }

  if (filteredLessons.length === 0) {
    container.innerHTML = "<p>No lessons found yet.</p>";
    return;
  }

  // Render lesson cards
  container.innerHTML = filteredLessons
    .map((lesson) => {
      const progressKey = `lesson_${lesson.id}_bestScore`;
      const bestScore = localStorage.getItem(progressKey);

      return `
        <article class="card">
          <h3>${lesson.title}</h3>
          <p style="font-size: 0.85rem; opacity: 0.9; margin-bottom: 0.4rem;">
            Track: ${lesson.track.toUpperCase()} • Level: ${lesson.level}
          </p>
          <p style="font-size: 0.9rem; margin-bottom: 0.5rem;">
            ${lesson.description}
          </p>
          ${
            bestScore
              ? `<p style="font-size: 0.85rem; color:#a5f3fc;">Best score: ${bestScore}%</p>`
              : `<p style="font-size: 0.85rem; color:#94a3b8;">No quiz completed yet.</p>`
          }
          <div style="margin-top: 0.7rem;">
            <a href="lesson.html?id=${lesson.id}" class="btn secondary">Open lesson</a>
          </div>
        </article>
      `;
    })
    .join("");
});

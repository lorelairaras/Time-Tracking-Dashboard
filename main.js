document.addEventListener("DOMContentLoaded", function () {
  const timeframeBtns = document.querySelectorAll(".timeframe-btn");
  const activityCards = document.querySelectorAll(".activity-card");

  // Fetch data from data.json
  fetch("data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      updateTimeCards(data, "weekly");

      timeframeBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          timeframeBtns.forEach((b) => b.classList.remove("active"));
          this.classList.add("active");

          const timeframe = this.dataset.timeframe;

          updateTimeCards(data, timeframe);
        });
      });
    })
    .catch((error) => {
      console.error("Error loading data:", error);
      const fallbackData = [
        {
          title: "Work",
          timeframes: {
            daily: { current: 5, previous: 7 },
            weekly: { current: 32, previous: 36 },
            monthly: { current: 103, previous: 128 },
          },
        },
        {
          //I WILL CONTINUE
        },
      ];
      updateTimeCards(fallbackData, "weekly");
    });

  function updateTimeCards(data, timeframe) {
    activityCards.forEach((card, index) => {
      const activityData = data[index];
      const timeframeData = activityData.timeframes[timeframe];

      const currentHours = card.querySelector(".current-hours");
      const previousHours = card.querySelector(".previous-hours");

      const previousText =
        timeframe === "daily"
          ? "Yesterday"
          : timeframe === "weekly"
          ? "Last Week"
          : "Last Month";

      currentHours.textContent = `${timeframeData.current}hrs`;
      previousHours.textContent = `${previousText} - ${timeframeData.previous}hrs`;
    });
  }
});

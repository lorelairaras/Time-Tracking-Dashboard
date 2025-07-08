document.addEventListener("DOMContentLoaded", function () {
  const timeframeBtns = document.querySelectorAll(".timeframe-btn");
  const activityCards = document.querySelectorAll(".activity-card");

  activityCards.forEach((card) => {
    card.querySelector(".current-hours").textContent = "--hrs";
    card.querySelector(".previous-hours").textContent = "Loading...";
  });

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
          title: "Play",
          timeframes: {
            daily: { current: 1, previous: 2 },
            weekly: { current: 10, previous: 8 },
            monthly: { current: 23, previous: 29 },
          },
        },
        {
          title: "Study",
          timeframes: {
            daily: { current: 0, previous: 1 },
            weekly: { current: 4, previous: 7 },
            monthly: { current: 13, previous: 19 },
          },
        },
        {
          title: "Exercise",
          timeframes: {
            daily: { current: 1, previous: 1 },
            weekly: { current: 4, previous: 5 },
            monthly: { current: 11, previous: 18 },
          },
        },
        {
          title: "Social",
          timeframes: {
            daily: { current: 1, previous: 3 },
            weekly: { current: 5, previous: 10 },
            monthly: { current: 21, previous: 23 },
          },
        },
        {
          title: "Self Care",
          timeframes: {
            daily: { current: 0, previous: 1 },
            weekly: { current: 2, previous: 2 },
            monthly: { current: 7, previous: 11 },
          },
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

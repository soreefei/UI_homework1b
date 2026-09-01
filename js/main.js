// 1. Create an array of objects storing entries, including dummy data for past days
let journalEntries = [
    { date: "August 28, 2026", sleep: 8, moods: ["energetic", "motivated"] },
    { date: "August 29, 2026", sleep: 5, moods: ["anxious"] },
    { date: "August 30, 2026", sleep: 7, moods: ["motivated"] },
    { date: "August 31, 2026", sleep: 0, moods: [] } // Today's entry, defaults to 0 sleep and no moods
];

// 2. Write a function to loop over the array, compute averages/totals, and display them
function updateSummary() {
    let totalSleep = 0;
    let moodCounts = {
        energetic: 0,
        anxious: 0,
        motivated: 0
    };

    // Iterate through all entries using a forEach loop
    journalEntries.forEach(entry => {
        totalSleep += entry.sleep;
        
        // Loop through the moods array inside each entry object
        entry.moods.forEach(mood => {
            if (moodCounts[mood] !== undefined) {
                moodCounts[mood]++;
            }
        });
    });

    let averageSleep = totalSleep / journalEntries.length;

    // Access elements by ID and update the DOM
    document.getElementById("avg-sleep-display").innerHTML = 
        `Average sleep over ${journalEntries.length} days: ${averageSleep.toFixed(1)} hours`;
        
    document.getElementById("mood-tally-display").innerHTML = 
        `Days feeling Energetic: ${moodCounts.energetic} | Anxious: ${moodCounts.anxious} | Motivated: ${moodCounts.motivated}`;
}

// 3. Add event listeners for the sleep entry and mood checkboxes
document.getElementById("sleep-hours").addEventListener("input", (event) => {
    // Update the current day's object (index 3)
    let newSleepValue = parseFloat(event.target.value) || 0;
    journalEntries[3].sleep = newSleepValue; 
    
    // Recalculate and update UI
    updateSummary();
});

// Select all checkboxes by their class name and add listeners to each
let moodCheckboxes = document.getElementsByClassName("mood-checkbox");
for (let i = 0; i < moodCheckboxes.length; i++) {
    moodCheckboxes[i].addEventListener("change", () => {
        
        let currentDayMoods = [];
        // Check which boxes are currently checked to rebuild today's mood array
        for (let j = 0; j < moodCheckboxes.length; j++) {
            if (moodCheckboxes[j].checked) {
                currentDayMoods.push(moodCheckboxes[j].value);
            }
        }
        
        // Update the current day's object and recalculate
        journalEntries[3].moods = currentDayMoods;
        updateSummary();
    });
}

// 4. Initial call to display the summary on page load
updateSummary();
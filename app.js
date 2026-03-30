let progressData = {
    completed: 0,
    total: 0,
    streak: 0,
    lastDate: null
};

function initProgress(){
    let saved = localStorage.getItem("progress");
    if(saved){
        progressData = JSON.parse(saved);
    }

    updateProgressUI();
}

function updateProgress(){

    let checkboxes = document.querySelectorAll("input[type='checkbox']");
    let completed = 0;

    checkboxes.forEach(cb => {
        if(cb.checked) completed++;
    });

    progressData.completed = completed;
    progressData.total = checkboxes.length;

    saveProgress();
    updateStreak();
    updateProgressUI();
}

function updateProgressUI(){
    let percent = 0;

    if(progressData.total > 0){
        percent = Math.round((progressData.completed / progressData.total) * 100);
    }

    document.getElementById("progressText").innerText =
        percent + "% выполнено | 🔥 streak: " + progressData.streak;
}

function saveProgress(){
    localStorage.setItem("progress", JSON.stringify(progressData));
}

function resetProgress(){
    let checkboxes = document.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach(cb => cb.checked = false);

    progressData.completed = 0;
    progressData.total = checkboxes.length;

    saveProgress();
    updateProgressUI();
}

function updateStreak(){
    let today = new Date().toDateString();

    if(progressData.lastDate !== today){
        progressData.streak += 1;
        progressData.lastDate = today;
    }

    saveProgress();
}

/* INIT */
window.addEventListener("load", initProgress);

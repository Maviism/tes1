document.addEventListener('DOMContentLoaded', function() {
    // Elemen DOM
    const startScreen = document.getElementById('start-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');
    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const restartBtn = document.getElementById('restart-btn');
    const questionCountElement = document.querySelector('.question-count');
    const scoreElement = document.querySelector('.score');
    const questionElement = document.querySelector('.question');
    const optionsElement = document.querySelector('.options');
    const finalScoreElement = document.getElementById('final-score');
    const totalQuestionsElement = document.getElementById('total-questions');
    const percentageElement = document.getElementById('percentage');
    const feedbackElement = document.getElementById('feedback');

    // Data kuis
    const quizQuestions = [
        {
            question: "Apa ibukota Indonesia?",
            options: ["Jakarta", "Bandung", "Surabaya", "Medan"],
            answer: 0
        },
        {
            question: "Berapa hasil dari 7 x 8?",
            options: ["48", "54", "56", "64"],
            answer: 2
        },
        {
            question: "Planet terdekat dari matahari adalah?",
            options: ["Venus", "Mars", "Mercury", "Bumi"],
            answer: 2
        },
        {
            question: "Siapa penemu gravitasi?",
            options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Nikola Tesla"],
            answer: 1
        },
        {
            question: "Bahasa pemrograman berikut yang bukan termasuk frontend adalah?",
            options: ["JavaScript", "HTML", "Python", "CSS"],
            answer: 2
        }
    ];

    // Variabel kuis
    let currentQuestionIndex = 0;
    let score = 0;
    let selectedOption = null;
    let quizFinished = false;

    // Fungsi untuk memulai kuis
    function startQuiz() {
        startScreen.classList.remove('active');
        quizScreen.classList.add('active');
        showQuestion();
    }

    // Fungsi untuk menampilkan pertanyaan
    function showQuestion() {
        resetOptions();
        const currentQuestion = quizQuestions[currentQuestionIndex];
        questionCountElement.textContent = `Pertanyaan ${currentQuestionIndex + 1}/${quizQuestions.length}`;
        scoreElement.textContent = `Skor: ${score}`;
        questionElement.textContent = currentQuestion.question;

        // Tambahkan opsi jawaban
        currentQuestion.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.textContent = option;
            optionElement.dataset.index = index;
            optionElement.addEventListener('click', selectOption);
            optionsElement.appendChild(optionElement);
        });
    }

    // Fungsi untuk memilih opsi
    function selectOption(e) {
        if (quizFinished) return;

        const selectedElement = e.target;
        const selectedIndex = parseInt(selectedElement.dataset.index);
        const currentQuestion = quizQuestions[currentQuestionIndex];

        // Reset semua opsi terpilih sebelumnya
        resetOptions();

        // Tandai opsi yang dipilih
        selectedElement.classList.add('selected');
        selectedOption = selectedIndex;
        nextBtn.disabled = false;

        // Periksa jawaban (untuk tujuan visual)
        if (selectedIndex === currentQuestion.answer) {
            selectedElement.classList.add('correct');
        } else {
            selectedElement.classList.add('wrong');
            // Tandai juga jawaban yang benar
            document.querySelector(`.option[data-index="${currentQuestion.answer}"]`).classList.add('correct');
        }
    }

    // Fungsi untuk mereset opsi
    function resetOptions() {
        while (optionsElement.firstChild) {
            optionsElement.removeChild(optionsElement.firstChild);
        }
        selectedOption = null;
        nextBtn.disabled = true;
    }

    // Fungsi untuk menuju pertanyaan berikutnya
    function nextQuestion() {
        // Hitung skor
        if (selectedOption === quizQuestions[currentQuestionIndex].answer) {
            score++;
            scoreElement.textContent = `Skor: ${score}`;
        }

        // Lanjut ke pertanyaan berikutnya atau tampilkan hasil
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }

    // Fungsi untuk menampilkan hasil
    function showResult() {
        quizScreen.classList.remove('active');
        resultScreen.classList.add('active');

        const percentage = Math.round((score / quizQuestions.length) * 100);
        finalScoreElement.textContent = score;
        totalQuestionsElement.textContent = quizQuestions.length;
        percentageElement.textContent = percentage;

        // Berikan feedback berdasarkan persentase
        if (percentage >= 80) {
            feedbackElement.textContent = "Luar biasa! Anda sangat menguasai materi ini.";
            feedbackElement.style.color = "#2ecc71";
        } else if (percentage >= 60) {
            feedbackElement.textContent = "Bagus! Anda memiliki pemahaman yang cukup baik.";
            feedbackElement.style.color = "#3498db";
        } else if (percentage >= 40) {
            feedbackElement.textContent = "Cukup baik. Anda mungkin perlu belajar sedikit lagi.";
            feedbackElement.style.color = "#f39c12";
        } else {
            feedbackElement.textContent = "Anda perlu belajar lebih giat lagi untuk menguasai materi ini.";
            feedbackElement.style.color = "#e74c3c";
        }
    }

    // Fungsi untuk mengulang kuis
    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        quizFinished = false;
        resultScreen.classList.remove('active');
        startScreen.classList.add('active');
    }

    // Event listeners
    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', nextQuestion);
    restartBtn.addEventListener('click', restartQuiz);
});
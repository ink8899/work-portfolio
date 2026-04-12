// Initialize AOS Animation Library
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Animate Counters
    const counters = document.querySelectorAll('.counter');
    const speed = 100; // lower is slower normally, but here it's an interval factor

    const observerOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const isFloat = target % 1 !== 0;

                const updateCount = () => {
                    const tmpCount = +counter.innerText;
                    const inc = target / speed;

                    if (tmpCount < target) {
                        counter.innerText = isFloat ? (tmpCount + inc).toFixed(1) : Math.ceil(tmpCount + inc);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target;
                    }
                };

                updateCount();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // Render Chart.js
    const ctx = document.getElementById('tacosChart').getContext('2d');
    
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.color = "#64748b";

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['2024 Before', '2025 After'],
            datasets: [
                {
                    label: 'TACOS (%)',
                    data: [37.62, 24.02], // Dummy initial value calculated from 24.02 + 13.6
                    backgroundColor: [
                        'rgba(100, 116, 139, 0.4)',  // Muted gray
                        'rgba(37, 99, 235, 0.8)'     // Accent blue
                    ],
                    borderColor: [
                        'rgba(100, 116, 139, 1)',
                        'rgba(37, 99, 235, 1)'
                    ],
                    borderWidth: 2,
                    borderRadius: 6,
                    yAxisID: 'y'
                },
                {
                    label: 'Revenue Growth',
                    data: [100, 118], // Base 100 -> +18%
                    type: 'line',
                    borderColor: '#22c55e', // Green
                    backgroundColor: '#22c55e',
                    borderWidth: 3,
                    tension: 0.4,
                    pointBackgroundColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleFont: { size: 14 },
                    bodyFont: { size: 13 },
                    padding: 12,
                    cornerRadius: 8
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'TACOS %'
                    },
                    grid: {
                        color: 'rgba(226, 232, 240, 0.6)'
                    }
                },
                y1: {
                    beginAtZero: false,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Revenue Index'
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
});

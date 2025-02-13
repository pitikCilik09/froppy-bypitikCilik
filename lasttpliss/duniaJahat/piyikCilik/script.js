const form = document.getElementById('grade-form');
const results = document.getElementById('results');
const averageGrade = document.getElementById('average-grade');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let totalGrade = 0;
  let numSubjects = 0;
  
  const inputs = form.querySelectorAll('input[type="number"]');
  inputs.forEach(input => {
    if (input.value !== '') {
      totalGrade += parseFloat(input.value) || 0;
      numSubjects++;
    }
  });

  if (numSubjects > 0) {
    const average = totalGrade / numSubjects;
    averageGrade.textContent = average.toFixed(2);
    results.style.display = 'block';
    results.scrollIntoView({ behavior: 'smooth' });
  } else {
    averageGrade.textContent = '0.00';
  }
});

function searchTable() {
    event.preventDefault();
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const calculatedScore = parseFloat(document.getElementById('average-grade').textContent) || 0;
    const table = document.getElementById('predictionTable');
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const majorCell = rows[i].getElementsByTagName('td')[1];
        const scoreCell = rows[i].getElementsByTagName('td')[2];
        
        if (majorCell && scoreCell) {
            const major = majorCell.textContent.toLowerCase();
            const score = parseFloat(scoreCell.textContent);
            
            if (searchInput === '') {
                rows[i].style.display = score <= calculatedScore ? '' : 'none';
            } else {
                if (major.includes(searchInput) && score <= calculatedScore) {
                    rows[i].style.display = '';
                } else {
                    rows[i].style.display = 'none';
                }
            }
        }
    }
}

document.querySelector('.search-container button').addEventListener('click', searchTable);

// PDF preview functionality
document.querySelectorAll('.pdf-item a').forEach(link => {
    link.addEventListener('click', (e) => {
        const pdfPreview = document.querySelector('.pdf-preview object');
        pdfPreview.data = link.getAttribute('href');
    });
});
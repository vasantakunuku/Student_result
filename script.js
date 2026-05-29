const resultForm = document.getElementById('resultForm');
const resultDetails = document.getElementById('resultDetails');
const clearBtn = document.getElementById('clearBtn');

function calculateGrade(percentage) {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B+';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C';
  return 'D';
}

function createResultMarkup(data) {
  return `
    <ul class="result-list">
      <li><span>Student</span><strong>${data.name}</strong></li>
      <li><span>Class</span><strong>${data.className}</strong></li>
      <li><span>Roll No.</span><strong>${data.roll}</strong></li>
      <li><span>Total Marks</span><strong>${data.total}/400</strong></li>
      <li><span>Percentage</span><strong>${data.percentage}%</strong></li>
      <li><span>Grade</span><strong>${data.grade}</strong></li>
      <li><span>Status</span><strong class="result-status ${data.status === 'Pass' ? 'status-pass' : 'status-fail'}">${data.status}</strong></li>
    </ul>
    <div class="result-remark">${data.remark}</div>
  `;
}

function validateMarks(...marks) {
  return marks.every((mark) => Number.isFinite(mark) && mark >= 0 && mark <= 100);
}

resultForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('studentName').value.trim();
  const className = document.getElementById('studentClass').value.trim();
  const roll = document.getElementById('rollNumber').value.trim();
  const maths = Number(document.getElementById('maths').value);
  const science = Number(document.getElementById('science').value);
  const english = Number(document.getElementById('english').value);
  const computer = Number(document.getElementById('computer').value);

  if (!name || !className || !roll) {
    resultDetails.innerHTML = '<p>Please fill in all student details.</p>';
    return;
  }

  if (!validateMarks(maths, science, english, computer)) {
    resultDetails.innerHTML = '<p>Please enter valid marks between 0 and 100 for every subject.</p>';
    return;
  }

  const total = maths + science + english + computer;
  const percentage = ((total / 400) * 100).toFixed(2);
  const grade = calculateGrade(Number(percentage));
  const status = maths >= 35 && science >= 35 && english >= 35 && computer >= 35 ? 'Pass' : 'Fail';
  const remark = status === 'Pass'
    ? 'Congratulations! The student has passed and shown good performance.'
    : 'The student has failed in one or more subjects. Please encourage improvement.';

  resultDetails.innerHTML = createResultMarkup({
    name,
    className,
    roll,
    total,
    percentage,
    grade,
    status,
    remark,
  });
});

clearBtn.addEventListener('click', function () {
  resultForm.reset();
  resultDetails.innerHTML = '<p>No result calculated yet.</p>';
});

function highlight(table) {

  const rows = table.querySelector('tbody').querySelectorAll('tr');

  rows.forEach(row => {
    const cells = row.querySelectorAll('td');

    const statusCell = cells[3];
    if (statusCell) {
      const hasDataAvailable = statusCell.hasAttribute('data-available');
      
      if (hasDataAvailable) {
        const isAvailable = statusCell.getAttribute('data-available') === 'true';
        row.classList.add(isAvailable ? 'available' : 'unavailable');
      } else {
        row.setAttribute('hidden', '');
      }
    }
    
    const genderCell = cells[2];
    if (genderCell) {
      const gender = genderCell.textContent.trim();
      if (gender === 'm') {
        row.classList.add('male');
      } else if (gender === 'f') {
        row.classList.add('female');
      }
    }
    
    const ageCell = cells[1];
    if (ageCell) {
      const age = parseInt(ageCell.textContent.trim());
      if (age < 18) {
        row.style.textDecoration = 'line-through';
      }
    }
  });
}

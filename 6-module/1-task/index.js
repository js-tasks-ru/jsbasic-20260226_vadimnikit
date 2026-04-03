export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = this.createTable();
    this.attachEventListeners();
  }

  createTable() {
    const table = document.createElement('table');
    
  
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    const headers = ['Имя', 'Возраст', 'Зарплата', 'Город', ''];
    headers.forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
  
    const tbody = document.createElement('tbody');
    this.tbody = tbody;
    
    this.rows.forEach(rowData => {
      const row = this.createRow(rowData);
      tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    
    return table;
  }

  createRow(rowData) {
    const row = document.createElement('tr');
    
  
    const cellData = [rowData.name, rowData.age, rowData.salary, rowData.city];
    cellData.forEach(cellValue => {
      const td = document.createElement('td');
      td.textContent = cellValue;
      row.appendChild(td);
    });
    
   
    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.addEventListener('click', () => {
      row.remove();
    });
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);
    
    return row;
  }

  attachEventListeners() {
   
  }
}

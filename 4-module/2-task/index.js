function makeDiagonalRed(table) {

  let rows = table.rows;

  for (let i = 0; i < rows.length; i++) {
 
    let cells = rows[i].cells;
   
    let diagonalCell = cells[i];
   
    diagonalCell.style.backgroundColor = 'red';
  }
}

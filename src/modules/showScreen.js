import moreIcon from '../images/more.png';
import deleteIcon from '../images/delete.png';

export default class ShowOnScreen {
  constructor(parentElement) {
    this.parentElement = parentElement;
  }

  show = (arr) => {
    let id = 0;
    let checked = '';
    let lineThrough = '';
    let listItemsHTML = '';
    arr.forEach((task, i) => {
      id = i + 1;
      checked = '';
      lineThrough = '';
      if (task.completed) {
        checked = 'checked';
        lineThrough = 'style="text-decoration: line-through"';
      }
      listItemsHTML += `
      <li id="list-item${id}" data-index=${id} class="task">
 
          <input ${checked} data-index=${id} type="checkbox" class="checkbox" id="${id}">
          <input id="description${id}" class="description" data-index=${id} ${lineThrough} value="${task.description}" disabled>
    
           <img id="more${id}" data-index=${id} src=${moreIcon} class="dotsb" alt="icon">
       
           <img  data-index=${id} src=${deleteIcon} id="deletebin${id}" class="dotsd" alt="delete">
  
      
          </li>`;
    });

    this.parentElement.innerHTML = listItemsHTML;
  };
}

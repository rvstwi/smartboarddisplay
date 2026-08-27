//Originally from Drag-to-reorder widget by Taha Shashtari
//https://codepen.io/tahazsh/pen/KKGJggG
//to do checkbox originally by Milan Raring - css scan
//adapted for smartboard by Mr L

//css originally from drag-to-reorder widget
//and checkbox css
let style = document.createElement('style');
let csscontent = `
.checkbox-wrapper-11 {
    --text: var(--ui-text);
    --check: var(--ui-hover);
    --disabled: #a6a6a6be;
    --border-radius: 10px;
    border-radius: var(--border-radius);
    position: relative;
    padding: 1px;
    padding-right: 15px;
    display: grid;
    grid-template-columns: 30px auto;
    align-items: center;
  }
  .checkbox-wrapper-11 label {
    color: var(--text);
    position: relative;
    cursor: pointer;
    display: grid;
    align-items: center;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    transition: color 0.3s ease;
  }
  .checkbox-wrapper-11 label::before,
  .checkbox-wrapper-11 label::after {
    content: "";
    position: absolute;
  }
  .checkbox-wrapper-11 label::before {
    height: 2px;
    width: 8px;
    left: -27px;
    background: var(--check);
    border-radius: 2px;
    transition: background 0.3s ease;
  }
  .checkbox-wrapper-11 label:after {
    height: 4px;
    width: 4px;
    top: 8px;
    left: -25px;
    border-radius: 50%;
  }
  .checkbox-wrapper-11 input[type=checkbox] {
    -webkit-appearance: none;
    -moz-appearance: none;
    position: relative;
    height: 15px;
    width: 15px;
    outline: none;
    border: 0;
    margin: 0 15px 0 0;
    cursor: pointer;
    background: var(--background);
    display: grid;
    align-items: center;
  }
  .checkbox-wrapper-11 input[type=checkbox]::before, .checkbox-wrapper-11 input[type=checkbox]::after {
    content: "";
    position: absolute;
    height: 2px;
    top: auto;
    background: var(--check);
    border-radius: 2px;
  }
  .checkbox-wrapper-11 input[type=checkbox]::before {
    width: 0px;
    right: 60%;
    transform-origin: right bottom;
  }
  .checkbox-wrapper-11 input[type=checkbox]::after {
    width: 0px;
    left: 40%;
    transform-origin: left bottom;
  }
  .checkbox-wrapper-11 input[type=checkbox]:checked::before {
    -webkit-animation: check-01-11 0.4s ease forwards;
            animation: check-01-11 0.4s ease forwards;
  }
  .checkbox-wrapper-11 input[type=checkbox]:checked::after {
    -webkit-animation: check-02-11 0.4s ease forwards;
            animation: check-02-11 0.4s ease forwards;
  }
  .checkbox-wrapper-11 input[type=checkbox]:checked + label {
    color: var(--disabled);
    -webkit-animation: move-11 0.3s ease 0.1s forwards;
            animation: move-11 0.3s ease 0.1s forwards;
  }
  .checkbox-wrapper-11 input[type=checkbox]:checked + label::before {
    background: var(--disabled);
    -webkit-animation: slice-11 0.4s ease forwards;
            animation: slice-11 0.4s ease forwards;
  }
  .checkbox-wrapper-11 input[type=checkbox]:checked + label::after {
    -webkit-animation: firework-11 0.5s ease forwards 0.1s;
            animation: firework-11 0.5s ease forwards 0.1s;
  }

  @-webkit-keyframes move-11 {
    50% {
      padding-left: 8px;
      padding-right: 0px;
    }
    100% {
      padding-right: 4px;
    }
  }

  @keyframes move-11 {
    50% {
      padding-left: 8px;
      padding-right: 0px;
    }
    100% {
      padding-right: 4px;
    }
  }
  @-webkit-keyframes slice-11 {
    60% {
      width: 100%;
      left: 4px;
    }
    100% {
      width: 100%;
      left: -2px;
      padding-left: 0;
    }
  }
  @keyframes slice-11 {
    60% {
      width: 100%;
      left: 4px;
    }
    100% {
      width: 100%;
      left: -2px;
      padding-left: 0;
    }
  }
  @-webkit-keyframes check-01-11 {
    0% {
      width: 4px;
      top: auto;
      transform: rotate(0);
    }
    50% {
      width: 0px;
      top: auto;
      transform: rotate(0);
    }
    51% {
      width: 0px;
      top: 8px;
      transform: rotate(45deg);
    }
    100% {
      width: 5px;
      top: 8px;
      transform: rotate(45deg);
    }
  }
  @keyframes check-01-11 {
    0% {
      width: 4px;
      top: auto;
      transform: rotate(0);
    }
    50% {
      width: 0px;
      top: auto;
      transform: rotate(0);
    }
    51% {
      width: 0px;
      top: 8px;
      transform: rotate(45deg);
    }
    100% {
      width: 5px;
      top: 8px;
      transform: rotate(45deg);
    }
  }
  @-webkit-keyframes check-02-11 {
    0% {
      width: 4px;
      top: auto;
      transform: rotate(0);
    }
    50% {
      width: 0px;
      top: auto;
      transform: rotate(0);
    }
    51% {
      width: 0px;
      top: 8px;
      transform: rotate(-45deg);
    }
    100% {
      width: 10px;
      top: 8px;
      transform: rotate(-45deg);
    }
  }
  @keyframes check-02-11 {
    0% {
      width: 4px;
      top: auto;
      transform: rotate(0);
    }
    50% {
      width: 0px;
      top: auto;
      transform: rotate(0);
    }
    51% {
      width: 0px;
      top: 8px;
      transform: rotate(-45deg);
    }
    100% {
      width: 10px;
      top: 8px;
      transform: rotate(-45deg);
    }
  }
  @-webkit-keyframes firework-11 {
    0% {
      opacity: 1;
      box-shadow: 0 0 0 -2px var(--ui-hover), 0 0 0 -2px var(--ui-hover), 0 0 0 -2px var(--ui-hover), 0 0 0 -2px var(--ui-hover), 0 0 0 -2px var(--ui-hover), 0 0 0 -2px var(--ui-hover);
    }
    30% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      box-shadow: 0 -15px 0 0px var(--ui-hover), 14px -8px 0 0px var(--ui-hover), 14px 8px 0 0px var(--ui-hover), 0 15px 0 0px var(--ui-hover), -14px 8px 0 0px var(--ui-hover), -14px -8px 0 0px var(--ui-hover);
    }
  }
  @keyframes firework-11 {
    0% {
      opacity: 1;
      box-shadow: 0 0 0 -2px var(--ui-hover), 0 0 0 -2px var(--ui-hover), 0 0 0 -2px var(--ui-hover), 0 0 0 -2px var(--ui-hover), 0 0 0 -2px var(--ui-hover), 0 0 0 -2px var(--ui-hover);
    }
    30% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      box-shadow: 0 -15px 0 0px var(--ui-hover), 14px -8px 0 0px var(--ui-hover), 14px 8px 0 0px var(--ui-hover), 0 15px 0 0px var(--ui-hover), -14px 8px 0 0px var(--ui-hover), -14px -8px 0 0px var(--ui-hover);
    }
  }





.list {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  gap: 10px 0;
}

.list__item {
  width: 100%;
  background: var(--ui-bg);
  padding: 10px;
  border-radius: 5px;
  border: var(--ui-border);
  color: var(--ui-text);
  font-weight: 500;
  font-family: var(--ui-font);
  font-size: 1.5vh;
  box-shadow: 0 4px 6px -1px #00000010, 0 2px 4px -2px #00000010;
  display: flex;
  align-items: center;
  position: relative;
  will-change: transform;
}

.drag-handle {
  position: absolute;
  right: 0;
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.drag-handle::after {
  content: '⠿';
  font-size: 25px;
  color: #0000000c;
}

.list__item.is-idle .drag-handle {
  cursor: grab;
}

.list__item.is-idle {
  transition: 0.25s ease transform;
}

.list__item.is-draggable,
.list__item.is-draggable .drag-handle {
  cursor: grabbing;
}

.list__item.is-draggable {
  z-index: 22;
}
`;
style.textContent = csscontent;
$('head').append(style);

//add the html structure
let outer = CreateNewObj();
let list = document.createElement("div");
let adder = document.createElement("div");
list.classList.add("list");
list.classList.add("js-list");
outer.style.padding = "2.6vh";
outer.appendChild(list);
outer.appendChild(adder);
adder.style.minHeight = "1.6vh";
adder.style.cursor = "copy";

adder.addEventListener('click',PromptItem);
PromptItem();//populate list with first item

//don't allow dragging or right clicking inside the list
$(outer).draggable({cancel: ".list"});
$(".list").disableSelection();

//menus
let menu = CreateDefaultContextMenu(outer);
//add a new entry to the top of the default menu
let li = AddContextItem(menu,"new",`<span class="material-symbols-outlined">list_alt_add</span>Add to-do item`,true);
li.addEventListener('click', function() { $(".context").hide(100); PromptItem(); });

function PromptItem() {
  AddListItem(prompt("Enter a to-do item","Text of to-do"));
}

function AddListItem(text) {
  let item = document.createElement("div");
  item.classList.add("list__item");
  item.classList.add("is-idle");
  item.classList.add("js-item");
//  item.textContent = text + " ";
  list.appendChild(item);
  let check = document.createElement("input");
  check.type = "checkbox";
  //added check
  let checkdiv = document.createElement("div");
  checkdiv.classList.add("checkbox-wrapper-11");
  checkdiv.appendChild(check);
  check.id = "02-11";
  check.name = "r";
  check.value = "2";
  let label = document.createElement("label");
  label.for = "02-11";
  label.textContent = text;
  checkdiv.appendChild(label);
  //end
  item.appendChild(checkdiv);
  label.addEventListener('click',function(){check.click();});
  let drag = document.createElement("div");
  drag.classList.add("drag-handle");
  drag.classList.add("js-drag-handle");
  item.appendChild(drag);
  let textmenu = document.createElement("ul");
  textmenu.classList.add("context");
  document.body.appendChild(textmenu);
  label.addEventListener('contextmenu',function(event) {
    event.preventDefault();
    $(textmenu).toggle();
    $(textmenu).css({
      top: event.pageY + "px",
      left: event.pageX - Math.max(textmenu.offsetWidth,190) + "px"
    });
  });
  AddContextItem(textmenu,"edit",`<span class="material-symbols-outlined">edit</span>Edit text`);
  AddContextItem(textmenu,"delete",`<span class="material-symbols-outlined">remove_done</span>Remove this item`);
  $(textmenu).on("click", "li", function() {
    switch($(this).attr("data-action")) {
      case "edit":
        label.textContent = prompt("Editing",label.textContent);
        break;
      case "delete":
        item.classList.remove('js-item');
        item.remove();
        break;
    }
    $(".context").hide(100);
  });
}





//BELOW is script from Drag-to-reorder Widget

// Tutorial: https://tahazsh.com/blog/seamless-ui-with-js-drag-to-reorder-example

/***********************
 *      Variables       *
 ***********************/

let listContainer

let draggableItem

let pointerStartX
let pointerStartY

let itemsGap = 0

let items = []

let prevRect = {}

/***********************
 *    Helper Functions   *
 ***********************/

function getAllItems() {
  if (!items?.length) {
    items = Array.from(listContainer.querySelectorAll('.js-item'))
  }
  return items
}

function getIdleItems() {
  return getAllItems().filter((item) => item.classList.contains('is-idle'))
}

function isItemAbove(item) {
  return item.hasAttribute('data-is-above')
}

function isItemToggled(item) {
  return item.hasAttribute('data-is-toggled')
}

/***********************
 *        Setup        *
 ***********************/

function setup() {
  listContainer = document.querySelector('.js-list')

  if (!listContainer) return

  listContainer.addEventListener('mousedown', dragStart)
  listContainer.addEventListener('touchstart', dragStart)

  document.addEventListener('mouseup', dragEnd)
  document.addEventListener('touchend', dragEnd)
}

/***********************
 *     Drag Start      *
 ***********************/

function dragStart(e) {
  if (e.target.classList.contains('js-drag-handle')) {
    draggableItem = e.target.closest('.js-item')
  }

  if (!draggableItem) return

  pointerStartX = e.clientX || e.touches?.[0]?.clientX
  pointerStartY = e.clientY || e.touches?.[0]?.clientY

  setItemsGap()
  disablePageScroll()
  initDraggableItem()
  initItemsState()
  prevRect = draggableItem.getBoundingClientRect()

  document.addEventListener('mousemove', drag)
  document.addEventListener('touchmove', drag, { passive: false })
}

function setItemsGap() {
  if (getIdleItems().length <= 1) {
    itemsGap = 0
    return
  }

  const item1 = getIdleItems()[0]
  const item2 = getIdleItems()[1]

  const item1Rect = item1.getBoundingClientRect()
  const item2Rect = item2.getBoundingClientRect()

  itemsGap = Math.abs(item1Rect.bottom - item2Rect.top)
}

function disablePageScroll() {
  document.body.style.overflow = 'hidden'
  document.body.style.touchAction = 'none'
  document.body.style.userSelect = 'none'
}

function initItemsState() {
  getIdleItems().forEach((item, i) => {
    if (getAllItems().indexOf(draggableItem) > i) {
      item.dataset.isAbove = ''
    }
  })
}

function initDraggableItem() {
  draggableItem.classList.remove('is-idle')
  draggableItem.classList.add('is-draggable')
}

/***********************
 *        Drag         *
 ***********************/

function drag(e) {
  if (!draggableItem) return

  e.preventDefault()

  const clientX = e.clientX || e.touches[0].clientX
  const clientY = e.clientY || e.touches[0].clientY

  const pointerOffsetX = clientX - pointerStartX
  const pointerOffsetY = clientY - pointerStartY

  draggableItem.style.transform = `translate(${pointerOffsetX}px, ${pointerOffsetY}px)`

  updateIdleItemsStateAndPosition()
}

function updateIdleItemsStateAndPosition() {
  const draggableItemRect = draggableItem.getBoundingClientRect()
  const draggableItemY = draggableItemRect.top + draggableItemRect.height / 2

  // Update state
  getIdleItems().forEach((item) => {
    const itemRect = item.getBoundingClientRect()
    const itemY = itemRect.top + itemRect.height / 2
    if (isItemAbove(item)) {
      if (draggableItemY <= itemY) {
        item.dataset.isToggled = ''
      } else {
        delete item.dataset.isToggled
      }
    } else {
      if (draggableItemY >= itemY) {
        item.dataset.isToggled = ''
      } else {
        delete item.dataset.isToggled
      }
    }
  })

  // Update position
  getIdleItems().forEach((item) => {
    if (isItemToggled(item)) {
      const direction = isItemAbove(item) ? 1 : -1
      item.style.transform = `translateY(${
        direction * (draggableItemRect.height + itemsGap)
      }px)`
    } else {
      item.style.transform = ''
    }
  })
}

/***********************
 *      Drag End       *
 ***********************/

function dragEnd(e) {
  if (!draggableItem) return

  applyNewItemsOrder(e)
  cleanup()
}

function applyNewItemsOrder(e) {
  const reorderedItems = []

  getAllItems().forEach((item, index) => {
    if (item === draggableItem) {
      return
    }
    if (!isItemToggled(item)) {
      reorderedItems[index] = item
      return
    }
    const newIndex = isItemAbove(item) ? index + 1 : index - 1
    reorderedItems[newIndex] = item
  })

  for (let index = 0; index < getAllItems().length; index++) {
    const item = reorderedItems[index]
    if (typeof item === 'undefined') {
      reorderedItems[index] = draggableItem
    }
  }

  reorderedItems.forEach((item) => {
    listContainer.appendChild(item)
  })
  
  draggableItem.style.transform = ''

  requestAnimationFrame(() => {
    const rect = draggableItem.getBoundingClientRect()
    const yDiff = prevRect.y - rect.y
    const currentPositionX = e.clientX || e.changedTouches?.[0]?.clientX
    const currentPositionY = e.clientY || e.changedTouches?.[0]?.clientY

    const pointerOffsetX = currentPositionX - pointerStartX
    const pointerOffsetY = currentPositionY - pointerStartY

    draggableItem.style.transform = `translate(${pointerOffsetX}px, ${
      pointerOffsetY + yDiff
    }px)`
    requestAnimationFrame(() => {
      unsetDraggableItem()
    })
  })
}

function cleanup() {
  itemsGap = 0
  items = []
  unsetItemState()
  enablePageScroll()

  document.removeEventListener('mousemove', drag)
  document.removeEventListener('touchmove', drag)
}

function unsetDraggableItem() {
  draggableItem.style = null
  draggableItem.classList.remove('is-draggable')
  draggableItem.classList.add('is-idle')
  draggableItem = null
}

function unsetItemState() {
  getIdleItems().forEach((item, i) => {
    delete item.dataset.isAbove
    delete item.dataset.isToggled
    item.style.transform = ''
  })
}

function enablePageScroll() {
  document.body.style.overflow = ''
  document.body.style.touchAction = ''
  document.body.style.userSelect = ''
}

/***********************
 *      Start Here     *
 ***********************/

setup()

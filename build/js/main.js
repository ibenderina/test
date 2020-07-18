(function () {
  const ClassName = {
    NAV_TOGGLE: `.header__button`,
    NAV: `.header__nav`,
    NAV_TOGGLE_ACTIVE: `header__button--active-js`,
    NAV_CLOSED: `header__nav--active-js`,
    TABLE: `.table-first__block`,
    TABLE_CELL: `.table-first__cell`,
    TABLE_CELL_ACTIVE: `table-first__cell--active`,
    TABLE_RADIO: `.table-first__radio-button`,
    ACCORDION_BLOCK_HEADLINE: `.accordion__block-headline`,
    ACCORDION_COLLAPSED: `accordion--collapsed`,
    ACCORDION_ITEM: `.accordion__block-item`,
    SCROLL_LINKS: `.header__nav-link`
  };

  const TableCell = {
    FIRST: `#cell1`,
    SECOND: `#cell2`,
    THIRD: `#cell3`,
    FOURTH: `#cell4`,
  };

  const button = document.querySelector(ClassName.NAV_TOGGLE);
  const nav = document.querySelector(ClassName.NAV);
  const table = document.querySelector(ClassName.TABLE);
  const tableCell = document.querySelectorAll(ClassName.TABLE_CELL);
  const tableCellRadio = document.querySelectorAll(ClassName.TABLE_RADIO);
  const tableCellRadioFirst = document.querySelector(TableCell.FIRST);
  const tableCellRadioSecond = document.querySelector(TableCell.SECOND);
  const tableCellRadioThird = document.querySelector(TableCell.THIRD);
  const tableCellRadioFourth = document.querySelector(TableCell.FOURTH);

  const addClass = function (element, className) {
    if (element) {
      element.classList.add(className);
    }
  };

  const removeClass = function (element, className) {
    if (element) {
      element.classList.remove(className);
    }
  };

  const closeNavMenu = function () {
    addClass(button, ClassName.NAV_TOGGLE_ACTIVE);
    addClass(nav, ClassName.NAV_CLOSED);
  };

  const toggleNavState = function () {
    if (button) {
      button.addEventListener(`click`, function () {
        button.classList.toggle(ClassName.NAV_TOGGLE_ACTIVE);
        nav.classList.toggle(ClassName.NAV_CLOSED);
      });
    }
  };

  const chooseActiveTableCell = function () {
    let current = `first`;

    if (tableCellRadioSecond.checked) {
      current = `second`
    }

    if (tableCellRadioThird.checked) {
      current = `third`
    }

    if (tableCellRadioFourth.checked) {
      current = `fourth`
    }

    if (tableCellRadioFirst.checked) {
      current = `first`
    }

    tableCell.forEach(function (item) {
      removeClass(item, ClassName.TABLE_CELL_ACTIVE);
    });

    let currentCell = table.querySelectorAll(`.table-first__cell--${current}`);

    currentCell.forEach(function (item) {
      addClass(item, ClassName.TABLE_CELL_ACTIVE);
    });
  };

  const toggleTableCell = function () {
    if (tableCellRadio) {
      tableCellRadio.forEach(function (item) {
        item.addEventListener(`change`, chooseActiveTableCell);
      });
    }
  };

  const toggleAccordion = function (selectorHeadline) {
    const headlineElements = Array.from(document.querySelectorAll(selectorHeadline));

    headlineElements.forEach(function(element) {
      addClass(element, ClassName.ACCORDION_COLLAPSED);

      element.addEventListener(`click`, function () {
        let action = addClass;
        if (element.classList.contains(ClassName.ACCORDION_COLLAPSED)) {
          headlineElements.forEach((item) => {
            addClass(item, ClassName.ACCORDION_COLLAPSED);
          });
          action = removeClass;
        }
        action(element, ClassName.ACCORDION_COLLAPSED);
      });
    });
  };

  const setScrollLinkSmooth = function (evt) {
    evt.preventDefault();
    const anchor = evt.target.closest(`[href]`).href.split(`#`);
    document.querySelector(`#` + anchor[1]).scrollIntoView({
      behavior: `smooth`
    });
  };

  const smoothScroll = function (linkSelector) {
    const scrollLinks = Array.from(document.querySelectorAll(linkSelector));
    scrollLinks.forEach(function (element) {
      element.addEventListener(`click`, setScrollLinkSmooth);
    });
  };

  closeNavMenu();
  toggleNavState();
  toggleTableCell();
  toggleAccordion(ClassName.ACCORDION_ITEM);
  smoothScroll(ClassName.SCROLL_LINKS);
})();

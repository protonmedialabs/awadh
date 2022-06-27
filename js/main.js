var modalLearnMore = document.getElementById('modal-learn-more');
var incubatorState = 0;
var nav = document.getElementById('nav');

function moreISClickHandler(e, id) {
  e.preventDefault();
  e.stopPropagation();

  if (typeof modalLearnMoreContent !== 'undefined') {
    for (var i = 0; i < modalLearnMoreContent.length; i++) {
      if (id === i)
        modalLearnMoreContent[i].className = 'modal-learn-more__content is-active';
      else
        modalLearnMoreContent[i].className = 'modal-learn-more__content';
    }
  }

  if (typeof modalLearnMore !== 'undefined')
    modalLearnMore.className = 'modal-learn-more is-active';
  document.body.style.overflow = 'hidden';
}

function closeMoreIS() {
  modalLearnMore.className = 'modal-learn-more';
  document.body.style.overflow = 'visible';
}

window.addEventListener('load', loadHandler);

function loadHandler() {
  if (modalLearnMore) modalLearnMore.style.removeProperty('display');
  if (typeof incubatorItemsDots !== 'undefined' && typeof incubatorCarouselLength !== 'undefined') {
    for (var i = 0; i < incubatorCarouselLength - 1; i++) {
      var newDot = document.createElement('span');

      incubatorItemsDots.appendChild(newDot);
    }
  }
}

function incubatorNavClickHandler(e, type) {
  e.preventDefault();

  if (!incubatorItems || !incubatorCarouselLength) return;

  if (type === 'next') incubatorState += 1;
  else incubatorState -= 1;

  if (incubatorState >= incubatorCarouselLength) incubatorState = 0;
  if (incubatorState === -1) incubatorState = incubatorCarouselLength - 1;

  if (incubatorItems)
    incubatorItems[0].scrollTo(incubatorItems[0].offsetWidth * incubatorState, 0);
  if (incubatorItemsDots) {
    for (var i = 0; i < incubatorItemsDots.children.length; i++) {
      if (i === incubatorState)
        incubatorItemsDots.children[i].className = 'is-active';
      else
        incubatorItemsDots.children[i].className = '';
    }
  }
}

function toggleMenu() {
  if (nav) {
    if (nav.className.match(/is-active/g)) {
      nav.className = 'nav';
      document.body.style.removeProperty('overflow');
    } else {
      nav.className = 'nav is-active';
      document.body.style.overflow = 'hidden';
    }
  }
}

window.addEventListener('mouseover', mouseOverHandler);

function mouseOverHandler(e) {
  if (window.innerWidth >= 979) {
    var list = document.getElementsByClassName('nav-menu__mega--list-rdul')[0];
  
    if (
      e.target.className === 'nav-menu__mega--list-rd' ||
      (list.style.opacity === '1' && e.target.closest('.nav-menu__mega--row'))
    ) {
      list.style.opacity = '1';
      list.style.pointerEvents = 'all';
      list.previousElementSibling.style.opacity = '1';
    } else {
      list.style.opacity = '0';
      list.style.pointerEvents = 'none';
      list.previousElementSibling.style.opacity = '0';
    }
  }
}

function navDomainFocusHandler() {
  var list = document.getElementsByClassName('nav-menu__mega--list-rdul')[0];

  list.style.opacity = '1';
  list.style.pointerEvents = 'all';
  list.previousElementSibling.style.opacity = '1';
}

function navDomainBlurHandler() {
  var list = document.getElementsByClassName('nav-menu__mega--list-rdul')[0];

  list.style.opacity = '0';
  list.style.pointerEvents = 'none';
  list.previousElementSibling.style.opacity = '0';
}

function domainClickHandler(e, id) {
  if (typeof domainsMenu === 'undefined' || typeof domainsContent === 'undefined')
    return;

  var menuButtons = domainsMenu[0].getElementsByTagName('button');

  for (var i = 0; i < menuButtons.length; i++) {
    if (id === i) 
      menuButtons[i].className = 'button-unstyled is-active';
    else 
      menuButtons[i].className = 'button-unstyled';
  }

  for (var i = 0; i < domainsContent.length; i++) {
    if (id === i)
      domainsContent[i].className = 'index-domains__content is-active';
    else
      domainsContent[i].className = 'index-domains__content';
  }
}

function toggleApplyModal() {
  var modal = document.getElementById('apply-modal');

  if (modal.className.match(/is-active/)) {
    modal.className = 'apply-modal';
    document.body.style.removeProperty('overflow');
  } else {
    modal.className = 'apply-modal is-active';
    document.body.style.setProperty('overflow', 'hidden');
  }
}

function toggleAwadhLearnModal() {
  var modal = document.getElementsByClassName('awadh-learn-modal')[0];

  if (modal.className.match(/is-active/)) {
    modal.className = 'apply-modal awadh-learn-modal';
    document.body.style.removeProperty('overflow');
  } else {
    modal.className = 'apply-modal awadh-learn-modal is-active';
    document.body.style.setProperty('overflow', 'hidden');
  }
}

function keyUpHandler(e) {
  if ((e.key === 'Escape' || e.key === 'Esc') && document.getElementsByClassName('apply-modal')[0].className.match(/is-active/)) {
    toggleApplyModal();
  }
}

window.addEventListener('keyup', keyUpHandler);

function toggleIndexImpressions(e, type) {
  if (!indexImpressions) return;

  var maxLength = Math.ceil(indexImpressions.children.length / 2);

  if (type === 'right') indexImpressionsState += 1;
  if (type === 'left') indexImpressionsState -= 1;

  if (indexImpressionsState === -1) {
    indexImpressionsState = maxLength - 1;
  }
  if (indexImpressionsState > maxLength - 1) {
    indexImpressionsState = 0;
  }

  for (var i = 0; i < indexImpressionsControls.children.length; i++) {
    if (i > 0 && i < indexImpressionsControls.children.length - 1) {
      if (indexImpressionsState === i - 1) {
        indexImpressionsControls.children[i].children[0].className = 'index-impressions__controls-dot index-impressions__controls-dot-active';
      } else {
        indexImpressionsControls.children[i].children[0].className = 'index-impressions__controls-dot';
      }
    }
  }

  indexImpressions.scrollTo({
    top: 0,
    left: indexImpressionsState * indexImpressions.offsetWidth,
    behaviour: 'smooth'
  });
}

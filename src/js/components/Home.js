import { select, templates, classNames } from "../settings.js";
import utils from "../utils.js";

class Home {
  constructor(element) {
    const thisHome = this;

    thisHome.render(element);
    thisHome.initWidgets();
  }

  render(element) {
    const thisHome = this;

    const generatedHTML = templates.homePage();
    thisHome.element = utils.createDOMFromHTML(generatedHTML);
    const homeContainer = document.querySelector(select.containerOf.home);
    homeContainer.appendChild(thisHome.element);

    thisHome.dom = {
      wrapper: element,
      carousel: element.querySelector(select.widgets.carousel.wrapper),
    };

    thisHome.pages = document.querySelector(select.containerOf.pages).children;
    thisHome.navBar = document.querySelectorAll(select.nav.links);
    thisHome.navLinks = document.querySelectorAll(select.nav.homeLinks);

    const idFromHash = window.location.hash.replace("#/", "");

    let pageMatchingHash = thisHome.pages[0].id;

    for (let page of thisHome.pages) {
      if (page.id == idFromHash) {
        pageMatchingHash = page.id;
        console.log(pageMatchingHash);
        break;
      }
    }

    thisHome.activatePage(pageMatchingHash);
    for (let link of thisHome.navLinks) {
      link.addEventListener("click", function (event) {
        const clickedElement = this;
        event.preventDefault();

        const id = clickedElement.getAttribute("href").replace("#", "");
        thisHome.activatePage(id);
        window.location.hash = "#/" + id;
      });
    }
  }

  activatePage(pageId) {
    const thisHome = this;

    for (let page of thisHome.pages) {
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }

    for (let link of thisHome.navBar) {
      link.classList.toggle(
        classNames.nav.active,
        link.getAttribute("href") == "#" + pageId
      );
    }
  }

  initWidgets() {
    const flkty = new Flickity(".main-carousel", {
      cellAlign: "left",
      contain: true,
      autoPlay: true,
      wrapAround: true,
      prevNextButtons: false,
    });
  }
}

export default Home;

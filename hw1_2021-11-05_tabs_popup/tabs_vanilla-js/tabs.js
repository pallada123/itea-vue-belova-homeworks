
function init() {
    addTabsHandle();
    addBgHandle();
}
/* tabs */
function getAllTabMenus() {
    return document.querySelectorAll('ul.tab-list');
}

function getAllTabMenuLinks(tabMenu) {
    return tabMenu.querySelectorAll('a');
}

function getTabId(link) {
    return link.href.split('#')[1];
}

function getTabFragments(tabId) {
    return document.querySelectorAll('div[id^=' + tabId + ']');
}

function addTabsHandle() {
    getAllTabMenus().forEach((item) => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            checkTab(item, event.target);
        });
    });
}

function checkTab(tabMenu, link) {
    const closestLink = link.closest('A');
    if (closestLink) {
        link = closestLink;
    }

    if (link.tagName !== 'A') {
        return;
    }

    getAllTabMenuLinks(tabMenu).forEach((item) => {
        if (item === link) {
            switchTabToActive(item);
        } else {
            switchTabToInactive(item);
        }
    });
}

function switchTabToActive(activeLink) {
    activeLink.closest('li').classList.add('tab-active');

    getTabFragments(getTabId(activeLink)).forEach((item) => {
        item.style.display = 'block';
    });
}

function switchTabToInactive(inactiveLink) {
    inactiveLink.closest('li').classList.remove('tab-active');

    getTabFragments(getTabId(inactiveLink)).forEach((item) => {
        item.style.display = 'none';
    });

}

/* /tabs */

/* backgrounds */
function getAllBgBtns() {
    return document.querySelectorAll('.bg-btns button');
}

function addBgHandle() {
    getAllBgBtns().forEach((item) => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            checkBtn(event.target);
        });
    });
}

const colorsList = [];

getAllBgBtns().forEach((item) => {
    colorsList.push(item.getAttribute('data-bg'));
});

function checkBtn(btn) {
    const coloredBlock = document.getElementById('bg-container');

    getAllBgBtns().forEach((item) => {
        if (item === btn) {
            if(!item.classList.contains('btn-active')) {
                item.classList.add('btn-active');
            }
        } else {
            item.classList.remove('btn-active');
        }

    });
    let colorNew = btn.getAttribute('data-bg');

    colorsList.forEach((item) => {
        if(coloredBlock.classList.contains(item)) {
            coloredBlock.classList.remove(item);
        }
    });
    coloredBlock.classList.add(colorNew);

}
/* /backgrounds */

init();
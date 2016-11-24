/**
 * @author: Keith
 * @date: 2016-11-24
 * @file: mip-ls-pagination.js
 */

define(function (require) {
    var customElem = require('customElement').create();
    var currentPage = 0;

    function createPagination(elem) {
        // 创建页码选择器
        var pageSize = Number(elem.getAttribute('data-page-size'));
        var items = elem.querySelectorAll('li');
        var pages = Math.ceil(items.length / pageSize);
        var elemBox = elem.getBoundingClientRect();
        var parentElem = elem.parentNode;

        var paginationElem = document.createElement('div');
        paginationElem.className = 'pagination';
        paginationElem.style.width = elemBox.width + 'px';
        parentElem.appendChild(paginationElem);

        var firstPageElem = document.createElement('div');
        firstPageElem.className = 'first';
        firstPageElem.innerHTML = '首页';
        paginationElem.appendChild(firstPageElem);

        var prevPageElem = document.createElement('div');
        prevPageElem.className = 'prev';
        prevPageElem.innerHTML = '上一页';
        paginationElem.appendChild(prevPageElem);

        var chooserElem = document.createElement('select');
        chooserElem.className = 'choose';
        paginationElem.appendChild(chooserElem);
        for (var i = 0; i < pages; i++) {
            chooserElem.innerHTML += '<option value="' + (i + 1) + '">' + (i + 1) + '</option>';
        }

        var nextPageElem = document.createElement('div');
        nextPageElem.className = 'next';
        nextPageElem.innerHTML = '下一页';
        paginationElem.appendChild(nextPageElem);

        var lastPageElem = document.createElement('div');
        lastPageElem.className = 'last';
        lastPageElem.innerHTML = '末页';
        paginationElem.appendChild(lastPageElem);

        firstPageElem.addEventListener('click', function () {
            choosePage(0, elem);
        }, false);
        lastPageElem.addEventListener('click', function () {
            choosePage(pages, elem);
        }, false);
        prevPageElem.addEventListener('click', function () {
            if (currentPage > 0) {
                choosePage(currentPage - 1, elem);
            }
        }, false);
        nextPageElem.addEventListener('click', function () {
            if (currentPage < pages - 1) {
                choosePage(currentPage + 1, elem);
            }
        }, false);
        chooserElem.addEventListener('change', function () {
            choosePage(Number(chooserElem.value), elem);
        }, false);
    }

    function init(elem) {
        var items = elem.querySelectorAll('li');
        for (var i = 0; i < items.length; i++) {
            items[i].style.display = 'none';
        }

        choosePage(0, elem);

        createPagination(elem);

    }

    function hideAvailableItems(items) {
        for (var i = 0; i < items.length; i++) {
            items[i].classList.contains('available') && items[i].classList.remove('available');
        }
    }

    function choosePage(index, elem) {
        var pageSize = Number(elem.getAttribute('data-page-size'));
        var items = elem.querySelectorAll('li');
        var pages = Math.ceil(items.length / pageSize);
        // 切换页码时，隐藏之前选中的项
        hideAvailableItems(elem.querySelectorAll('li.available'));

        // 显示属于当前页码的项
        for (var i = index; i < pageSize; i++) {
            !items[i].classList.contains('available') && items[i].classList.add('available');
        }
        currentPage = index;

        var prevElem = elem.querySelector('.prev');
        var nextElem = elem.querySelector('.next');
        if (currentPage === 0) {
            !prevElem.classList.contains('disabled') && prevElem.classList.add('disabled');
            nextElem.classList.contains('disabled') && nextElem.classList.remove('disabled');
        } else if (currentPage === (pages - 1)) {
            !nextElem.classList.contains('disabled') && nextElem.classList.add('disabled');
            prevElem.classList.contains('disabled') && prevElem.classList.remove('disabled');
        } else {
            prevElem.classList.contains('disabled') && prevElem.classList.remove('disabled');
            nextElem.classList.contains('disabled') && nextElem.classList.remove('disabled');
        }
    }

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        var element = this.element;
        init(element);
    };
    return customElem;
});

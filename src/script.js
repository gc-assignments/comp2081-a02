(function() {
  'use strict';

  var app = angular.module('gcWebBook', []);

  app.controller('BookCtrl', BookCtrl);

  BookCtrl.$inject = ['$http', '$interval', '$timeout', '$window'];

  function BookCtrl($http, $interval, $timeout, $window) {
    var vm = this,
        quoteKey = 0,
        slideKey = 0,
        screenWidth = $window.innerWidth,
        quoteInterval = 3500;

    $interval(switchQuotes, quoteInterval);

    $http.get('data/quotes.json').success(getQuotes);
    $http.get('data/more-books.json').success(getMoreBooks);
    $http.get('data/contents.json').success(getTableContents);

    vm.menuState = false;
    vm.toggleMenu = toggleMenu;
    vm.slideStyle = { transform: 'translateX(0)' };
    vm.slideContentStyle = slideContentStyle;
    vm.prevSlide = prevSlide;
    vm.nextSlide = nextSlide;

    function toggleMenu() {
      vm.menuState = !vm.menuState;
    }

    function prevSlide() {
      if (slideKey > 0) {
        slideKey--;
        setSlideStyle();
      }
    }

    function nextSlide() {
      if (slideKey < 4) {
        slideKey++;
        setSlideStyle();
      }
    }

    function setSlideStyle() {
      vm.slideStyle = {
        transform: 'translateX(' + slideKey*-100 + '%)'
      };
    }

    function slideContentStyle(key) {
      var style;
      screenWidth > 860 ?
        style = { transform: 'translateX(' + key*100 + '%)' } :
        style = { position: 'relative' };
      return style;
    }

    function getQuotes(data) {
      vm.quotes = data;
      animateQuotes();
    }

    function switchQuotes() {
      // 1 time assignment, static var 5 is quotes length - 1
      quoteKey < 5 ? quoteKey++ : quoteKey = 0;
      animateQuotes();
    }

    function animateQuotes() {
      vm.animQuote = false;
      vm.quote = vm.quotes[quoteKey];
      $timeout(function() {
        vm.animQuote = true;
      }, quoteInterval - 500);
    }

    function getMoreBooks(data) {
      vm.moreBooks = data;
    }

    function getTableContents(data) {
      vm.contents = data;
    }

  }

})();
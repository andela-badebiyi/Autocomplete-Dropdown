function myAutoComplete(selector) {
  var inputSelector = $(selector + ' > input'),
    dataArray = [],
    inputDropdownList = [],
    element = {},
    dropDown,
    inputAddon,
    imgTag,
    imgTagClicked = false;
    init = false;

  inputSelector.parent().addClass('bd-dd-wrapper');

  var addStylesToAddon = function (inputAddon) {
    inputAddon.css('position', 'absolute');
    inputAddon.css('height', '100%');
    inputAddon.css('background-color', '#ccc');
    inputAddon.css('width', '10%');
    inputAddon.css('min-width', '30px')
    inputAddon.css('right', '0');
    inputAddon.css('top', 0);
    inputAddon.css('z-index', '20');
    inputAddon.css('text-align', 'center');
  }

  var addStylesToAddonImg = function (addonImg) {
    addonImg.css('position', 'relative');
    addonImg.css('top', (addonImg.parent().height()/2) - (addonImg.height()/2));
  };

  var addCaretImage = function () {
    inputAddon = $('<div class="bd-input-add-on"><img src="arrow.png" width="16px" height="16px" /></div>');
    addStylesToAddon(inputAddon);
    inputSelector.parent().css('position', 'relative');
    inputSelector.parent().append(inputAddon);
    imgTag = inputAddon.children('img');
    addStylesToAddonImg(imgTag);
    inputAddon.click(function() {
      if (!imgTagClicked) {
        inputDropdownList = dataArray;
        createDropDown();
        showDropDown();
        imgTag.removeClass('point-down');
        imgTag.addClass('point-up');
      } else {
        imgTag.removeClass('point-up');
        imgTag.addClass('point-down');
        dropDown.hide();
      }
      imgTagClicked = !imgTagClicked;
    });
  };

  var populateDataArray = function (data) {
    $.each(data, function (key, val) {
        dataArray.push({user: val, num: key});
    });
  };

  var filterDataArray = function (hayStack, needle) {
    inputDropdownList = dataArray.filter(function(e) {
        return e.user.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    });
  };

  var createDropDown = function () {
    var html = '';
    $.each(inputDropdownList, function(key, value) {
        html += '<li data-num="' + value.num +'">' + value.user +'</li>';
    });
    $('.bd-dd-list').html(html);
  };

  var addDropdownTag = function () {
    dropDown = $("<ul class='bd-dd-list'></u>");
    dropDown.insertAfter('.custom-autocomplete');
    dropDown.css('width', inputSelector.parent().css('width'));
    dropDown.css('padding', parseInt(inputSelector.parent().css('padding')) + 1 +'px');
    dropDown.hide();
  };

  var showDropDown = function () {
    if (inputDropdownList.length > 0) {
      dropDown.show();
    } else {
      dropDown.hide();
    }
    return;
  };

  $('body').on('click', 'ul li', function(e) {
    var num = $(this).attr('data-num');
    var user = $(this).html();

    inputDropdownList = [{num: num, user: user}];
    createDropDown();
    inputSelector.val(user);
    inputSelector.attr('data-val', num);
    dropDown.hide();
  });

  inputSelector.on('keyup', function (e) {
    if (!init) return;
    filterDataArray(dataArray,  inputSelector.val());
    createDropDown();
    showDropDown();
  });2

  inputSelector.on('focusout', function(e) {
    if (!init) return;
    setTimeout(function() {
      dropDown.hide('100');
    }, 50);
  });

  return {
    initialize: function(options) {
      $(document).ready(function() {
        init = true;
        addDropdownTag();
        addCaretImage();
        populateDataArray(options.data);
      });
    }
  };
};

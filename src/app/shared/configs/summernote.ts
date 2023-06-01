import { SummerNote } from '../interfaces/summernote';
declare var $: any;

export const OfferDropdown = function (context: any) {
  var ui = $.summernote.ui;

  var button = ui.buttonGroup([
    ui.button({
      className: 'dropdown-toggle',
      contents:
        '<span style="display:flex"> Offer <svg style="height: 20px; width: 15px;" fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M24 11.305l-7.997 11.39L8 11.305z"></path></g></svg></span>',
      tooltip: 'Offer',
      data: {
        toggle: 'dropdown',
      },
    }),
    ui.dropdown({
      className: 'drop-default summernote-list',
      contents:
        '<div class="btn-group">' +
        '- <button type="button" class="offer-amount" title="{{offer.offered_amount}}">Offer amount</button></div>',
      callback: function ($dropdown: any) {
        $dropdown.find('.offer-amount').click(function () {
          context.invoke('editor.insertText', '{{offer.offered_amount}}');
        });
      },
    }),
  ]);

  return button.render(); // return button as jquery object
};

export const DisputeDropDown = function (context: any) {
  var ui = $.summernote.ui;

  var button = ui.buttonGroup([
    ui.button({
      className: 'dropdown-toggle',
      contents:
        '<span style="display:flex"> Dispute <svg style="height: 20px; width: 15px;" fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M24 11.305l-7.997 11.39L8 11.305z"></path></g></svg></span>',
      tooltip: 'Dispute',
      data: {
        toggle: 'dropdown',
      },
    }),
    ui.dropdown({
      className: 'drop-default summernote-list',
      contents:
        '<div class="btn-group"  style="width:200px">' +
        '- <button type="button" class="claimer-fullname" title="{{dispute.claimer.name}}">Claimer full name</button> <br />' +
        '- <button type="button" class="claimer-first-name" title="{{dispute.claimer.user.first_name}}">Claimer first name</button> <br />' +
        '- <button type="button" class="claimer-last-name" title="{{dispute.claimer.user.last_name}}">Claimer last name</button> <br />' +
        '- <button type="button" class="respondent-fullname" title="{{dispute.respondent.name}}">Respondent full name</button> <br />' +
        '- <button type="button" class="respondent-first-name" title="{{dispute.respondent.user.first_name}}">Respondent first name</button> <br />' +
        '- <button type="button" class="respondent-last-name" title="{{{dispute.respondent.user.last_name}}">Respondent last name</button> <br />' +
        '- <button type="button" class="dispute-code" title="{{dispute.code}}">Dispute code</button></div>',
      callback: function ($dropdown: any) {
        $dropdown.find('.claimer-fullname').click(function () {
          context.invoke(
            'editor.insertText',
            '{{dispute.claimer.user.first_name}} {{dispute.claimer.user.last_name}}'
          );
        });
        $dropdown.find('.claimer-first-name').click(function () {
          context.invoke(
            'editor.insertText',
            '{{dispute.claimer.user.first_name}}'
          );
        });
        $dropdown.find('.claimer-last-name').click(function () {
          context.invoke(
            'editor.insertText',
            '{{dispute.claimer.user.last_name}}'
          );
        });
        $dropdown.find('.respondent-fullname').click(function () {
          context.invoke(
            'editor.insertText',
            '{{dispute.respondent.user.first_name}} {{dispute.respondent.user.last_name}}'
          );
        });
        $dropdown.find('.respondent-first-name').click(function () {
          context.invoke(
            'editor.insertText',
            '{{dispute.respondent.user.first_name}}'
          );
        });
        $dropdown.find('.respondent-last-name').click(function () {
          context.invoke(
            'editor.insertText',
            '{{dispute.respondent.user.last_name}}'
          );
        });
        $dropdown.find('.dispute-code').click(function () {
          context.invoke('editor.insertText', '{{dispute.code}}');
        });
      },
    }),
  ]);

  return button.render(); // return button as jquery object
};

export let summernoteConfig: SummerNote = {
  placeholder: 'Add text here...',
  tabsize: 2,
  height: 100,
  uploadImagePath: '/api/upload',
  toolbar: [
    ['misc', ['codeview', 'undo', 'redo']],
    ['style', ['bold', 'italic', 'underline', 'clear']],
    [
      'font',
      [
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'superscript',
        'subscript',
        'clear',
      ],
    ],
    ['fontsize', ['fontname', 'fontsize', 'color']],
    ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
    ['insert', ['table', 'picture', 'link', 'hr']],
    ['offer', ['offer']],
    ['dispute', ['dispute']],
  ],
  fontNames: [
    'Helvetica',
    'Arial',
    'Arial Black',
    'Comic Sans MS',
    'Courier New',
    'Roboto',
    'Times',
  ],
};

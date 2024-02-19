$(document).ready(function () {
    window.zc = window.zc || {};
    window.zca = window.zca || [];
});

(function () {

    const the_agency = function () {
        var agency = '';
        var bc_script = document.getElementById('hlpt-brayvchat-faq');
        if (document.body.contains(bc_script)) {
            if (bc_script.hasAttribute("data-brayvchat-agency")) {
                agency = bc_script.getAttribute("data-brayvchat-agency");
            }
        }
        return agency;
    }

    const hlpt_faq_location_id = function () {
        var location_id = '';
        var page_url = document.location.href;
        var page_url_Array = page_url.split("/");
        var location_pos = page_url_Array.indexOf("location");
        if (location_pos) {
            var location_id_pos = location_pos + 1;
            location_id = page_url_Array[location_id_pos];
        }
        return location_id;
    }

    const hlpt_faq_contact_id = function () {
        var contact_id = '';
        var page_url = document.location.href;
        var page_url_Array = page_url.split("/");

        if (page_url.includes("contacts/detail")) {
            var contact_pos = page_url_Array.indexOf("detail");
            //console.log("Contact Pos: ", contact_pos);
            if (contact_pos >= 0) {
                var contact_id_pos = contact_pos + 1;
                contact_id = page_url_Array[contact_id_pos];
            }
        }

        return contact_id;
    }

    function hlpt_jq_cccss_ms() {
        var t = document.createElement('style');
        t.id = 'checkin_css_ms';
        s = `@import url(https://kit.fontawesome.com/d2fea5d5c0.css);
      .hdctrl_ms{
          color:#FFFFFF; 
          background-color:#2dce89; 
          border-color:rgba(0, 0, 0, 0.1);
      }
      #support_faq_bot{
        left: unset !important;
        position:fixed;
        right:0 !important;
        top:0 !important;
        height:100%;
        width:45%;
        min-width:400px;
        z-index:11111;
      }
      .close_faq_popup{position:absolute; top:3%;right:6%; font-size:24px; opacity:0;}
      a#azFaqCtrl i{
        font-size: 20px !important;
      }`;
        t.innerHTML = s;
        document.getElementsByTagName('head')[0].appendChild(t);
    }

    const open_faq_bot = () => {
        var az_div_id = 'support_faq_bot';
        var agency_ref = the_agency();
        var location_id = hlpt_faq_location_id();
        var contact_id = hlpt_faq_contact_id();
        var widget_url = 'https://app.zappychat.com/faq/' + agency_ref + '/' + location_id + '?parentURL=' + window.location;
        if (contact_id) {
            widget_url = 'https://app.zappychat.com/faq/' + agency_ref + '/' + location_id + '/' + contact_id + '?parentURL=' + window.location;
        }
        // console.log("Final widget URL: ", widget_url);

        var existing_faq_window = document.querySelector('#' + az_div_id);
        if (!document.body.contains(existing_faq_window)) {
            let element_html =
                '<iframe id="faq_bot_frame" width="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen frameborder="0" scrolling="yes" data-app_url="' +
                window.location +
                '" src="' +
                widget_url +
                '"style="border:none; width:100%; height:100%;overflow:auto; min-height:385px;"></iframe><a href="javascript:0;" class="close_faq_popup" onclick="document.getElementById(\'support_faq_bot\').remove(); return false;"><i class="fa fa-times text-dark"></i></a>';

            const hdli = document.createElement('div');
            hdli.innerHTML = element_html;
            hdli.setAttribute('id', az_div_id);
            hdli.classList.add('help-awidget-bottom-right-pos');
            document.body.appendChild(hdli);
            setTimeout(function () {
                document.querySelector('.close_faq_popup').style.opacity = 1;
            }, 1000);
        } else {
            existing_faq_window.querySelector("iframe").src = widget_url;
            existing_faq_window.style.display = 'block';
        }

    };

    function hlpt_faq_list() {
        var linkId = 'azFaqCtrl';
        var linkURL = 'javascript:void(0);';
        var linkName = 'Bot FAQs';
        var existing_link = document.querySelector('#' + linkId);
        //var div = $('#' + linkId);
        if (!document.body.contains(existing_link)) {
            let nh =
                `<a id="${linkId}" href="${linkURL}" class="az_faq_button brayv_chat_bot_icon btn btn-circle hdctrl_ms hdctrl_msOrd">
                    <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.999 7H8.99902V9H12.999V7Z" fill="#0037FE"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.99902 7C7.52946 7 8.03816 6.78929 8.41324 6.41421C8.78831 6.03914 8.99902 5.53043 8.99902 5C8.99902 4.46957 8.78831 3.96086 8.41324 3.58579C8.03816 3.21071 7.52946 3 6.99902 3C6.46859 3 5.95988 3.21071 5.58481 3.58579C5.20974 3.96086 4.99902 4.46957 4.99902 5C4.99902 5.53043 5.20974 6.03914 5.58481 6.41421C5.95988 6.78929 6.46859 7 6.99902 7ZM6.99902 5.5C7.13163 5.5 7.25881 5.44732 7.35258 5.35355C7.44635 5.25979 7.49902 5.13261 7.49902 5C7.49902 4.86739 7.44635 4.74021 7.35258 4.64645C7.25881 4.55268 7.13163 4.5 6.99902 4.5C6.86642 4.5 6.73924 4.55268 6.64547 4.64645C6.5517 4.74021 6.49902 4.86739 6.49902 5C6.49902 5.13261 6.5517 5.25979 6.64547 5.35355C6.73924 5.44732 6.86642 5.5 6.99902 5.5ZM16.999 5C16.999 5.53043 16.7883 6.03914 16.4132 6.41421C16.0382 6.78929 15.5295 7 14.999 7C14.4686 7 13.9599 6.78929 13.5848 6.41421C13.2097 6.03914 12.999 5.53043 12.999 5C12.999 4.46957 13.2097 3.96086 13.5848 3.58579C13.9599 3.21071 14.4686 3 14.999 3C15.5295 3 16.0382 3.21071 16.4132 3.58579C16.7883 3.96086 16.999 4.46957 16.999 5ZM15.499 5C15.499 5.13261 15.4463 5.25979 15.3526 5.35355C15.2588 5.44732 15.1316 5.5 14.999 5.5C14.8664 5.5 14.7392 5.44732 14.6455 5.35355C14.5517 5.25979 14.499 5.13261 14.499 5C14.499 4.86739 14.5517 4.74021 14.6455 4.64645C14.7392 4.55268 14.8664 4.5 14.999 4.5C15.1316 4.5 15.2588 4.55268 15.3526 4.64645C15.4463 4.74021 15.499 4.86739 15.499 5Z" fill="#0037FE"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.62334 8.666C2.11997 9.6673 2.88641 10.51 3.83627 11.099C4.78613 11.6881 5.88165 12.0002 6.99934 12H14.9993C17.4393 12 19.5393 10.544 20.4773 8.453C20.8706 8.17619 21.1915 7.80879 21.4129 7.38184C21.6343 6.95489 21.7497 6.48094 21.7493 6C21.7493 4.987 21.2463 4.09 20.4773 3.548C20.004 2.49109 19.2349 1.59373 18.2628 0.964171C17.2908 0.334614 16.1574 -0.00024106 14.9993 1.30202e-07H6.99934C5.88182 3.16458e-05 4.78651 0.312163 3.83684 0.901221C2.88717 1.49028 2.12089 2.33285 1.62434 3.334C1.13499 3.5865 0.72458 3.96882 0.438069 4.43907C0.151558 4.90931 0 5.44935 0 6C0 6.55065 0.151558 7.09069 0.438069 7.56093C0.72458 8.03118 1.13399 8.4135 1.62334 8.666ZM6.99934 2H14.9993C16.3833 2 17.6023 2.702 18.3213 3.77C18.5973 4.46 18.7493 5.212 18.7493 6C18.7493 6.788 18.5973 7.54 18.3213 8.23C17.9556 8.77522 17.4612 9.22193 16.8818 9.53065C16.3024 9.83936 15.6559 10.0006 14.9993 10H6.99934C5.93847 10 4.92106 9.57857 4.17091 8.82843C3.42077 8.07828 2.99934 7.06087 2.99934 6C2.99934 4.93913 3.42077 3.92172 4.17091 3.17157C4.92106 2.42143 5.93847 2 6.99934 2Z" fill="#0037FE"/>
                    </svg>
                    <span class="sr-only">${linkName}</span>
                </a>`
            $('.hl_header--controls:last-of-type').prepend(nh);
        }
        if (document.body.contains(document.querySelector('.brayv_chat_bot_icon'))) {
            document.querySelector('.brayv_chat_bot_icon').addEventListener('click', open_faq_bot, false);
        }
    }

    /* function hlpt_getParentUrl() {
      var isInIframe = parent !== window,
        parentUrl = location.host;
      if (isInIframe) {
        parentUrl = document.referrer;
      }
      if (parentUrl) {
        var a = document.createElement('a');
        a.href = parentUrl;
        parentUrl = a.hostname;
      }
      return parentUrl;
    } */

    /* const handle_widget_icon_click = function (event) {
      var control_top = document.querySelector('#' + widget_icon_id);
      control_top.classList.toggle('widget_opened');
      if (control_top.classList.contains('widget_opened')) {
        open_faq_bot();
      }
    }; */

    const hlpt_faq_widget_display = function () {
        var agency_ref = the_agency();
        var location_id = hlpt_faq_location_id();
        var linkId = 'azFaqCtrl';
        var bot_icon = document.getElementById(linkId)
        var zc_locations = window.zc;

        /* var url_faqs = 'https://appapi.zappychat.com/faqs?agency='+agency_ref+'&location='+location_id;
          $.getJSON(url_faqs).done(function (a) {
            //  console.log("url_faqs",a.faqs)
        if(a.faqs){ */
        if (typeof zc_locations === 'object' && zc_locations.hasOwnProperty(location_id)) {
            if (zc_locations[location_id]) {
                hlpt_faq_list();
            } else {
                if (document.body.contains(bot_icon)) {
                    bot_icon.remove();
                }
            }
        } else {
            var wfurl = 'https://appapi.zappychat.com/widget?agency=' + agency_ref + '&location=' + location_id;
            $.getJSON(wfurl).done(function (a) {
                window.zc[location_id] = a.e;
                if (a.e) {
                    hlpt_faq_list();
                } else {
                    if (document.body.contains(bot_icon)) {
                        bot_icon.remove();
                    }
                }
            });
        }
        /* }
        else{
           if( document.body.contains(bot_icon) ){
                bot_icon.remove();
            }
        }    
        }) */


        //document.querySelector('.az_widget').addEventListener('click', handle_widget_icon_click, false);
    }

    const hlpt_faq_widget_setup = function () {
        const targetNode = document.querySelector('#app');
        const config = { attributes: true };  //, childList: true, subtree: true
        const observer = new MutationObserver(function (mutations) {
            hlpt_faq_widget_display();
        });
        observer.observe(targetNode, config);
    };
    hlpt_jq_cccss_ms();
    hlpt_faq_widget_setup();
    hlpt_faq_widget_display();

    /* var agency_ref = the_agency();
    var location_id = hlpt_faq_location_id();
    var wfurl = 'https://appapi.zappychat.com/widget?agency='+agency_ref+'&location='+location_id;
    $.getJSON(wfurl).done(function (a) {
      window.zc[location_id] = a.e;
      if (a.e) {
        hlpt_jq_cccss_ms();
        hlpt_faq_widget_setup();
      }
      console.log("ZC Locations: ", window.zc);
    }); */

})();
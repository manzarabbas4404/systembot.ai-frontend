$(document).ready(function () {
    window.zc = window.zc || {};
    window.zca = window.zca || [];
});

(function () {

    const the_agency = function () {
        var agency = '';
        var faq_att = document.getElementById('hlpt-az-faq');
        if (document.body.contains(faq_att)) {
            if (faq_att.hasAttribute("data-az-agency")) {
                agency = faq_att.getAttribute("data-az-agency");
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
        var lid = hlpt_faq_location_id();
        var cid = hlpt_faq_contact_id();
        var widget_url = 'https://app.zappychat.com/faq/' + agency_ref + '/' + lid + '?parentURL=' + window.location;
        if (cid) {
            widget_url = 'https://app.zappychat.com/faq/' + agency_ref + '/' + lid + '/' + cid + '?parentURL=' + window.location;
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
        var linkIcon = 'fa-solid fa-robot';
        var linkURL = 'javascript:void(0);';
        var linkName = 'Bot FAQs';
        var existing_link = document.querySelector('#' + linkId);
        //var div = $('#' + linkId);
        if (!document.body.contains(existing_link)) {
            let nh =
                '<a id="' +
                linkId +
                '" href="' +
                linkURL +
                '" class="az_faq_button az_faq_list btn btn-circle hdctrl_ms hdctrl_msOrd"><i class="' +
                linkIcon +
                '" style="--fa-secondary-opacity: 1;"></i><span class="sr-only">' +
                linkName +
                '</span></a>';
            $('.hl_header--controls:last-of-type').prepend(nh);
        }
        if (document.body.contains(document.querySelector('.az_faq_list'))) {
            document.querySelector('.az_faq_list').addEventListener('click', open_faq_bot, false);
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
        var lid = hlpt_faq_location_id();
        var linkId = 'azFaqCtrl';
        var bot_icon = document.getElementById(linkId)
        var zc_locations = window.zc;

        /* var url_faqs = 'https://appapi.zappychat.com/faqs?agency='+agency_ref+'&location='+lid;
          $.getJSON(url_faqs).done(function (a) {
            //  console.log("url_faqs",a.faqs)
        if(a.faqs){ */
        if (typeof zc_locations === 'object' && zc_locations.hasOwnProperty(lid)) {
            if (zc_locations[lid]) {
                hlpt_faq_list();
            } else {
                if (document.body.contains(bot_icon)) {
                    bot_icon.remove();
                }
            }
        } else {
            var wfurl = 'https://appapi.zappychat.com/widget?agency=' + agency_ref + '&location=' + lid;
            $.getJSON(wfurl).done(function (a) {
                window.zc[lid] = a.e;
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
    var lid = hlpt_faq_location_id();
    var wfurl = 'https://appapi.zappychat.com/widget?agency='+agency_ref+'&location='+lid;
    $.getJSON(wfurl).done(function (a) {
      window.zc[lid] = a.e;
      if (a.e) {
        hlpt_jq_cccss_ms();
        hlpt_faq_widget_setup();
      }
      console.log("ZC Locations: ", window.zc);
    }); */

})();
var soc_meta_link = $('meta[property="og:url"]').length > 0 ? $('meta[property="og:url"]').attr('content') : '', 
	soc_meta_title = $('meta[property="og:title"]').length > 0 ? $('meta[property="og:title"]').attr('content') : '', 
	soc_meta_image = $('meta[property="og:image"]').length > 0 ? $('meta[property="og:image"]').attr('content') : '', 
	soc_meta_description = $('meta[property="og:description"]').length > 0 ? $('meta[property="og:description"]').attr('content') : '';

Share = {
	vkontakte: function(purl, ptitle, pimg, text) {
		
		if(!purl || purl == ''){purl = soc_meta_link}
		if(!ptitle || ptitle == ''){ptitle = soc_meta_title}
		if(!pimg || pimg == ''){pimg = soc_meta_image}
		if(!text){text = soc_meta_description}
		
		url  = 'http://vkontakte.ru/share.php?';
		url += 'url='          + encodeURIComponent(purl);
		url += '&title='       + encodeURIComponent(ptitle);
		url += '&description=' + encodeURIComponent(text);
		url += '&image='       + encodeURIComponent(pimg);
		url += '&noparse=true';
		Share.popup(url);
	},
	odnoklassniki: function(purl, text) {
		if(!purl || purl == ''){purl = soc_meta_link}
		if(!text){text = soc_meta_description}
		
		url  = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1';
		url += '&st.comments=' + encodeURIComponent(text);
		url += '&st._surl='    + encodeURIComponent(purl);
		Share.popup(url);
	},
	facebook: function(purl, ptitle, pimg, text) {

		if(!purl || purl == ''){purl = soc_meta_link}
		if(!ptitle || ptitle == ''){ptitle = soc_meta_title}
		if(!pimg || pimg == ''){pimg = soc_meta_image}
		if(!text){text = soc_meta_description}
		
		url  = 'http://www.facebook.com/sharer.php?s=100';
		url += '&p[title]='     + encodeURIComponent(ptitle);
		url += '&p[summary]='   + encodeURIComponent(text);
		url += '&p[url]='       + encodeURIComponent(purl);
		url += '&p[images][0]=' + encodeURIComponent(pimg);
		Share.popup(url);
	},
	twitter: function(purl, ptitle) {

		if(!purl || purl == ''){purl = soc_meta_link}
		if(!ptitle || ptitle == ''){ptitle = soc_meta_title}
		
		url  = 'http://twitter.com/share?';
		url += 'text='      + encodeURIComponent(ptitle);
		url += '&url='      + encodeURIComponent(purl);
		url += '&counturl=' + encodeURIComponent(purl);
		Share.popup(url);
	},
	mailru: function(purl, ptitle, pimg, text) {

		if(!purl || purl == ''){purl = soc_meta_link}
		if(!ptitle || ptitle == ''){ptitle = soc_meta_title}
		if(!pimg || pimg == ''){pimg = soc_meta_image}
		if(!text){text = soc_meta_description}
		
		url  = 'http://connect.mail.ru/share?';
		url += 'url='          + encodeURIComponent(purl);
		url += '&title='       + encodeURIComponent(ptitle);
		url += '&description=' + encodeURIComponent(text);
		url += '&imageurl='    + encodeURIComponent(pimg);
		Share.popup(url)
	},

	popup: function(url) {
		window.open(url,'','toolbar=0,status=0,width=626,height=436');
      	// $.post('/social/share', {social:soc, page:url}, function (data){});
	}
};

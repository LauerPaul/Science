var jAjax = {
	URL : '/',
	Method : 'POST',
	dataType : 'json',
	processData : false,
	contentType : false,
	Data : '',
	loader : '',
	
	load : function(Src, Dst, callback){
		var Data = '';

		if(typeof(Src) != 'function'){
			if(typeof(Src) == 'object'){
				Data = Src;
				this.processData = true;
				this.contentType = "application/x-www-form-urlencoded; charset=UTF-8";
			}
			else{
				if(Src.length > 0){
					if($(Src)){
						var SrcType = $(Src).get(0).tagName.toLowerCase();
						if(SrcType == 'form'){
							this.processData = false;
							this.contentType = false;
							Data = this.createData($(document).find(Src));
							//console.log(Data);
							//return false;
						}
						else{
							// собираем все элементы форм в контейнере
							Data = this.createDataFromDiv($(Src));
							if(typeof(Data) == 'object'){
								this.processData = true;
							}
						}
					}
					else{
						// сразу получаем готовую строку
						Data = Src;
					}
				}
			}
		}
		
		this.Data = Data;
		
		if(this.URL.indexOf("/popup/") >= 0){
			this.dataType = 'html';
		}
		
		if(this.URL.indexOf("/json/") == -1 && this.URL.indexOf("/ajax/") == -1){
			this.dataType = 'html';
		}
		
		//console.log(this);
		//return false;

		var Loader = "";
		if(this.loader.length > 0){
			Loader = $(this.loader).clone();
		}
		else{
			Loader = $('<div class="loader"></div>');
		}
		
		if(Dst && Dst.length > 0 && typeof(Dst) != 'function'){
			$(Dst).append(Loader);
		}

		$.ajax({
		    type: this.Method,
		    url: this.URL,
			dataType: this.dataType,
		    data: this.Data,
        	processData: this.processData,
        	contentType: this.contentType,
			success: function(data){
				//console.log("Success");
				if(data.redirect && data.redirect.length > 0){
					location.href = data.redirect;
				}
				if(Dst && Dst.length > 0){
					if(typeof(Dst) == 'function'){
						Dst(data);
					}
					else{
						Loader.remove();
						$(Dst).html("").append(data.response_html);
					}
				}
				if(typeof(callback) == 'function'){
					callback(data);
				}
				if(typeof(Src) == 'function'){
					Src(data);
				}
		    },
		    error: function(error){
		    	console.log(error);
		    }
       	});
	},
	
	set : function(key, val){
		if(key.length > 0 && this[key]){
			this[key] = val;
			//console.log("Set: " + key + "=" + val);
		}
		return this;
	},
	
	createData : function(Obj){
		var fl = $("input[type=file]");
		var fd = new FormData();
		
		var List = Obj.serializeArray();
		//console.log(List);
		$.each(List, function(i, element){
			//console.log("ElementName = " + element.name);
			//console.log("ElementValue = " + element.value);
			fd.append(element.name, element.value);
		});
		
		var Files = fl.length;
		if(Files > 0){
			for(var i = 0; i < fl.get(0).files.length; i++){ 
				fd.append("file[]", fl.get(0).files[i], fl.get(0).files[i].name);
			}
		}
		return fd;
	},
	
	createDataFromDiv : function(Obj){
		var Result = this.createData($(":input", Obj));
		return Result;
	},
	
	serializeObject : function(Obj){
		var List = Obj.serializeArray();
		var Result = {};
		$.each(List, function(i, element){
			Result[element.name] = element.value;
		});
		//console.log(Result);
		return JSON.stringify(Result);
	}
};
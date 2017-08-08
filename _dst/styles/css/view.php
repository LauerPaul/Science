<?php
class View {

    /**
     * Путь к шаблону, относительно корня сайта
     */
    public  $File = array();
	public $Path = '';
	public $model = null;
	public $ResponseStatus = null;

    /**
     * Аргументы шаблона
     */
    protected $In = array();
	protected $Data = array();
	protected $IgnoreList = array();
    
    public function __construct($Path=''){
		$this->Path = $Path;
    }
	
	public function Decorator(){
		
	}
	
	/**
     * Открываем шаблон
     * @param string $FileName Путь к шаблону, относительно корня сайта
     */
	public function open($FileName){
		$FileName = $this->Path . $FileName;
		if(file_exists($FileName)){
			$Name = $this->getName($FileName);
			if(strlen($Name) > 0){
				$this->File[$Name] = $FileName;
			}
			else{
				Core::gi()->log->add("View: Template name ".$FileName." is empty.");
			}
		}
		else{
			Core::gi()->log->add("View: Template ".$FileName." is not found.");
		}
		return $this;
	}
	
	public function getName($FileName){
		$Name = $FileName;
		$tmp = explode("/", $FileName);
		$tmp = array_reverse($tmp);
		$Name = isset($tmp[0]) ? $tmp[0] : $Name;
		$Name = strtolower(str_replace(".html", "", $Name));
		return $Name;
	}
	
	public function close($Key=''){
		if(strlen($Key) > 0){
			if(isset($this->File[$Key])){unset($this->File[$Key]);}
		}
		else{
			$this->File = array();
		}
		return $this;
	}
	
	public function response($Status=''){
		if(strlen($Status) > 0){$this->ResponseStatus = $Status;}
		return $this;
	}
    
    public function setIgnore($List=''){
		if(is_array($List)){
			foreach($List AS $Value){
				$this->IgnoreList[] = $Value;
			}
		}
		else{
			$this->IgnoreList[] = $List;
		}
		return $this;
	}
    /**
     * Метод для передачи параметров шаблону
     * @param string | array $Var Название переменной в шаблоне или ассоциативный массив переменных шаблона
     * @param string $Val Значение переменной $Key (если она не array)
     */
    public function set($Var, $Val = ''){
        $In = $this->In;
		if(is_array($Var)){
            foreach($Var as $Key => $Val){
                $In[$Key] = $Val;
            }
        }
        else {
            $In[$Var] = $Val;
        }
		$this->In = $In;
		return $this;
    }

    /**
     * Метод для удаления определенной переменной из шаблона или всех переменных
     * @param string $Var Название переменной в шаблоне, которую необходимо удалить
     */
    public function clear($Var = null){
        if($Var === null){
            unset($this->In);
            $this->In = array();
        }
        else {
            unset($this->In[$Var]);
        }
		$this->IgnoreList = array();
		return $this;
    }

    /**
     * Загружает файл шаблона, подставляет в него параеметры
     * @return Возвращает HTML - код обработанного шаблона
     */
    public function parse($isIgnoreResponseStatus=false){
        $__SysErrorLevel__   = error_reporting(E_ALL ^ E_NOTICE);
        $__SysResultString__ = "";
		$Level = ob_get_level();
		$this->IgnoreList = array_unique($this->IgnoreList);
		$this->Decorator();
		
		foreach($this->Data AS $Key => $Value){
			$this->In[$Key] = $Value;
		}
		/*
		$Modules = Core::gi()->CoreModulesList;
		
		if($this->model){
			$List = $this->model->getVars();
			foreach($List AS $Key => $Value){
				if(in_array($Key, $Modules)){continue;}
				if($Level > 0){continue;}
				$this->In[$Key] = $Value;
			}
		}
		*/
		$ResponseStatus = $this->ResponseStatus === null ? Core::gi()->ResponseType : $this->ResponseStatus;
		
		if($Level > 1 && ($ResponseStatus == 'json' || $ResponseStatus == 'ajax')){
			//$this->close();
			//$this->clear();
			//return $__SysResultString__;
		}
		
		if($ResponseStatus == 'json' || $ResponseStatus == 'ajax'){
			if(!isset($this->In['status'])){$this->In['status'] = "ERROR";}
			if(!isset($this->In['error'])){$this->In['error'] = "";}
		}
		if($ResponseStatus == 'json' && !$isIgnoreResponseStatus){
			$__SysResultString__ = json_encode($this->In);
		}
		else{
			if(count($this->File) == 0){Core::gi()->log->add("View: Template list is empty.");}
			extract($this->In, EXTR_OVERWRITE);
			ob_start();
			foreach($this->File AS $Index => $File){
				if($File != ""){
					include $File;
					$__SysResultString__ = ob_get_contents();
				}
			}
			ob_end_clean();
			error_reporting($__SysErrorLevel__);
			if($ResponseStatus != 'page'){
				$__SysResultString__ = $this->removeIgnoreBlocks($__SysResultString__);
				foreach($this->IgnoreList AS $Ignore){
					$__SysResultString__ = $this->removeIgnoreBlocks($__SysResultString__, $Ignore);
				}
			}
			if($ResponseStatus == 'ajax' && !$isIgnoreResponseStatus){
				$In = $this->In;
				$In['response_html'] = $__SysResultString__;
				$this->In = $In;
				$__SysResultString__ = json_encode($this->In);
			}
		}
		
		
		//$this->reset();
		$this->close();
		$this->clear();
        return $__SysResultString__;
    }
	
	public function reset(){
		$this->Path = '';
		$this->ResponseStatus = null;
		$this->close();
		$this->clear();
		return $this;
	}
	
	public function __get($Key){
		return ($this->model && $this->model->$Key) ? $this->model->$Key : (isset($this->Data[$Key]) ? $this->Data[$Key] : null);
 	}
	
	public function __set($Key, $Value){
		$this->Data[$Key] = $Value;
	}
	
	public function removeIgnoreBlocks($Content='', $Status="IGNORE"){
		/*
		preg_match_all("/<!--IGNORE-->(.*?)<!--\/IGNORE-->/Us", $Content, $matches);
		if(count($matches[0]) > 0){
			print_r($matches);
		}
		*/
		$Status = strtoupper($Status);
		$Content = preg_replace("/<!--".$Status."-->(.*)<!--\/".$Status."-->/xUs", "", $Content);
		return $Content;
	}
	
}
let T = {
    locale : null,
    locales : {},           //语言包内容
    langCode : ['cn_j','cn_f'] 
  }
   
  T.registerLocale = function(locales){
    T.locales = locales;      //将语言包里的对象赋给当前对象的locales属性
  }
   
  T.setLocale = function(code){
    T.locale = code;          //存储当前语言的种类('cn_j'或者'cn_f')
  }
   
 
  T.getLanguage = function(){
    return T.locales[T.locale];
  }
   
   
  export default T;